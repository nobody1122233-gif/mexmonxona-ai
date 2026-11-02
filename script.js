// =====================================================
// UZB MEHMONXONA AI - JavaScript
// Ma'lumotlar data.js faylida. Bu fayl sahifalarni ishlatadi.
// Har bir blok "agar sahifada shu element bo'lsa" deb tekshiradi,
// shuning uchun bitta fayl hamma sahifada xato bermay ishlaydi.
// =====================================================

// ---------- Zaxira rasm ----------
// Agar internetdan rasm yuklanmasa, data-zaxira dagi SVG rasm qo'yiladi.
function zaxiraAlmashtir(rasm) {
  if (rasm.dataset.zaxira && !rasm.dataset.xato) {
    rasm.dataset.xato = "1";
    rasm.src = rasm.dataset.zaxira;
  }
}
document.addEventListener("error", function (e) {
  if (e.target.tagName === "IMG") zaxiraAlmashtir(e.target);
}, true);
document.querySelectorAll("img[data-zaxira]").forEach(function (r) {
  if (r.complete && r.naturalWidth === 0) zaxiraAlmashtir(r);   // sahifa yuklanmasidan oldin xato bergan bo'lsa
});

// ---------- Yordamchi funksiyalar ----------
function pul(son) {
  // 450000 -> "450 000"
  return String(son).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function xabarcha(matn) {
  // Pastda chiqadigan kichik xabar (toast)
  const quti = document.getElementById("xabarcha");
  quti.textContent = matn;
  quti.classList.add("korinadi");
  setTimeout(function () { quti.classList.remove("korinadi"); }, 3000);
}

const ikonlar = { "Wi-Fi": "wifi", "Konditsioner": "snow", "Televizor": "tv", "Balkon": "sun", "Minibar": "cup-straw", "Jakuzi": "droplet", "Muzlatkich": "thermometer-snow", "Oshxona": "egg-fried", "Divan": "house-heart" };

// ---------- 1. Tun / kun rejimi ----------
const temaTugma = document.getElementById("temaTugma");
function temaQoy(tema) {
  document.documentElement.setAttribute("data-tema", tema);
  if (temaTugma) temaTugma.innerHTML = tema === "tun" ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
  if (window.grafik) grafikRangi();
}
let saqlangan = null;
try { saqlangan = localStorage.getItem("tema"); } catch (e) {}
temaQoy(saqlangan || "kun");
if (temaTugma) {
  temaTugma.addEventListener("click", function () {
    const yangi = document.documentElement.getAttribute("data-tema") === "tun" ? "kun" : "tun";
    temaQoy(yangi);
    try { localStorage.setItem("tema", yangi); } catch (e) {}
  });
}

// ---------- 2. Mobil menyu ----------
const menyuTugma = document.getElementById("menyuTugma");
const menyu = document.getElementById("menyu");
menyuTugma.addEventListener("click", function () {
  const ochiq = menyu.classList.toggle("ochiq");
  menyuTugma.setAttribute("aria-expanded", ochiq);
});

// ---------- 2b. Ochiladigan menyu (Ko'proq) ----------
const dropdownlar = document.querySelectorAll(".dropdown");
function dropdownYop() {
  dropdownlar.forEach(function (d) {
    d.classList.remove("ochiq");
    d.querySelector(".dropdown-tugma").setAttribute("aria-expanded", "false");
  });
}
dropdownlar.forEach(function (d) {
  const tugma = d.querySelector(".dropdown-tugma");
  tugma.addEventListener("click", function (e) {
    e.stopPropagation(); // pastdagi "tashqariga bosish" ishlamasligi uchun
    const ochiqEdi = d.classList.contains("ochiq");
    dropdownYop();
    if (!ochiqEdi) {
      d.classList.add("ochiq");
      tugma.setAttribute("aria-expanded", "true");
    }
  });
});
document.addEventListener("click", dropdownYop);          // tashqariga bosilsa yopiladi
document.addEventListener("keydown", function (e) { if (e.key === "Escape") dropdownYop(); });

// ---------- 3. Sahifa pastga tushganda: chiziq va tugma ----------
const progress = document.getElementById("progress");
const tepaga = document.getElementById("tepaga");
window.addEventListener("scroll", function () {
  const balandlik = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (balandlik > 0 ? (window.scrollY / balandlik) * 100 : 0) + "%";
  tepaga.style.display = window.scrollY > 400 ? "grid" : "none";
});
tepaga.addEventListener("click", function () { window.scrollTo({ top: 0 }); });

document.getElementById("yil").textContent = new Date().getFullYear();

// ---------- 4. Kutubxonalar (AOS animatsiya) ----------
if (typeof AOS !== "undefined") {
  AOS.init({ duration: 700, once: true, offset: 60 });
}

// ---------- 5. Raqamlar sanaladi ----------
const sonlar = document.querySelectorAll("[data-son]");
if (sonlar.length > 0) {
  const kuzatuvchi = new IntersectionObserver(function (royxat) {
    royxat.forEach(function (el) {
      if (!el.isIntersecting) return;
      const joy = el.target;
      const oxiri = Number(joy.dataset.son);
      let hozir = 0;
      const qadam = Math.max(1, Math.round(oxiri / 40));
      const taymer = setInterval(function () {
        hozir += qadam;
        if (hozir >= oxiri) { hozir = oxiri; clearInterval(taymer); }
        joy.textContent = hozir + (joy.dataset.belgi || "");
      }, 30);
      kuzatuvchi.unobserve(joy);
    });
  });
  sonlar.forEach(function (s) { kuzatuvchi.observe(s); });
}

// ---------- 6. Modal oyna ----------
const modal = document.getElementById("modal");
const modalIchi = document.getElementById("modalIchi");
function ochModal(html) {
  modalIchi.innerHTML = '<button class="modal-yopish" aria-label="Yopish"><i class="bi bi-x-lg"></i></button>' + html;
  modal.classList.add("ochiq");
}
function yopModal() { modal.classList.remove("ochiq"); }
modal.addEventListener("click", function (e) {
  if (e.target === modal || e.target.closest(".modal-yopish")) yopModal();
});
document.addEventListener("keydown", function (e) { if (e.key === "Escape") yopModal(); });

// ---------- 7. Xonalar ----------
function xonaKartasi(x) {
  return `<article class="karta" data-tur="${x.tur}">
    <img src="${x.rasm}" data-zaxira="${x.zaxira}" alt="${x.nom}" loading="lazy">
    <div class="karta-ichi">
      <span class="teg">${x.tur}</span>
      <h3>${x.nom}</h3>
      <p>${x.tavsif}</p>
      <div class="qulayliklar">
        <span><i class="bi bi-people"></i>${x.kishi} kishi</span>
        <span><i class="bi bi-arrows-fullscreen"></i>${x.maydon} m²</span>
      </div>
      <div class="karta-past">
        <div class="narx">${pul(x.narx)} <small>so'm / kecha</small></div>
        <button class="tugma kichik" data-xona="${x.id}">Batafsil</button>
      </div>
    </div>
  </article>`;
}

function xonaModali(x) {
  const q = x.qulaylik.map(function (n) {
    return `<li><i class="bi bi-${ikonlar[n] || "check2-circle"}"></i> ${n}</li>`;
  }).join("");
  ochModal(`<img src="${x.rasm.replace("w=900", "w=1400")}" data-zaxira="${x.zaxira}" alt="${x.nom}">
    <div class="modal-matn">
      <h2>${x.nom}</h2>
      <p>${x.tavsif} Sig'imi ${x.kishi} kishi, maydoni ${x.maydon} m².</p>
      <ul class="belgi-royxat">${q}</ul>
      <small class="foto-muallif">Foto: ${x.muallif}, Unsplash</small>
      <div class="karta-past"><div class="narx">${pul(x.narx)} <small>so'm / kecha</small></div>
      <a class="tugma" href="bron.html?xona=${x.id}"><i class="bi bi-calendar-check"></i> Band qilish</a></div>
    </div>`);
}

const xonalarJoyi = document.getElementById("xonalarJoyi");
if (xonalarJoyi) {
  // Bosh sahifada faqat 3 ta, xonalar sahifasida hammasi
  const soni = Number(xonalarJoyi.dataset.soni) || xonalar.length;
  const tanlangan = xonalar.filter(function (x, i) { return i < soni; });
  xonalarJoyi.innerHTML = tanlangan.map(xonaKartasi).join("");

  xonalarJoyi.addEventListener("click", function (e) {
    const t = e.target.closest("[data-xona]");
    if (t) xonaModali(xonalar.find(function (x) { return x.id === t.dataset.xona; }));
  });

  // Filtr tugmalari
  document.querySelectorAll("#xonaFiltr button").forEach(function (tugma) {
    tugma.addEventListener("click", function () {
      document.querySelectorAll("#xonaFiltr button").forEach(function (b) { b.classList.remove("faol"); });
      tugma.classList.add("faol");
      const tur = tugma.dataset.tur;
      xonalarJoyi.querySelectorAll(".karta").forEach(function (k) {
        k.style.display = (tur === "hammasi" || k.dataset.tur === tur) ? "" : "none";
      });
    });
  });
}

// ---------- 8. Galereya ----------
const galereyaJoyi = document.getElementById("galereyaJoyi");
if (galereyaJoyi) {
  galereyaJoyi.innerHTML = galereya.map(function (g, i) {
    return `<figure data-tur="${g.tur}" data-i="${i}"><img src="${g.rasm}" data-zaxira="${g.zaxira}" alt="${g.nom}" loading="lazy"><figcaption>${g.nom}</figcaption></figure>`;
  }).join("");

  galereyaJoyi.addEventListener("click", function (e) {
    const f = e.target.closest("figure");
    if (!f) return;
    const g = galereya[f.dataset.i];
    ochModal(`<img src="${g.rasm.replace("w=900", "w=1400")}" data-zaxira="${g.zaxira}" alt="${g.nom}"><div class="modal-matn"><h3>${g.nom}</h3><span class="teg">${g.tur}</span><small class="foto-muallif">Foto: ${g.muallif}, Unsplash</small></div>`);
  });

  document.querySelectorAll("#galereyaFiltr button").forEach(function (tugma) {
    tugma.addEventListener("click", function () {
      document.querySelectorAll("#galereyaFiltr button").forEach(function (b) { b.classList.remove("faol"); });
      tugma.classList.add("faol");
      galereyaJoyi.querySelectorAll("figure").forEach(function (f) {
        f.style.display = (tugma.dataset.tur === "hammasi" || f.dataset.tur === tugma.dataset.tur) ? "" : "none";
      });
    });
  });
}

// ---------- 9. Maqolalar (qidiruv va filtr) ----------
const maqolaJoyi = document.getElementById("maqolaJoyi");
if (maqolaJoyi) {
  const qidiruv = document.getElementById("qidiruv");
  const bosh = document.getElementById("boshXabar");
  let tanlanganTur = "hammasi";

  function maqolalarniKorsat() {
    const soz = qidiruv.value.toLowerCase().trim();
    const royxat = maqolalar.filter(function (m) {
      const turMos = tanlanganTur === "hammasi" || m.tur === tanlanganTur;
      const sozMos = m.nom.toLowerCase().includes(soz) || m.qisqa.toLowerCase().includes(soz);
      return turMos && sozMos;
    });
    maqolaJoyi.innerHTML = royxat.map(function (m) {
      return `<article class="karta">
        <img src="${m.rasm}" data-zaxira="${m.zaxira}" alt="" loading="lazy">
        <div class="karta-ichi">
          <span class="teg">${m.tur}</span>
          <h3>${m.nom}</h3>
          <p>${m.qisqa}</p>
          <div class="meta"><span><i class="bi bi-calendar3"></i> ${m.sana}</span><span><i class="bi bi-clock"></i> ${m.vaqt} daqiqa</span></div>
          <div class="karta-past"><button class="tugma ikkinchi kichik" data-maqola="${m.id}">O'qish</button></div>
        </div></article>`;
    }).join("");
    bosh.style.display = royxat.length === 0 ? "block" : "none";
  }

  maqolalarniKorsat();
  qidiruv.addEventListener("input", maqolalarniKorsat);
  document.querySelectorAll("#maqolaFiltr button").forEach(function (tugma) {
    tugma.addEventListener("click", function () {
      document.querySelectorAll("#maqolaFiltr button").forEach(function (b) { b.classList.remove("faol"); });
      tugma.classList.add("faol");
      tanlanganTur = tugma.dataset.tur;
      maqolalarniKorsat();
    });
  });
  maqolaJoyi.addEventListener("click", function (e) {
    const t = e.target.closest("[data-maqola]");
    if (!t) return;
    const m = maqolalar.find(function (x) { return x.id === Number(t.dataset.maqola); });
    ochModal(`<img src="${m.rasm.replace("w=900", "w=1400")}" data-zaxira="${m.zaxira}" alt=""><div class="modal-matn"><span class="teg">${m.tur}</span><h2>${m.nom}</h2>
      <div class="meta"><span>${m.sana}</span><span>${m.vaqt} daqiqa o'qish</span></div><p>${m.matn}</p></div>`);
  });
}

// ---------- 10. Sharhlar (Swiper kutubxonasi) ----------
const sharhJoyi = document.getElementById("sharhJoyi");
if (sharhJoyi) {
  sharhJoyi.innerHTML = sharhlar.map(function (s) {
    return `<div class="swiper-slide"><div class="sharh">
      <div class="yulduz"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
      <p>${s.matn}</p>
      <div class="kim"><div class="avatar">${s.ism[0]}</div><div><b>${s.ism}</b><small>${s.kasb}</small></div></div></div></div>`;
  }).join("");
  if (typeof Swiper !== "undefined") {
    new Swiper(".swiper", {
      slidesPerView: 1, spaceBetween: 20, loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: { 700: { slidesPerView: 2 }, 1000: { slidesPerView: 3 } }
    });
  }
}

// ---------- 11. Grafik (Chart.js kutubxonasi) ----------
function grafikRangi() {
  const rang = getComputedStyle(document.documentElement).getPropertyValue("--matn").trim();
  window.grafik.options.scales.x.ticks.color = rang;
  window.grafik.options.scales.y.ticks.color = rang;
  window.grafik.update();
}
const grafikJoyi = document.getElementById("grafik");
if (grafikJoyi && typeof Chart !== "undefined") {
  window.grafik = new Chart(grafikJoyi, {
    type: "bar",
    data: {
      labels: ["Mijozlarga javob", "Narxni rejalashtirish", "Sharhlarni tahlil", "Energiya tejash", "Tarjima"],
      datasets: [{ data: [9, 7, 6, 7, 8], backgroundColor: ["#1c4e8a", "#1f9e94", "#d9a23b", "#1c4e8a", "#1f9e94"], borderRadius: 6 }]
    },
    options: {
      indexAxis: "y",
      plugins: { legend: { display: false } },
      scales: { x: { max: 10, grid: { display: false }, ticks: {} }, y: { grid: { display: false }, ticks: {} } }
    }
  });
  grafikRangi();
}

// ---------- 12. Tablar (lug'at) ----------
document.querySelectorAll(".tab-tugma").forEach(function (tugma) {
  tugma.addEventListener("click", function () {
    document.querySelectorAll(".tab-tugma").forEach(function (b) { b.classList.remove("faol"); });
    document.querySelectorAll(".tab-matn").forEach(function (m) { m.classList.remove("faol"); });
    tugma.classList.add("faol");
    document.getElementById(tugma.dataset.tab).classList.add("faol");
  });
});

// ---------- 13. Demo chat ----------
const chatXabarlar = document.getElementById("chatXabarlar");
const chatForma = document.getElementById("chatForma");
const chatInput = document.getElementById("chatInput");

// Savol-javob ro'yxati. Yangi javob qo'shish uchun bitta blok yozing.
const javoblar = [
  { kalitlar: ["salom", "assalom", "hayrli"], javob: "Assalomu alaykum! UZB MEHMONXONA AI yordamchisiga xush kelibsiz. Qanday yordam bera olaman?" },
  { kalitlar: ["narx", "necha pul", "qancha", "tarif"], javob: "Standart xona 450 000 so'mdan, oilaviy xona 700 000 so'mdan, lyuks xona 900 000 so'mdan boshlanadi. Aniq narxni \"Band qilish\" sahifasida hisoblashingiz mumkin." },
  { kalitlar: ["nonushta", "ovqat", "restoran", "taom"], javob: "Nonushta har kuni 07:00 dan 10:30 gacha. Restoranda milliy va yevropa taomlari bor." },
  { kalitlar: ["wifi", "wi-fi", "internet", "parol"], javob: "Wi-Fi barcha xonalarda bepul. Parolni resepshndan olishingiz mumkin." },
  { kalitlar: ["bron", "band", "joy"], javob: "Xonani \"Band qilish\" sahifasida tanlang: sana va mehmonlar sonini kiritsangiz, narx darrov hisoblanadi." },
  { kalitlar: ["chiqish", "kirish", "check", "soat"], javob: "Xonaga kirish soat 14:00 dan, chiqish soat 12:00 gacha." },
  { kalitlar: ["taksi", "transport", "aeroport"], javob: "Aeroportdan olib kelish va olib ketish xizmati bor (150 000 so'm). Resepshnga oldindan xabar bering." },
  { kalitlar: ["hovuz", "basseyn", "suzish"], javob: "Ochiq hovuz har kuni 08:00 dan 21:00 gacha ishlaydi. Mehmonlar uchun bepul." },
  { kalitlar: ["bola", "oila", "bolalar"], javob: "Oilaviy xonalarimiz 4 va 6 kishiga mo'ljallangan. Bolalar uchun qo'shimcha to'shak bepul." },
  { kalitlar: ["rahmat", "sag'ol", "raxmat"], javob: "Arzimaydi! Yana savolingiz bo'lsa, bemalol yozing." }
];

function vaqtOl() {
  const d = new Date();
  return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
}

function xabarQosh(matn, kim) {
  const div = document.createElement("div");
  div.className = "xabar " + kim;
  div.innerHTML = "<span></span><time>" + vaqtOl() + "</time>";
  div.firstChild.textContent = matn; // textContent: foydalanuvchi yozgan HTML ishlamaydi
  chatXabarlar.appendChild(div);
  chatXabarlar.scrollTop = chatXabarlar.scrollHeight;
}

function javobTopish(savol) {
  const kichik = savol.toLowerCase();
  for (let i = 0; i < javoblar.length; i++) {
    for (let j = 0; j < javoblar[i].kalitlar.length; j++) {
      if (kichik.includes(javoblar[i].kalitlar[j])) return javoblar[i].javob;
    }
  }
  return "Kechirasiz, bu savolga hali javob bera olmayman. Narx, nonushta, Wi-Fi, hovuz yoki band qilish haqida so'rab ko'ring.";
}

function savolYubor(matn) {
  matn = matn.trim();
  if (matn === "") return;
  xabarQosh(matn, "men");

  // "Yozmoqda..." belgisi
  const yozmoqda = document.createElement("div");
  yozmoqda.className = "xabar bot yozmoqda";
  yozmoqda.innerHTML = "<span></span><span></span><span></span>";
  chatXabarlar.appendChild(yozmoqda);
  chatXabarlar.scrollTop = chatXabarlar.scrollHeight;

  setTimeout(function () {
    yozmoqda.remove();
    xabarQosh(javobTopish(matn), "bot");
  }, 900);
}

if (chatForma) {
  xabarQosh("Assalomu alaykum! Men UZB MEHMONXONA AI yordamchisiman. Savolingizni yozing.", "bot");
  chatForma.addEventListener("submit", function (e) {
    e.preventDefault();
    savolYubor(chatInput.value);
    chatInput.value = "";
  });
  document.querySelectorAll(".tezkor button").forEach(function (t) {
    t.addEventListener("click", function () { savolYubor(t.textContent); });
  });
  document.getElementById("chatTozala").addEventListener("click", function () {
    chatXabarlar.innerHTML = "";
    xabarQosh("Suhbat tozalandi. Yangi savolingizni yozing.", "bot");
  });
}

// ---------- 13b. Chatni ochish va yopish (robot tugmasi) ----------
const robotTugma = document.getElementById("robotTugma");
const chatOyna = document.getElementById("chatOyna");

function chatOch() {
  chatOyna.classList.add("ochiq");
  robotTugma.innerHTML = '<i class="bi bi-x-lg"></i>';
  robotTugma.setAttribute("aria-expanded", "true");
  robotTugma.setAttribute("aria-label", "Chatni yopish");
  chatInput.focus();
}
function chatYop() {
  chatOyna.classList.remove("ochiq");
  robotTugma.innerHTML = '<i class="bi bi-robot"></i>';
  robotTugma.setAttribute("aria-expanded", "false");
  robotTugma.setAttribute("aria-label", "Chatni ochish");
}
robotTugma.addEventListener("click", function () {
  if (chatOyna.classList.contains("ochiq")) chatYop(); else chatOch();
});
document.getElementById("chatYopish").addEventListener("click", chatYop);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && chatOyna.classList.contains("ochiq")) chatYop();
});
// "data-chat-och" belgisi bor har qanday tugma yoki havola chatni ochadi
document.querySelectorAll("[data-chat-och]").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    menyu.classList.remove("ochiq");
    chatOch();
  });
});

// ---------- 14. Band qilish va narx hisoblash ----------
const bronForma = document.getElementById("bronForma");
if (bronForma) {
  const xonaTanla = document.getElementById("xonaTanla");
  const kirish = document.getElementById("kirish");
  const chiqish = document.getElementById("chiqish");
  const mehmon = document.getElementById("mehmon");

  // Select ichiga xonalarni qo'shamiz
  xonaTanla.innerHTML = xonalar.map(function (x) {
    return `<option value="${x.id}">${x.nom} - ${pul(x.narx)} so'm</option>`;
  }).join("");

  // Havoladan kelgan xona (bron.html?xona=lyuks)
  const urlXona = new URLSearchParams(window.location.search).get("xona");
  if (urlXona) xonaTanla.value = urlXona;

  // Sanalar bugundan oldin bo'lmasin
  const bugun = new Date().toISOString().split("T")[0];
  kirish.min = bugun;
  chiqish.min = bugun;

  function hisobla() {
    const x = xonalar.find(function (q) { return q.id === xonaTanla.value; });
    const kechalar = Math.round((new Date(chiqish.value) - new Date(kirish.value)) / 86400000);
    const soni = Number(mehmon.value) || 1;
    const kechaSoni = kechalar > 0 ? kechalar : 0;

    // Qo'shimcha xizmatlar: nonushta har kecha har mehmon uchun, qolganlari bir marta
    let qoshimcha = 0;
    document.querySelectorAll(".qoshimcha:checked").forEach(function (c) {
      const narx = Number(c.dataset.narx);
      qoshimcha += c.dataset.tur === "kecha" ? narx * kechaSoni * soni : narx;
    });

    const xonaJami = x.narx * kechaSoni;
    const hRasm = document.getElementById("hRasm");
    hRasm.dataset.zaxira = x.zaxira;
    hRasm.dataset.xato = "";
    hRasm.src = x.rasm;
    document.getElementById("hNom").textContent = x.nom;
    document.getElementById("hKecha").textContent = kechaSoni + " kecha";
    document.getElementById("hXona").textContent = pul(xonaJami) + " so'm";
    document.getElementById("hQoshimcha").textContent = pul(qoshimcha) + " so'm";
    document.getElementById("hJami").textContent = pul(xonaJami + qoshimcha) + " so'm";
    document.getElementById("mehmonXato").textContent =
      soni > x.kishi ? "Bu xona ko'pi bilan " + x.kishi + " kishiga mo'ljallangan." : "";
  }

  bronForma.addEventListener("input", hisobla);
  bronForma.addEventListener("change", hisobla);
  hisobla();

  bronForma.addEventListener("submit", function (e) {
    e.preventDefault();
    const ism = document.getElementById("bIsm");
    const tel = document.getElementById("bTel");
    const x = xonalar.find(function (q) { return q.id === xonaTanla.value; });
    let togri = true;
    document.querySelectorAll("#bronForma .xato").forEach(function (el) { if (el.id !== "mehmonXato") el.textContent = ""; });

    if (!kirish.value || !chiqish.value || new Date(chiqish.value) <= new Date(kirish.value)) {
      document.getElementById("sanaXato").textContent = "Chiqish sanasi kirish sanasidan keyin bo'lishi kerak.";
      togri = false;
    }
    if (Number(mehmon.value) > x.kishi || Number(mehmon.value) < 1) togri = false;
    if (ism.value.trim().length < 2) { document.getElementById("bIsmXato").textContent = "Ismingizni kiriting."; togri = false; }
    if (tel.value.replace(/\D/g, "").length < 9) { document.getElementById("bTelXato").textContent = "Telefon raqamini to'liq kiriting."; togri = false; }

    if (togri) {
      document.getElementById("muvaffaqiyat").style.display = "block";
      xabarcha("Bron so'rovi qabul qilindi!");
    }
  });
}

// ---------- 15. Aloqa formasi ----------
const aloqaForma = document.getElementById("aloqaForma");
if (aloqaForma) {
  aloqaForma.addEventListener("submit", function (e) {
    e.preventDefault();
    const ism = document.getElementById("ism");
    const email = document.getElementById("email");
    const xabar = document.getElementById("xabar");
    let togri = true;

    document.querySelectorAll(".xato").forEach(function (x) { x.textContent = ""; });
    [ism, email, xabar].forEach(function (m) { m.classList.remove("noto-g-ri"); });

    if (ism.value.trim().length < 2) {
      document.getElementById("ismXato").textContent = "Ismingizni kiriting (kamida 2 ta harf).";
      ism.classList.add("noto-g-ri"); togri = false;
    }
    if (!email.value.includes("@") || !email.value.includes(".")) {
      document.getElementById("emailXato").textContent = "To'g'ri email kiriting. Masalan: ali@mail.com";
      email.classList.add("noto-g-ri"); togri = false;
    }
    if (xabar.value.trim().length < 10) {
      document.getElementById("xabarXato").textContent = "Xabar kamida 10 ta belgidan iborat bo'lsin.";
      xabar.classList.add("noto-g-ri"); togri = false;
    }
    if (togri) {
      document.getElementById("muvaffaqiyat").style.display = "block";
      xabarcha("Xabaringiz yuborildi!");
      aloqaForma.reset();
    }
  });
}

// ---------- 16. Yangiliklarga obuna (footer) ----------
document.getElementById("obunaForma").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("obunaEmail");
  if (email.value.includes("@") && email.value.includes(".")) {
    xabarcha("Obuna bo'ldingiz. Rahmat!");
    email.value = "";
  } else {
    xabarcha("To'g'ri email kiriting.");
  }
});
