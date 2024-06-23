# Integrating Stripe in Next.js

## Step 1: Install Packages

Open your terminal and install the required packages:

```bash
npm i @stripe/stripe-js
npm i stripe
```

## Step 2: Add Stripe Keys

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-publishable-key
STRIPE_SECRET_KEY=your-secret-key

## Step 3: Create Stripe Instance

To create a Stripe instance, follow these steps:

1. Create a file named stripe.js in the lib folder.
2. Import server-only to use the Stripe secret key:
3. Create the Stripe instance with the following code:

import Stripe from 'stripe';
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
apiVersion: "2023-10-16", // You can change the API version here
appInfo: {
name: "SkillSphere", // Replace with your app name
// You can also add app version here
},
});

## Step 4: Handle Currency Formats

Different currencies use different formats (e.g., decimal separator, comma separator). To handle this, create a function called stripe-helper.js in the lib folder. This function will take two parameters:

`amount`
`currency`

Code for `stripe-helper.js`

export const formatAmountForStripe = (amount, currency) => {

  <!--Creating a Number Formatter. An Intl.NumberFormat object is created to format numbers according to the "bn-BD" locale (Bengali - Bangladesh).  -->

let numberFormate = new Intl.NumberFormat(["bn-BD"], {
style: "currency",
currency: currency,
currencyDisplay: "symbol",
});

<!--Formatting the Amount and Checking for Decimals  -->

const parts = numberFormate.formatToParts(amount);

<!-- initialized zeroDecimalNumber flag as true -->

let zeroDecimalNumber = true;

<!-- This checks if the currency uses decimal points or not. -->

for (let part of parts) {
if (part.type === "decimal") {
zeroDecimalNumber = false;
}
}

<!-- If it uses decimals, it converts the amount to the smallest currency unit by multiplying by 100 and rounding. -->

return zeroDecimalNumber ? amount : Math.round(amount \* 100);
};

## create a stripe action in app/actions folder

"use server";

import { stripe } from "@/lib/stripe";
import { formatAmountForStripe } from "@/lib/stripe-helper";

<!-- We needs headers to knowing the origin means from where the request is comming, we have to known this stripe -->

import { headers } from "next/headers";

<!-- Declear our local currency -->

const CURRENCY = "BDT";

<!-- create a function. This function will take one parameter called data, we can declear this others name -->

`call this function from CourseEnrollAction component`

export const createCheckoutSession = async (data) => {

<!-- stripe can use by 2 mode. i. hosted ii. embeded mode. Here we will talk about hosted mode -->

const ui_mode = "hosted";

<!-- get the origin from headers -->

const origin = headers().get("origin");

<!-- get course id and course price from data. whcih is coming when use click in enroll button -->

const courseId = data.get("courseId");
const coursePrice = data.get("coursePrice");

<!-- Now need checkout session. This function will take lots of options -->

const checkoutSession = await stripe.checkout.sessions.create({

<!-- mode will be payment -->

mode: "payment",

<!-- there are lots of option in submit_type. 1. auto => by default it called pay button 2. book => this button will called book 3. donate 4. pay -->

submit_type: "auto",

<!-- here will be add how many items customers want to buy   -->

line_items: [
{
quantity: 1,
price_data: {
currency: CURRENCY,
product_data: {
name: data.get("courseName"),
},

<!-- for unite amount we will use formatAmountForStripe function, we know that this function will take 2 perameters called amount and currency   -->

unit_amount: formatAmountForStripe(coursePrice, CURRENCY),
},
},
],

<!-- Now stripe need to know, which ui mode we are using. in ui mode we have to declear 2 things, 1. if payment success, where we will redirect them and 2. if payment cancel, where we will redirect them  -->

...(ui_mode === "hosted" && {
success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,
cancel_url: `${origin}/courses`,
}),

    ui_mode,

});

<!-- Have to return 2 things, For that stripe can validate client_secret and url -->

return {
client_secret: checkoutSession.client_secret, // client_secret most of use in embeded mode
url: checkoutSession.url,
};
};

# create a payment intent

<!-- this function automatically called by stripe, Here we have to cinfigure what kind of payment method we want to support -->

export const createPaymentIntent = async (data) => {

<!-- create a payment intent using stripe object -->

const paymentIntent = await stripe.paymentIntents.create({
amount: formatAmountForStripe(coursePrice, CURRENCY),

automatic_payment_methods: { enabled: true },
currency: CURRENCY,
});

return {
client_secret: paymentIntent.client_secret,
};
};

```

```
