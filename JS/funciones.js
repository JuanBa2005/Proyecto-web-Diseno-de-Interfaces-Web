// Función para el efecto de scroll en el encabezado y cambio de color
window.addEventListener("scroll", function () {
    const header = document.getElementById("encabezado");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Función para el Slider de la Hero Image
document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.imagenHero img');
    let current = 0;

    // Función para cambiar la imagen activa
    function changeImage() {
        images[current].classList.remove('active');
        current = (current + 1) % images.length;
        images[current].classList.add('active');
    }

    // Intervalo para cambiar la imagen cada 5 segundos
    setInterval(changeImage, 5000);
});

// Función para cambiar el contenido de la galería al hacer clic en las pestañas
function showGallery(tabIndex) {
    var galleries = document.querySelectorAll('.gallery');
    galleries.forEach((gallery, index) => {
        gallery.classList.toggle('active', index === tabIndex);
    });
}

// Función para mostrar el lightbox que contiene la imagen seleccionada
document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentGalleryImages = [];
    let currentIndex = 0;

    // Asignar evento click a cada imagen de cada contenedor gallery
    const galleries = document.querySelectorAll('.gallery');
    galleries.forEach(gallery => {
        const images = gallery.querySelectorAll('img');
        images.forEach((img) => {
            img.addEventListener('click', function () {
                // Recolectar todas las imágenes del contenedor actual
                currentGalleryImages = Array.from(gallery.querySelectorAll('img'));
                // Determinar el índice de la imagen clickeada
                currentIndex = currentGalleryImages.indexOf(img);
                openLightbox(currentGalleryImages[currentIndex].src);
            });
        });
    });

    function openLightbox(src) {
        lightbox.style.display = 'block';
        lightboxImg.src = src;
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        lightboxImg.src = currentGalleryImages[currentIndex].src;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % currentGalleryImages.length;
        lightboxImg.src = currentGalleryImages[currentIndex].src;
    }

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Cerrar lightbox al hacer click fuera de la imagen
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
});

// Función para animar la sección de contacto al hacer scroll
// Esta función se encarga de observar la sección de contacto y agregar una clase activa cuando entra en el viewport
document.addEventListener('DOMContentLoaded', function () {
    const contactoSection = document.getElementById('contacto');

    // Configuración del IntersectionObserver
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Se deja de observar para que la animación solo se ejecute una vez
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // La animación se activará cuando el 50% de la sección sea visible
    });

    observer.observe(contactoSection);
});

// Función para mostrar un mensaje como modal al enviar el formulario de contacto con los datos introducidos
document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('miFormulario');
    const modal = document.getElementById('modal');
    const contenidoModal = document.getElementById('contenidoModal');
    const cerrarModal = document.getElementById('cerrarModal');

    // Interceptar el evento de envío del formulario
    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir la recarga de la página

        // Recoger los valores de los campos
        const nombre = formulario.querySelector("input[aria-label='Nombre']").value;
        const correo = formulario.querySelector("input[aria-label='Correo Electrónico']").value;
        const comentario = formulario.querySelector("textarea").value;

        // Construir el mensaje a mostrar en el modal
        const mensaje = `El nombre que ha introducido es: "${nombre}".\nEl correo electrónico, que será no cabe duda es: "${correo}".\nY como no el comentario escrito hacia el responsable de mirarlos, que no sabe ni quién es el responsable, es: "${comentario}"`;
        contenidoModal.innerHTML = mensaje;
        modal.style.display = "block";
    });

    // Función para cerrar el modal al pulsar el botón de cerrar
    cerrarModal.addEventListener('click', function () {
        modal.style.display = "none";
    });

    // Cerrar el modal al hacer clic fuera del contenido
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});