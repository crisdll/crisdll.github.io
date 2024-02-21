if (performance.navigation.type === 1) {
     // La página se ha cargado mediante recarga o navegación
    window.location.href = "https://crisdll.github.io"; // Recarga la página
}

// Calcula la cuenta atrás
function actualizarCuentaAtras() {
    var fechaEvento = new Date('2025-05-10T12:00:00'); // Fecha y hora del evento
    var fechaActual = new Date(); // Fecha y hora actuales

    var diferencia = fechaEvento - fechaActual;
    var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    var horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    var segundos = Math.floor((diferencia % (1000 * 60)) / (1000));

    document.getElementById('dias').firstElementChild.innerHTML = dias;
    document.getElementById('horas').firstElementChild.innerHTML = horas;
    document.getElementById('min').firstElementChild.innerHTML = minutos;
    document.getElementById('seg').firstElementChild.innerHTML = segundos;
}

function sectionSelection() {
    var sections = document.querySelectorAll('section');
    var navLinks = document.querySelectorAll('nav a');

    sections.forEach(function (section, index) {
        var rect = section.getBoundingClientRect();
        if (rect.top <= 50 && rect.bottom >= 50) {
            navLinks.forEach(function (link) {
                link.classList.remove('active');
            });
            navLinks[index].classList.add('active');
        }
    });
}


function scrollImage() {
     const imagen1 = document.querySelector("#inicio .imagen img");
    const imagen2 = document.querySelector("#participa img");
     const rectImagen1 = imagen1.getBoundingClientRect();
    const rectImagen2 = imagen1.getBoundingClientRect();
    const headerHeight = document.querySelector("header").getBoundingClientRect().height;
    const screenHeight = window.innerHeight;

    // Verifica si es un dispositivo móvil
    const isMobile = window.innerWidth <= 768; // Ajusta según tus necesidades

     // Calcula una nueva posición basada en el desplazamiento
     if(isMobil){
          // IMAGEN 1
         if(screenHeight > rectImagen1.top  && headerHeight < rectImagen1.bottom){
             let nuevaPosicion1 = (1-((rectImagen1.top+rectImagen1.height-headerHeight)/(screenHeight+rectImagen1.height-headerHeight)))*100
             imagen1.style.objectPosition = nuevaPosicion1 + '%';
         }

          //IMAGEN 2
          if(screenHeight > rectImagen2.top  && headerHeight < rectImagen2.bottom){
             let nuevaPosicion2 = (1-((rectImagen2.top+rectImagen2.height-headerHeight)/(screenHeight+rectImagen2.height-headerHeight)))*100
             imagen2.style.objectPosition = 'center ' + nuevaPosicion2 + '%';
         }
          
     }else{
          // IMAGEN 1
         let nuevaPosicion1 = 70 + (window.scrollY - position1) / 50;
         if (nuevaPosicion1 < 0) nuevaPosicion1 = 0;
         if (nuevaPosicion1 > 100) nuevaPosicion1 = 100;
         imagen1.style.objectPosition = nuevaPosicion1 + '%';
     }
    
    

    

    
}



// Llama a la función de actualización al cargar la página
window.onload = function () { 
    actualizarCuentaAtras();
    // Actualiza la cuenta atrás cada segundo
    setInterval(actualizarCuentaAtras, 1000);
    // Llama a sectionSelection() también al cargar la página para establecer el estado inicial
    sectionSelection();
    scrollImage();
    
    // Agrega un event listener para gestionar el scroll
    window.addEventListener('scroll', function () {
        sectionSelection();
        scrollImage();
    });
};
