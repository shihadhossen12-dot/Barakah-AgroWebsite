# Barakah Agro — Hostinger Deployment

The site uses a Node.js/Express backend and Hostinger MySQL for customer accounts, orders, carts, reviews, managed products, chat, and contact messages.

## 1. Create the Hostinger database

In hPanel, create a MySQL database and user, grant that user access to the database, and note the exact hostname, database name, username, and password. Do not share or commit these credentials.

## 2. Check the hosting plan

Use the Node.js application feature available in your hPanel. If your plan does not show a Node.js app option, this project needs a Hostinger VPS or a hosting plan that supports Node.js; static PHP hosting alone cannot run the Express API.

## 3. Deploy the application

Upload or connect the repository so the project root contains `package.json`, `server/`, and the HTML files. Configure the Node.js app to use the project's supported Node.js version (20 or newer) and start command `npm start`.

Add these environment variables in the Node.js app settings. Use the values shown by hPanel for the MySQL connection:

- `DB_HOST`
- `DB_PORT` (usually `3306`)
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD` (use a strong, unique secret)
- `NODE_ENV` = `production`
- `APP_URL` (your live HTTPS domain)
	- `TELEGRAM_BOT_TOKEN` (optional; create a bot with Telegram's `@BotFather`)
	- `TELEGRAM_CHAT_ID` (optional; start a chat with the bot and set your chat ID)

	To find your chat ID, create the bot with `@BotFather`, open the bot and press Start, then visit `https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getUpdates` and copy `message.chat.id` from the response. Keep the bot token private. When both Telegram variables are set, each successfully saved order sends an order notification to that chat; if either variable is missing, notifications are disabled.

The application creates the required MySQL tables at startup. If the database connection or table setup fails, the Node.js app should fail to start rather than accept orders into temporary memory.

## 4. Verify after deployment

Open the site and `/api/health`, then test customer registration/login, a checkout order, admin order status updates, reviews, and contact messages. Confirm the rows appear in Hostinger phpMyAdmin. Take a database backup before importing any existing production data.

## Local development

```bash
npm install
npm start
```

Create `.env` from `.env.example` for local use. Never upload `.env`, database credentials, or real admin secrets to GitHub.
