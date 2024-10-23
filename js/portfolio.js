document.addEventListener("DOMContentLoaded", iniciar, false);

function iniciar(){
    longProject();
    popup();
    sendForm();
}

function longProject() {
    const projectGrid = document.querySelector('.project-grid');
    const projectCards = document.querySelectorAll('.project-card');

    console.log(projectCards.length);

    const screenWidth = window.innerWidth;

    if(screenWidth < 768){
        projectGrid.style.gridTemplateColumns = 'repeat(1, 1fr)';
    } else {
        const columns = projectCards.length < 3 ? projectCards.length : 3;
        projectGrid.style.gridTemplateColumns = `repeat(${projectCards.length}, 1fr)`;
    }

    window.addEventListener('resize', longProject);
}

function popup() {
    const projectCards = document.querySelectorAll('.project-card');
    const closeBtns = document.querySelectorAll('.close-btn');

    // Mostrar el pop-up cuando se haga clic en el div
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            if(event.target.tagName.toLowerCase() === 'a'){
                return;
            }
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'flex';
        })
    });

    // Cerrar el pop-up cuando se haga clic en la 'X'
    closeBtns.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.popup').style.display = 'none';
        })
    });

    // Cerrar el pop-up si se hace clic fuera del contenido del pop-up
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('popup')) {
            event.target.style.display = 'none';
        }
    });
}

function sendForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);

        // Hacer la solicitud POST de manera asíncrona
        fetch('https://formsubmit.co/ruizcostaivan9@gmail.com', {
            method: 'POST',
            body: formData
        })
        .then (response => {
            if(response.ok) {
                showMessage('Correo enviado con éxito', form);
                form.reset();
            } else {
                throw new Error('Error en el envío del formulario');
            }
        })
        .catch (error => {
            showMessage('Hubo un error al enviar el correo');
            console.error('Error al enviar el formulario:', error);
        });
    });
}

function showMessage(message, form) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('form-message');
    messageContainer.textContent = message;
    form.appendChild(messageContainer);
    
    // Eliminar el mensaje después de 5 segundos
    setTimeout(() => {
        messageContainer.remove();
    }, 5000);
}