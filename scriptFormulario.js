document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('num_acompanantes').addEventListener('input', function() {
		var numAcompanantes = this.value;
		var nombresAcompanantesDiv = document.getElementById('nombres_acompanantes');
		nombresAcompanantesDiv.innerHTML = '';

		for (var i = 1; i <= numAcompanantes; i++) {
		  var inputNombre = document.createElement('input');
		  inputNombre.type = 'text';
		  inputNombre.name = 'acompanante' + i;
		  inputNombre.placeholder = 'Nombre del acompañante ' + i;
		  nombresAcompanantesDiv.appendChild(inputNombre);
		  nombresAcompanantesDiv.appendChild(document.createElement('br'));
		}

		// Mostrar u ocultar la sección de acompañantes según el número ingresado
		var acompanantesSection = document.getElementById('acompanantes_section');
		acompanantesSection.style.display = numAcompanantes > 0 ? 'block' : 'none';
	});
	document.getElementById('hotel').addEventListener('click', function () {
		console.log("on click hotel")
		var hotelSection = document.getElementById('hotel_section');
		var isHotel = this.value;
		console.log(isHotel)
		hotelSection.style.display = isHotel === "si" ? 'block' : 'none';
		createRoomSection();
		// Evento para agregar una nueva habitación
	    	document.getElementById('add_room').addEventListener('click', function () {
			console.log("on click add Room")
	        	createRoomSection();
	    	});
	});	
});

function enviarFormulario() {
    // Deshabilita el botón para evitar clics repetidos
    var botonEnviar = document.querySelector('button[type="button"]');
    botonEnviar.disabled = true;

    // Muestra un icono de carga o mensaje de "pensando"
    var respuestaDiv = document.getElementById('respuesta');
    respuestaDiv.classList.add('form-tooltip');
    respuestaDiv.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Enviando...';


    // Obtiene los datos del formulario
    var formData = new FormData(document.getElementsByTagName('form')[0]);
	// Convertir los resultados de formData.entries() en un array
	var formDataArray = Array.from(formData.entries());

	// Ahora puedes acceder al length
	console.log('Número de elementos en formData:', formDataArray);

	 for (var pair of formData.entries()) {
		console.log(pair[0] + ': ' + pair[1]);
	  }

		// Realiza una solicitud AJAX para enviar los datos al script de Google Apps
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'https://script.google.com/macros/s/AKfycbzwoYIxf3FbBuT2L5u98pUVjTuaXYGN6P20zneAVYEnkUIPch7iT1bSi3uK0iqC0f9t/exec', true);
		xhr.onload = function() {
		  // Habilita el botón después de la respuesta
		  botonEnviar.disabled = false;

		  // Muestra la respuesta en el div
		  respuestaDiv.innerHTML = xhr.responseText;
		};
		xhr.send(formData);
}

function validarFormulario() {
            // Obtener el valor del campo de nombre completo
            var nombreCompleto = document.getElementById("nombre").value;

            // Verificar si el campo está vacío
            if (nombreCompleto.trim() === "") {
                // Mostrar un mensaje de error
                alert("Por favor, ingresa tu nombre completo.");
                // Evitar que el formulario se envíe
                return false;
            }
            // Verificar si los acompañantes tienen nombres
            var numAcompanantes = document.getElementById('num_acompanantes').value;
            for (var i = 1; i <= numAcompanantes; i++) {
                var nombreAcompanante = document.getElementsByName('acompanante' + i)[0].value;
                if (nombreAcompanante.trim() === "") {
                    // Mostrar un mensaje de error
                    alert("Por favor, ingresa el nombre de todos los acompañantes.");
                    // Evitar que el formulario se envíe
                    return false;
                }
            }
            enviarFormulario()

}


    
// Función para crear una nueva sección de habitación
function createRoomSection() {
        // Crea un nuevo contenedor para la habitación
        const roomDiv = document.createElement('div');
        roomDiv.classList.add('room-section');

        // Selector para tipo de hotel/apartamento
        const hotelSelect = document.createElement('select');
        hotelSelect.setAttribute('name', 'tipo_hotel[]');
        hotelSelect.innerHTML = `
            <option value="hotel">Hotel</option>
            <option value="apartamento">Apartamento</option>
        `;
        hotelSelect.addEventListener('change', function () {
            updateRoomTypeOptions(hotelSelect.value, roomDiv);
        });

        // Selector para tipo de habitación
        const roomTypeSelect = document.createElement('select');
        roomTypeSelect.setAttribute('name', 'tipo_habitacion[]');

        // Selector para número de personas
        const personSelect = document.createElement('select');
        personSelect.setAttribute('name', 'num_personas[]');
        personSelect.innerHTML = `
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        `;

        // Crea un ícono de basura para eliminar la sección
        const deleteIcon = document.createElement('span');
        deleteIcon.classList.add('material-icons'); // Clase de Material Icons
        deleteIcon.textContent = 'delete'; // Nombre del ícono de basura
        deleteIcon.style.cursor = 'pointer'; // Cambia el cursor para indicar que es clickeable
        deleteIcon.style.marginLeft = '10px'; // Espaciado a la izquierda
        deleteIcon.addEventListener('click', function () {
            tipoHotelContainer.removeChild(roomDiv); // Elimina la sección de habitación
        });

        // Agregar elementos al contenedor de habitación
        roomDiv.appendChild(hotelSelect);
        roomDiv.appendChild(roomTypeSelect);
        roomDiv.appendChild(personSelect);
        roomDiv.appendChild(deleteIcon); 

        // Añadir el contenedor de habitación al contenedor principal
        document.getElementById('tipo_hotel').appendChild(roomDiv);

        // Actualiza las opciones de tipo de habitación según el tipo de hotel
        updateRoomTypeOptions(hotelSelect.value, roomDiv);
    }

    // Función para actualizar las opciones de tipo de habitación
    function updateRoomTypeOptions(hotelType, roomDiv) {
        const roomTypeSelect = roomDiv.querySelector('select[name="tipo_habitacion[]"]');
        roomTypeSelect.innerHTML = ''; // Limpiar opciones anteriores

        let options = [];

        if (hotelType === 'hotel') {
            options = ['Habitación estándar', 'Suite', 'Habitación familiar'];
        } else if (hotelType === 'apartamento') {
            options = ['Apartamento de una habitación', 'Apartamento de dos habitaciones'];
        }

        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            roomTypeSelect.appendChild(opt);
        });
    }
