const sections = [...document.querySelectorAll("[data-section]")];
const navLinks = [...document.querySelectorAll("[data-track]")];
const skillButtons = [...document.querySelectorAll(".skill-button")];
const skillOutput = document.querySelector("#skillOutput");

const skillNotes = {
  Python: "Python: scripts, automation, experiments, and quickly turning ideas into working tools.",
  Web: "HTML/CSS/JS: websites, interactions, frontend experiments, and clean little interfaces.",
  Svelte: "Svelte: component-based web apps without too much ceremony.",
  "Graphic Design": "Graphic design: making things look intentional, readable, and a bit more fun.",
  CAD: "CAD: planning and modelling parts, especially when an idea needs to become something physical."
};

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    flashSection(link.dataset.track);
  });
});

skillButtons.forEach((button) => {
  button.addEventListener("click", () => {
    skillButtons.forEach((item) => item.classList.remove("is-selected"));
    button.classList.add("is-selected");
    skillOutput.textContent = skillNotes[button.dataset.skill];
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    const active = entries.find((entry) => entry.isIntersecting);
    if (!active) return;
    const id = active.target.id;
    navLinks.forEach((link) => {
      link.toggleAttribute("aria-current", link.dataset.track === id);
    });
  },
  { threshold: 0.55 }
);

sections.forEach((section) => observer.observe(section));

function flashSection(id) {
  const section = document.querySelector(`#${id}`);
  if (!section) return;
  sections.forEach((item) => item.classList.remove("is-active"));
  section.classList.add("is-active");
  window.setTimeout(() => section.classList.remove("is-active"), 900);
}
