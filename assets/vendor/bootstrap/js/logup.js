document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.php-email-form');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = form.querySelector('input[name="name"]').value;
        const email = form.querySelector('input[name="email"]').value;
        const phone = form.querySelector('input[name="tel"]').value; // Ensure this matches the name in the form
        const type = form.querySelector('select[id="speciality"]').value;
        const specialities = form.querySelector('select[id=subspecialty]').value || null; // Get value from the specialty dropdown
        const description = form.querySelector('textarea[name="message"]').value;

        try {
            const response = await fetch('https://wic-doctor.com:3004/api/logupb2b', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, type, specialities, description }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Une erreur est survenue lors de l\'inscription.');
            }

           // alert('Inscription réussie ! ' + data.message); // Show success message
            form.reset(); // Reset the form after submission

        } catch (error) {
            console.error('Error:', error);
            alert(error.message); // Show error message
        }
    }); 
});
