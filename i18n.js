(() => {
  const translations = {
    lv: {
      title: "Maksims Neroba | IT un digitālās transformācijas konsultants",
      metaDescription: "Palīdzu uzņēmumiem samazināt manuālo darbu, savienojot ERP un datu sistēmas un ieviešot mākslīgo intelektu ikdienas procesos.",
      ogLocale: "lv_LV",
      ogAlternates: ["en_US", "ru_RU"],
      ogAlt: "Maksims Neroba — IT un digitālās transformācijas konsultants",
      location: "Rīga, Latvija",
      city: "Rīga",
      languageAria: "Valoda",
      role: "IT un digitālās transformācijas konsultants",
      firstName: "Maksims",
      lastName: "Neroba",
      fullName: "Maksims Neroba",
      intro: "Palīdzu uzņēmumiem samazināt manuālo darbu, savienojot ERP un datu sistēmas un ieviešot mākslīgo intelektu ikdienas procesos.",
      emailAria: "Rakstīt e-pastu Maksimam Nerobam: m.neroba@gmail.com",
      contactsAria: "Kontakti",
      portraitAlt: "Maksima Nerobas portrets",
      experienceTitle: "Profesionālā pieredze",
      close: "Aizvērt",
      antalisDesc: "Papīra, iepakojuma un vizuālās komunikācijas materiālu izplatītājs uzņēmumiem.",
      kreissDesc: "Latvijas loģistikas uzņēmums, kas nodrošina kravu autopārvadājumus un noliktavu pakalpojumus Eiropā.",
      severstalDesc: "Tērauda apstrādes un izplatīšanas uzņēmums Rīgā. Kopš 2023. gada darbojas ar nosaukumu Marcegaglia Baltics.",
      proksDesc: "Plaša patēriņa elektronikas un datoru komponentu vairumtirgotājs Rīgā."
    },
    en: {
      title: "Maksims Neroba | IT and digital transformation consultant",
      metaDescription: "I help companies reduce manual work by connecting ERP and data systems and bringing AI into everyday processes.",
      ogLocale: "en_US",
      ogAlternates: ["lv_LV", "ru_RU"],
      ogAlt: "Maksims Neroba — IT and digital transformation consultant",
      location: "Riga, Latvia",
      city: "Riga",
      languageAria: "Language",
      role: "IT and digital transformation consultant",
      firstName: "Maksims",
      lastName: "Neroba",
      fullName: "Maksims Neroba",
      intro: "I help companies reduce manual work by connecting ERP and data systems and bringing AI into everyday processes.",
      emailAria: "Email Maksims Neroba: m.neroba@gmail.com",
      contactsAria: "Contact",
      portraitAlt: "Portrait of Maksims Neroba",
      experienceTitle: "Professional experience",
      close: "Close",
      antalisDesc: "A distributor of paper, packaging and visual communication materials for businesses.",
      kreissDesc: "A Latvian logistics company providing road freight and warehousing services across Europe.",
      severstalDesc: "A steel processing and distribution company in Riga. It has operated as Marcegaglia Baltics since 2023.",
      proksDesc: "A Riga-based wholesaler of consumer electronics and computer components."
    },
    ru: {
      title: "Максим Нероба | Консультант по ИТ и цифровой трансформации",
      metaDescription: "Помогаю компаниям сократить ручную работу. Интегрирую ERP с другими системами, автоматизирую процессы и внедряю ИИ.",
      ogLocale: "ru_RU",
      ogAlternates: ["lv_LV", "en_US"],
      ogAlt: "Максим Нероба — консультант по ИТ и цифровой трансформации",
      location: "Рига, Латвия",
      city: "Рига",
      languageAria: "Язык",
      role: "Консультант по ИТ и цифровой трансформации",
      firstName: "Максим",
      lastName: "Нероба",
      fullName: "Максим Нероба",
      intro: "Помогаю компаниям сократить ручную работу. Интегрирую ERP с другими системами, автоматизирую процессы и внедряю ИИ.",
      emailAria: "Написать Максиму Неробе на m.neroba@gmail.com",
      contactsAria: "Контакты",
      portraitAlt: "Портрет Максима Неробы",
      experienceTitle: "Профессиональный опыт",
      close: "Закрыть",
      antalisDesc: "Поставщик бумаги, упаковки и материалов для визуальной коммуникации.",
      kreissDesc: "Латвийская логистическая компания. Занимается автомобильными грузоперевозками и складскими услугами в Европе.",
      severstalDesc: "Рижское предприятие по обработке стали и поставкам металлопроката. С 2023 года работает под названием Marcegaglia Baltics.",
      proksDesc: "Рижский оптовый поставщик потребительской электроники и компьютерных комплектующих."
    }
  };

  const supported = ["lv", "en", "ru"];
  const languageLinks = [...document.querySelectorAll(".language a[data-lang]")];
  const schema = document.getElementById("person-schema");

  function setText(key, value) {
    for (const element of document.querySelectorAll(`[data-i18n="${key}"]`)) {
      element.textContent = value;
    }
  }

  function setAria(key, value) {
    for (const element of document.querySelectorAll(`[data-i18n-aria-label="${key}"]`)) {
      element.setAttribute("aria-label", value);
    }
  }

  function setAlt(key, value) {
    for (const element of document.querySelectorAll(`[data-i18n-alt="${key}"]`)) {
      element.setAttribute("alt", value);
    }
  }

  function setMeta(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.setAttribute("content", value);
  }

  function applyLanguage(lang) {
    if (!supported.includes(lang)) lang = "en";

    const text = translations[lang];
    document.documentElement.lang = lang;
    document.title = text.title;

    setMeta('meta[name="description"]', text.metaDescription);
    setMeta('meta[property="og:title"]', text.title);
    setMeta('meta[property="og:description"]', text.metaDescription);
    setMeta('meta[property="og:image:alt"]', text.ogAlt);
    setMeta('meta[property="og:locale"]', text.ogLocale);
    setMeta('meta[name="twitter:title"]', text.title);
    setMeta('meta[name="twitter:description"]', text.metaDescription);
    setMeta('meta[name="twitter:image:alt"]', text.ogAlt);

    const alternates = document.querySelectorAll('meta[property="og:locale:alternate"]');
    text.ogAlternates.forEach((locale, index) => {
      if (alternates[index]) alternates[index].setAttribute("content", locale);
    });

    setText("location", text.location);
    setAria("languageAria", text.languageAria);
    setText("role", text.role);
    setText("firstName", text.firstName);
    setText("lastName", text.lastName);
    setText("intro", text.intro);
    setAria("emailAria", text.emailAria);
    setAria("contactsAria", text.contactsAria);
    setAlt("portraitAlt", text.portraitAlt);
    setText("experienceTitle", text.experienceTitle);
    setAria("close", text.close);
    setText("antalisDesc", text.antalisDesc);
    setText("kreissDesc", text.kreissDesc);
    setText("severstalDesc", text.severstalDesc);
    setText("proksDesc", text.proksDesc);

    for (const link of languageLinks) {
      if (link.dataset.lang === lang) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    }

    if (schema) {
      const data = JSON.parse(schema.textContent);
      data.name = text.fullName;
      data.jobTitle = text.role;
      data.address.addressLocality = text.city;
      schema.textContent = JSON.stringify(data, null, 2);
    }

    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState(null, "", url);

    document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
  }

  for (const link of languageLinks) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      applyLanguage(link.dataset.lang);
    });
  }

  const params = new URLSearchParams(window.location.search);
  const queryLanguage = (params.get("lang") || "").toLowerCase();
  const browserLanguage = (navigator.language || "en").toLowerCase().split("-")[0];
  const browserDefault = ["lv", "ru", "en"].includes(browserLanguage) ? browserLanguage : "en";

  const initialLanguage = supported.includes(queryLanguage) ? queryLanguage : browserDefault;

  applyLanguage(initialLanguage);
})();
