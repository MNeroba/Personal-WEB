const companies = [...document.querySelectorAll(".company")].map((item) => ({
  item,
  trigger: item.querySelector(".company-trigger"),
  card: item.querySelector(".company-card"),
}));

const wideLayout = window.matchMedia("(min-width: 761px)");

let hovered = null;
let pinned = null;
let visible = null;

function resetCard(company) {
  company.card.classList.remove("card-below");
  company.card.style.maxHeight = "";
  company.card.style.overflowY = "";
}

function positionCard(company) {
  if (!wideLayout.matches) return;

  const card = company.card;
  resetCard(company);

  const cardHeight = card.getBoundingClientRect().height;
  const trigger = company.trigger.getBoundingClientRect();
  const contacts = document.querySelector(".contacts");
  const contactsBottom = contacts ? contacts.getBoundingClientRect().bottom : 0;
  const safeTop = Math.max(8, contactsBottom + 8);
  const spaceAbove = trigger.top - safeTop;
  const spaceBelow = window.innerHeight - trigger.bottom - 8;

  if (cardHeight <= spaceAbove) return;

  if (cardHeight <= spaceBelow) {
    card.classList.add("card-below");
    return;
  }

  if (spaceAbove >= 96) {
    card.style.maxHeight = `${spaceAbove}px`;
    card.style.overflowY = "auto";
    return;
  }

  if (spaceBelow >= 96) {
    card.classList.add("card-below");
    card.style.maxHeight = `${spaceBelow}px`;
    card.style.overflowY = "auto";
    return;
  }

  card.style.maxHeight = `${Math.max(80, spaceAbove)}px`;
  card.style.overflowY = "auto";
}

function setExpanded(company, expanded) {
  company.trigger.setAttribute("aria-expanded", String(expanded));

  if (!expanded) {
    if (company.card.open) company.card.close();
    return;
  }

  if (!company.card.open) {
    if (wideLayout.matches) {
      company.card.show();
    } else {
      company.card.showModal();
    }
  }

  if (wideLayout.matches) positionCard(company);
}

function updateCard() {
  const next = hovered ?? pinned;
  if (next === visible) return;

  if (visible) setExpanded(visible, false);
  visible = next;
  if (visible) setExpanded(visible, true);
}

function closeCards() {
  hovered = null;
  pinned = null;
  if (visible) setExpanded(visible, false);
}

function openModal(company) {
  hovered = null;
  pinned = company;
  visible = company;
  company.trigger.setAttribute("aria-expanded", "true");
  resetCard(company);

  if (!company.card.open) {
    company.card.showModal();
    company.card.querySelector(".card-close")?.focus();
  }
}

for (const company of companies) {
  company.card.addEventListener("close", () => {
    company.trigger.setAttribute("aria-expanded", "false");
    resetCard(company);

    if (visible === company) {
      visible = null;
      if (!wideLayout.matches) {
        hovered = null;
        pinned = null;
      }
    }

    if (!wideLayout.matches) company.trigger.focus();
  });

  company.card.addEventListener("click", (event) => {
    if (!wideLayout.matches && event.target === company.card) company.card.close();
  });

  company.card.addEventListener("keydown", (event) => {
    if (event.key !== "Tab" || !company.card.matches(":modal")) return;

    const focusable = [...company.card.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )].filter((element) => element.offsetParent !== null);

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (focusable.length === 1) {
      event.preventDefault();
      first.focus();
      return;
    }

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  company.item.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "mouse" || !wideLayout.matches) return;
    if (pinned !== company) pinned = null;
    hovered = company;
    updateCard();
  });

  company.item.addEventListener("pointerleave", (event) => {
    if (event.pointerType !== "mouse" || !wideLayout.matches || hovered !== company) return;
    hovered = null;
    updateCard();
  });

  company.trigger.addEventListener("click", () => {
    if (!wideLayout.matches) {
      openModal(company);
      return;
    }

    pinned = pinned === company ? null : company;
    hovered = null;
    updateCard();
  });

  for (const button of company.card.querySelectorAll(".card-close")) {
    button.addEventListener("click", () => company.card.close());
  }
}

document.addEventListener("click", (event) => {
  if (!event.target.closest(".company")) closeCards();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !wideLayout.matches) return;
  const company = visible;
  const focusWasInCard = company && company.card.contains(document.activeElement);
  closeCards();
  if (focusWasInCard) company.trigger.focus();
});

wideLayout.addEventListener("change", closeCards);
document.addEventListener("languagechange", closeCards);
window.addEventListener("resize", () => {
  if (visible && wideLayout.matches) positionCard(visible);
});
