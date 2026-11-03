const form = document.getElementById('contact-form');

if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        document.getElementById('form-message').textContent =
            'Thank you! This is a demo form; no message was sent.';
        form.reset();
    });
}
