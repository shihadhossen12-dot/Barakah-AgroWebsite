# Barakah Agro

This version keeps the existing HTML/CSS/JS frontend and adds a small Node.js/Express backend for order management.

## Run in VS Code

1. Install Node.js (LTS).
2. Open this folder in VS Code.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Set `ADMIN_PASSWORD` to your own password.
6. Run `npm start`.
7. Open `http://localhost:3000` for the shop.
8. Open `http://localhost:3000/admin` for the admin panel.

## What is included

- Existing HTML/CSS/JS storefront preserved.
- Checkout orders are saved to `server/data/orders.json`.
- Admin login.
- Admin order list and search.
- Order status: Pending, Processing, Confirmed, Shipped, Delivered, Cancelled.
- Customer, address, products, discount, delivery fee and total are stored.

## Important

Do not commit `.env` or real admin passwords to Git. The first run creates `server/data/orders.json` automatically.
