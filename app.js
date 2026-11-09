// ---------- Simple page switching (each "page" is a <section>) ----------
const PAGES = ["home", "register-intro", "register", "list"];

function showPage() {
  const id = location.hash.replace("#", "") || "home";
  const target = PAGES.includes(id) ? id : "home";
  document.querySelectorAll(".page").forEach((p) => p.classList.toggle("active", p.id === target));
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", showPage);
showPage();

// ---------- Countdown to Nov 1, 2027 at 7pm New York time ----------
// Daylight saving time is still on that day, so New York is UTC-4.
const RELEASE = new Date("2027-11-01T19:00:00-04:00");

function tick() {
  let ms = Math.max(0, RELEASE - Date.now());
  const d = Math.floor(ms / 86400000); ms -= d * 86400000;
  const h = Math.floor(ms / 3600000); ms -= h * 3600000;
  const m = Math.floor(ms / 60000); ms -= m * 60000;
  const s = Math.floor(ms / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  document.getElementById("cd-days").textContent = d;
  document.getElementById("cd-hours").textContent = pad(h);
  document.getElementById("cd-mins").textContent = pad(m);
  document.getElementById("cd-secs").textContent = pad(s);
}
tick();
setInterval(tick, 1000);

// ---------- Registration form (demo: checks fields, saves nothing) ----------
document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const err = document.getElementById("form-error");
  const get = (name) => f.elements[name].value.trim();

  if (!get("first") || !get("last")) return (err.textContent = "Please enter your first and last name.");
  if (!/^\S+@\S+\.\S+$/.test(get("email"))) return (err.textContent = "Please enter a valid email address.");
  if (get("phone").replace(/\D/g, "").length < 10) return (err.textContent = "Please enter a valid phone number.");
  if (!/^\d{4}$/.test(get("pin"))) return (err.textContent = "Your PIN must be exactly 4 digits.");

  err.textContent = "";
  location.hash = "list";
});

// ---------- The list of characteristics ----------
// Only the first one has a definition for now (demo).
const TRAITS = [
  {
    text: "A person appearing on video at a Trump rally/event",
    definition:
      "The person must clearly be visible for identification purposes, and must have been broadcasted by any news outlet or posted online prior to November 1, 2027.",
  },
  { text: "A person appearing on video at a Harris rally/event" },
  { text: "A person with at least 6 kids" },
  { text: "A registered Republican" },
  { text: "A person born in the Middle East" },
  { text: "A person born in Mexico" },
  { text: "An American of at least 4 generations" },
  { text: "A farmer" },
  { text: "A person at least 80 years old" },
  { text: "A person ineligible to vote" },
];

const list = document.getElementById("traits");
const dialog = document.getElementById("definition");

TRAITS.forEach((t, i) => {
  const li = document.createElement("li");
  li.innerHTML = `<span><span class="num">${i + 1}.</span>${t.text}</span>`;
  const btn = document.createElement("button");
  btn.className = "help";
  btn.type = "button";
  btn.textContent = "?";
  btn.setAttribute("aria-label", `What counts for: ${t.text}`);
  btn.addEventListener("click", () => {
    document.getElementById("definition-title").textContent = t.text;
    document.getElementById("definition-text").textContent =
      t.definition || "Definition coming soon.";
    dialog.showModal();
  });
  li.appendChild(btn);
  list.appendChild(li);
});

document.getElementById("definition-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });

// ---------- Wildcard ----------
// Per the design doc, the demo always assigns "Registered Republican".
document.getElementById("wildcard-btn").addEventListener("click", () => {
  const out = document.getElementById("wildcard-result");
  out.textContent = "YOU ARE A REGISTERED REPUBLICAN. HAPPY HUNTING!";
  out.hidden = false;
});
