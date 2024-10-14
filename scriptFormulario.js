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
	document.getElementById('hotel').addEventListener('change', function () {
		var hotelSection = document.getElementById('hotel_section');
		var isHotel = this.value;
		hotelSection.style.display = isHotel === "si" ? 'block' : 'none';
		if (isHotel === "si" && document.getElementById('tipo_hotel').childElementCount === 0) {
		        createRoomSection();
		    }
	});
	// Evento para agregar una nueva habitación
	    	document.getElementById('add_room').addEventListener('click', function () {
	        	createRoomSection();
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


 // Objeto que define el número máximo de personas por tipo de habitación y su categoría (hotel o apartamento)
const maxPersonasPorHabitacion = {
    'Comfort': { max: 1, categoria: 'hotel' },
    'Superior': { max: 3, categoria: 'hotel' },
    'Superior Balcón': { max: 3, categoria: 'hotel' },
    'Junior Suite': { max: 4, categoria: 'hotel' },
    'Junior Suite Balcón': { max: 4, categoria: 'hotel' },
    'Superior Cuádruple': { max: 4, categoria: 'hotel' },
    'Premium Balcón Jacuzzi Interior': { max: 2, categoria: 'hotel' },
    'Premium Terraza Jacuzzi Interior': { max: 2, categoria: 'hotel' },
    'Premium Terraza Jacuzzi Exterior': { max: 2, categoria: 'hotel' },
    'Privilege Terraza Jacuzzi Exterior': { max: 2, categoria: 'hotel' },
    'Suite Terraza Jacuzzi Exterior': { max: 4, categoria: 'hotel' },
    'Suite Privilege Terraza Jacuzzi Exterior': { max: 2, categoria: 'hotel' },
    'Estudio Balcón': { max: 2, categoria: 'apartamento' },
    'Apartamento 1 Habitación': { max: 4, categoria: 'apartamento' },
    'Apartamento 1 Habitación Balcón': { max: 4, categoria: 'apartamento' },
    'Apartamento 1 Habitación Terraza': { max: 4, categoria: 'apartamento' },
    'Apartamento 2 Habitaciones Balcón': { max: 6, categoria: 'apartamento' },
    'Apartamento 2 Habitaciones Terraza': { max: 6, categoria: 'apartamento' }
};

// Función para crear una nueva sección de habitación
function createRoomSection() {
    const roomDiv = document.createElement('div');
    roomDiv.classList.add('room-section');

    const hotelSelect = document.createElement('select');
    hotelSelect.setAttribute('name', 'tipo_hotel[]');
    hotelSelect.innerHTML = `
        <option value="hotel">Hotel</option>
        <option value="apartamento">Apartamento</option>
    `;
    hotelSelect.addEventListener('change', function () {
        updateRoomTypeOptions(hotelSelect.value, roomDiv);
    });

    const roomTypeSelect = document.createElement('select');
    roomTypeSelect.setAttribute('name', 'tipo_habitacion[]');
    roomTypeSelect.addEventListener('change', function () {
        updatePersonOptions(roomTypeSelect.value, personSelect);
    });

    const personSelect = document.createElement('select');
    personSelect.setAttribute('name', 'num_personas[]');

    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('material-icons');
    deleteIcon.textContent = 'delete';
    deleteIcon.style.cursor = 'pointer';
    deleteIcon.style.marginLeft = '10px';
    deleteIcon.style.color = 'indianred';
    deleteIcon.addEventListener('click', function () {
        deleteIcon.parentElement.remove();
    });

    roomDiv.appendChild(hotelSelect);
    roomDiv.appendChild(roomTypeSelect);
    roomDiv.appendChild(personSelect);
    roomDiv.appendChild(deleteIcon);

    document.getElementById('tipo_hotel').appendChild(roomDiv);
    updateRoomTypeOptions(hotelSelect.value, roomDiv);
}

// Función para actualizar las opciones de tipo de habitación según la categoría
function updateRoomTypeOptions(hotelType, roomDiv) {
    const roomTypeSelect = roomDiv.querySelector('select[name="tipo_habitacion[]"]');
    roomTypeSelect.innerHTML = '';

    // Filtrar las opciones según la categoría (hotel o apartamento)
    const opciones = Object.keys(maxPersonasPorHabitacion).filter(
        habitacion => maxPersonasPorHabitacion[habitacion].categoria === hotelType
    );

    // Añadir las opciones filtradas al selector
    opciones.forEach(opcion => {
        const opt = document.createElement('option');
        opt.value = opcion;
        opt.textContent = opcion;
        roomTypeSelect.appendChild(opt);
    });

    // Actualiza el selector de número de personas cuando cambia el tipo de habitación
    roomTypeSelect.dispatchEvent(new Event('change'));
}

// Función para actualizar las opciones de número de personas según el tipo de habitación
function updatePersonOptions(tipoHabitacion, personSelect) {
    personSelect.innerHTML = ''; // Limpiar opciones anteriores

    const maxPersonas = maxPersonasPorHabitacion[tipoHabitacion]?.max || 1;
    for (let i = 1; i <= maxPersonas; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i;
        personSelect.appendChild(opt);
    }
}
