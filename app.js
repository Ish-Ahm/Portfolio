// handle simple contact form submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const response = document.getElementById('form-response');
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  if (!name || !email || !message) {
    response.textContent = 'Please fill in all fields.';
    response.style.color = 'red';
    response.classList.remove('hidden');
    return;
  }

  // Here you would normally send form data to a server
  // For demo, just show success message
  response.textContent = `Thanks for reaching out, ${name}! I will get back to you soon.`;
  response.style.color = 'green';
  response.classList.remove('hidden');

  // clear the form
  this.reset();
});
