const fs = require("fs");
const content = fs.readFileSync("/tmp/existing_site.js", "utf8");

const start = content.indexOf("ut=[{id:1");
let bracketCount = 0;
let inString = false;
let stringChar = "";
let end = -1;

for (let i = start + 3; i < content.length; i++) {
  const c = content[i];
  if (inString) {
    if (c === stringChar && content[i-1] !== "\\") {
      inString = false;
    }
  } else {
    if (c === '"' || c === "'" || c === "`") {
      inString = true;
      stringChar = c;
    } else if (c === "[") {
      bracketCount++;
    } else if (c === "]") {
      bracketCount--;
      if (bracketCount === 0) {
        end = i;
        break;
      }
    }
  }
}

console.log("Found end at:", end);
const arrayStr = content.substring(start + 3, end + 1);
const products = eval(arrayStr);
console.log("Total parsed products:", products.length);
fs.writeFileSync("/tmp/products.json", JSON.stringify(products, null, 2));

products.forEach(p => {
  console.log(`ID: ${p.id} | ${p.name} | ${p.banglaName} | Price: ${p.price} | OldPrice: ${p.oldPrice}`);
});
