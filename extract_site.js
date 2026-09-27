import fs from "fs";

const content = fs.readFileSync("/tmp/existing_site.js", "utf8");

// Search around "contact@barakahagro.com"
const contactIdx = content.indexOf("contact@barakahagro.com");
console.log("=== CONTACT / SITE INFO SNIPPET ===");
console.log(content.substring(contactIdx - 500, contactIdx + 1500));

// Search around "ডেলিভারি পেয়েছি" for testimonials
const testIdx = content.indexOf("ডেলিভারি পেয়েছি");
console.log("=== TESTIMONIALS SNIPPET ===");
console.log(content.substring(testIdx - 300, testIdx + 2000));

// Search for about section / story
const aboutIdx = content.indexOf("আমাদের গল্প") !== -1 ? content.indexOf("আমাদের গল্প") : content.indexOf("Barakah Agro");
console.log("=== ABOUT / STORY SNIPPET ===");
const barakahMentions = [];
let bIdx = 0;
while ((bIdx = content.indexOf("বারাকাহ এগ্রো", bIdx)) !== -1) {
  barakahMentions.push(bIdx);
  bIdx += 10;
}
console.log("Barakah Agro bangla mentions count:", barakahMentions.length);
if (barakahMentions.length > 0) {
  console.log("Sample mention:", content.substring(barakahMentions[3] - 100, barakahMentions[3] + 600));
}
