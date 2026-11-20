const companies = [...document.querySelectorAll(".company")].map((item) => ({
  item,
  trigger: item.querySelector(".company-trigger"),
  card: item.querySelector(".company-card"),
}));

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
}

function closeCards() {
  hovered = null;
  pinned = null;
  updateCard();
}

for (const company of companies) {
  company.item.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "mouse") return;
    if (pinned !== company) pinned = null;
    hovered = company;
    updateCard();
  });

  company.item.addEventListener("pointerleave", (event) => {
    if (event.pointerType !== "mouse" || hovered !== company) return;
    hovered = null;
    updateCard();
  });

  company.trigger.addEventListener("click", () => {
    pinned = pinned === company ? null : company;
    hovered = null;
    updateCard();
  });
}

document.addEventListener("click", (event) => {
  if (!event.target.closest(".company")) closeCards();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCards();
});
