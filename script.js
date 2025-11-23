// Menu Toggle for Mobile
const menuToggle = document.querySelector(".menu-toggle")
const navMenu = document.querySelector(".nav-menu")

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")

    // Animate hamburger icon
    const spans = menuToggle.querySelectorAll("span")
    spans[0].style.transform = navMenu.classList.contains("active")
      ? "rotate(45deg) translate(5px, 5px)"
      : "rotate(0) translate(0, 0)"
    spans[1].style.opacity = navMenu.classList.contains("active") ? "0" : "1"
    spans[2].style.transform = navMenu.classList.contains("active")
      ? "rotate(-45deg) translate(7px, -6px)"
      : "rotate(0) translate(0, 0)"
  })
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-menu a")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")
      const spans = menuToggle.querySelectorAll("span")
      spans[0].style.transform = "rotate(0) translate(0, 0)"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "rotate(0) translate(0, 0)"
    }
  })
})

// Fade-in animation on scroll
const fadeInElements = document.querySelectorAll(".fade-in")

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

fadeInElements.forEach((element) => {
  observer.observe(element)
})

// Contact Form Validation
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Clear previous errors
    clearErrors()

    let isValid = true

    // Get form values
    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const subject = document.getElementById("subject").value.trim()
    const message = document.getElementById("message").value.trim()

    // Validate name (minimum 3 characters)
    if (name.length < 3) {
      showError("nameError", "Nome deve ter pelo menos 3 caracteres")
      isValid = false
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showError("emailError", "Por favor, insira um e-mail válido")
      isValid = false
    }

    // Validate subject (minimum 5 characters)
    if (subject.length < 5) {
      showError("subjectError", "Assunto deve ter pelo menos 5 caracteres")
      isValid = false
    }

    // Validate message (minimum 10 characters)
    if (message.length < 10) {
      showError("messageError", "Mensagem deve ter pelo menos 10 caracteres")
      isValid = false
    }

    // If valid, show success message
    if (isValid) {
      const successMessage = document.getElementById("successMessage")
      successMessage.textContent = "Mensagem enviada com sucesso! Entraremos em contato em breve."
      successMessage.classList.add("show")

      // Reset form
      contactForm.reset()

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.classList.remove("show")
      }, 5000)
    }
  })
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  errorElement.textContent = message
}

function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message")
  errorMessages.forEach((error) => {
    error.textContent = ""
  })
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
