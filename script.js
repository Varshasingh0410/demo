
/* =========================================
   MADHURHASYA DENTAL CARE
   Vanilla JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTS
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementElementById
    ? document.getElementElementById("navLinks")
    : document.getElementById("navLinks");

  const appointmentForm = document.getElementById("appointmentForm");
  const formError = document.getElementById("formError");
  const dateInput = document.getElementById("date");
  const yearElement = document.getElementById("year");

  // CLINIC WHATSAPP NUMBER
  const clinicWhatsApp = "917039671210";

  // CURRENT YEAR
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // SET MINIMUM APPOINTMENT DATE TO TODAY
  if (dateInput) {
    const today = new Date();
    const localToday = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    dateInput.min = localToday;
  }

  // MOBILE NAVIGATION
  function toggleMenu() {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  }

  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", toggleMenu);

    // CLOSE MENU WHEN NAV LINK IS CLICKED
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    // CLOSE MENU WHEN ESCAPE IS PRESSED
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // CLOSE MENU IF RESIZED TO DESKTOP
    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) {
        closeMenu();
      }
    });
  }

  // NAVBAR SCROLL EFFECT
  function handleNavbarScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // FALLBACK FOR OLDER BROWSERS
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // TREATMENT LINKS
  // Clicking treatment cards preselects the appointment form.
  document.querySelectorAll("[data-treatment]").forEach(link => {
    link.addEventListener("click", () => {
      const treatmentSelect = document.getElementById("treatment");

      if (treatmentSelect) {
        treatmentSelect.value = link.dataset.treatment;
      }
    });
  });

  // APPOINTMENT FORM
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", event => {
      event.preventDefault();

      if (formError) {
        formError.textContent = "";
      }

      // READ FORM VALUES
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const treatment = document.getElementById("treatment").value;
      const date = document.getElementById("date").value;
      const message = document.getElementById("message").value.trim();

      // NAME VALIDATION
      if (name.length < 2) {
        showError("Please enter your full name.");
        document.getElementById("name").focus();
        return;
      }

      // PHONE VALIDATION
      const cleanedPhone = phone.replace(/[\s\-()+]/g, "");

      if (!/^\+?\d{10,13}$/.test(cleanedPhone)) {
        showError("Please enter a valid phone number.");
        document.getElementById("phone").focus();
        return;
      }

      // TREATMENT VALIDATION
      if (!treatment) {
        showError("Please select a treatment.");
        document.getElementById("treatment").focus();
        return;
      }

      // DATE VALIDATION
      if (date) {
        const selectedDate = new Date(date + "T00:00:00");
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
          showError("Please select today or a future date.");
          document.getElementById("date").focus();
          return;
        }
      }

      // BUILD WHATSAPP MESSAGE
      const whatsappMessage =
        "Hello Madhurhasya Dental Care, I would like to request an appointment.\n\n" +
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Treatment: " + treatment + "\n" +
        "Preferred Date: " + (date || "Not specified") + "\n" +
        "Message: " + (message || "No additional message");

      // OPEN WHATSAPP
      const whatsappURL =
        "https://wa.me/" +
        clinicWhatsApp +
        "?text=" +
        encodeURIComponent(whatsappMessage);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }

  // ERROR MESSAGE HELPER
  function showError(text) {
    if (formError) {
      formError.textContent = text;
    }
  }

  // CLEAR ERROR ON INPUT
  document.querySelectorAll("#appointmentForm input, #appointmentForm select, #appointmentForm textarea")
    .forEach(field => {
      field.addEventListener("input", () => {
        if (formError) {
          formError.textContent = "";
        }
      });
    });

  // BACK TO TOP
  const backToTop = document.querySelector(".back-top");

  if (backToTop) {
    backToTop.addEventListener("click", event => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // IMAGE FALLBACK
  // If a remote image fails, hide it instead of displaying a broken image icon.
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
      img.style.opacity = "0";
    });
  });
});
