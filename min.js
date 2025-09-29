/* Global JS for mobile nav toggle and contact form AJAX to Formspree */

// --- Mobile menu toggle ---
document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');
  if(toggle && nav){
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.classList.toggle('open');
    });
  }

  // Close mobile nav when clicking a link (mobile)
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => {
      if(nav.classList.contains('open')) nav.classList.remove('open');
      if(toggle && toggle.classList.contains('open')) toggle.classList.remove('open');
    });
  });

  // --- Contact form AJAX using Fetch to Formspree ---
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', async function(e){
      e.preventDefault();
      const successBox = document.querySelector('.form-success');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      const formData = new FormData(contactForm);

      // Use form action attribute
      const endpoint = contactForm.getAttribute('action');

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });

        if(res.ok){
          // Show success message inline
          successBox.style.display = 'block';
          successBox.style.background = '#e6fff0';
          successBox.style.color = '#065f3b';
          successBox.style.border = '1px solid #b7f0c9';
          successBox.textContent = "Thank you — your message has been sent.";
          contactForm.reset();
        } else {
          const data = await res.json();
          // show friendly error
          successBox.style.display = 'block';
          successBox.style.background = '#fff1f1';
          successBox.style.color = '#8a1f1f';
          successBox.style.border = '1px solid #f5c2c2';
          if(data && data.errors && data.errors.length) {
            successBox.textContent = "Unable to send message: " + (data.errors[0].message || 'Server rejected request.');
          } else {
            successBox.textContent = "Unable to send message. Please try again later.";
          }
        }
      } catch(err){
        successBox.style.display = 'block';
        successBox.style.background = '#fff1f1';
        successBox.style.color = '#8a1f1f';
        successBox.style.border = '1px solid #f5c2c2';
        successBox.textContent = "Network error. Please check your internet connection and try again.";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    });
  }
});