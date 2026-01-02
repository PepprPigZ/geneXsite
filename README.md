# Lab Research Store

A minimal, serverless web store using Stripe Checkout for payments. Perfect for hosting on GitHub Pages or any static hosting service.

## Features

- ✅ Serverless payments using Stripe Checkout
- ✅ Easy product configuration via `config.js`
- ✅ Modern, responsive design
- ✅ No backend required - works entirely client-side
- ✅ Ready for GitHub Pages deployment

## Quick Setup

### 1. Get Your Stripe Account

1. Create a Stripe account at [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Get your **Publishable Key** from [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
   - Use `pk_test_xxx` for testing
   - Use `pk_live_xxx` for production

### 2. Create Products in Stripe

1. Go to [https://dashboard.stripe.com/products](https://dashboard.stripe.com/products)
2. Click "Add product" for each product you want to sell
3. Fill in the product details (name, description, price)
4. After creating, click on the product and copy the **Price ID** (starts with `price_xxx`)

### 3. Configure Your Store

Open `config.js` and update:

1. **Publishable Key**: Replace `pk_test_YOUR_PUBLISHABLE_KEY_HERE` with your actual Stripe publishable key
2. **Products**: Update the products array with your products:
   - `name`: The display name for your product
   - `priceId`: The Stripe Price ID (from step 2)
   - `description`: Optional description shown on the product card
   - `image`: Optional image URL for the product

Example:
```javascript
products: [
  {
    id: 'prod_1',
    name: 'Research Tool Pro',
    priceId: 'price_1234567890abcdef',
    description: 'Professional research tool with advanced features',
    image: 'https://example.com/product-image.jpg'
  }
]
```

### 4. Test Locally

You can test your store locally using a simple web server:

**Using Python 3:**
```bash
cd /Users/muhdata/Documents/LabResearchStore
python3 -m http.server 8888
```

**Using Python 2:**
```bash
cd /Users/muhdata/Documents/LabResearchStore
python -m SimpleHTTPServer 8888
```

Then open [http://localhost:8888](http://localhost:8888) in your browser.

## Deploy to GitHub Pages

1. Create a new GitHub repository
2. Push your code to the repository
3. Go to Settings → Pages in your GitHub repository
4. Select your branch (usually `main` or `master`)
5. Your store will be live at `https://yourusername.github.io/repository-name`

### Important: Enable Client-Only Checkout

Before going live, you need to:

1. Go to [Stripe Dashboard → Checkout Settings](https://dashboard.stripe.com/account/checkout/settings)
2. Enable "Client-only checkout"
3. Add your GitHub Pages domain (e.g., `yourusername.github.io`) to the domain whitelist

## File Structure

```
LabResearchStore/
├── index.html          # Main store page
├── success.html        # Payment success page
├── canceled.html       # Payment canceled page
├── config.js           # Product configuration (EDIT THIS!)
├── css/
│   └── style.css       # Store styling
├── js/
│   └── store.js        # Store functionality
└── README.md           # This file
```

## How It Works

- **config.js**: Contains all your product information and Stripe key
- **index.html**: The main store page that displays your products
- **store.js**: Handles loading products and creating Stripe Checkout sessions
- **Stripe Checkout**: Handles the entire payment process securely

When a customer clicks "Buy Now", they're redirected to Stripe's secure checkout page. After payment, they're redirected back to your success or canceled page.

## Support

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Checkout Guide](https://stripe.com/docs/payments/checkout)
- [Stripe Dashboard](https://dashboard.stripe.com)

## Security Notes

- ⚠️ **Never** share your Stripe Secret Key (starts with `sk_`)
- ✅ Only the Publishable Key (starts with `pk_`) is needed for client-side checkout
- ✅ All payment processing is handled securely by Stripe

