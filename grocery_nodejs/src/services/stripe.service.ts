import Stripe from "stripe";
import {
  CustomerParams,
  AddCardParams,
  PaymentIntentParams,
} from "../interface/stripe.interface";

const stripe_key = process.env.STRIPE_KEY!;
const stripeClient = new Stripe(stripe_key, {
  apiVersion: "2022-11-15",
  typescript: true,
});

export async function createCustomer(
  params: CustomerParams
): Promise<Stripe.Customer> {
  try {
    const customer = await stripeClient.customers.create({
      name: params.name,
      email: params.email,
    });
    return customer;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export async function addCard(params: AddCardParams): Promise<string> {
  try {
    const cardToken = await stripeClient.tokens.create({
      source: {
        card: {
          number: params.card_Number,
          exp_month: params.card_ExpMonth,
          exp_year: params.card_ExpYear,
          cvc: params.card_CVC,
          name: params.card_Name,
        },
      },
    } as Stripe.TokenCreateParams); // specify type of argument

    const card = await stripeClient.customers.createSource(params.customer_id, {
      source: `${cardToken.id}`,
    });

    return card.id;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export async function generatePaymentIntent(params: PaymentIntentParams) {
  try {
    const createPaymentIntent = await stripeClient.paymentIntents.create({
      receipt_email: params.receipt_email,
      amount: params.amount,
      currency: process.env.CURRENCY!,
      payment_method: params.card_id,
      customer: params.customer_id,
      payment_method_types: ["card"],
    });

    return createPaymentIntent;
  } catch (err) {
    throw new Error(`${err}`);
  }
}
