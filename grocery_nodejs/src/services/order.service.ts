import { UserModel, IUserDocument } from "../models/user.model";
import { cartModel, ICardDocumet } from "../models/cards.model";
import * as stripeService from "../services/stripe.service";
import * as cartService from "../services/cart.service";
import { AddCardParams } from "../interface/stripe_params.interface";
import { orderModel } from "../models/order.model";

interface CreateCustomerResult {
  stripeCustomerID: string;
  cardId?: string;
  paymentIntentId?: string;
  client_secret?: string;
  orderId?: string;
}

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

    const card: ICardDocumet | null = await cartModel.findOne({
      customerId: model.stripeCustomerID,
      cardNumber: addCardParams.card_Number,
      cardExpMonth: addCardParams.card_ExpMonth,
      cardExpYear: addCardParams.card_ExpYear,
    });

    if (!card) {
      const result = await stripeService.addCard(addCardParams);

      const cart_model: ICardDocumet | null = new cartModel({
        cartId: result,
        cardName: addCardParams.card_Name,
        cardNumber: addCardParams.card_Number,
        cardExpMonth: addCardParams.card_ExpMonth,
        cardExpYear: addCardParams.card_ExpYear,
        cardCVC: addCardParams.card_CVC,
        customerId: model.stripeCustomerID,
      });

      await cart_model.save();
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
        (total, product) => total + product.amount,
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
