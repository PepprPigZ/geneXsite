// Netlify Function: Create Stripe Checkout Session
// This function receives cart items and creates a Stripe Checkout session

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { items } = JSON.parse(event.body);

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No items provided' }),
      };
    }

    // Create line items for Stripe
    const lineItems = items.map(item => ({
      price: item.priceId,
      quantity: item.quantity,
    }));

    // Get the site URL for redirects
    const siteUrl = process.env.URL || 'http://localhost:8888';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${siteUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/store.html`,
      // Optional: collect shipping address
      // shipping_address_collection: {
      //   allowed_countries: ['US', 'CA', 'GB', 'AU'],
      // },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error('Stripe error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error.message || 'Failed to create checkout session' 
      }),
    };
  }
};

