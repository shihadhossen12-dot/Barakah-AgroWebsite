import fs from "fs";

const content = fs.readFileSync("/tmp/existing_site.js", "utf8");

// Extract categories
const catStart = content.indexOf("lt=[{id:`mustard-oil`");
let catEnd = content.indexOf("];", catStart);
console.log("catStart:", catStart, "catEnd:", catEnd);
let categories = [];
try {
  categories = eval(content.substring(catStart + 3, catEnd + 1));
} catch(e) {
  console.log("cat error:", e.message);
}

// Extract reviews
const revStart = content.indexOf("dt=[{id:`rev-1`");
let revEnd = content.indexOf("];", revStart);
let reviews = [];
try {
  reviews = eval(content.substring(revStart + 3, revEnd + 1));
} catch(e) {
  console.log("rev error:", e.message);
}

// Extract store info
const storeStart = content.indexOf("ft={storeName:`Barakah Agro`");
let storeEnd = content.indexOf("},pt=", storeStart);
let storeInfo = {};
try {
  storeInfo = eval("(" + content.substring(storeStart + 3, storeEnd + 1) + ")");
} catch(e) {
  console.log("store error:", e.message);
}

// Extract coupons
const cpStart = content.indexOf("pt=[{id:`c1`");
let cpEnd = content.indexOf("];", cpStart);
let coupons = [];
try {
  coupons = eval(content.substring(cpStart + 3, cpEnd + 1));
} catch(e) {
  console.log("coupon error:", e.message);
}

const products = JSON.parse(fs.readFileSync("./extracted_products.json", "utf8"));

const fullData = {
  storeInfo,
  categories,
  products,
  reviews,
  coupons
};

fs.writeFileSync("./complete_site_data.json", JSON.stringify(fullData, null, 2));
console.log("Saved complete_site_data.json!");
console.log("Store Info:", storeInfo);
console.log("Categories Count:", categories.length);
console.log("Reviews Count:", reviews.length);
console.log("Coupons Count:", coupons.length);
