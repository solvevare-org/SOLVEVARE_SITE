document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const submitBtn = form.querySelector('.submit-btn');
  const submitText = submitBtn.querySelector('span');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      source: document.getElementById('source').value,
      interest: document.getElementById('interest').value,
      message: document.getElementById('message').value,
    };

    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';

    try {
      const base = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:4000' : '';
      
      const url = base ? base + '/api/contact' : '/api/contact';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error?.error || error?.details || 'Failed to send message');
      }

      submitText.textContent = 'Message Sent!';
      form.reset();

      setTimeout(() => {
        submitText.textContent = 'Send Message';
        submitBtn.disabled = false;
      }, 4000);

    } catch (error) {
      console.error('Send error:', error);
      alert(`Failed to send message: ${error.message || 'Please try again later.'}`);
      submitText.textContent = 'Send Message';
      submitBtn.disabled = false;
    }
  });
});
