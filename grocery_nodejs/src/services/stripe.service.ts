import Stripe from "stripe";
import { STRIPE_CONFIG } from "../config/app.config";
import {
  CustomerParams,
  AddCardParams,
  PaymentIntentParams,
} from "../interface/stripe.interface";

const stripe_key = STRIPE_CONFIG.STRIPE_KEY!;
const stripeClient = new Stripe(stripe_key, {
  apiVersion: "2022-11-15",
  typescript: true,
});

export async function createCustomer(
  customerParams: CustomerParams
): Promise<Stripe.Customer> {
  try {
    const customer = await stripeClient.customers.create({
      name: customerParams.name,
      email: customerParams.email,
    });
    return customer;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export async function addCard(
  addCardParams: AddCardParams,
  customer_id: string
): Promise<string> {
  try {
    const cardToken = await stripeClient.tokens.create({
      card: {
        name: addCardParams.card_Name,
        number: addCardParams.card_Number,
        exp_month: addCardParams.card_ExpMonth,
        exp_year: addCardParams.card_ExpYear,
        cvc: addCardParams.card_CVC,
      },
    }); // specify type of argument
    const card = await stripeClient.customers.createSource(customer_id, {
      source: `${cardToken.id}`,
    });

    return card.id;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export async function generatePaymentIntent(
  paymentIntentParams: PaymentIntentParams
) {
  try {
    const createPaymentIntent = await stripeClient.paymentIntents.create({
      receipt_email: paymentIntentParams.receipt_email,
      amount: paymentIntentParams.amount * 100,
      currency: STRIPE_CONFIG.CURRENCY!,
      payment_method: paymentIntentParams.card_id,
      customer: paymentIntentParams.customer_id,
      payment_method_types: ["card"],
    });

    return createPaymentIntent;
  } catch (err) {
    throw new Error(`${err}`);
  }
}
