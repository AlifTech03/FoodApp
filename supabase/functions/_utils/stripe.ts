import Stripe from 'https://esm.sh/stripe@17.4.0?target=deno&deno-std=0.132.0&no-check';

console.log(Deno.env.get('STRIPE_SECRET_KEY'));


export const stripe = Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  httpClient: Stripe.createFetchHttpClient(),
});