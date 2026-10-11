# Barakah Agro

This version keeps the existing HTML/CSS/JS frontend and uses a Node.js/Express backend with MySQL storage.

## Run in VS Code

1. Install Node.js (LTS).
2. Open this folder in VS Code.
3. Run `npm install`.
4. Copy `.env.example` to `.env` for local MySQL settings.
5. Set the database variables and a unique `ADMIN_PASSWORD`.
6. Run `npm start`.
7. Open `http://localhost:3000` for the shop.
8. Open `http://localhost:3000/admin` for the admin panel.

## What is included

- Existing HTML/CSS/JS storefront preserved.
- Customer accounts, orders, carts, reviews, managed products, chat, and contact messages use MySQL when configured.
- Admin login.
- Admin order list and search.
- Order status: Pending, Processing, Confirmed, Shipped, Delivered, Cancelled.
- Customer, address, products, discount, delivery fee and total are stored.

## Important

Do not commit `.env`, database credentials, or real admin passwords to Git. See `DEPLOYMENT-GUIDE.md` for Hostinger deployment steps. Without MySQL settings, local development uses temporary in-memory storage; that mode is not suitable for production.
