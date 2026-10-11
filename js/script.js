document.addEventListener("DOMContentLoaded", () => {
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const siteHeader = document.querySelector(".site-header");

function closeMenu() {
  if (!menuToggle || !siteNav) return;

  siteNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  if (!menuToggle || !siteNav) return;

  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

window.toggleMenu = toggleMenu;

menuToggle?.addEventListener("click", toggleMenu);
siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;

    if (!target) return;

    event.preventDefault();
    const headerOffset = siteHeader?.offsetHeight ?? 0;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: reduceMotion ? "auto" : "smooth",
    });
    window.history.pushState(null, "", targetId);
    closeMenu();
  });
});

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

function filterProjects(category = "all") {
  projectCards.forEach((card) => {
    const isVisible = category === "all" || card.dataset.category === category;
    card.hidden = !isVisible;
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === category;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

window.filterProjects = filterProjects;

filterButtons.forEach((button) => {
  button.addEventListener("click", () => filterProjects(button.dataset.filter));
});

const lightbox = document.querySelector("#project-lightbox");
const lightboxImage = lightbox?.querySelector(".lightbox-image");
const lightboxTitle = lightbox?.querySelector("#lightbox-title");
const lightboxDescription = lightbox?.querySelector("#lightbox-description");
const lightboxClose = lightbox?.querySelector(".lightbox-close");
let lastFocusedElement = null;

function closeLightbox() {
  if (!lightbox) return;

  lightbox.hidden = true;
  document.body.classList.remove("lightbox-open");
  lastFocusedElement?.focus();
}

function openLightbox(image) {
  if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxDescription) return;

  const card = image.closest(".project-card");
  const title = card?.querySelector("h3")?.textContent?.trim() ?? "Project preview";
  const description = card?.querySelector(".project-info p")?.textContent?.trim() ?? "";

  lastFocusedElement = document.activeElement;
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightboxTitle.textContent = title;
  lightboxDescription.textContent = description;
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  lightboxClose?.focus();
}

document.querySelectorAll(".project-image").forEach((image) => {
  image.setAttribute("tabindex", "0");
  image.setAttribute("role", "button");
  image.setAttribute("aria-label", `Open larger preview of ${image.alt.toLowerCase()}`);
  image.addEventListener("click", () => openLightbox(image));
  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(image);
    }
  });
});

lightbox?.querySelectorAll("[data-lightbox-close]").forEach((element) => {
  element.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
});

const contactForm = document.querySelector("#contact form");

if (contactForm) {
  contactForm.setAttribute("novalidate", "");

  const fields = {
    name: contactForm.querySelector("#name"),
    email: contactForm.querySelector("#email"),
    message: contactForm.querySelector("#message"),
  };
  const formStatus = document.createElement("p");

  formStatus.className = "form-status";
  formStatus.setAttribute("aria-live", "polite");
  formStatus.setAttribute("role", "status");
  contactForm.append(formStatus);

  const showFieldError = (field, message) => {
    if (!field) return;

    field.setAttribute("aria-invalid", "true");
    field.setAttribute("aria-describedby", `${field.id}-error`);
    let error = document.querySelector(`#${field.id}-error`);

    if (!error) {
      error = document.createElement("span");
      error.id = `${field.id}-error`;
      error.className = "field-error";
      field.closest(".form-row")?.append(error);
    }
    error.textContent = message;
  };

  const clearFieldError = (field) => {
    if (!field) return;

    field.removeAttribute("aria-invalid");
    field.removeAttribute("aria-describedby");
    document.querySelector(`#${field.id}-error`)?.remove();
  };

  const validateForm = () => {
    const name = fields.name?.value.trim() ?? "";
    const email = fields.email?.value.trim() ?? "";
    const message = fields.message?.value.trim() ?? "";
    const errors = [];

    Object.values(fields).forEach(clearFieldError);

    if (!name) {
      showFieldError(fields.name, "Please enter your name.");
      errors.push(fields.name);
    }
    if (!email) {
      showFieldError(fields.email, "Please enter your email address.");
      errors.push(fields.email);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFieldError(fields.email, "Please enter a valid email address.");
      errors.push(fields.email);
    }
    if (!message) {
      showFieldError(fields.message, "Please enter a message.");
      errors.push(fields.message);
    }

    return errors;
  };

  Object.values(fields).forEach((field) => {
    field?.addEventListener("input", () => {
      clearFieldError(field);
      formStatus.textContent = "";
      delete formStatus.dataset.state;
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const invalidFields = validateForm();

    if (invalidFields.length > 0) {
      formStatus.textContent = "Please correct the highlighted fields and try again.";
      formStatus.dataset.state = "error";
      invalidFields[0]?.focus();
      return;
    }

    formStatus.textContent = "Thanks! Your message is ready to send.";
    formStatus.dataset.state = "success";
    contactForm.reset();
    Object.values(fields).forEach(clearFieldError);
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
});
