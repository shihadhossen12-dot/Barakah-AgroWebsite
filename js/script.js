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

  return `
    <div class="product-card" data-product-id="${product.id}" data-selected-pkg="${initialPkg.id}">
      <div class="product-badge-wrap">
        ${product.isOffer && initialPkg.discount ? `<span class="badge-offer">${initialPkg.discount}</span>` : ""}
        ${product.badge ? `<span class="badge-best">${product.badge}</span>` : ""}
      </div>

      <div class="product-image-box" onclick="openProductModal(${product.id})">
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

        <h3 class="product-title" onclick="openProductModal(${product.id})">${product.banglaName}</h3>
        <p class="product-short-desc">${product.shortDescription}</p>

        <div class="product-package-select">
          <span class="package-label">Size / Quantity:</span>
          <div class="package-options">${packagesHTML}</div>
        </div>

        <div class="product-card-footer">
          <div class="price-box">
            <span class="price-current card-price">৳ ${initialPkg.price}</span>
            ${initialPkg.oldPrice ? `<span class="price-old card-old-price">৳ ${initialPkg.oldPrice}</span>` : ""}
          </div>
          <div class="card-actions">
            <button class="btn btn-outline btn-sm" onclick="buyCardItemNow(${product.id}, this)" title="Order now">
            Order now
            </button>
            <button class="btn btn-outline btn-sm" onclick="openProductModal(${product.id})" title="View Details">
              Details
            </button>
            
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
  button.textContent = "যোগ হয়েছে ✓";
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
            <strong style="font-size: 0.88rem; color: #1e293b; display: block; margin-bottom: 6px;">Select Package Size:</strong>
            <div class="package-options" id="modalPkgOptions">${packagesOptions}</div>
          </div>

          <ul class="modal-benefits-list">${benefitsList}</ul>

          <div style="display: flex; gap: 12px; align-items: center; margin-top: auto; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <div class="qty-control">
              <button class="qty-btn" type="button" onclick="adjustModalQty(-1)">-</button>
              <input type="text" id="modalQtyInput" class="qty-input" value="1" readonly>
              <button class="qty-btn" type="button" onclick="adjustModalQty(1)">+</button>
            </div>
            <button class="btn btn-primary btn-lg" style="flex-grow: 1;" onclick="addModalItemToCart()">
              Add to Cart
            </button>
            <a href="checkout.html" class="btn btn-accent btn-lg" onclick="buyModalItemNow()">
              Buy Now
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
    hamburgerBtn.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      hamburgerBtn.classList.toggle("is-active", isOpen);
      hamburgerBtn.setAttribute("aria-expanded", isOpen);
    });

    // Close when clicking nav links
    navLinks.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        hamburgerBtn.classList.remove("is-active");
      });
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
    renderProductsCatalog("all");

    // Category Filter tabs
    const catTabs = document.querySelectorAll(".cat-tab");
    catTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        catTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const category = tab.getAttribute("data-category");
        renderProductsCatalog(category);
      });
    });
  }

  function renderProductsCatalog(category) {
    if (!allProductsContainer) return;
    let list = BARAKAH_PRODUCTS;
    if (category && category !== "all") {
      list = BARAKAH_PRODUCTS.filter((p) => p.category === category);
    }
    allProductsContainer.innerHTML = list.map((p) => createProductCardHTML(p)).join("");
  }

  // If on cart page
  if (document.getElementById("cartItemsContainer")) {
    renderCartPage();
  }

  // If on checkout page
  if (document.getElementById("checkoutItemsList")) {
    renderCheckoutSummary();
  }
});

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

