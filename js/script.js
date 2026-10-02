/* ==========================================================================
   BARAKAH AGRO - MASTER JAVASCRIPT (js/script.js)
   Pure Vanilla JS - Beginner Friendly, Fully Documented
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. AUTHENTIC BARAKAH AGRO PRODUCTS DATABASE
// --------------------------------------------------------------------------
const BARAKAH_PRODUCTS = [
  {
    id: 1,
    name: "Wood-Pressed Mustard Oil (5 Liter)",
    banglaName: "কাঠের ঘানির খাঁটি সরিষার তেল (৫ লিটার)",
    category: "mustard-oil",
    categoryName: "Mustard Oil",
    banglaCategory: "সরিষার তেল",
    sku: "BA-MO-5000",
    image: "images/products/sorisa5liter.png",
    images: [
      "images/products/sorisa5liter.png",
      "images/products/sorisa1liter.png"
    ],
    rating: 4.9,
    reviewCount: 38,
    isOffer: true,
    shortDescription: "কাঠের ঘানিতে কোল্ড-প্রেসড প্রক্রিয়ায় প্রস্তুত শতভাগ খাঁটি ও ঝাঁঝালো সরিষার তেল।",
    description: "বারাকাহ এগ্রোর কাঠের ঘানির খাঁটি সরিষার তেল কোনো প্রকার তাপ বা কেমিক্যাল প্রয়োগ না করে প্রাচীন পদ্ধতিতে কোল্ড-প্রেসড করে তৈরি করা হয়। মাঘী সরিষা থেকে প্রস্তুত হওয়ায় এর ঝাঁঝ ও প্রাকৃতিক পুষ্টিগুণ যেমন ওমেগা-৩, ওমেগা-৬ এবং ভিটামিন-ই সম্পূর্ণ অক্ষত থাকে। হৃদরোগ প্রতিরোধ এবং দৈনন্দিন সুস্বাদু রান্নার জন্য এটি অতুলনীয়।",
    ingredients: "১০০% দেশি মাঘী সরিষা দানা (Cold Pressed Mustard Seeds)",
    benefits: [
      "খাঁটি কাঠের ঘানির সরিষার তেলের বিশেষত্ব",
      "প্রাকৃতিক ঝাঁঝ ও মনমাতানো সুবাস — ঘানিভাঙা সরিষার স্বতন্ত্র ঘ্রাণ ও ঝাঁঝযুক্ত স্বাদ।",
      "খাঁটি সরিষার বীজ থেকে প্রস্তুত — প্রতিদিনের রান্নায় এনে দেয় দেশি স্বাদের পরিপূর্ণতা।",
      "কোনো প্রকার ভেজাল, ঝাঁঝ কেমিক্যাল বা পাম তেল মুক্ত",
      "প্রাকৃতিক ওমেগা-৩, ওমেগা-৬ এবং ভিটামিন-ই সমৃদ্ধ",
      "হৃদরোগ প্রতিরোধে সহায়ক এবং রক্তনালী সুস্থ রাখে",
      "দৈনন্দিন রান্নায় স্বাদ ও পুষ্টি নিশ্চিত করে",
      "শতভাগ প্রাকৃতিক ও অর্গানিক",
      "খাঁটি সরিষার তেল দিয়ে রান্না করলে খাবারের স্বাদ ও পুষ্টি বৃদ্ধি পায়",
      "কোনো প্রিজারভেটিভ বা কৃত্রিম ফ্লেভার নেই",
      "শরীরের রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করে",
      "হজমশক্তি বৃদ্ধি ও পেটের সমস্যা দূর করে",
      "চুল ও ত্বকের স্বাস্থ্য ভালো রাখে",
      "শরীরের দুর্বলতা দূর করে ও শক্তি যোগায়",
      "শরীরকে দীর্ঘক্ষণ হাইড্রেটেড রাখে",
      "শরীরের ওজন নিয়ন্ত্রণে সহায়ক"

    ],
    packages: [
      { id: "mo-5l", label: "5 liter", price: 1300, oldPrice: 1500 },
      { id: "mo-2l", label: "2 liter", price: 520, oldPrice: 600 },
      { id: "mo-1l", label: "1 liter", price: 260, oldPrice: 300 }
    ]
  },
  {

    id: 2,
    name: "Sun-Dried Pat Pata",
    banglaName: "প্রাকৃতিক শুকনো পাট পাতা",
    category: "leaves",
    categoryName: "Dry Leaves",
    banglaCategory: "শুকনো পাট পাতা",
    sku: "BA-PP-0100",
    image: "images/products/patpata.jpeg",
    images: [
      "images/products/patpata4.jpeg",
      "images/products/patpata2.jpeg",
      "images/products/patpata3.jpeg"
    ],
    rating: 5,
    reviewCount: 56,
    isOffer: true,
    shortDescription: "ঐতিহ্যবাহী স্বাদ ও পুষ্টিতে ভরপুর স্বাস্থ্যসম্মত শুকনো পাট পাতা।",
    description: "প্রাকৃতিকভাবে সংগ্রহ ও যত্নসহকারে শুকানো শুকনো পাটপাতা এখন পাওয়া যাচ্ছে Barakah Agro-তে।গ্রামবাংলার পরিচিত পাটপাতার নিজস্ব স্বাদ ও গন্ধ ধরে রাখতে সংগ্রহ থেকে শুরু করে শুকানো ও সংরক্ষণ—প্রতিটি ধাপে Barakah Agro-এর নিজস্ব তত্ত্বাবধান নিশ্চিত করা হয়।",
    ingredients: "১০০% দেশি কচি পাট পাতা (Dried Jute Leaves)",
    benefits: [
      "কেন Barakah Agro-এর শুকনো পাটপাতা?",
      "শতভাগ প্রাকৃতিক ও অর্গানিক — কোনো প্রিজারভেটিভ, কৃত্রিম রঙ বা ফ্লেভার নেই।",
      "উচ্চ পুষ্টিগুণ — প্রাকৃতিক ফাইবার, ভিটামিন ও খনিজ সমৃদ্ধ।",
      "Barakah Agro-এর নিজস্ব তত্ত্বাবধানে প্রস্তুত — সংগ্রহ থেকে শুকানো ও সংরক্ষণ পর্যন্ত প্রতিটি ধাপে থাকে আমাদের বিশেষ নজরদারি।",
      "ঐতিহ্যবাহী স্বাদ ও গন্ধ — গ্রামবাংলার পরিচিত পাটপাতার নিজস্ব স্বাদ ও গন্ধ ধরে রাখা হয়।",
      "পরিবারের জন্য উপযোগী — প্রতিদিনের খাদ্যতালিকা, ইফতার কিংবা প্রিয়জনকে উপহার—সব ক্ষেত্রেই দারুণ একটি পছন্দ।",
      "সতর্কভাবে বাছাই ও প্যাকেজিং — প্রতিটি পাটপাতার মান, পরিচ্ছন্নতা ও প্যাকেজিংয়ে Barakah Agro-এর নিজস্ব তত্ত্বাবধান।",
      "স্বাস্থ্যসম্মত — প্রাকৃতিকভাবে শুকানো ও সংরক্ষিত, যা স্বাস্থ্যকর খাদ্যাভ্যাসে সহায়ক।",
      "পরিবেশবান্ধব — প্রাকৃতিকভাবে সংগ্রহ ও শুকানো, যা পরিবেশের প্রতি যত্নশীল।"
    ],
    packages: [
      { id: "pp-250", label: "250 gm packet", price: 300},
      { id: "pp-500", label: "500 gm packet", price: 580},
      { id: "pp-1k", label: "1 kg packet", price: 1020}
    ]
  },
  {
    id: 3,
    name: "আজকের স্পেশাল — দেশি হাঁসের মাংস মাত্র ৳750/kg!",
    banglaName: "🌿 গ্রামের স্বাদ এবার আপনার ঘরে — দেশি হাঁসের মাংস ৳750/kg",
    category: "meat",
    categoryName: "Organic Meat",
    banglaCategory: "দেশি হাঁসের মাংস",
    sku: "BA-GH-0500",
    image: "images/products/has.jpeg",
    images: [
    "images/products/has3.jpeg",
    "images/products/has.jpeg",
    "images/products/has2.jpeg"
    ],
    rating: 5.0,
    reviewCount: 31,
    isOffer: true,
    shortDescription: "দেশি হাঁসের মাংস মাত্র ৳750/kg!",
    description: "গ্রামের চারণভূমিতে ঘাস খাওয়া দেশি হাঁসের মাংস সংগ্রহ করে প্রচলিত বিলো পদ্ধতিতে মাখন তোলা হয় এবং অল্প তাপে খাঁটি গাওয়া ঘি তৈরি করা হয়। স্বাদে ঘরোয়া, মানে খাঁটি—আজই অর্ডার করুন! 🌿❤️",
    ingredients: "১০০% দেশি হাঁসের মাংস",
    benefits: [
      "দেশি হাঁসের মাংসের উপকারিতা",
      "উচ্চমানের প্রোটিনের উৎস — শরীরের পেশি ও কোষ গঠনে সহায়তা করে।",
      "ভিটামিন ও খনিজ সমৃদ্ধ — শরীরের রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করে।",
      "ওমেগা-৩ ফ্যাটি অ্যাসিড সমৃদ্ধ — হৃদরোগ প্রতিরোধে সহায়ক।",
      "ভিটামিন B-সমৃদ্ধ — শরীরের স্বাভাবিক শক্তি উৎপাদন ও বিপাকে ভূমিকা রাখে।",
      "শরীরের ওজন নিয়ন্ত্রণে সহায়ক — হালকা ও সহজপাচ্য প্রোটিন সরবরাহ করে।",
      "জিঙ্ক ও সেলেনিয়াম থাকে — শরীরের স্বাভাবিক রোগপ্রতিরোধ ক্ষমতার কাজে গুরুত্বপূর্ণ।",
      "শরীরের হাড় ও দাঁতের স্বাস্থ্য ভালো রাখে — ক্যালসিয়াম ও ফসফরাস সমৃদ্ধ।",
      "স্বাদে অনন্য — দেশি হাঁসের মাংসের নিজস্ব গন্ধ ও স্বাদ খাবারে আলাদা মজাদার অনুভূতি দেয়।"

    ],
    packages: [
      { id: "hs-1k", label: "1 kg", price: 750, oldPrice: 800 },
      { id: "hs-2k", label: "2 kg", price: 1500, oldPrice: 1400},
      { id: "hs-3k", label: "3 kg", price: 2250, oldPrice: 2400},
      { id: "hs-4k", label: "4 kg", price: 3000, oldPrice: 3600},
      { id: "hs-5k", label: "5 kg", price: 3750, oldPrice: 4500,}
    ]
  },
  {
    id: 4,
    name: "Sun-Dried Sajna Leaves",
    banglaName: "প্রাকৃতিক শুকনো সাজনা পাতা",
    category: "leaves",
    categoryName: "Dry Leaves",
    banglaCategory: "শুকনো পাতা ও ভেষজ",
    sku: "BA-SJ-0100",
    image: "images/products/sajnapata.jpeg",
    images: [
      "images/products/sajnapata2.jpeg",
      "images/products/sajnapata.jpeg"
    ],
    rating: 4.8,
    reviewCount: 24,
    isOffer: true,
    shortDescription: "পুষ্টির আধার সাজনা পাতা স্বাস্থ্যসম্মত উপায়ে রোদে শুকিয়ে প্রস্তুত।",
    description: "সাজনা পাতা বিশ্বজুড়ে সুপারফুড হিসেবে পরিচিত। এতে দুধের চেয়ে বেশি ক্যালসিয়াম, কলার চেয়ে বেশি পটাশিয়াম এবং কমলার চেয়ে বহুগুণ ভিটামিন-সি রয়েছে। বারাকাহ এগ্রোর শুকনো সাজনা পাতা সম্পূর্ণ ধুলোবালি মুক্ত পরিচ্ছন্ন পরিবেশে রোদে শুকানো হয়। এটি চা আকারে অথবা ভাতের সাথে মিশিয়ে সহজেই গ্রহণ করা যায়।",
    ingredients: "১০০% বাছাইকৃত তাজা সাজনা পাতা (Dried Moringa Oleifera Leaves)",
    benefits: [
      "উচ্চ রক্তচাপ ও ডায়াবেটিস নিয়ন্ত্রণে সহায়ক",
      "শরীরের দুর্বলতা দূর করে ও শক্তি যোগায়",
      "প্রচুর পরিমাণে ক্যালসিয়াম, আয়রন ও ভিটামিন এ, সি সমৃদ্ধ",
      "শতভাগ প্রাকৃতিক ও অর্গানিক"
    ],
    packages: [
      { id: "sj-250", label: "250 gm packet", price: 375, oldPrice: 415 },
      { id: "sj-500", label: "500 gm packet", price: 620, oldPrice: 750 },
      { id: "sj-1k", label: "1 kg packet", price: 1150, oldPrice: 1500 }
    ]
  },
  {
    id: 5,
    name: "Pure Deshi Cow Milk (10kg)",
    banglaName: "গ্রামবাংলার খাঁটি দেশি গাভীর দুধ – ১০ কেজি 🌾",
    category: "milk",
    categoryName: "Organic Milk",
    banglaCategory: "দেশি গাভীর দুধ",
    sku: "BA-ML-1000",
    image: "images/products/milk.png",
    images: [
      "images/products/milk.png"
    ],
    rating: 4.9,
    reviewCount: 42,
    isOffer: true,
    shortDescription: "গ্রামবাংলার খাঁটি দেশি গাভীর দুধ – ১০ কেজি 🌾",
    description: "গ্রামবাংলার খাঁটি দেশি গাভীর দুধ – ১০ কেজি 🌾 বারাকাহ এগ্রো গ্রামবাংলার চারণভূমিতে ঘাস খাওয়া দেশি গাভীর খাঁটি দুধ সংগ্রহ করে সরাসরি গ্রাহকের কাছে পৌঁছে দেয়। কোনো প্রকার কেমিক্যাল বা প্রিজারভেটিভ ছাড়াই প্রতিদিনের তাজা দুধ সরবরাহ করা হয়। এতে রয়েছে প্রচুর পরিমাণে প্রোটিন, ক্যালসিয়াম, ভিটামিন এবং অন্যান্য পুষ্টিগুণ যা শরীরের জন্য অত্যন্ত উপকারী। “প্রোটিন, ক্যালসিয়াম ও প্রয়োজনীয় পুষ্টি উপাদানে সমৃদ্ধ—প্রতিদিনের সুষম খাদ্যাভ্যাসে খাঁটি দুধ হতে পারে পরিবারের পুষ্টির একটি সহজ ও সুস্বাদু অংশ।” 🥛🤍",
    ingredients: "১০০% দেশি গাভীর দুধ (Pure Deshi Cow Milk)",
    benefits: [
      "🥛 দেশি গাভীর দুধের উপকারিতা",
      "💪 শরীরের জন্য প্রয়োজনীয় প্রোটিনের উৎস — পেশি ও শরীরের গঠন ও রক্ষণাবেক্ষণে সহায়তা করে।",
      "🦴 হাড় ও দাঁতের যত্নে সহায়ক — দুধে থাকা ক্যালসিয়াম ও ফসফরাস হাড় ও দাঁতের স্বাভাবিক গঠনে গুরুত্বপূর্ণ।",
      "🧠 মস্তিষ্কের বিকাশ ও স্মৃতিশক্তি বৃদ্ধিতে সহায়ক — দুধে থাকা ভিটামিন বি১২ ও ওমেগা-৩ ফ্যাটি অ্যাসিড মস্তিষ্কের কার্যকারিতা উন্নত করে।",
      "🫀 হৃদরোগ প্রতিরোধে সহায়ক — দুধে থাকা পটাশিয়াম রক্তচাপ নিয়ন্ত্রণে সাহায্য করে এবং হৃদরোগের ঝুঁকি কমায়।",
      "🛡️ রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করে — দুধে থাকা ভিটামিন এ, সি ও জিঙ্ক শরীরের রোগ প্রতিরোধ ক্ষমতা উন্নত করে।",
      "🫁 হজমশক্তি বৃদ্ধি ও পেটের সমস্যা দূর করে — দুধে থাকা ল্যাকটোজ হজমে সহায়ক এবং অন্ত্রের স্বাস্থ্য উন্নত করে।",
      "🧴 ত্বক ও চুলের স্বাস্থ্য ভালো রাখে — দুধে থাকা ভিটামিন এ ও প্রোটিন ত্বক ও চুলের স্বাস্থ্য উন্নত করে।",
      "🧘 মানসিক স্বাস্থ্যের উন্নতি — দুধে থাকা ট্রিপটোফান মস্তিষ্কে সেরোটোনিন উৎপাদন বৃদ্ধি করে, যা মানসিক স্বাস্থ্যের উন্নতিতে সহায়ক।",
      "🍼 শিশু ও বৃদ্ধদের জন্য অতুলনীয় পুষ্টির উৎস — দুধে থাকা প্রোটিন, ক্যালসিয়াম ও ভিটামিন শিশু ও বৃদ্ধদের জন্য অত্যন্ত গুরুত্বপূর্ণ।"
    ],
    packages: [
      { id: "ml-10kg", label: "10 kg", price: 1000 },
      { id: "ml-15kg", label: "15 kg", price: 1500 },
      { id: "ml-20kg", label: "20 kg", price: 2000 }
    ]
  },
  {
    id: 6,
    name: "Premium Madina Ajwa Dates (500g)",
    banglaName: " Ajwa Premium Dates – Barakah Agro (৫০০ গ্রাম)",
    category: "superfoods",
    categoryName: "Dates & Superfoods",
    banglaCategory: "খেজুর ও সুপারফুড",
    sku: "BA-AJ-0500",
    image: "images/products/khejur.jpeg",
    images: [
      "images/products/khejur2.jpeg",
      "images/products/khejur.jpeg"
    ],
    rating: 5.0,
    reviewCount: 27,
    isOffer: true,
    badge: "stock-out",
    shortDescription: "মদিনার পবিত্র ভূমি থেকে সংগৃহীত প্রিমিয়াম আজওয়া খেজুর",
    description: "Barakah Agro নিয়ে এসেছে সৌদি আরবের পবিত্র নগরী মদিনা থেকে সংগৃহীত Premium Ajwa Dates। স্বতন্ত্র গাঢ় রঙ, কোমল টেক্সচার, প্রাকৃতিক মিষ্টতা ও সমৃদ্ধ স্বাদের জন্য আজওয়া খেজুর সারা বিশ্বে সমাদৃত। Barakah Agro-এর নিজস্ব তত্ত্বাবধানে প্রতিটি ধাপে খেজুরের মান, পরিচ্ছন্নতা ও প্যাকেজিংয়ের প্রতি বিশেষ গুরুত্ব দেওয়া হয়—যাতে আপনি ও আপনার পরিবার উপভোগ করতে পারেন প্রিমিয়াম মানের আজওয়া খেজুর।",
    ingredients: "১০০% প্রাকৃতিক আসল আজওয়া খেজুর (Grade A Ajwa Dates)",
    benefits: [
      "কেন Barakah Agro-এর Ajwa Dates?",
      "মদিনা থেকে সংগৃহীত: সৌদি আরবের মদিনা থেকে সংগৃহীত বাছাইকৃত আজওয়া খেজুর।",
      "Barakah Agro-এর নিজস্ব তত্ত্বাবধান: সংগ্রহ থেকে বাছাই, মান নিয়ন্ত্রণ ও প্যাকেজিং—প্রতিটি ধাপে থাকে আমাদের বিশেষ নজরদারি।",
      "পরিবারের জন্য উপযোগী: প্রতিদিনের খাদ্যতালিকা, ইফতার কিংবা প্রিয়জনকে উপহার—সব ক্ষেত্রেই দারুণ একটি পছন্দ।",
      "প্রাকৃতিক ও স্বাস্থ্যসম্মত: কোনো প্রিজারভেটিভ, কৃত্রিম রঙ বা ফ্লেভার নেই।",
      "উচ্চ পুষ্টিগুণ: প্রাকৃতিক ফাইবার, ভিটামিন ও খনিজ সমৃদ্ধ।",
      "স্বাদে অনন্য: কোমল টেক্সচার, প্রাকৃতিক মিষ্টতা ও সমৃদ্ধ স্বাদের জন্য আজওয়া খেজুর সারা বিশ্বে সমাদৃত।",
      "ঐতিহ্যবাহী ও ধর্মীয় গুরুত্ব: ইসলামী ঐতিহ্যে আজওয়া খেজুরের বিশেষ স্থান রয়েছে।",
      "সতর্কভাবে বাছাই ও প্যাকেজিং: প্রতিটি খেজুরের মান, পরিচ্ছন্নতা ও প্যাকেজিংয়ে Barakah Agro-এর নিজস্ব তত্ত্বাবধান।"
    ],
    packages: [
      { id: "aj-500", label: "500 gm box", price: 680, oldPrice: 780 },
      { id: "aj-1k", label: "1 kg box", price: 1300, oldPrice: 1500 }
    ]
  },
  {
    id: 7,
    name: "খাঁটি দেশি মুরগির মাংস — ঘরোয়া স্বাদের নিশ্চয়তা",
    banglaName: "তাজা দেশি মুরগির মাংস — স্বাদে খাঁটি, পুষ্টিতে ভরপুর!",
    category: "meat",
    categoryName: "Meat",
    banglaCategory: "মাংস",
    sku: "BA-MS-0250",
    image: "images/products/murgi.jpeg",
    images: [
      "images/products/murgi2.jpeg",
      "images/products/murgi.jpeg"
    ],
    rating: 4.9,
    reviewCount: 22,
    isOffer: true,
    shortDescription: "তাজা দেশি মুরগি | স্বাদে অসাধারণ, খাবারে জমবে আসর!",
    description: "গ্রামের চারণভূমিতে ঘাস খাওয়া দেশি মুরগির মাংস। কোনো প্রকার কেমিক্যাল বা প্রিজারভেটিভ ছাড়াই প্রতিদিনের তাজা মুরগি সংগ্রহ করে গ্রাহকের কাছে পৌঁছে দেওয়া হয়। এতে রয়েছে প্রচুর পরিমাণে প্রোটিন, ভিটামিন এবং অন্যান্য পুষ্টিগুণ যা শরীরের জন্য অত্যন্ত উপকারী।",
    ingredients: "১০০% দেশি মুরগির মাংস (Fresh Deshi Chicken Meat)",
    benefits: [
      "দেশি মুরগির মাংসের উপকারিতা",
      "উচ্চমানের প্রোটিনের উৎস — শরীরের পেশি ও কোষ গঠনে সহায়তা করে।",
      "ভিটামিন ও খনিজ সমৃদ্ধ — শরীরের রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করে।",
      "ভিটামিন B-সমৃদ্ধ — শরীরের স্বাভাবিক শক্তি উৎপাদনে ভূমিকা রাখে।",
      "শরীরের ওজন নিয়ন্ত্রণে সহায়ক — হালকা ও সহজপাচ্য প্রোটিন সরবরাহ করে।",
      "জিঙ্ক ও সেলেনিয়াম থাকে — শরীরের স্বাভাবিক রোগপ্রতিরোধ ক্ষমতার কাজে গুরুত্বপূর্ণ।",
      "শরীরের হাড় ও দাঁতের স্বাস্থ্য ভালো রাখে — ক্যালসিয়াম ও ফসফরাস সমৃদ্ধ।",
      "স্বাদে অনন্য — দেশি মুরগির মাংসের নিজস্ব গন্ধ ও স্বাদ খাবারে আলাদা মজাদার অনুভূতি দেয়।"
    ],
    packages: [
      { id: "murgi-250", label: "250 gm", price: 350 },
      { id: "murgi-500", label: "500 gm", price: 600 }
    ]
  },
  {
    id: 9,
    name: "নিজস্ব বাগানের টাটকা লিচু — মিষ্টি স্বাদের নিশ্চয়তা!",
    banglaName: "নিজস্ব বাগানের টাটকা লিচু — মিষ্টি স্বাদের নিশ্চয়তা!",
    category: "fruits",
    categoryName: "Fruits",
    banglaCategory: "ফল",
    sku: "BA-FR-009",
    image: "images/products/lichu.avif",
    images: [
      "images/products/lichu2.jpeg",
      "images/products/lichu.avif"
    ],
    rating: 4.9,
    reviewCount: 42,
    isOffer: true,
    badge: "stock-out",
    shortDescription: "নিজেদের বাগান থেকে যত্নে উৎপাদিত সুমিষ্ট ও রসালো লিচু। প্রতিটি লিচুতে পাবেন প্রাকৃতিক মিষ্টতা, সুগন্ধ আর টাটকা স্বাদের দারুণ সমন্বয়।",
    description: "নিজেদের বাগান থেকে যত্নে উৎপাদিত সুমিষ্ট ও রসালো লিচু। প্রতিটি লিচুতে পাবেন প্রাকৃতিক মিষ্টতা, সুগন্ধ আর টাটকা স্বাদের দারুণ সমন্বয়।",
    ingredients: "১০০% প্রাকৃতিক লিচু (Fresh Lychee)",
    benefits: [
      "কেন Barakah Agro-এর লিচু?",
      "উচ্চ পুষ্টিগুণ — ভিটামিন সি, ফাইবার এবং অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ।",
      "স্বাদে অনন্য — প্রাকৃতিক মিষ্টতা ও সুগন্ধের জন্য লিচু সারা বিশ্বে সমাদৃত।",
      "উপযুক্ত পরিবেশে উৎপাদিত — Barakah Agro-এর নিজস্ব বাগানে যত্নসহকারে চাষ করা।",
      "সতর্কভাবে বাছাই ও প্যাকেজিং — প্রতিটি লিচুর মান, পরিচ্ছন্নতা ও প্যাকেজিংয়ে Barakah Agro-এর নিজস্ব তত্ত্বাবধান।",
      "পরিবারের জন্য উপযোগী — প্রতিদিনের খাদ্যতালিকা, ইফতার কিংবা প্রিয়জনকে উপহার—সব ক্ষেত্রেই দারুণ একটি পছন্দ।",
      "স্বাস্থ্যসম্মত — প্রাকৃতিকভাবে উৎপাদিত ও সতর্কভাবে সংগ্রহ করা, যা স্বাস্থ্যকর খাদ্যাভ্যাসে সহায়ক।",
      "পরিবেশবান্ধব — প্রাকৃতিকভাবে উৎপাদিত, যা পরিবেশের প্রতি যত্নশীল।"
    ],
    packages: [
      { id: "lc-100gm", label: "100 gm", price: 300 },
      { id: "lc-200gm", label: "200 gm", price: 580 },
      { id: "lc-500gm", label: "500 gm", price: 1400 }
    ]
  },
  {
    id: 8,
    name: "হিমসাগর আম — মিষ্টি স্বাদ, ঘ্রাণে ভরপুর! ৳200/kg!",
    banglaName: "হিমসাগর আম — মিষ্টি স্বাদ, ঘ্রাণে ভরপুর! 200৳/kg!",
    category: "fruits",
    categoryName: "Fruits",
    banglaCategory: "ফল",
    sku: "BA-FR-1000",
    image: "images/products/am.jpeg",
    images: [
      "images/products/am3.jpeg",
      "images/products/am2.jpeg",
      "images/products/am.jpeg"
    ],
    rating: 4.9,
    reviewCount: 35,
    isOffer: true,
    badge: "stock-out",
    shortDescription: "প্রাকৃতিকভাবে পাকা, রসালো ও সুস্বাদু হিমসাগর আম—আমপ্রেমীদের অন্যতম পছন্দ। নরম শাঁস, কম আঁশ এবং মিষ্টি স্বাদের কারণে খেতে দারুণ।",
     // ⭐ Stock system
    inStock: false,
    stock: 0,
    description: "হিমসাগর আম বাংলাদেশের অন্যতম জনপ্রিয় আমের জাত। এর স্বতন্ত্র মিষ্টি স্বাদ, কোমল শাঁস এবং কম আঁশের কারণে এটি আমপ্রেমীদের কাছে অত্যন্ত প্রিয়। Barakah Agro-এর হিমসাগর আম প্রাকৃতিকভাবে পাকা এবং সতর্কভাবে সংগ্রহ করা হয়, যাতে এর রসালো স্বাদ ও ঘ্রাণ অক্ষুণ্ণ থাকে। প্রতিটি আম বাছাই করা হয় যাতে গ্রাহকরা সর্বোচ্চ মানের হিমসাগর আম উপভোগ করতে পারেন।",
    ingredients: "১০০% প্রাকৃতিক হিমসাগর আম (Himsagar Mango)",
    benefits: [
      "কেন নেবেন?",
      "প্রাকৃতিকভাবে পাকা ও সতর্কভাবে সংগ্রহ করা হিমসাগর আম",
      "উচ্চ পুষ্টিগুণ — ভিটামিন এ, সি এবং অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ।",
      "স্বাদে অনন্য — কোমল শাঁস, কম আঁশ এবং মিষ্টি স্বাদ।",
      "পরিবারের জন্য উপযোগী — প্রতিদিনের খাদ্যতালিকা, ইফতার কিংবা প্রিয়জনকে উপহার—সব ক্ষেত্রেই দারুণ একটি পছন্দ।",
      "সতর্কভাবে বাছাই ও প্যাকেজিং — প্রতিটি আমের মান, পরিচ্ছন্নতা ও প্যাকেজিংয়ে Barakah Agro-এর নিজস্ব তত্ত্বাবধান।",
      "স্বাস্থ্যসম্মত — প্রাকৃতিকভাবে পাকা ও সতর্কভাবে সংগ্রহ করা, যা স্বাস্থ্যকর খাদ্যাভ্যাসে সহায়ক।",
      "পরিবেশবান্ধব — প্রাকৃতিকভাবে সংগ্রহ করা, যা পরিবেশের প্রতি যত্নশীল।"
    ],
    packages: [
      { id: "am-1kg", label: "1 kg", price: 200 },
      { id: "am-5kg", label: "5 kg", price: 1000 },
      { id: "am-10kg", label: "10 kg", price: 2000 },
      { id: "am-20kg", label: "20 kg", price: 4000 }
    ]
  }
];

window.BARAKAH_PRODUCTS = BARAKAH_PRODUCTS;

// Delivery configuration
const SHIPPING_CONFIG = {
  freeThreshold: 2000,
  insideDhaka: 80,
  outsideDhaka: 130,
  hotline: "01786-239185",
  whatsappNumber: "8801786239185"
};

// Available coupons
const COUPONS = {
  BARAKAH10: { type: "percent", value: 10, minSpend: 1000, label: "১০% ছাড়" },
  PURE100: { type: "fixed", value: 100, minSpend: 1500, label: "৳১০০ ছাড়" }
};

/* ==========================================================================
   CUSTOMER REVIEWS DATABASE (Easily customize or replace photos here)
   Placeholder image files: images/reviews/customer1.png, customer2.png, customer3.png
   You can easily replace images or add more review items below without touching any other logic.
   ========================================================================== */
const CUSTOMER_REVIEWS = [
  {
    id: 1,
    name: "মোহাম্মদ আদনান ইসলাম",
    location: "মিরপুর-১০, ঢাকা",
    rating: 5,
    date: "৩ দিন আগে",
    product: "কাঠের ঘানির খাঁটি সরিষার তেল (৫ লিটার)",
    text: "বারাকাহ এগ্রোর কাঠের ঘানির সরিষার তেল আসলেই অতুলনীয়। তেলের আসল ঝাঁঝ এবং ভর্তা রান্নার সুবাস অসাধারণ। আমি এখন থেকে নিয়মিত গ্রাহক হয়ে গেছি!",
    image: "images/reviews/customer1.png",
    verified: true
  },
  {
    id: 2,
    name: "রফিকুল ইসলাম রুবেল",
    location: "ধানমন্ডি, ঢাকা",
    rating: 5,
    date: "১ সপ্তাহ আগে",
    product: "শুকনো সাজনা পাতা",
    text: "শুকনো সাজনা পাতা অর্ডার করেছিলাম। দুই দিনের মধ্যে ঢাকাতে ক্যাশ অন ডেলিভারি পেয়েছি। মধুর স্বাদ শতভাগ প্রাকৃতিক। ধন্যবাদ বারাকাহ এগ্রো!",
    image: "images/reviews/customer2.png",
    verified: true
  },
  {
    id: 3,
    name: "সাবিহা জান্নাত সুহা",
    location: "জামালপুর, ঢাকা",
    rating: 5,
    date: "২ সপ্তাহ আগে",
    product: "আজওয়া খেজুর",
    text: "বাচ্চাদের জন্য এমন খাঁটি খাবার পেয়ে অনেক নিশ্চিন্ত বোধ করছি। খেজুরগুলো একদম ফ্রেশ ও নরম ছিল। সততার সাথে কাজ চালিয়ে যান।",
    image: "images/reviews/customer3.png",
    verified: true
  },
  {
    id: 4,
    name: "মাসুমা রুমি",
    location: "গুলশান, ঢাকা",
    rating: 5,
    date: "৪ দিন আগে",
    product: "দেশি হাঁসের মাংস ও সরিষার তেল",
    text: "গ্রামের আসল দেশি হাঁসের মাংসের স্বাদ পেলাম অনেক দিন পর! প্যাকেজিং খুবই হাইজিনিক এবং সার্ভিস অত্যন্ত দ্রুত। বারাকাহ এগ্রোর পণ্যের কোয়ালিটি সত্যিই প্রিমিয়াম।",
    image: "images/reviews/customerrumi.jpeg",
    verified: true
  },
  {
    id: 5,
    name: "সালমা চৌধুরী",
    location: "বনশ্রী, ঢাকা",
    rating: 5,
    date: "৫ দিন আগে",
    product: "প্রাকৃতিক শুকনো পাট পাতা",
    text: "শুকনো পাট পাতা দিয়ে ঐতিহ্যবাহী রান্না করেছিলাম, স্বাদ ছিল দারুণ। একদম পরিচ্ছন্ন ও ধুলোবালিমুক্ত। পরিবারের সবাই খুব পছন্দ করেছে।",
    image: "images/reviews/customersalma.jpeg",
    verified: true
  },
  {
    id: 6,
    name: "মাহবুবুর রহমান",
    location: "আগ্রাবাদ, চট্টগ্রাম",
    rating: 5,
    date: "১ সপ্তাহ আগে",
    product: "গ্রামবাংলার খাঁটি দেশি গাভীর দুধ",
    text: "চট্টগ্রামেও এত দ্রুত ও নিরাপদে ডেলিভারি পাব ভাবিনি। দুধের মান ১০০% খাঁটি, কোনো ভেজাল নেই। এমন বিশ্বস্ত এগ্রো প্রতিষ্ঠানের প্রসার হওয়া দরকার।",
    image: "images/reviews/customermahbubur.jpeg",
    verified: true
  }
];

window.CUSTOMER_REVIEWS = CUSTOMER_REVIEWS;

/* ==========================================================================
   FEATURED CATEGORIES METADATA
   Working directly with existing categories and URL parameters
   ========================================================================== */
const FEATURED_CATEGORIES = [
  {
    id: "mustard-oil",
    name: "সরিষার তেল",
    enName: "Mustard Oil",
    desc: "১০০% খাঁটি ও কোল্ড প্রেসড",
    image: "images/products/sorisa5liter.png",
    url: "products.html?category=mustard-oil"
  },
  {
    id: "milk",
    name: "দেশি গরুর দুধ",
    enName: "Pure Cow Milk",
    desc: "প্রাকৃতিক সুষম পুষ্টি",
    image: "images/products/milk.png",
    url: "products.html?category=milk"
  },
  {
    id: "meat",
    name: "দেশি হাঁস ও মুরগি",
    enName: "Organic Meat",
    badge: "ঘাস খাওয়া",
    desc: "১০০% হালাল ও তাজা",
    image: "images/products/has.jpeg",
    url: "products.html?category=meat"
  },
  {
    id: "leaves",
    name: "শুকনো পাতা ও ভেষজ",
    enName: "Leaves & Herbs",
    desc: "পাট ও সাজনা পাতা",
    image: "images/products/patpata.jpeg",
    url: "products.html?category=leaves"
  },
  {
    id: "superfoods",
    name: "খেজুর ও সুপারফুড",
    enName: "Dates & Superfoods",
    badge: "মদিনার আজওয়া",
    desc: "প্রিমিয়াম কোয়ালিটি",
    image: "images/products/khejur.jpeg",
    url: "products.html?category=superfoods"
  },
  {
    id: "fruits",
    name: "তাজা ফল",
    enName: "Fresh Fruits",
    badge: "মিষ্টি ও রসালো",
    desc: "হিমসাগর আম ও লিচু",
    image: "images/products/am.jpeg",
    url: "products.html?category=fruits"
  }
];


// --------------------------------------------------------------------------
// 2. SHOPPING CART (LOCALSTORAGE)
// --------------------------------------------------------------------------
function getCart() {
  try {
    const cart = localStorage.getItem("barakah_cart");
    return cart ? JSON.parse(cart) : [];
  } catch (e) {
    console.error("Cart read error:", e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem("barakah_cart", JSON.stringify(cart));
    updateCartCount();
  } catch (e) {
    console.error("Cart save error:", e);
  }
}

function addToCart(productId, packageId, quantity = 1) {
  const product = BARAKAH_PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const pkg = product.packages.find((p) => p.id === packageId) || product.packages[0];
  const cart = getCart();

  // Check if item with same productId and packageId already in cart
  const existingIdx = cart.findIndex(
    (item) => item.productId === productId && item.packageId === pkg.id
  );

  if (existingIdx !== -1) {
    cart[existingIdx].quantity += quantity;
  } else {
    cart.push({
      productId: product.id,
      packageId: pkg.id,
      name: product.name,
      banglaName: product.banglaName,
      packageLabel: pkg.label,
      price: pkg.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart(cart);
  showToast(`${product.banglaName} কার্টে যোগ হয়েছে!`);
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll(".cart-count");
  badges.forEach((badge) => {
    badge.textContent = count;
    badge.classList.add("bump");
    setTimeout(() => badge.classList.remove("bump"), 200);
  });
}

function removeCartItem(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    const removed = cart.splice(index, 1);
    saveCart(cart);
    if (removed[0]) {
      showToast(`${removed[0].banglaName} কার্ট থেকে সরানো হয়েছে`);
    }
  }
  // If on cart page, re-render
  if (typeof renderCartPage === "function") {
    renderCartPage();
  }
  if (typeof renderCheckoutSummary === "function") {
    renderCheckoutSummary();
  }
}

function updateCartQty(index, delta) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart(cart);
  }
  if (typeof renderCartPage === "function") {
    renderCartPage();
  }
  if (typeof renderCheckoutSummary === "function") {
    renderCheckoutSummary();
  }
}

// --------------------------------------------------------------------------
// 3. TOAST NOTIFICATIONS
// --------------------------------------------------------------------------
let toastTimer;
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.innerHTML = '<span class="toast-dot"></span><span id="toastMsg"></span>';
    document.body.appendChild(toast);
  }

  const toastMsg = document.getElementById("toastMsg");
  if (toastMsg) toastMsg.textContent = message;

  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// --------------------------------------------------------------------------
// 4. PRODUCT CARDS HTML BUILDER
// --------------------------------------------------------------------------
function createProductCardHTML(product) {
  const initialPkg = product.packages[0];

  const packagesHTML = product.packages
    .map(
      (pkg, idx) => `
      <button
        type="button"
        class="pkg-chip ${idx === 0 ? "active" : ""}"
        data-product-id="${product.id}"
        data-pkg-id="${pkg.id}"
        data-price="${pkg.price}"
        data-old-price="${pkg.oldPrice || ""}"
        data-label="${pkg.label}">
        ${pkg.label}
      </button>
    `
    )
    .join("");

  const isStockOut = product.badge === "stock-out" || product.inStock === false;

  return `
    <div class="product-card" data-product-id="${product.id}" data-selected-pkg="${initialPkg.id}">
      <div class="product-badge-wrap">

        ${isStockOut ? `<span class="badge-stock-out">Stock Out</span>` : `<span class="badge-best">${product.badge || "In Stock"}</span>`}
      </div>

      <div class="product-image-box" onclick="window.location.href='product-details.html?id=${product.id}'" title="${product.banglaName} বিস্তারিত দেখুন">
        <img src="${product.image}" alt="${product.banglaName}" class="product-img" loading="lazy">
      </div>

      <div class="product-content">
        <div class="product-meta-row">
          <span class="product-category-name">${product.banglaCategory}</span>
          <div class="product-rating">
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>${product.rating}</span>
            <span class="product-rating-count">(${product.reviewCount})</span>
          </div>
        </div>

        <h3 class="product-title" onclick="window.location.href='product-details.html?id=${product.id}'">${product.banglaName}</h3>
        <p class="product-short-desc">${product.shortDescription}</p>

        <div class="product-package-select">
          <span class="package-label">সাইজ / প্যাকেজ:</span>
          <div class="package-options">${packagesHTML}</div>
        </div>

        <div class="product-card-footer">
          <div class="price-box">
            <span class="price-current card-price">৳ ${initialPkg.price}</span>
            ${initialPkg.oldPrice ? `<span class="price-old card-old-price">৳ ${initialPkg.oldPrice}</span>` : ""}
          </div>
          <div class="card-actions">
            <button class="btn btn-accent btn-sm" onclick="buyCardItemNow(${product.id}, this)" title="Order Now">
              Order Now
            </button>
            
            <a href="product-details.html?id=${product.id}" class="btn btn-outline btn-sm" title="View Details">
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Handle clicking package chips inside product card
document.addEventListener("click", function (e) {
  const chip = e.target.closest(".pkg-chip");
  if (!chip) return;

  const card = chip.closest(".product-card");
  if (!card) return;

  const pkgId = chip.getAttribute("data-pkg-id");
  const price = chip.getAttribute("data-price");
  const oldPrice = chip.getAttribute("data-old-price");

  // Update active chip
  card.querySelectorAll(".pkg-chip").forEach((c) => c.classList.remove("active"));
  chip.classList.add("active");

  // Update card selected package attribute
  card.setAttribute("data-selected-pkg", pkgId);

  // Update prices on card
  const priceEl = card.querySelector(".card-price");
  if (priceEl) priceEl.textContent = ` ${price}৳`;

  const oldPriceEl = card.querySelector(".card-old-price");
  if (oldPriceEl) {
    if (oldPrice) {
      oldPriceEl.textContent = `${oldPrice}৳`;
      oldPriceEl.style.display = "inline";
    } else {
      oldPriceEl.style.display = "none";
    }
  }
});

function handleCardAddToCart(productId, button) {
  const card = button.closest(".product-card");
  const selectedPkgId = card ? card.getAttribute("data-selected-pkg") : null;
  addToCart(productId, selectedPkgId, 1);

  // Button feedback animation
  const origText = button.textContent;
  button.textContent = "Added to Cart ✓";
  button.classList.add("btn-accent");
  setTimeout(() => {
    button.textContent = origText;
    button.classList.remove("btn-accent");
  }, 1200);
}

// --------------------------------------------------------------------------
// 5. PRODUCT DETAILS MODAL (POPUP)
// --------------------------------------------------------------------------
function openProductModal(productId) {
  const product = BARAKAH_PRODUCTS.find((p) => p.id === productId);
  if (!product) return;
  currentProductImages = product.images?.length
  ? product.images
  : [product.image];

currentProductImageIndex = 0;

  let modalOverlay = document.getElementById("productModal");
  if (!modalOverlay) {
    modalOverlay = document.createElement("div");
    modalOverlay.id = "productModal";
    modalOverlay.className = "modal-overlay";
    document.body.appendChild(modalOverlay);
  }

  const initialPkg = product.packages[0];

  const packagesOptions = product.packages
    .map(
      (pkg, idx) => `
      <button
        type="button"
        class="pkg-chip modal-pkg-chip ${idx === 0 ? "active" : ""}"
        data-pkg-id="${pkg.id}"
        data-price="${pkg.price}"
        data-old-price="${pkg.oldPrice || ""}">
        ${pkg.label}
      </button>
    `
    )
    .join("");

  const benefitsList = product.benefits
    .map(
      (b) => `
      <li>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${b}</span>
      </li>
    `
    )
    .join("");

  // Customer reviews for modal (filtered or top authentic reviews)
  const productReviews = CUSTOMER_REVIEWS.filter(r => r.product.includes(product.banglaCategory) || r.product.includes(product.name)).concat(CUSTOMER_REVIEWS).slice(0, 2);
  const modalReviewsHTML = productReviews.map(r => `
    <div class="modal-review-card">
      <div class="modal-review-author">
        <span><strong>${r.name}</strong> <small style="color: #64748b;">(${r.location})</small></span>
        <span class="verified-customer-tag">✓ ভেরিফাইড ক্রেতা</span>
      </div>
      <div style="color: #f59e0b; font-size: 0.82rem; margin-bottom: 4px;">★★★★★</div>
      <p class="modal-review-comment">“${r.text}”</p>
    </div>
  `).join("");

  // Related products from same category or catalog
  const relatedProducts = BARAKAH_PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || Math.random() > 0.3)).slice(0, 2);
  const relatedProductsHTML = relatedProducts.map(p => `
    <div class="modal-related-item" onclick="window.location.href='product-details.html?id=${p.id}'" title="${p.banglaName} বিস্তারিত দেখুন">
      <img src="${p.image}" alt="${p.banglaName}" class="modal-related-thumb">
      <div>
        <h5 style="font-size: 0.85rem; font-weight: 700; color: #1e293b; margin: 0;">${p.banglaName}</h5>
        <span style="font-size: 0.82rem; font-weight: 800; color: #c2782b;">৳ ${p.packages[0].price}</span>
      </div>
    </div>
  `).join("");

  modalOverlay.innerHTML = `
    <div class="modal-container">
      <button class="modal-close-btn" onclick="closeProductModal()" aria-label="Close modal">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div class="modal-grid" data-modal-product-id="${product.id}" data-selected-pkg="${initialPkg.id}">
        <div class="modal-img-wrap">
          <button
              type="button"
              class="gallery-btn gallery-prev"
              onclick="changeProductImage(-1)"
              title="Previous image"
          >
              ❮
          </button>

          <img
              src="${product.images ? product.images[0] : product.image}"
              alt="${product.banglaName}"
              id="modalProductImg"
          >

          <button
              type="button"
              class="gallery-btn gallery-next"
              onclick="changeProductImage(1)"
              title="Next image"
          >
              ❯
          </button>
        </div>

        <div class="modal-details">
          <span class="product-category-name">${product.banglaCategory}</span>
          <h2 class="modal-title">${product.banglaName}</h2>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 8px;">${product.name} (SKU: ${product.sku})</p>

          <div class="modal-price-box">
            <span class="modal-price-current" id="modalPrice">৳ ${initialPkg.price}</span>
            <span class="modal-price-old" id="modalOldPrice">${initialPkg.oldPrice ? `৳ ${initialPkg.oldPrice}` : ""}</span>
          </div>

          <p class="modal-desc">${product.description}</p>

          <div style="margin-bottom: 16px;">
            <strong style="font-size: 0.88rem; color: #1e293b; display: block; margin-bottom: 6px;">প্যাকেজ সাইজ নির্বাচন করুন:</strong>
            <div class="package-options" id="modalPkgOptions">${packagesOptions}</div>
          </div>

          <!-- 1. BENEFITS SECTION -->
          <strong style="font-size: 0.88rem; color: #1e293b; display: block; margin-bottom: 6px;">উপকারিতা ও বৈশিষ্ট্য:</strong>
          <ul class="modal-benefits-list">${benefitsList}</ul>

          <!-- 2. CUSTOMER REVIEWS SECTION -->
          <div class="modal-reviews-section">
            <div class="modal-section-heading">
              <span>সম্মানিত গ্রাহকদের রিভিউ (${product.reviewCount}টি)</span>
              <span style="color: #eab308; font-size: 0.9rem; font-weight: 700;">★ ${product.rating}</span>
            </div>
            ${modalReviewsHTML}
          </div>

          <!-- 3. RELATED PRODUCTS SECTION -->
          ${relatedProducts.length > 0 ? `
          <div class="modal-reviews-section" style="border-top: 1px solid #e2e8f0; margin-top: 18px; padding-top: 16px;">
            <div class="modal-section-heading">
              <span>সম্পর্কিত পণ্যসমূহ</span>
            </div>
            <div class="modal-related-grid">
              ${relatedProductsHTML}
            </div>
          </div>
          ` : ""}

          <div style="margin-top: 14px;">
            <a href="product-details.html?id=${product.id}" class="btn btn-outline btn-sm" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 10px 14px; text-decoration: none; font-weight: 600;">
              <span>সম্পূর্ণ বিস্তারিত ও গ্রাহকদের রিভিউ দেখুন</span>
              <span style="font-size: 1.1rem; line-height: 1;">➔</span>
            </a>
          </div>

          <!-- PURCHASE ACTIONS -->
          <div class="modal-actions-bar">
            <div class="qty-control">
              <button class="qty-btn" type="button" onclick="adjustModalQty(-1)">-</button>
              <input type="text" id="modalQtyInput" class="qty-input" value="1" readonly>
              <button class="qty-btn" type="button" onclick="adjustModalQty(1)">+</button>
            </div>
            <button class="btn btn-primary btn-lg modal-add-btn" onclick="addModalItemToCart()">
              কার্টে যোগ করুন
            </button>
            <a href="checkout.html" class="btn btn-accent btn-lg modal-buy-btn" onclick="buyModalItemNow()">
              এখনই কিনুন
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";

  // Modal Package Click listener
  const modalGrid = modalOverlay.querySelector(".modal-grid");
  const modalChips = modalOverlay.querySelectorAll(".modal-pkg-chip");
  modalChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      modalChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const pkgId = chip.getAttribute("data-pkg-id");
      const price = chip.getAttribute("data-price");
      const oldPrice = chip.getAttribute("data-old-price");

      modalGrid.setAttribute("data-selected-pkg", pkgId);
      document.getElementById("modalPrice").textContent = `৳ ${price}`;
      const oldPriceEl = document.getElementById("modalOldPrice");
      if (oldPriceEl) {
        oldPriceEl.textContent = oldPrice ? `৳ ${oldPrice}` : "";
      }
    });
  });
}
// --------------------------------------------------------------------------
// 6. PRODUCT IMAGE GALLERY LOGIC
let currentProductImages = [];
let currentProductImageIndex = 0;

window.changeProductImage = function(direction) {
    if (currentProductImages.length <= 1) return;

    currentProductImageIndex += direction;

    if (currentProductImageIndex < 0) {
        currentProductImageIndex = currentProductImages.length - 1;
    }

    if (currentProductImageIndex >= currentProductImages.length) {
        currentProductImageIndex = 0;
    }

    const mainImage = document.getElementById("modalProductImg");

    if (mainImage) {
        mainImage.src = currentProductImages[currentProductImageIndex];
    }
};




function closeProductModal() {
  const modal = document.getElementById("productModal");
  if (modal) {
    modal.classList.remove("open");
  }
  document.body.style.overflow = "";
}

function adjustModalQty(delta) {
  const input = document.getElementById("modalQtyInput");
  if (!input) return;
  let val = parseInt(input.value) || 1;
  val += delta;
  if (val < 1) val = 1;
  input.value = val;
}

function addModalItemToCart() {
  const modalGrid = document.querySelector(".modal-grid");
  if (!modalGrid) return;
  const productId = parseInt(modalGrid.getAttribute("data-modal-product-id"));
  const packageId = modalGrid.getAttribute("data-selected-pkg");
  const qtyInput = document.getElementById("modalQtyInput");
  const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

  addToCart(productId, packageId, qty);
  closeProductModal();
}

function buyModalItemNow() {
  const modalGrid = document.querySelector(".modal-grid");
  if (!modalGrid) return;
  const productId = parseInt(modalGrid.getAttribute("data-modal-product-id"));
  const packageId = modalGrid.getAttribute("data-selected-pkg");
  const qtyInput = document.getElementById("modalQtyInput");
  const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

  addToCart(productId, packageId, qty);
  closeProductModal();
}
function buyCardItemNow(productId, button) {
  const card = button.closest(".product-card");

  if (!card) return;

  const packageId = card.getAttribute("data-selected-pkg");

  addToCart(productId, packageId, 1);

  window.location.href = "checkout.html";
}

// Close modal when clicking on backdrop
document.addEventListener("click", function (e) {
  const modal = document.getElementById("productModal");
  if (modal && e.target === modal) {
    closeProductModal();
  }
});

// Close modal on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeProductModal();
  }
});

// --------------------------------------------------------------------------
// 6. CART PAGE LOGIC (cart.html)
// --------------------------------------------------------------------------
let appliedCouponCode = null;

function renderCartPage() {
  const container = document.getElementById("cartItemsContainer");
  const emptyState = document.getElementById("cartEmptyState");
  const cartLayout = document.getElementById("cartLayout");
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    if (cartLayout) cartLayout.style.display = "none";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (cartLayout) cartLayout.style.display = "grid";
  if (emptyState) emptyState.style.display = "none";

  let html = "";
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    html += `
      <div class="cart-item-row">
        <img src="${item.image}" alt="${item.banglaName}" class="cart-item-thumb">
        <div class="cart-item-info">
          <h4>${item.banglaName}</h4>
          <span class="cart-item-package">${item.packageLabel}</span>
          <p style="font-size: 0.85rem; color: #64748b;">৳ ${item.price} প্রতি ইউনিট</p>
        </div>
        <div class="qty-control">
          <button class="qty-btn" onclick="updateCartQty(${index}, -1)">-</button>
          <input type="text" class="qty-input" value="${item.quantity}" readonly>
          <button class="qty-btn" onclick="updateCartQty(${index}, 1)">+</button>
        </div>
        <div class="cart-item-total">
          ৳ ${itemTotal}
        </div>
        <button class="btn-remove" onclick="removeCartItem(${index})" title="আইটেম মুছুন">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
  calculateAndRenderTotals();
}

function calculateAndRenderTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Delivery calculation
  const deliveryRadios = document.getElementsByName("deliveryLocation");
  let location = "inside";
  for (const r of deliveryRadios) {
    if (r.checked) location = r.value;
  }

  let deliveryFee = location === "outside" ? SHIPPING_CONFIG.outsideDhaka : SHIPPING_CONFIG.insideDhaka;
  if (subtotal >= SHIPPING_CONFIG.freeThreshold) {
    deliveryFee = 0;
  }

  // Coupon Discount calculation
  let discountAmount = 0;
  if (appliedCouponCode && COUPONS[appliedCouponCode]) {
    const c = COUPONS[appliedCouponCode];
    if (subtotal >= c.minSpend) {
      if (c.type === "percent") {
        discountAmount = Math.round((subtotal * c.value) / 100);
      } else {
        discountAmount = c.value;
      }
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  // Update elements
  const subtotalEl = document.getElementById("summarySubtotal");
  const deliveryEl = document.getElementById("summaryDelivery");
  const discountRow = document.getElementById("summaryDiscountRow");
  const discountEl = document.getElementById("summaryDiscount");
  const totalEl = document.getElementById("summaryGrandTotal");

  if (subtotalEl) subtotalEl.textContent = `৳ ${subtotal}`;
  if (deliveryEl) {
    if (deliveryFee === 0 && subtotal >= SHIPPING_CONFIG.freeThreshold) {
      deliveryEl.innerHTML = '<span class="free-delivery-badge">ফ্রি ডেলিভারি!</span>';
    } else {
      deliveryEl.textContent = `৳ ${deliveryFee}`;
    }
  }

  if (discountRow && discountEl) {
    if (discountAmount > 0) {
      discountRow.style.display = "flex";
      discountEl.textContent = `- ৳ ${discountAmount}`;
    } else {
      discountRow.style.display = "none";
    }
  }

  if (totalEl) totalEl.textContent = `৳ ${grandTotal}`;
}

function applyCoupon() {
  const input = document.getElementById("couponInput");
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (COUPONS[code]) {
    const coupon = COUPONS[code];
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (subtotal < coupon.minSpend) {
      showToast(`এই কুপন ব্যবহারের জন্য সর্বনিম্ন ৳ ${coupon.minSpend} টাকার অর্ডার করতে হবে`);
      return;
    }

    appliedCouponCode = code;
    showToast(`কুপন '${code}' সফলভাবে যুক্ত হয়েছে!`);
    calculateAndRenderTotals();
  } else {
    showToast("ভুল বা অকার্যকর কুপন কোড!");
  }
}

// --------------------------------------------------------------------------
// 7. CHECKOUT PAGE LOGIC & WHATSAPP GENERATOR (checkout.html)
// --------------------------------------------------------------------------
function renderCheckoutSummary() {
  const container = document.getElementById("checkoutItemsList");
  if (!container) return;

  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = '<p style="color: #64748b; padding: 12px 0;">আপনার কার্ট খালি। <a href="products.html" style="color: #166534; font-weight: 700;">পণ্য দেখুন</a></p>';
    return;
  }

  let html = "";
  cart.forEach((item) => {
    html += `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 0.92rem;">
        <div>
          <strong style="color: #1e293b;">${item.banglaName}</strong>
          <span style="display: block; font-size: 0.8rem; color: #64748b;">${item.packageLabel} × ${item.quantity}</span>
        </div>
        <span style="font-weight: 700; color: #166534;">৳ ${item.price * item.quantity}</span>
      </div>
    `;
  });

  container.innerHTML = html;
  calculateAndRenderTotals();
}

async function handleCheckoutSubmit(e) {
  if (e) e.preventDefault();

  const name = document.getElementById("custName")?.value.trim();
  const phone = document.getElementById("custPhone")?.value.trim();
  const district = document.getElementById("custDistrict")?.value.trim();
  const address = document.getElementById("custAddress")?.value.trim();
  const note = document.getElementById("custNote")?.value.trim() || "কোনো বিশেষ নোট নেই";

  if (!name || !phone || !district || !address) {
    showToast("অনুগ্রহ করে আপনার নাম, ফোন নম্বর, জেলা ও ঠিকানা পূরণ করুন।");
    return;
  }

  const cart = getCart();
  if (cart.length === 0) {
    showToast("আপনার কার্ট খালি! অনুগ্রহ করে পণ্য যুক্ত করুন।");
    return;
  }

  let location = "inside";
  document.querySelectorAll('input[name="deliveryLocation"]').forEach(r => { if (r.checked) location = r.value; });
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let deliveryFee = location === "outside" ? SHIPPING_CONFIG.outsideDhaka : SHIPPING_CONFIG.insideDhaka;
  if (subtotal >= SHIPPING_CONFIG.freeThreshold) deliveryFee = 0;

  let discountAmount = 0;
  if (appliedCouponCode && COUPONS[appliedCouponCode]) {
    const coupon = COUPONS[appliedCouponCode];
    if (subtotal >= coupon.minSpend) {
      discountAmount = coupon.type === "percent"
        ? Math.round((subtotal * coupon.value) / 100)
        : coupon.value;
    }
  }
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const payload = {
    customer: { name, phone, district, address },
    note, deliveryLocation: location, items: cart,
    subtotal, discount: discountAmount, deliveryFee, total: grandTotal,
    paymentMethod: "Cash on Delivery"
  };

  const submitButton = document.querySelector('#checkoutForm button[type="submit"]');
  if (submitButton) { submitButton.disabled = true; submitButton.textContent = "অর্ডার সংরক্ষণ হচ্ছে..."; }

  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Order save failed");

    showOrderSuccessModal(data.order.id, name, phone, address);
    localStorage.removeItem("barakah_cart");
    updateCartCount();
  } catch (error) {
    console.error("Order submit error:", error);
    showToast("অর্ডার সংরক্ষণ করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
  } finally {
    if (submitButton) { submitButton.disabled = false; submitButton.textContent = "অর্ডার নিশ্চিত করুন (Cash on Delivery)"; }
  }
}

function orderViaWhatsApp() {
  const name = document.getElementById("custName")?.value.trim();
  const phone = document.getElementById("custPhone")?.value.trim();
  const district = document.getElementById("custDistrict")?.value.trim();
  const address = document.getElementById("custAddress")?.value.trim();
  const note = document.getElementById("custNote")?.value.trim() || "নেই";

  if (!name || !phone || !district || !address) {
    showToast("অনুগ্রহ করে আপনার নাম, ফোন নম্বর ও সম্পূর্ণ ঠিকানা লিখুন।");
    return;
  }

  const cart = getCart();
  if (cart.length === 0) {
    showToast("আপনার কার্ট খালি!");
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deliveryRadios = document.getElementsByName("deliveryLocation");
  let location = "inside";
  for (const r of deliveryRadios) {
    if (r.checked) location = r.value;
  }

  let deliveryFee = location === "outside" ? SHIPPING_CONFIG.outsideDhaka : SHIPPING_CONFIG.insideDhaka;
  if (subtotal >= SHIPPING_CONFIG.freeThreshold) deliveryFee = 0;

  const total = subtotal + deliveryFee;

  let itemsText = "";
  cart.forEach((item, idx) => {
    itemsText += `${idx + 1}. ${item.banglaName} (${item.packageLabel}) - পরিমাণ: ${item.quantity}টি - মূল্য: ৳${item.price * item.quantity}\n`;
  });

  const message = `🌿 *নতুন অর্ডার - বারাকাহ এগ্রো* 🌿
------------------------------
👤 *গ্রাহকের নাম:* ${name}
📞 *মোবাইল:* ${phone}
📍 *জেলা:* ${district}
🏠 *ঠিকানা:* ${address}
📝 *ডেলিভারি নোট:* ${note}
------------------------------
📦 *অর্ডারকৃত পণ্যসমূহ:*
${itemsText}------------------------------
💵 *সাবটোটাল:* ৳${subtotal}
🚚 *ডেলিভারি চার্জ:* ৳${deliveryFee} ${deliveryFee === 0 ? "(ফ্রি ডেলিভারি)" : ""}
💰 *সর্বমোট প্রদেয় বিল:* ৳${total}
------------------------------
পেমেন্ট মেথড: ক্যাশ অন ডেলিভারি (Cash on Delivery)
অনুগ্রহ করে দ্রুত অর্ডারটি কনফার্ম করুন। ধন্যবাদ!`;

  const encodedMsg = encodeURIComponent(message);
  const waURL = `https://wa.me/${SHIPPING_CONFIG.whatsappNumber}?text=${encodedMsg}`;
  window.open(waURL, "_blank");

  // Clear cart and show notification
  localStorage.removeItem("barakah_cart");
  updateCartCount();
  showToast("হোয়াটসঅ্যাপে আপনার অর্ডারের তথ্য পাঠানো হয়েছে!");
}

function showOrderSuccessModal(orderId, name, phone, address) {
  let modal = document.getElementById("orderSuccessModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "orderSuccessModal";
    modal.className = "modal-overlay";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-container" style="max-width: 500px; text-align: center; padding: 40px 28px;">
      <div style="width: 70px; height: 70px; border-radius: 50%; background: #dcfce7; color: #166534; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <h2 style="font-size: 1.6rem; font-weight: 800; color: #166534; margin-bottom: 8px;">অর্ডার সফলভাবে সম্পন্ন হয়েছে!</h2>
      <p style="font-size: 0.95rem; color: #475569; margin-bottom: 18px;">
        ধন্যবাদ <strong style="color: #1e293b;">${name}</strong>। আপনার অর্ডার আইডি: <strong style="color: #c2782b;">${orderId}</strong>
      </p>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; text-align: left; font-size: 0.88rem; color: #334155; margin-bottom: 24px;">
        <p><strong>মোবাইল:</strong> ${phone}</p>
        <p><strong>ঠিকানা:</strong> ${address}</p>
        <p><strong>পেমেন্ট:</strong> ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে টাকা পরিশোধ করুন)</p>
      </div>
      <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 24px;">
        আমাদের প্রতিনিধি খুব শীঘ্রই কল করে আপনার অর্ডারটি কনফার্ম করবেন এবং দ্রুত ডেলিভারি সম্পন্ন করবেন।
      </p>
      <a href="index.html" class="btn btn-primary" style="width: 100%;">
        হোমে ফিরে যান
      </a>
    </div>
  `;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

// --------------------------------------------------------------------------
// 8. GLOBAL INITIALIZATION (DOM CONTENT LOADED)
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  // Update cart badge across all pages
  updateCartCount();

  // Mobile Hamburger Toggle
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navLinks = document.getElementById("navLinks");
  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle("open");
      hamburgerBtn.classList.toggle("is-active", isOpen);
      hamburgerBtn.setAttribute("aria-expanded", isOpen);
    });

    // Close when clicking nav links
    navLinks.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        hamburgerBtn.classList.remove("is-active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      });
    });

    // Close when clicking anywhere outside
    document.addEventListener("click", function (e) {
      if (navLinks.classList.contains("open") && !navLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        navLinks.classList.remove("open");
        hamburgerBtn.classList.remove("is-active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Delivery radio listeners
  const deliveryRadios = document.getElementsByName("deliveryLocation");
  deliveryRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      calculateAndRenderTotals();
    });
  });

  // Render Homepage Featured Products if on index.html
  const homeProductsContainer = document.getElementById("featuredProductsGrid");
  if (homeProductsContainer) {
    // Show 4 featured bestsellers on homepage
    const featured = BARAKAH_PRODUCTS.slice(0, 4);
    homeProductsContainer.innerHTML = featured.map((p) => createProductCardHTML(p)).join("");
  }

  // Render Full Products Catalog if on products.html
const allProductsContainer = document.getElementById("allProductsGrid");

if (allProductsContainer) {

  // Get category from URL
  const urlParams = new URLSearchParams(window.location.search);
  const urlCategory = urlParams.get("category");

  // Show selected category or all products
  renderProductsCatalog(urlCategory || "all");

  // Category Filter tabs
  const catTabs = document.querySelectorAll(".cat-tab");

  catTabs.forEach((tab) => {

    const category = tab.getAttribute("data-category");

    // Make the matching tab active
    if (category === (urlCategory || "all")) {
      tab.classList.add("active");
    }

    tab.addEventListener("click", function () {

      catTabs.forEach((t) => t.classList.remove("active"));

      tab.classList.add("active");

      const selectedCategory = tab.getAttribute("data-category");

      renderProductsCatalog(selectedCategory);

      // Change URL without reloading page
      if (selectedCategory === "all") {
        window.history.replaceState({}, "", "products.html");
      } else {
        window.history.replaceState(
          {},
          "",
          `products.html?category=${selectedCategory}`
        );
      }

    });

  });

}

function renderProductsCatalog(category) {
  if (!allProductsContainer) return;

  let list = BARAKAH_PRODUCTS;

  if (category && category !== "all") {
    list = BARAKAH_PRODUCTS.filter(
      (p) => p.category === category
    );
  }

  allProductsContainer.innerHTML = list
    .map((p) => createProductCardHTML(p))
    .join("");
}

  // If on cart page
  if (document.getElementById("cartItemsContainer")) {
    renderCartPage();
  }

  // If on checkout page
  if (document.getElementById("checkoutItemsList")) {
    renderCheckoutSummary();
  }

  // If on product details page
  if (document.getElementById("productDetailsContainer")) {
    initProductDetailsPage();
  }

  // Initialize Redesigned Homepage Features
  renderHomeHeroSlider();
  renderFeaturedCategories();
  renderHomeProductCarousels();
  renderCustomerReviewsCarousel();
  initLiveSearch();
  updateCustomerAccountUI();
});

// ==========================================================================
// 9. HOMEPAGE HERO SLIDER
// ==========================================================================
function renderHomeHeroSlider() {
  const slider = document.getElementById("heroSlider");
  if (!slider) return;

  const slidesData = [
    {
      image: "images/hero.jpg",
      badge: "🌿 ১০০% খাঁটি ও অর্গানিক পণ্যের বিশ্বস্ত প্রতিষ্ঠান",
      title: "বিশুদ্ধ খাবার, সুস্থ জীবনের প্রতিশ্রুতি",
      desc: "খাঁটি ও মানসম্মত খাবারের নিশ্চয়তায়, যত্নসহকারে সংগ্রহ ও প্রস্তুত করা পণ্য পৌঁছে দিচ্ছি আপনার ঘরে। আপনার পরিবারের প্রতিদিনের খাবারে থাকুক প্রকৃতির স্বাদ ও বিশুদ্ধতার ছোঁয়া।",
      btnText: "View Products",
      btnLink: "products.html",
      btnSecText: "Our Story",
      btnSecLink: "about.html"
    },
    {
      image: "images/products/sorisa5liter.png",
      badge: "🔥 মাঘী সরিষা থেকে প্রস্তুত প্রাকৃতিক কোল্ড-প্রেসড",
      title: "কাঠের ঘানির খাঁটি সরিষার তেল",
      desc: "প্রাচীন কাঠের ঘানিতে কোনো কৃত্রিম তাপ বা রাসায়নিক ছাড়াই কোল্ড-প্রেসড। খাবারে এনে দেয় আসল ঝাঁঝ ও প্রাকৃতিক পুষ্টিগুণ।",
      btnText: "সরিষার তেল কিনুন",
      btnLink: "products.html?category=mustard-oil",
      btnSecText: "অর্ডার করুন",
      btnSecLink: "products.html?category=mustard-oil"
    },
    {
      image: "images/sajna-leaf.jpg",
      badge: "🍃 স্বাস্থ্যসম্মত পরিবেশে রোদে শুকানো সুপারফুড",
      title: "প্রাকৃতিক শুকনো পাট পাতা ও সাজনা পাতা",
      desc: "ধুলোবালিমুক্ত পরিচ্ছন্ন পরিবেশে যত্নসহকারে শুকানো। প্রচুর প্রাকৃতিক ফাইবার, ক্যালসিয়াম ও ভিটামিন সমৃদ্ধ পুষ্টির সহজ সমাধান।",
      btnText: "পাতা ও ভেষজ দেখুন",
      btnLink: "products.html?category=leaves",
      btnSecText: "সকল পণ্য",
      btnSecLink: "products.html"
    },
    {
      image: "images/products/khejur.jpeg",
      badge: "⭐ পবিত্র মদিনার আজওয়া খেজুর ও প্রাকৃতিক মধু",
      title: "প্রিমিয়াম আজওয়া খেজুর ও সুন্দরবনের মধু",
      desc: "উচ্চমানের বাছাইকৃত আসল আজওয়া খেজুর ও প্রাকৃতিক বুনো মধু। প্রতিদিনের সুষম খাদ্যাভ্যাস ও শরীরের শক্তিবৃদ্ধিতে অতুলনীয়।",
      btnText: "খেজুর ও সুপারফুড",
      btnLink: "products.html?category=superfoods",
      btnSecText: "হোম ডেলিভারি নিন",
      btnSecLink: "products.html"
    }
  ];

  let currentSlide = 0;
  let sliderInterval = null;

  slider.innerHTML = `
    ${slidesData.map((s, idx) => `
      <div class="hero-slide ${idx === 0 ? "active" : ""}" style="background-image: url('${s.image}');">
        <div class="hero-slide-overlay"></div>
        <div class="container" style="position: relative; z-index: 3;">
          <div class="hero-slide-content">
            <span class="hero-slide-badge">${s.badge}</span>
            <h1 class="hero-slide-title">${s.title}</h1>
            <p class="hero-slide-desc">${s.desc}</p>
            <div class="hero-slide-actions">
              <a href="${s.btnLink}" class="btn btn-primary btn-lg">${s.btnText}</a>
              <a href="${s.btnSecLink}" class="btn btn-secondary btn-lg">${s.btnSecText}</a>
            </div>
          </div>
        </div>
      </div>
    `).join("")}

    <button class="hero-slider-nav hero-slider-prev" aria-label="পূর্ববর্তী স্লাইড" id="heroPrevBtn">❮</button>
    <button class="hero-slider-nav hero-slider-next" aria-label="পরবর্তী স্লাইড" id="heroNextBtn">❯</button>

    <div class="hero-slider-dots">
      ${slidesData.map((_, idx) => `
        <button class="hero-slider-dot ${idx === 0 ? "active" : ""}" data-slide-index="${idx}" aria-label="Slide ${idx + 1}"></button>
      `).join("")}
    </div>
  `;

  const slides = slider.querySelectorAll(".hero-slide");
  const dots = slider.querySelectorAll(".hero-slider-dot");

  function goToSlide(index) {
    if (!slides.length) return;
    slides[currentSlide].classList.remove("active");
    if (dots[currentSlide]) dots[currentSlide].classList.remove("active");
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    if (dots[currentSlide]) dots[currentSlide].classList.add("active");
  }

  function startAutoplay() {
    stopAutoplay();
    sliderInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  }

  function stopAutoplay() {
    if (sliderInterval) clearInterval(sliderInterval);
  }

  const prevBtn = document.getElementById("heroPrevBtn");
  const nextBtn = document.getElementById("heroNextBtn");
  if (prevBtn) prevBtn.addEventListener("click", () => { goToSlide(currentSlide - 1); startAutoplay(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { goToSlide(currentSlide + 1); startAutoplay(); });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-slide-index"));
      goToSlide(idx);
      startAutoplay();
    });
  });

  slider.addEventListener("mouseenter", stopAutoplay);
  slider.addEventListener("mouseleave", startAutoplay);

  // Mobile Touch Swipe Handling
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  slider.addEventListener("touchstart", (e) => {
    stopAutoplay();
    if (e.touches && e.touches[0]) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchEndX = touchStartX;
      touchEndY = touchStartY;
    }
  }, { passive: true });

  slider.addEventListener("touchmove", (e) => {
    if (e.touches && e.touches[0]) {
      touchEndX = e.touches[0].clientX;
      touchEndY = e.touches[0].clientY;
    }
  }, { passive: true });

  slider.addEventListener("touchend", () => {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Minimum swipe threshold 40px and more horizontal than vertical
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        // Swiped left -> next slide
        goToSlide(currentSlide + 1);
      } else {
        // Swiped right -> prev slide
        goToSlide(currentSlide - 1);
      }
    }

    startAutoplay();
  });

  startAutoplay();
}

// ==========================================================================
// 10. FEATURED CATEGORIES COMPONENT
// ==========================================================================
function renderFeaturedCategories() {
  const container = document.getElementById("featuredCategoriesGrid");
  if (!container) return;

  container.innerHTML = FEATURED_CATEGORIES.map(cat => `
    <a href="${cat.url}" class="category-card" title="${cat.name}">
      ${cat.badge ? `<span class="category-card-badge">${cat.badge}</span>` : ""}
      <div class="category-card-thumb-wrap">
        <img src="${cat.image}" alt="${cat.name}" class="category-card-thumb" loading="lazy">
      </div>
      <h3 class="category-card-title">${cat.name}</h3>
      <span class="category-card-count">${cat.desc}</span>
    </a>
  `).join("");
}

// ==========================================================================
// 11. HOMEPAGE PRODUCT CAROUSELS
// ==========================================================================
function renderHomeProductCarousels() {
  // 1. Best Selling Carousel
  const bestTrack = document.getElementById("bestSellingCarousel");
  if (bestTrack) {
    bestTrack.innerHTML = BARAKAH_PRODUCTS.map(p => createProductCardHTML(p)).join("");
  }

  // 2. Category-wise Carousels
  const categorySections = [
    { trackId: "mustardOilCarousel", category: "mustard-oil" },
    { trackId: "milkCarousel", category: "milk" },
    { trackId: "meatCarousel", category: "meat" },
    { trackId: "leavesCarousel", category: "leaves" },
    { trackId: "superfoodsCarousel", category: "superfoods" },
    { trackId: "fruitsCarousel", category: "fruits" }
  ];

  categorySections.forEach(sec => {
    const track = document.getElementById(sec.trackId);
    if (!track) return;
    const catProducts = BARAKAH_PRODUCTS.filter(p => p.category === sec.category);
    if (catProducts.length > 0) {
      track.innerHTML = catProducts.map(p => createProductCardHTML(p)).join("");
    } else {
      const parent = track.closest(".carousel-section");
      if (parent) parent.style.display = "none";
    }
  });
}

// Carousel Scroll Navigation Helper
window.scrollCarousel = function(trackId, direction) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const cardWidth = 290;
  track.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
};

// ==========================================================================
// 12. CUSTOMER REVIEWS CAROUSEL
// ==========================================================================
function renderCustomerReviewsCarousel() {
  const track = document.getElementById("customerReviewsCarousel");
  if (!track) return;

  track.innerHTML = CUSTOMER_REVIEWS.map(r => `
    <div class="review-card-modern">
      <div>
        <div class="review-card-header">
          <img src="${r.image}" alt="${r.name}" class="review-card-avatar" onerror="this.src='images/logo.png'">
          <div class="review-card-user">
            <h4>${r.name}</h4>
            <p>${r.location}</p>
          </div>
        </div>
        <div class="review-stars-wrap">
          <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
        <p class="review-card-text">“${r.text}”</p>
      </div>
      <div class="review-card-footer">
        <span class="verified-customer-tag">✓ ভেরিফাইড ক্রেতা</span>
        <span>${r.product}</span>
      </div>
    </div>
  `).join("");

  // Smooth continuous auto-scroll for reviews
  let isInteracting = false;
  let autoScrollTimer = null;

  function stepReviewScroll() {
    if (!isInteracting && track.scrollWidth > track.clientWidth) {
      if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 2) {
        track.scrollLeft = 0;
      } else {
        track.scrollLeft += 1;
      }
    }
  }

  autoScrollTimer = setInterval(stepReviewScroll, 40);

  track.addEventListener("mouseenter", () => { isInteracting = true; });
  track.addEventListener("mouseleave", () => { isInteracting = false; });
  track.addEventListener("touchstart", () => { isInteracting = true; }, { passive: true });
  track.addEventListener("touchend", () => {
    setTimeout(() => { isInteracting = false; }, 2000);
  });
}

// ==========================================================================
// 13. CUSTOMER LOGIN / ACCOUNT SYSTEM
// ==========================================================================
function getLoggedInCustomer() {
  try {
    const data = localStorage.getItem("barakah_customer");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function updateCustomerAccountUI() {
  const user = getLoggedInCustomer();
  const accountLabels = document.querySelectorAll(".account-btn-label");
  accountLabels.forEach(el => {
    el.textContent = user ? (user.name.split(" ")[0] || "অ্যাকাউন্ট") : "লগইন";
  });
}

function openAccountModal(initialTab = "login") {
  let modal = document.getElementById("customerAccountModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "customerAccountModal";
    modal.className = "account-modal-overlay";
    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeAccountModal();
    });
  }

  const user = getLoggedInCustomer();
  const cart = getCart();

  modal.innerHTML = `
    <div class="account-modal-box">
      <div class="account-modal-header">
        <h3>${user ? "আমার অ্যাকাউন্ট" : "গ্রাহক লগইন / রেজিস্ট্রেশন"}</h3>
        <button class="account-modal-close" onclick="closeAccountModal()">&times;</button>
      </div>

      ${user ? `
        <div class="account-modal-body">
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="width: 60px; height: 60px; border-radius: 50%; background: #eaf4ed; color: #166534; font-size: 24px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 8px;">
              ${user.name.charAt(0).toUpperCase()}
            </div>
            <h4 style="font-size: 1.15rem; color: #1e293b; margin: 0;">${user.name}</h4>
            <p style="color: #64748b; font-size: 0.88rem; margin-top: 4px;">📞 ${user.phone}</p>
          </div>

          <div style="background: #f8faf8; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 20px;">
            <h5 style="margin: 0 0 8px 0; font-size: 0.9rem; color: #1e293b;">কার্ট স্ট্যাটাস</h5>
            <p style="font-size: 0.88rem; color: #475569; margin: 0;">বর্তমান কার্টে <strong>${cart.length}টি</strong> আইটেম রয়েছে। <a href="cart.html" style="color: #166534; font-weight: 700;">কার্ট দেখুন →</a></p>
          </div>

          <div style="display: flex; gap: 10px;">
            <a href="checkout.html" class="btn btn-primary" style="flex: 1; text-align: center;">অর্ডার চেকআউট</a>
            <button class="btn btn-secondary" onclick="logoutCustomer()" style="flex: 1;">লগআউট</button>
          </div>
        </div>
      ` : `
        <div class="account-modal-tabs">
          <button class="account-tab-btn ${initialTab === "login" ? "active" : ""}" onclick="switchAccountTab('login')">লগইন</button>
          <button class="account-tab-btn ${initialTab === "register" ? "active" : ""}" onclick="switchAccountTab('register')">নতুন অ্যাকাউন্ট</button>
        </div>

        <div class="account-modal-body">
          <form id="customerAuthForm" onsubmit="handleCustomerAuthSubmit(event, '${initialTab}')">
            ${initialTab === "register" ? `
              <div class="account-form-group">
                <label>আপনার সম্পূর্ণ নাম *</label>
                <input type="text" id="custAuthName" placeholder="আপনার সম্পূর্ণ নাম" required>
              </div>
            ` : ""}
            <div class="account-form-group">
              <label>মোবাইল নম্বর *</label>
              <input type="tel" id="custAuthPhone" placeholder="01XXXXXXXXX" pattern="[0-9]{11}" required>
            </div>
            <div class="account-form-group">
              <label>পাসওয়ার্ড *</label>
              <input type="password" id="custAuthPassword" placeholder="আপনার গোপন পাসওয়ার্ড" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
              ${initialTab === "login" ? "সাইন ইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>
          <p style="font-size: 0.82rem; color: #64748b; text-align: center; margin-top: 14px;">
            দ্রুত অর্ডার করতে আপনি যেকোনো সময় অতিথি হিসেবে চেকআউট করতে পারেন।
          </p>
        </div>
      `}
    </div>
  `;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

window.openAccountModal = openAccountModal;

function closeAccountModal() {
  const modal = document.getElementById("customerAccountModal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "";
}

window.closeAccountModal = closeAccountModal;

function switchAccountTab(tab) {
  openAccountModal(tab);
}

window.switchAccountTab = switchAccountTab;

function handleCustomerAuthSubmit(e, mode) {
  e.preventDefault();
  const phone = document.getElementById("custAuthPhone")?.value.trim();
  const name = mode === "register" ? document.getElementById("custAuthName")?.value.trim() : (phone ? "গ্রাহক " + phone.slice(-4) : "গ্রাহক");

  if (!phone) {
    showToast("মোবাইল নম্বর প্রদান করুন");
    return;
  }

  const customerObj = {
    name: name || "সম্মানিত গ্রাহক",
    phone: phone,
    loggedInAt: new Date().toISOString()
  };

  localStorage.setItem("barakah_customer", JSON.stringify(customerObj));
  updateCustomerAccountUI();
  showToast(`স্বাগতম, ${customerObj.name}!`);
  closeAccountModal();
}

function logoutCustomer() {
  localStorage.removeItem("barakah_customer");
  updateCustomerAccountUI();
  showToast("সফলভাবে লগআউট হয়েছে");
  closeAccountModal();
}

window.logoutCustomer = logoutCustomer;

// ==========================================================================
// 14. LIVE PRODUCT SEARCH SYSTEM
// ==========================================================================
function initLiveSearch() {
  const searchInput = document.getElementById("headerSearchInput");
  const dropdown = document.getElementById("searchResultsDropdown");
  const mobileSearchBtn = document.getElementById("mobileSearchToggle");
  const mobileSearchBar = document.getElementById("mobileSearchBar");
  const desktopSearchBtn = document.getElementById("desktopSearchBtn");
const desktopSearchBox = document.querySelector(".header-search-box");

/* Desktop Search Toggle */

if (desktopSearchBtn && desktopSearchBox) {

  desktopSearchBtn.addEventListener("click", () => {

    desktopSearchBox.classList.toggle("show");

    if (desktopSearchBox.classList.contains("show")) {

      const input = desktopSearchBox.querySelector(
        "#headerSearchInput"
      );

      if (input) {
        input.focus();
      }

    } else {

      if (dropdown) {
        dropdown.classList.remove("show");
      }

    }

  });

}


  if (mobileSearchBtn && mobileSearchBar) {
    mobileSearchBtn.addEventListener("click", () => {
      mobileSearchBar.classList.toggle("show");
      const mobileInput = mobileSearchBar.querySelector("input");
      if (mobileInput && mobileSearchBar.classList.contains("show")) {
        mobileInput.focus();
      }
    });
  }

  function handleSearch(query, targetDropdown) {
    if (!targetDropdown) return;
    const q = query.trim().toLowerCase();
    if (!q) {
      targetDropdown.classList.remove("show");
      targetDropdown.innerHTML = "";
      return;
    }

    const matched = BARAKAH_PRODUCTS.filter(p =>
      p.banglaName.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.banglaCategory.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );

    if (matched.length === 0) {
      targetDropdown.innerHTML = `<div class="search-no-results">'${query}' দিয়ে কোনো পণ্য খুঁজে পাওয়া যায়নি।</div>`;
      targetDropdown.classList.add("show");
      return;
    }

    targetDropdown.innerHTML = matched.map(p => `
      <a href="product-details.html?id=${p.id}" class="search-result-item" onclick="const dd = document.getElementById('searchResultsDropdown'); if(dd) dd.classList.remove('show'); const mdd = document.getElementById('mobileSearchResultsDropdown'); if(mdd) mdd.classList.remove('show');">
        <img src="${p.image}" alt="${p.banglaName}" class="search-result-thumb">
        <div class="search-result-info">
          <div class="search-result-cat">${p.banglaCategory}</div>
          <div class="search-result-title">${p.banglaName}</div>
        </div>
        <div class="search-result-price">৳ ${p.packages[0].price}</div>
      </a>
    `).join("");

    targetDropdown.classList.add("show");
  }

  if (searchInput && dropdown) {
    searchInput.addEventListener("input", (e) => {
      handleSearch(e.target.value, dropdown);
    });

    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("show");
      }
    });
  }

  const mobileInput = document.getElementById("mobileSearchInput");
  const mobileDropdown = document.getElementById("mobileSearchResultsDropdown");
  if (mobileInput && mobileDropdown) {
    mobileInput.addEventListener("input", (e) => {
      handleSearch(e.target.value, mobileDropdown);
    });
  }
}


// ==========================================================
// ADVERTISEMENT POPUP
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {

  const adPopup = document.getElementById("adPopup");
  const adPopupClose = document.getElementById("adPopupClose");

  if (adPopup && adPopupClose) {

    // Show advertisement when website loads
    setTimeout(function () {
      adPopup.classList.add("show");
    }, 500);


    // Close advertisement
    adPopupClose.addEventListener("click", function () {
      adPopup.classList.remove("show");
    });


    // Close when clicking outside the popup
    adPopup.addEventListener("click", function (e) {

      if (e.target === adPopup) {
        adPopup.classList.remove("show");
      }

    });

  }

});


// ==========================================================
// PRODUCT PAGE VIDEO ADVERTISEMENT
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {

  const adPopup = document.getElementById("productAdPopup");
  const adClose = document.getElementById("productAdPopupClose");
  const adVideo = document.getElementById("productAdVideo");
  const soundBtn = document.getElementById("adSoundBtn");

  // Product page না হলে কিছু করবে না
  if (!adPopup || !adClose || !adVideo || !soundBtn) {
    return;
  }

  // 0.5 second পরে popup show
  setTimeout(function () {

    adPopup.classList.add("show");

    // প্রথমে video muted অবস্থায় চালাবে
    adVideo.muted = true;

    adVideo.play().catch(function (error) {
      console.log("Video autoplay blocked:", error);
    });

  }, 500);


  // ========================================================
  // SOUND ON BUTTON
  // ========================================================

  soundBtn.addEventListener("click", function () {

    adVideo.muted = false;

    adVideo.play().then(function () {

      soundBtn.textContent = "🔇 Sound On";

    }).catch(function (error) {

      console.log("Sound play blocked:", error);

    });

  });


  // ========================================================
  // CLOSE BUTTON
  // ========================================================

  adClose.addEventListener("click", function () {

    adVideo.pause();
    adVideo.currentTime = 0;

    adPopup.classList.remove("show");

  });


  // ========================================================
  // VIDEO FINISHED → AUTO CLOSE
  // ========================================================

  adVideo.addEventListener("ended", function () {

    adPopup.classList.remove("show");

  });

});


/* =========================================
   MOBILE CATEGORY AUTO SCROLL - FINAL
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

  const categoryBar = document.querySelector(".category-nav-inner");

  if (!categoryBar) return;

  let isTouching = false;
  let direction = 1;
  let pause = false;

  function autoScroll() {

    if (window.innerWidth <= 768 && !isTouching && !pause) {

      const maxScroll =
        categoryBar.scrollWidth - categoryBar.clientWidth;

      if (maxScroll > 0) {

        // সামনে যাবে
        if (direction === 1) {

          categoryBar.scrollLeft += 0.5;

          // একদম শেষে পৌঁছালে
          if (categoryBar.scrollLeft >= maxScroll) {

            categoryBar.scrollLeft = maxScroll;

            direction = -1;

            // 1.5 sec pause
            pause = true;

            setTimeout(function () {
              pause = false;
            }, 1500);
          }

        }

        // পিছনে আসবে
        else {

          categoryBar.scrollLeft -= 0.5;

          // একদম শুরুতে পৌঁছালে
          if (categoryBar.scrollLeft <= 0) {

            categoryBar.scrollLeft = 0;

            direction = 1;

            // আবার 1 sec pause
            pause = true;

            setTimeout(function () {
              pause = false;
            }, 1000);
          }
        }
      }
    }

    requestAnimationFrame(autoScroll);
  }


  // User নিজে swipe করলে auto-scroll বন্ধ
  categoryBar.addEventListener("touchstart", function () {
    isTouching = true;
  });


  categoryBar.addEventListener("touchend", function () {

    setTimeout(function () {
      isTouching = false;
    }, 2000);

  });


  autoScroll();

});

// ==========================================================================
// 15. DEDICATED PRODUCT DETAILS PAGE & ADVANCED REVIEW SYSTEM
// ==========================================================================

let detailsState = {
  product: null,
  images: [],
  currentImageIndex: 0,
  selectedPkg: null,
  quantity: 1,
  uploadedPhotoBase64: null,
  selectedRating: 5
};

function initProductDetailsPage() {
  const container = document.getElementById("productDetailsContainer");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const paramId = parseInt(urlParams.get("id"), 10);

  // Find product or fallback to first product
  let product = BARAKAH_PRODUCTS.find((p) => p.id === paramId);
  if (!product) {
    product = BARAKAH_PRODUCTS[0];
  }

  const images = (product.images && product.images.length > 0) ? product.images : [product.image];
  const initialPkg = product.packages[0];

  detailsState.product = product;
  detailsState.images = images;
  detailsState.currentImageIndex = 0;
  detailsState.selectedPkg = initialPkg;
  detailsState.quantity = 1;
  detailsState.uploadedPhotoBase64 = null;
  detailsState.selectedRating = 5;

  // Update Page Title and Meta
  document.title = `${product.banglaName} | Barakah Agro - Pure & Organic`;

  // Update Breadcrumb
  const breadcrumbCat = document.getElementById("breadcrumbCategoryLink");
  const breadcrumbTitle = document.getElementById("breadcrumbCurrentTitle");
  if (breadcrumbCat) {
    breadcrumbCat.href = `products.html?category=${product.category}`;
    breadcrumbCat.textContent = product.banglaCategory;
  }
  if (breadcrumbTitle) {
    breadcrumbTitle.textContent = product.banglaName;
  }

  // Get authentic reviews + user submitted reviews
  const reviews = getDetailedProductReviews(product);
  const isStockOut = product.badge === "stock-out" || product.inStock === false;

  // Benefits list HTML
  const benefitsHTML = product.benefits.map((b) => `
    <li class="details-benefit-item">
      <span class="benefit-check-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      </span>
      <span class="benefit-text">${b}</span>
    </li>
  `).join("");

  // Related products from same category or catalog
  const related = BARAKAH_PRODUCTS.filter((p) => p.id !== product.id && (p.category === product.category || Math.random() > 0.3)).slice(0, 4);
  const relatedHTML = related.map((p) => createProductCardHTML(p)).join("");

  container.innerHTML = `
    <div class="product-details-wrapper">
      <!-- TOP OVERVIEW: GALLERY + PURCHASE DETAILS -->
      <div class="product-details-grid">

        <!-- LEFT COLUMN: PRODUCT IMAGE GALLERY -->
        <div class="details-gallery-box">
          <div class="gallery-main-view" id="mainGalleryView">
            <div class="gallery-badge-overlay">
              ${initialPkg.oldPrice && initialPkg.oldPrice > initialPkg.price ? `<span class="badge-offer">৳${initialPkg.oldPrice - initialPkg.price} ছাড়</span>` : ""}
              ${isStockOut ? `<span class="badge-stock-out">Stock Out</span>` : `<span class="badge-best">${product.badge || "In Stock"}</span>`}
              <span class="badge-organic">১০০% প্রাকৃতিক</span>
            </div>

            ${images.length > 1 ? `
              <button type="button" class="gallery-nav-btn gallery-prev-btn" onclick="switchProductGalleryImage(-1)" aria-label="পূর্ববর্তী ছবি">❮</button>
            ` : ""}

            <div class="gallery-img-container" onclick="openImageLightbox('${images[0]}', '${product.banglaName}')" title="বড় করে দেখতে ক্লিক করুন">
              <img id="detailsMainImg" src="${images[0]}" alt="${product.banglaName}" class="details-main-img">
            </div>

            ${images.length > 1 ? `
              <button type="button" class="gallery-nav-btn gallery-next-btn" onclick="switchProductGalleryImage(1)" aria-label="পরবর্তী ছবি">❯</button>
              <div class="gallery-counter-pill" id="galleryCounterPill">১ / ${images.length}</div>
            ` : ""}
          </div>

          ${images.length > 1 ? `
            <div class="gallery-thumbs-row" id="galleryThumbsRow">
              ${images.map((img, idx) => `
                <div class="gallery-thumb-item ${idx === 0 ? "active" : ""}" onclick="selectProductGalleryImage(${idx})" data-idx="${idx}" title="ছবি ${idx + 1} দেখুন">
                  <img src="${img}" alt="${product.banglaName} ${idx + 1}">
                </div>
              `).join("")}
            </div>
          ` : ""}
        </div>

        <!-- RIGHT COLUMN: PRODUCT SPECIFICATIONS & PURCHASE ACTIONS -->
        <div class="details-info-box">
          <div class="details-meta-top">
            <a href="products.html?category=${product.category}" class="details-category-pill">${product.banglaCategory}</a>
            <span class="details-sku-tag">SKU: ${product.sku}</span>
            ${isStockOut ? `<span class="stock-indicator out"><span class="dot"></span> Stock Out</span>` : `<span class="stock-indicator in"><span class="dot"></span> In Stock</span>`}
          </div>

          <h1 class="details-title">${product.banglaName}</h1>
          <p class="details-en-name">${product.name}</p>

          <!-- Rating & Reviews Anchor -->
          <div class="details-rating-bar">
            <div class="rating-stars-visual">
              ★★★★★
            </div>
            <span class="rating-numeric">${product.rating}</span>
            <span class="rating-sep">•</span>
            <a href="#customerReviewsSection" class="rating-reviews-link" onclick="scrollToReviews(event)">
              (${reviews.length} customer reviews)
            </a>
          </div>

          <!-- Price Display Box -->
          <div class="details-price-wrap" id="detailsPriceWrap">
            <div class="details-price-current" id="detailsCurrentPrice">৳ ${initialPkg.price}</div>
            <div class="details-price-old" id="detailsOldPrice" style="${initialPkg.oldPrice ? "" : "display:none;"}">৳ ${initialPkg.oldPrice || ""}</div>
            <div class="details-discount-chip" id="detailsDiscountChip" style="${initialPkg.oldPrice ? "" : "display:none;"}">৳${initialPkg.oldPrice ? initialPkg.oldPrice - initialPkg.price : 0} সাশ্রয়</div>
          </div>

          <!-- Short Description -->
          <p class="details-short-desc">${product.shortDescription}</p>

          <!-- Package / Size Selector -->
          <div class="details-package-selector">
            <div class="package-selector-header">
              <span>প্যাকেজ সাইজ বা পরিমাণ নির্বাচন করুন:</span>
              <strong id="selectedPkgLabel">${initialPkg.label}</strong>
            </div>
            <div class="details-pkg-chips" id="detailsPkgChips">
              ${product.packages.map((pkg, idx) => `
                <button type="button" class="details-pkg-chip ${idx === 0 ? "active" : ""}"
                  data-pkg-id="${pkg.id}"
                  data-price="${pkg.price}"
                  data-old-price="${pkg.oldPrice || ""}"
                  data-label="${pkg.label}"
                  onclick="handleDetailsPkgSelect('${pkg.id}')">
                  <span class="chip-label">${pkg.label}</span>
                  <span class="chip-price">৳ ${pkg.price}</span>
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Quantity & Primary Purchase Actions -->
          <div class="details-purchase-bar">
            <div class="details-qty-stepper">
              <button type="button" class="stepper-btn" onclick="adjustDetailsQty(-1)" aria-label="Decrease quantity">−</button>
              <input type="text" id="detailsQtyInput" class="stepper-input" value="1" readonly>
              <button type="button" class="stepper-btn" onclick="adjustDetailsQty(1)" aria-label="Increase quantity">+</button>
            </div>

            <button type="button" class="btn btn-primary btn-lg details-add-btn" onclick="handleDetailsAddToCart()" ${isStockOut ? "disabled" : ""}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <span>কার্টে যোগ করুন</span>
            </button>

            <button type="button" class="btn btn-accent btn-lg details-buy-btn" onclick="handleDetailsBuyNow()" ${isStockOut ? "disabled" : ""}>
              <span>এখনই অর্ডার করুন</span>
            </button>
          </div>

          <!-- Fast Orders: WhatsApp & Phone Hotline -->
          <div class="details-fast-orders">
            <a href="https://wa.me/8801786239185?text=${encodeURIComponent('আসসালামু আলাইকুম, আমি Barakah Agro থেকে \"' + product.banglaName + '\" অর্ডার করতে চাই।')}" target="_blank" rel="noopener" class="btn btn-whatsapp details-fast-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <span>হোয়াটসঅ্যাপে সরাসরি অর্ডার</span>
            </a>
            <a href="tel:01786239185" class="btn btn-outline details-fast-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>হটলাইনে কল করুন: 01786-239185</span>
            </a>
          </div>

          <!-- Trust Badges -->
          <div class="details-trust-grid">
            <div class="details-trust-item">
              <span class="trust-icon">🚚</span>
              <div>
                <strong>দ্রুত হোম ডেলিভারি</strong>
                <p>সারাদেশে ২-৩ দিনের মধ্যে</p>
              </div>
            </div>
            <div class="details-trust-item">
              <span class="trust-icon">💵</span>
              <div>
                <strong>ক্যাশ অন ডেলিভারি</strong>
                <p>পণ্য দেখে বুঝে মূল্য দিন</p>
              </div>
            </div>
            <div class="details-trust-item">
              <span class="trust-icon">🌿</span>
              <div>
                <strong>১০০% খাঁটি ও বিশুদ্ধ</strong>
                <p>কেমিক্যাল ও প্রিজারভেটিভ মুক্ত</p>
              </div>
            </div>
            <div class="details-trust-item">
              <span class="trust-icon">🛡️</span>
              <div>
                <strong>সন্তুষ্টি গ্যারান্টি</strong>
                <p>সহজ রিটার্ন পলিসি</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PRODUCT DESCRIPTION CARD -->
      <section class="details-card-section">
        <div class="details-card-header">
          <h2 class="details-card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            <span>পণ্যের বিস্তারিত বিবরণ</span>
          </h2>
        </div>
        <div class="details-card-body">
          <p class="details-full-description">${product.description}</p>
          ${product.ingredients ? `
            <div class="details-ingredients-box">
              <strong>উপাদান ও প্রস্তুতপ্রণালী:</strong>
              <p>${product.ingredients}</p>
            </div>
          ` : ""}
        </div>
      </section>

      <!-- PRODUCT BENEFITS CARD (APPEARS FIRST BEFORE CUSTOMER REVIEWS) -->
      <section class="details-card-section" id="productBenefitsSection">
        <div class="details-card-header">
          <h2 class="details-card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>উপকারিতা ও বিশেষ গুণাবলী</span>
          </h2>
          <span class="section-tag-pill">প্রাকৃতিক পুষ্টি</span>
        </div>
        <div class="details-card-body">
          <ul class="details-benefits-list">
            ${benefitsHTML}
          </ul>
        </div>
      </section>

      <!-- CUSTOMER REVIEWS & PHOTO GALLERY (APPEARS AFTER BENEFITS) -->
      <section class="details-card-section" id="customerReviewsSection">
        <div class="details-card-header">
          <h2 class="details-card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>সম্মানিত গ্রাহকদের রিভিউ (${reviews.length})</span>
          </h2>
          <span class="rating-badge-lg">★ ${product.rating} / 5.0</span>
        </div>
        <div class="details-card-body">

          <!-- 7. REVIEW PHOTO CAROUSEL / GALLERY -->
          <div class="review-photos-carousel-wrapper">
            <div class="review-photos-header">
              <h4>📸 সম্মানিত গ্রাহকদের পাঠানো বাস্তব ডেলিভারি ছবি</h4>
              <span style="font-size: 0.82rem; color: #64748b;">(বড় করে দেখতে ছবিতে ক্লিক করুন)</span>
            </div>
            <div class="review-photos-carousel-track" id="reviewPhotosCarouselTrack">
              <!-- Rendered by renderReviewPhotosCarousel() -->
            </div>
          </div>

          <!-- REVIEWS LIST -->
          <div class="customer-reviews-grid" id="customerReviewsList">
            <!-- Rendered by renderDetailedReviewsList() -->
          </div>

          <!-- 8. WRITE A REVIEW FORM -->
          <div class="write-review-container">
            <div class="write-review-header">
              <h3>✍️ আপনার মূল্যবান রিভিউ ও ছবি যুক্ত করুন</h3>
              <p>আপনার সৎ অভিজ্ঞতা ও মতামত অন্য গ্রাহকদের আসল ও খাঁটি পণ্য নির্বাচনে দারুণ সহায়তা করবে।</p>
            </div>

            <form id="productReviewForm" onsubmit="handleProductReviewSubmit(event)" class="write-review-form">
              <div class="review-form-rating-row">
                <label>আপনার রেটিং নির্বাচন করুন: *</label>
                <div class="star-rating-picker" id="starRatingPicker">
                  <button type="button" class="star-pick-btn active" data-val="1" onclick="setReviewRating(1)">★</button>
                  <button type="button" class="star-pick-btn active" data-val="2" onclick="setReviewRating(2)">★</button>
                  <button type="button" class="star-pick-btn active" data-val="3" onclick="setReviewRating(3)">★</button>
                  <button type="button" class="star-pick-btn active" data-val="4" onclick="setReviewRating(4)">★</button>
                  <button type="button" class="star-pick-btn active" data-val="5" onclick="setReviewRating(5)">★</button>
                  <span class="rating-label-text" id="starRatingText">৫ স্টার — চমৎকার ও শতভাগ খাঁটি!</span>
                </div>
              </div>

              <div class="review-form-grid">
                <div class="review-form-field">
                  <label>আপনার সম্পূর্ণ নাম *</label>
                  <input type="text" id="reviewAuthorName" placeholder="আপনার সম্পূর্ণ নাম" required>
                </div>
                <div class="review-form-field">
                  <label>ঠিকানা / শহর *</label>
                  <input type="text" id="reviewAuthorLocation" placeholder="ঠিকানা / শহর" required>
                </div>
              </div>

              <div class="review-form-field">
                <label>আপনার রিভিউ ও অভিজ্ঞতা *</label>
                <textarea id="reviewCommentText" rows="4" placeholder="পণ্যের গুণগত মান, স্বাদ, প্যাকেজিং ও ডেলিভারি সম্পর্কে আপনার মতামত লিখুন..." required></textarea>
              </div>

              <div class="review-form-field">
                <label>পণ্যের ছবি যুক্ত করুন (ঐচ্ছিক):</label>
                <div class="review-photo-upload-box">
                  <input type="file" id="reviewPhotoInput" accept="image/*" onchange="handleReviewPhotoSelect(event)" style="display:none;">
                  <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('reviewPhotoInput').click()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <span>ছবি নির্বাচন করুন বা তুলুন</span>
                  </button>
                  <span id="reviewPhotoName" style="font-size: 0.82rem; color: #64748b;">কোনো ছবি নির্বাচিত নেই</span>
                </div>
                <div id="reviewPhotoPreviewWrap" style="display:none; margin-top: 10px;">
                  <img id="reviewPhotoPreviewImg" src="" alt="Review preview" style="max-height: 110px; border-radius: 8px; border: 1px solid #cbd5e1; object-fit: contain;">
                </div>
              </div>

              <button type="submit" class="btn btn-primary btn-lg" style="margin-top: 10px;">
                <span>রিভিউ প্রকাশ করুন</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <!-- RELATED PRODUCTS SECTION -->
      <section class="details-card-section">
        <div class="details-card-header">
          <h2 class="details-card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span>সম্পর্কিত অন্যান্য খাঁটি পণ্য</span>
          </h2>
          <a href="products.html" class="view-all-link">সব পণ্য দেখুন ➔</a>
        </div>
        <div class="details-card-body">
          <div class="products-grid" id="detailsRelatedProductsGrid">
            ${relatedHTML}
          </div>
        </div>
      </section>
    </div>
  `;

  // Render Sub-components
  renderDetailedReviewsList(reviews);
  renderReviewPhotosCarousel(reviews, product);

  // Attach Touch Swipe for Main Gallery Image
  setupMainGalleryTouchSwipe();
}

// Get combined authentic & user-submitted reviews
function getDetailedProductReviews(product) {
  let list = [];
  try {
    const saved = localStorage.getItem(`barakah_reviews_${product.id}`);
    if (saved) {
      list = JSON.parse(saved);
    }
  } catch (e) {
    console.error("Error reading saved reviews", e);
  }

  // Pre-seed matching reviews from CUSTOMER_REVIEWS
  const matchingDefaults = CUSTOMER_REVIEWS.filter(
    (r) => r.product.includes(product.banglaCategory) || r.product.includes(product.name) || r.product.includes(product.banglaName)
  );

  const defaultsToUse = matchingDefaults.length > 0 ? matchingDefaults : CUSTOMER_REVIEWS.slice(0, 3);
  return list.concat(defaultsToUse);
}

// Render Review Photos Carousel
function renderReviewPhotosCarousel(reviews, product) {
  const track = document.getElementById("reviewPhotosCarouselTrack");
  if (!track) return;

  // Build a collection of authentic customer delivery photos
  const photos = [];

  // Add photos attached to reviews
  reviews.forEach((r) => {
    if (r.image) {
      photos.push({
        url: r.image,
        caption: `${r.name} - ${r.location}`,
        product: product.banglaName
      });
    }
  });

  // Also include product authentic photos as delivered goods
  if (product.images && product.images.length > 1) {
    product.images.forEach((img, i) => {
      photos.push({
        url: img,
        caption: `ভেরিফাইড ডেলিভারি ফটো (${i + 1})`,
        product: product.banglaName
      });
    });
  }

  // Fallback default review photos if needed
  if (photos.length < 3) {
    photos.push(
      { url: "images/reviews/customer1.png", caption: "কাস্টমার রসিদ ও ডেলিভারি", product: product.banglaName },
      { url: "images/reviews/customer2.png", caption: "সুরক্ষিত ইকো প্যাকেজিং", product: product.banglaName },
      { url: "images/reviews/customer3.png", caption: "ঘরোয়া যত্ন ও বিশুদ্ধতা", product: product.banglaName }
    );
  }

  track.innerHTML = photos.map((p, idx) => `
    <div class="review-photo-card" onclick="openImageLightbox('${p.url}', '${p.caption} — ${p.product}')" title="বড় করে দেখতে ক্লিক করুন">
      <div class="review-photo-thumb-wrap">
        <img src="${p.url}" alt="${p.caption}" class="review-photo-img" loading="lazy">
        <span class="review-photo-zoom-icon">🔍</span>
      </div>
      <div class="review-photo-meta">
        <span class="review-photo-caption">${p.caption}</span>
        <span class="verified-tag">✓ ভেরিফাইড ক্রেতা</span>
      </div>
    </div>
  `).join("");
}

// Render Customer Reviews List
function renderDetailedReviewsList(reviews) {
  const container = document.getElementById("customerReviewsList");
  if (!container) return;

  if (reviews.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 24px; color: #64748b;">এখনও কোনো রিভিউ দেওয়া হয়নি। প্রথম রিভিউটি আপনি দিন!</div>`;
    return;
  }

  container.innerHTML = reviews.map((r) => `
    <div class="details-review-card">
      <div class="details-review-header">
        <div class="review-author-wrap">
          <div class="review-avatar-circle">
            ${r.name.charAt(0)}
          </div>
          <div>
            <h4 class="review-author-name">${r.name}</h4>
            <span class="review-author-loc">${r.location || "সম্মানিত ক্রেতা"}</span>
          </div>
        </div>
        <div class="review-meta-right">
          <span class="verified-customer-pill">✓ ভেরিফাইড ক্রয়</span>
          <span class="review-date-text">${r.date || "সম্প্রতি"}</span>
        </div>
      </div>

      <div class="review-stars-row">
        ${Array.from({ length: 5 }, (_, i) => i < (r.rating || 5) ? "★" : "☆").join("")}
      </div>

      <p class="review-comment-body">“${r.text}”</p>

      ${r.image ? `
        <div class="review-card-photo-box" onclick="openImageLightbox('${r.image}', '${r.name}-এর রিভিউ ছবি')">
          <img src="${r.image}" alt="Customer review photo" class="review-card-thumb">
          <span class="review-photo-click-tip">ছবি বড় করে দেখুন</span>
        </div>
      ` : ""}
    </div>
  `).join("");
}

// Gallery Navigation Handlers
function switchProductGalleryImage(direction) {
  if (!detailsState.images || detailsState.images.length <= 1) return;
  const count = detailsState.images.length;
  let next = detailsState.currentImageIndex + direction;
  if (next < 0) next = count - 1;
  if (next >= count) next = 0;
  selectProductGalleryImage(next);
}

function selectProductGalleryImage(index) {
  if (!detailsState.images[index]) return;
  detailsState.currentImageIndex = index;

  const mainImg = document.getElementById("detailsMainImg");
  if (mainImg) {
    mainImg.style.opacity = "0.4";
    setTimeout(() => {
      mainImg.src = detailsState.images[index];
      mainImg.style.opacity = "1";
    }, 120);
  }

  const counterPill = document.getElementById("galleryCounterPill");
  if (counterPill) {
    counterPill.textContent = `${index + 1} / ${detailsState.images.length}`;
  }

  // Update active thumbnail
  const thumbs = document.querySelectorAll(".gallery-thumb-item");
  thumbs.forEach((t, i) => {
    t.classList.toggle("active", i === index);
  });
}

function setupMainGalleryTouchSwipe() {
  const gallery = document.getElementById("mainGalleryView");
  if (!gallery) return;

  let startX = 0;
  let startY = 0;

  gallery.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }
  }, { passive: true });

  gallery.addEventListener("touchend", (e) => {
    if (e.changedTouches.length === 1) {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = endX - startX;
      const diffY = endY - startY;

      // Detect horizontal swipe if deltaX > 40px and dominant over vertical
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          switchProductGalleryImage(1); // Swipe left -> next
        } else {
          switchProductGalleryImage(-1); // Swipe right -> prev
        }
      }
    }
  }, { passive: true });
}

// Package Selection in Details Page
function handleDetailsPkgSelect(pkgId) {
  const pkg = detailsState.product.packages.find((p) => p.id === pkgId);
  if (!pkg) return;

  detailsState.selectedPkg = pkg;

  // Update UI chips
  const chips = document.querySelectorAll(".details-pkg-chip");
  chips.forEach((c) => {
    c.classList.toggle("active", c.getAttribute("data-pkg-id") === pkgId);
  });

  const labelEl = document.getElementById("selectedPkgLabel");
  if (labelEl) labelEl.textContent = pkg.label;

  const currentPriceEl = document.getElementById("detailsCurrentPrice");
  if (currentPriceEl) currentPriceEl.textContent = `৳ ${pkg.price}`;

  const oldPriceEl = document.getElementById("detailsOldPrice");
  const discountEl = document.getElementById("detailsDiscountChip");

  if (pkg.oldPrice && pkg.oldPrice > pkg.price) {
    if (oldPriceEl) {
      oldPriceEl.textContent = `৳ ${pkg.oldPrice}`;
      oldPriceEl.style.display = "block";
    }
    if (discountEl) {
      discountEl.textContent = `৳${pkg.oldPrice - pkg.price} সাশ্রয়`;
      discountEl.style.display = "inline-flex";
    }
  } else {
    if (oldPriceEl) oldPriceEl.style.display = "none";
    if (discountEl) discountEl.style.display = "none";
  }
}

// Quantity Adjustments
function adjustDetailsQty(delta) {
  let val = detailsState.quantity + delta;
  if (val < 1) val = 1;
  if (val > 50) val = 50;
  detailsState.quantity = val;

  const input = document.getElementById("detailsQtyInput");
  if (input) input.value = val;
}

// Add to Cart from Details Page
function handleDetailsAddToCart() {
  if (!detailsState.product || !detailsState.selectedPkg) return;
  addToCart(detailsState.product.id, detailsState.selectedPkg.id, detailsState.quantity);
  showToast(`${detailsState.product.banglaName} (${detailsState.selectedPkg.label}) কার্টে যোগ হয়েছে!`);
}

// Buy Now from Details Page
function handleDetailsBuyNow() {
  if (!detailsState.product || !detailsState.selectedPkg) return;
  addToCart(detailsState.product.id, detailsState.selectedPkg.id, detailsState.quantity);
  window.location.href = "checkout.html";
}

// Smooth scroll to reviews
function scrollToReviews(e) {
  e.preventDefault();
  const target = document.getElementById("customerReviewsSection");
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

// Interactive Review Rating Stars
function setReviewRating(val) {
  detailsState.selectedRating = val;
  const labels = {
    1: "১ স্টার — সন্তোষজনক নয়",
    2: "২ স্টার — সাধারণ",
    3: "৩ স্টার — ভালো",
    4: "৪ স্টার — খুব ভালো ও খাঁটি",
    5: "৫ স্টার — চমৎকার ও শতভাগ খাঁটি!"
  };

  const buttons = document.querySelectorAll(".star-pick-btn");
  buttons.forEach((btn) => {
    const starVal = parseInt(btn.getAttribute("data-val"), 10);
    btn.classList.toggle("active", starVal <= val);
  });

  const textEl = document.getElementById("starRatingText");
  if (textEl) textEl.textContent = labels[val] || `${val} স্টার`;
}

// Review Photo Upload
function handleReviewPhotoSelect(event) {
  const file = event.target.files[0];
  const nameEl = document.getElementById("reviewPhotoName");
  const previewWrap = document.getElementById("reviewPhotoPreviewWrap");
  const previewImg = document.getElementById("reviewPhotoPreviewImg");

  if (!file) {
    if (nameEl) nameEl.textContent = "কোনো ছবি নির্বাচিত নেই";
    if (previewWrap) previewWrap.style.display = "none";
    detailsState.uploadedPhotoBase64 = null;
    return;
  }

  if (nameEl) nameEl.textContent = file.name;

  const reader = new FileReader();
  reader.onload = function(e) {
    detailsState.uploadedPhotoBase64 = e.target.result;
    if (previewImg) previewImg.src = e.target.result;
    if (previewWrap) previewWrap.style.display = "block";
  };
  reader.readAsDataURL(file);
}

// Handle Review Submission
function handleProductReviewSubmit(e) {
  e.preventDefault();
  const product = detailsState.product;
  if (!product) return;

  const name = document.getElementById("reviewAuthorName")?.value.trim();
  const location = document.getElementById("reviewAuthorLocation")?.value.trim();
  const comment = document.getElementById("reviewCommentText")?.value.trim();

  if (!name || !comment) {
    showToast("দয়া করে নাম ও রিভিউ লিখুন");
    return;
  }

  const newReview = {
    id: Date.now(),
    name: name,
    location: location || "সম্মানিত ক্রেতা",
    rating: detailsState.selectedRating || 5,
    date: "আজকে",
    product: product.banglaName,
    text: comment,
    image: detailsState.uploadedPhotoBase64 || "images/reviews/customer1.png",
    verified: true
  };

  // Save to localStorage
  try {
    const key = `barakah_reviews_${product.id}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.unshift(newReview);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (err) {
    console.error("Error saving review", err);
  }

  // Refresh reviews list and carousel
  const updatedReviews = getDetailedProductReviews(product);
  renderDetailedReviewsList(updatedReviews);
  renderReviewPhotosCarousel(updatedReviews, product);

  // Reset form
  const form = document.getElementById("productReviewForm");
  if (form) form.reset();
  const previewWrap = document.getElementById("reviewPhotoPreviewWrap");
  if (previewWrap) previewWrap.style.display = "none";
  const nameEl = document.getElementById("reviewPhotoName");
  if (nameEl) nameEl.textContent = "কোনো ছবি নির্বাচিত নেই";
  detailsState.uploadedPhotoBase64 = null;
  setReviewRating(5);

  showToast("ধন্যবাদ! আপনার মূল্যবান রিভিউ সফলভাবে যুক্ত হয়েছে।");
}

// Lightbox Viewer for Product & Review Photos
window.openImageLightbox = function(src, caption) {
  let lightbox = document.getElementById("barakahLightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "barakahLightbox";
    lightbox.className = "image-lightbox-overlay";
    lightbox.innerHTML = `
      <div class="image-lightbox-box">
        <button class="image-lightbox-close" onclick="closeImageLightbox()" aria-label="Close Lightbox">&times;</button>
        <div class="image-lightbox-img-wrap">
          <img id="lightboxImg" src="" alt="Full View">
        </div>
        <p id="lightboxCaption" class="lightbox-caption-text"></p>
      </div>
    `;
    document.body.appendChild(lightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeImageLightbox();
    });
  }

  const imgEl = document.getElementById("lightboxImg");
  const capEl = document.getElementById("lightboxCaption");
  if (imgEl) imgEl.src = src;
  if (capEl) capEl.textContent = caption || "";

  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
};

window.closeImageLightbox = function() {
  const lightbox = document.getElementById("barakahLightbox");
  if (lightbox) lightbox.classList.remove("open");
  document.body.style.overflow = "";
};

// Expose functions globally for inline HTML event handlers
window.initProductDetailsPage = initProductDetailsPage;
window.switchProductGalleryImage = switchProductGalleryImage;
window.selectProductGalleryImage = selectProductGalleryImage;
window.handleDetailsPkgSelect = handleDetailsPkgSelect;
window.adjustDetailsQty = adjustDetailsQty;
window.handleDetailsAddToCart = handleDetailsAddToCart;
window.handleDetailsBuyNow = handleDetailsBuyNow;
window.scrollToReviews = scrollToReviews;
window.setReviewRating = setReviewRating;
window.handleReviewPhotoSelect = handleReviewPhotoSelect;
window.handleProductReviewSubmit = handleProductReviewSubmit;

