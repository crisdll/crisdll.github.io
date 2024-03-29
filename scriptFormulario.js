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

  document.getElementById('transporte').addEventListener('change', function() {
    var lugaresTransportSection = document.getElementById('lugares_transport_section');
    var salidaLabel = document.getElementById('salida_label');
    var salidaSelect = document.getElementById('salida');
    var llegadaLabel = document.getElementById('llegada_label');
    var llegadaSelect = document.getElementById('llegada');

    // Ocultar todas las opciones de salida y llegada por defecto
    salidaLabel.style.display = 'none';
    salidaSelect.style.display = 'none';
    llegadaLabel.style.display = 'none';
    llegadaSelect.style.display = 'none';

    // Mostrar u ocultar la sección de lugares de transporte según la opción seleccionada
    lugaresTransportSection.style.display = this.value !== 'no' ? 'block' : 'none';

    // Mostrar u ocultar los lugares de acuerdo con la opción seleccionada
    if (this.value === 'ida_vuelta') {
      salidaLabel.textContent = 'Lugar de salida:';
      llegadaLabel.textContent = 'Lugar de llegada:';
      salidaLabel.style.display = 'block';
      salidaSelect.style.display = 'block';
      llegadaLabel.style.display = 'block';
      llegadaSelect.style.display = 'block';
    } else if (this.value === 'ida') {
      salidaLabel.textContent = 'Lugar de salida:';
      salidaLabel.style.display = 'block';
      salidaSelect.style.display = 'block';
    } else if (this.value === 'vuelta') {
      llegadaLabel.textContent = 'Lugar de llegada:';
      llegadaLabel.style.display = 'block';
      llegadaSelect.style.display = 'block';
    }
  });
})

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
