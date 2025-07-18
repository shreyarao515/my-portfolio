// Function to show a toast message
function showToast(message, isSuccess = true) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '8px';
  toast.style.color = 'white';
  toast.style.zIndex = '1000';
  toast.style.transition = 'opacity 0.5s ease-in-out';
  toast.style.opacity = '0';
  toast.style.backgroundColor = isSuccess ? '#3a86ff' : '#dc2626';
  document.body.appendChild(toast);

  setTimeout(() => {
      toast.style.opacity = '1';
  }, 10);
  setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
});

// Typing animation
document.addEventListener('DOMContentLoaded', function() {
  const typedElement = document.getElementById('typed');
  const words = ['Full Stack Developer', 'Web Developer', 'Problem Solver', 'Tech Enthusiast'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 200;
  let deletingSpeed = 100;
  let endPause = 2000;
  let startTyping = true;
  
  function type() {
      const currentWord = words[wordIndex];
      
      if (startTyping) {
          typedElement.textContent = currentWord.substring(0, charIndex);
          
          if (!isDeleting) {
              charIndex++;
              
              if (charIndex === currentWord.length) {
                  isDeleting = true;
                  setTimeout(type, endPause);
                  return;
              }
          } else {
              charIndex--;
              
              if (charIndex === 0) {
                  isDeleting = false;
                  wordIndex = (wordIndex + 1) % words.length;
              }
          }
          
          const speed = isDeleting ? deletingSpeed : typingSpeed;
          setTimeout(type, speed);
      }
  }
  
  type();
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
              
              // Close mobile menu if open
              const mobileMenu = document.getElementById('mobile-menu');
              mobileMenu.classList.add('hidden');
          }
      });
  });
  
  // Back to top button
  const backToTopButton = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
          backToTopButton.classList.remove('opacity-0', 'invisible');
      } else {
          backToTopButton.classList.add('opacity-0', 'invisible');
      }
  });
  
  backToTopButton.addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
  
  // Form validation and submission with EmailJS
  const contactForm = document.getElementById('contactForm');
  const submitButton = contactForm.querySelector('button[type="submit"]');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Reset error states
          document.querySelectorAll('.text-red-500').forEach(el => {
              el.classList.add('hidden');
          });
          
          let isValid = true;
          
          const name = document.getElementById('name');
          if (!name.value.trim()) {
              document.getElementById('nameError').classList.remove('hidden');
              isValid = false;
          }
          
          const email = document.getElementById('email');
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email.value)) {
              document.getElementById('emailError').classList.remove('hidden');
              isValid = false;
          }
          
          const subject = document.getElementById('subject');
          if (!subject.value.trim()) {
              document.getElementById('subjectError').classList.remove('hidden');
              isValid = false;
          }
          
          const message = document.getElementById('message');
          if (!message.value.trim()) {
              document.getElementById('messageError').classList.remove('hidden');
              isValid = false;
          }
          
          if (isValid) {
              // Change button state to "sending"
              submitButton.textContent = 'Sending...';
              submitButton.disabled = true;
              
              // EmailJS Integration
              emailjs.init({
                  publicKey: 'sOYJYfkAPW8TFoN9_'
              });
              
              emailjs.send("service_0rwv2fp", "template_j0p9zqk", {
                  from_name: name.value,
                  from_email: email.value,
                  to_name: "Shreya",
                  subject: subject.value,
                  message: message.value
              })
              .then(function(response) {
                  showToast('Message sent successfully!', true);
                  contactForm.reset();
                  // Restore button state
                  submitButton.textContent = 'Send Message';
                  submitButton.disabled = false;
              }, function(error) {
                  showToast('Failed to send message. Please try again.', false);
                  // Restore button state on failure
                  submitButton.textContent = 'Send Message';
                  submitButton.disabled = false;
              });
          }
      });
      
      // Add real-time validation
      document.getElementById('name').addEventListener('input', function() {
          if (this.value.trim()) {
              document.getElementById('nameError').classList.add('hidden');
          }
      });
      
      document.getElementById('email').addEventListener('input', function() {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(this.value)) {
              document.getElementById('emailError').classList.add('hidden');
          }
      });
      
      document.getElementById('subject').addEventListener('input', function() {
          if (this.value.trim()) {
              document.getElementById('subjectError').classList.add('hidden');
          }
      });
      
      document.getElementById('message').addEventListener('input', function() {
          if (this.value.trim()) {
              document.getElementById('messageError').classList.add('hidden');
          }
      });
  }
});

// Scroll animations
const sections = document.querySelectorAll('.animate-on-scroll');
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
      }
  });
}, observerOptions);

sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(50px)';
  section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(section);
});