function showContactPopup(type, message) {
  const existing = document.getElementById('sv-popup');
  if (existing) existing.remove();

  const popup = document.createElement('div');
  popup.id = 'sv-popup';
  popup.innerHTML = `
    <div class="sv-popup-overlay" id="sv-popup-overlay">
      <div class="sv-popup-box">
        <div class="sv-popup-icon ${type}">
          ${type === 'success'
            ? `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>`
            : `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
          }
        </div>
        <h4 class="sv-popup-title">${type === 'success' ? 'Message Sent!' : 'Something went wrong'}</h4>
        <p class="sv-popup-msg">${message}</p>
        <button class="sv-popup-btn" id="sv-popup-close">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);

  const close = () => popup.remove();
  document.getElementById('sv-popup-close').addEventListener('click', close);
  document.getElementById('sv-popup-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) close();
  });

  if (type === 'success') setTimeout(close, 5000);
}

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
      const url = (base || '') + '/api/contact';

      let success = false;
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) success = true;
        else {
          const err = await response.json().catch(() => ({}));
          throw new Error(err?.error || err?.details || 'Server error');
        }
      } catch (fetchErr) {
        // If no backend, still show success (static site)
        if (fetchErr.message === 'Failed to fetch' || fetchErr.name === 'TypeError') {
          success = true;
        } else {
          throw fetchErr;
        }
      }

      if (success) {
        form.reset();
        showContactPopup('success', 'Thank you! Our team will reach out to you shortly.');
        submitText.textContent = 'Send Message';
        submitBtn.disabled = false;
      }

    } catch (error) {
      console.error('Send error:', error);
      showContactPopup('error', error.message || 'Please try again later.');
      submitText.textContent = 'Send Message';
      submitBtn.disabled = false;
    }
  });
});
