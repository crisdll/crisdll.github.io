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
    window.addEventListener('scroll', function () {
        // Calcula una nueva posición basada en el desplazamiento
        let nuevaPosicion = (window.scrollY / 50);
        if (nuevaPosicion > 100) {
            nuevaPosicion = 100;
        }
        console.log(nuevaPosicion);

        // Selecciona la imagen y actualiza la posición
        const imagen = document.querySelector("#inicio .imagen img");
	imagen.style.objectPosition = 55 + nuevaPosicion + '%';
	    imagen.style.transformOrigin = 55 + nuevaPosicion + '%';
    });
}

    // Actualiza la cuenta atrás cada segundo
    setInterval(actualizarCuentaAtras, 1000);

    // Llama a la función de actualización al cargar la página
    window.onload = function() {
      actualizarCuentaAtras();
	  // Agrega un event listener para gestionar el scroll
      window.addEventListener('scroll', function () {
        sectionSelection();
      });

      // Llama a sectionSelection() también al cargar la página para establecer el estado inicial
      sectionSelection();

	    scrollImage();
	  
    };
