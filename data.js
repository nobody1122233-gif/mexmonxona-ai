// =====================================================
// MA'LUMOTLAR FAYLI
// Yangi xona, rasm yoki maqola qo'shish uchun shu yerga
// bitta {...} blok qo'shsangiz kifoya. Sahifa o'zi yangilanadi.
// Narxlar va ismlar namunaviy.
// =====================================================

// ---------- Unsplash rasmlari ----------
// Rasmlar Unsplash saytidan (Unsplash License: bepul foydalanish mumkin).
// Rasm internetdan yuklanadi. Agar yuklanmasa, "zaxira" yo'lidagi SVG rasm ko'rinadi.
// Rasm ID sini Unsplash sahifasidan olish mumkin: images.unsplash.com/photo-<ID>
function unsplash(id, kenglik) {
  return "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=" + (kenglik || 900) + "&q=75";
}

// ---------- Xonalar ----------
const xonalar = [
  { id: "standart", nom: "Standart xona", tur: "standart", narx: 450000, rasm: unsplash("1702255489644-392758161f1f"), zaxira: "img/xona-standart.svg", muallif: "Wes Hicks", kishi: 2, maydon: 24,
    qulaylik: ["Wi-Fi", "Konditsioner", "Televizor"],
    tavsif: "Yumshoq to'shak va shinam dizayn. Qisqa safar va ish uchun ideal." },
  { id: "balkon", nom: "Balkonli standart", tur: "standart", narx: 520000, rasm: unsplash("1444201983204-c43cbd584d93"), zaxira: "img/xona-standart.svg", muallif: "Markus Spiske", kishi: 2, maydon: 28,
    qulaylik: ["Wi-Fi", "Balkon", "Konditsioner"],
    tavsif: "Shahar manzarasiga qaragan balkon bor. Ertalabki choyni shu yerda ichish mumkin." },
  { id: "lyuks", nom: "Lyuks xona", tur: "lyuks", narx: 900000, rasm: unsplash("1509647924673-bbb53e22eeb8"), zaxira: "img/xona-lyuks.svg", muallif: "Jilbert Ebrahimi", kishi: 3, maydon: 48,
    qulaylik: ["Wi-Fi", "Divan", "Minibar"],
    tavsif: "Keng yotoqxona va alohida dam olish zonasi. Qo'lda ishlangan milliy bezaklar." },
  { id: "prezident", nom: "Prezident lyuksi", tur: "lyuks", narx: 1500000, rasm: unsplash("1552858725-2758b5fb1286"), zaxira: "img/xona-lyuks.svg", muallif: "Jp Valery", kishi: 4, maydon: 80,
    qulaylik: ["Wi-Fi", "Jakuzi", "Minibar"],
    tavsif: "Mehmonxonadagi eng katta xona. Alohida yashash xonasi va katta vanna bilan." },
  { id: "oila", nom: "Oilaviy xona", tur: "oilaviy", narx: 700000, rasm: unsplash("1631049421450-348ccd7f8949"), zaxira: "img/xona-oila.svg", muallif: "Point3D Commercial Imaging", kishi: 4, maydon: 40,
    qulaylik: ["Wi-Fi", "2 ta to'shak", "Muzlatkich"],
    tavsif: "Ota-ona va bolalar uchun. Katta to'shak va bolalar uchun alohida joy bor." },
  { id: "oila-katta", nom: "Katta oilaviy xona", tur: "oilaviy", narx: 950000, rasm: unsplash("1520277739336-7bf67edfa768"), zaxira: "img/xona-oila.svg", muallif: "Nicate Lee", kishi: 6, maydon: 62,
    qulaylik: ["Wi-Fi", "2 ta yotoqxona", "Oshxona"],
    tavsif: "Katta oila yoki do'stlar guruhi uchun ikkita yotoqxonali xona." }
];

// ---------- Galereya ----------
const galereya = [
  { rasm: unsplash("1663188757216-bae69b90e482"), zaxira: "img/shahar.svg", muallif: "Catherine Zaidova", nom: "Kechki Registon, Samarqand", tur: "Umumiy" },
  { rasm: unsplash("1509647924673-bbb53e22eeb8"), zaxira: "img/xona-lyuks.svg", muallif: "Jilbert Ebrahimi", nom: "Lyuks xona", tur: "Xonalar" },
  { rasm: unsplash("1698761098082-2b521d960984"), zaxira: "img/restoran.svg", muallif: "Dad hotel", nom: "Restoran taomlari", tur: "Restoran" },
  { rasm: unsplash("1669980986101-a93853c9c5d9"), zaxira: "img/hovuz.svg", muallif: "Nazanin", nom: "Hovuz va bino", tur: "Hovuz" },
  { rasm: unsplash("1759038086403-c607d67bb245"), zaxira: "img/lobby.svg", muallif: "Neon Wang", nom: "Mehmonxona lobbisi", tur: "Umumiy" },
  { rasm: unsplash("1702255489644-392758161f1f"), zaxira: "img/xona-standart.svg", muallif: "Wes Hicks", nom: "Standart xona", tur: "Xonalar" },
  { rasm: unsplash("1715824633691-1fd2bfd3a1ac"), zaxira: "img/hero.svg", muallif: "Far Chinberdiev", nom: "Registon maydoni", tur: "Umumiy" },
  { rasm: unsplash("1631049421450-348ccd7f8949"), zaxira: "img/xona-oila.svg", muallif: "Point3D Commercial Imaging", nom: "Oilaviy xona", tur: "Xonalar" }
];

// ---------- Maqolalar ----------
const maqolalar = [
  { id: 1, nom: "Chatbot nima va u mehmonxonaga nima beradi?", tur: "Chatbot", sana: "12-sentabr, 2026", vaqt: 4, rasm: unsplash("1759038086403-c607d67bb245"), zaxira: "img/lobby.svg", muallif: "Neon Wang",
    qisqa: "Chatbot mehmonlarning takroriy savollariga kecha-kunduz javob beradi.",
    matn: "Chatbot - odam bilan yozma yoki ovozli suhbatlasha oladigan dastur. Mehmonxonada u narx, nonushta vaqti, manzil va xona band qilish kabi savollarga darrov javob beradi. Eng muhimi, xodimlar bir xil savolga o'nlab marta javob berishdan qutuladi. Murakkab muammo bo'lsa, chatbot suhbatni jonli xodimga uzatishi kerak." },
  { id: 2, nom: "Aqlli xona: yorug'lik va harorat ovoz bilan", tur: "Aqlli xona", sana: "28-avgust, 2026", vaqt: 3, rasm: unsplash("1509647924673-bbb53e22eeb8"), zaxira: "img/xona-lyuks.svg", muallif: "Jilbert Ebrahimi",
    qisqa: "Mehmon chiroqni, pardani va konditsionerni gapirib boshqaradi.",
    matn: "Aqlli xonada yorug'lik, harorat va parda sensorlar hamda ovozli buyruqlar bilan boshqariladi. Mehmon xonadan chiqib ketsa, tizim konditsioner va chiroqlarni o'zi o'chiradi. Bu mehmonga qulaylik beradi, mehmonxonaga esa elektr energiyasini tejash imkonini beradi." },
  { id: 3, nom: "Narxni to'g'ri belgilash: AI qanday yordam beradi", tur: "Tahlil", sana: "5-avgust, 2026", vaqt: 5, rasm: unsplash("1663188757216-bae69b90e482"), zaxira: "img/shahar.svg", muallif: "Catherine Zaidova",
    qisqa: "Mavsum va bandlikka qarab narxni tavsiya qiluvchi tizimlar.",
    matn: "Mehmonxona narxi bir yil davomida o'zgarib turadi: bayramda talab oshadi, past mavsumda kamayadi. AI oldingi yillardagi bandlik, mavsum va tadbirlarga qarab qaysi kunga qanday narx qo'yishni tavsiya qiladi. Yakuniy qarorni baribir menejer qabul qiladi." },
  { id: 4, nom: "Mehmon ma'lumotlarini himoya qilish", tur: "Xavfsizlik", sana: "17-iyul, 2026", vaqt: 4, rasm: unsplash("1698761098082-2b521d960984"), zaxira: "img/restoran.svg", muallif: "Dad hotel",
    qisqa: "AI bilan ishlaganda qanday ma'lumotlarni saqlash va qaysilarini saqlamaslik kerak.",
    matn: "AI tizimlari mehmon ismi, telefoni va buyurtmalari bilan ishlaydi, shuning uchun xavfsizlik birinchi o'rinda turadi. Faqat kerakli ma'lumotni yig'ing, pasport va karta raqamlarini chatbotga bermang, ma'lumotni himoyalangan serverda saqlang va mehmonga u qanday ishlatilishini tushuntiring." },
  { id: 5, nom: "Sharhlarni AI bilan tahlil qilish", tur: "Tahlil", sana: "30-iyun, 2026", vaqt: 3, rasm: unsplash("1669980986101-a93853c9c5d9"), zaxira: "img/hovuz.svg", muallif: "Nazanin",
    qisqa: "Yuzlab sharhni o'qimasdan, asosiy xulosalarni olish yo'li.",
    matn: "Mehmonlar turli saytlarda ko'p sharh qoldiradi. AI ularni o'qib, eng ko'p tilga olingan mavzularni ajratadi: masalan, nonushta yoqqani yoki hovuz tozaligi haqida shikoyat. Shu asosda menejer qaysi sohani yaxshilash kerakligini aniq biladi." },
  { id: 6, nom: "Xorijiy mehmonlar bilan til to'sig'ini yengish", tur: "Chatbot", sana: "9-iyun, 2026", vaqt: 3, rasm: unsplash("1715824633691-1fd2bfd3a1ac"), zaxira: "img/hero.svg", muallif: "Far Chinberdiev",
    qisqa: "Avtomatik tarjima turli tilli mehmonlarga yordam beradi.",
    matn: "O'zbekistonga turli mamlakatlardan sayyohlar keladi. Avtomatik tarjima yordamida mehmon o'z tilida yozadi, xodim esa o'zbek yoki rus tilida javob oladi. Muhim matnlar, masalan shartnoma va xavfsizlik qoidalari, baribir odam tomonidan tekshirilishi kerak." }
];

// ---------- Mehmonlar sharhlari (namunaviy) ----------
const sharhlar = [
  { ism: "Dilshod Karimov", kasb: "Sayohatchi", matn: "Kechasi soat ikkida ham chatbot savolimga javob berdi. Xona narxi va nonushta vaqtini tezda bildim." },
  { ism: "Malika Yusupova", kasb: "Menejer", matn: "Xonalar toza va shinam. Xodimlar mehribon, AI yordamchi esa ularga yordam beradi, o'rnini bosmaydi." },
  { ism: "Aziz Rahimov", kasb: "Tadbirkor", matn: "Aqlli xonada chiroq va haroratni ovoz bilan boshqarish juda qulay ekan." },
  { ism: "Nilufar Saidova", kasb: "O'qituvchi", matn: "Oilam bilan oilaviy xonada qoldik. Bolalar uchun joy yetarli, hovuz esa ularga juda yoqdi." },
  { ism: "Sherzod Aliyev", kasb: "Dasturchi", matn: "Sayt orqali xonani bir necha daqiqada tanladim va narxini oldindan hisoblab ko'rdim." }
];
