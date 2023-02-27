import { UserModel, IUserDocument } from "../models/user.model";
import { cardModel, ICardDocument } from "../models/cards.model";
import * as stripeService from "../services/stripe.service";
import * as cartService from "../services/cart.service";
import { AddCardParams } from "../interface/stripe_params.interface";
import { orderModel } from "../models/order.model";
import {
  CreateCustomerResult,
  UpdateOrderParams,
  OrderModel,
} from "../interface/order_service.interface";

async function createOrder(
  addCardParams: AddCardParams,
  userId: string,
  amount: number
): Promise<CreateCustomerResult> {
  try {
    const user: IUserDocument | null = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    let model: CreateCustomerResult = {
      stripeCustomerID: user.stripeCustomerID || "",
    };

    if (!model.stripeCustomerID) {
      const result = await stripeService.createCustomer({
        name: user.fullName,
        email: user.email,
      });
      user.stripeCustomerID = result.id;
      await user.save();
      model.stripeCustomerID = result.id;
    }

    const card: ICardDocument | null = await cardModel.findOne({
      customerId: model.stripeCustomerID,
      cardNumber: addCardParams.card_Number,
      cardExpMonth: addCardParams.card_ExpMonth,
      cardExpYear: addCardParams.card_ExpYear,
    });

    if (!card) {
      const result = await stripeService.addCard(addCardParams);

      const card_model: ICardDocument | null = new cardModel({
        cartId: result,
        cardName: addCardParams.card_Name,
        cardNumber: addCardParams.card_Number,
        cardExpMonth: addCardParams.card_ExpMonth,
        cardExpYear: addCardParams.card_ExpYear,
        cardCVC: addCardParams.card_CVC,
        customerId: model.stripeCustomerID,
      });

      await card_model.save();
      model.cardId = result;
    } else {
      model.cardId = card.cartId;
    }
    const paymentIntentResult = await stripeService.generatePaymentIntent({
      receipt_email: user.email,
      amount: amount,
      card_id: model.cardId!,
      customer_id: model.stripeCustomerID,
    });
    model.paymentIntentId = paymentIntentResult.id;
    model.client_secret = paymentIntentResult.client_secret!;

    const cartModelResult = await cartService.getCart(user.id);
    if (cartModelResult) {
      const products = cartModelResult.products.map((product) => ({
        product: product.product._id,
        qty: product.qty,
        amount: product.product.productSalePrice,
      }));
      const grandTotal = products.reduce(
        (total, product) => total + product.amount!,
        0
      );
      const order = new orderModel({
        userId: cartModelResult.userId,
        products,
        orderStatus: "pending",
        grandTotal,
      });
      const orderResult = await order.save();
      model.orderId = orderResult._id;
    }
    return model;
  } catch (err) {
    throw new Error(`${err}`);
  }
}
async function updateOrder(
  params: UpdateOrderParams
): Promise<OrderModel | "order failed"> {
  try {
    const model: OrderModel = {
      orderStatus: params.status,
      transactionId: params.transactionId,
    };
    const updatedOrder = await orderModel.findByIdAndUpdate(
      params.orderId,
      model,
      { useFindAndModify: false, new: true }
    );
    if (!updatedOrder) {
      return "order failed";
    }
    if (params.status === "success") {
      // clear the cart
    }
    return updatedOrder;
  } catch (err) {
    throw new Error(`${err}`);
  }
}
