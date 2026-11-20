const companies = [...document.querySelectorAll(".company")].map((item) => ({
  item,
  trigger: item.querySelector(".company-trigger"),
  card: item.querySelector(".company-card"),
}));

const backdrop = document.querySelector(".card-backdrop");
const wideLayout = window.matchMedia("(min-width: 761px)");

let hovered = null;
let pinned = null;
let visible = null;

function setExpanded(company, expanded) {
  company.trigger.setAttribute("aria-expanded", String(expanded));
  company.card.hidden = !expanded;
}

function updateCard() {
  const next = hovered ?? pinned;
  if (next === visible) return;

  if (visible) setExpanded(visible, false);
  visible = next;
  if (visible) setExpanded(visible, true);
  if (backdrop) backdrop.hidden = !visible;
}

function closeCards() {
  hovered = null;
  pinned = null;
  updateCard();
}

for (const company of companies) {
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
    pinned = pinned === company ? null : company;
    hovered = null;
    updateCard();
  });
}

for (const button of document.querySelectorAll(".card-close")) {
  button.addEventListener("click", () => {
    const company = button.closest(".company");
    closeCards();
    company?.querySelector(".company-trigger")?.focus();
  });
}

document.addEventListener("click", (event) => {
  if (!event.target.closest(".company")) closeCards();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const company = visible;
  const focusWasInCard = company && company.card.contains(document.activeElement);
  closeCards();
  if (focusWasInCard) company.trigger.focus();
});
