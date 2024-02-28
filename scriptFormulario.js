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

    // Realiza una solicitud AJAX para enviar los datos al script de Google Apps
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbzDyyzk_YcfnpmmBE1Ddb5qEuO9M7onGTnlq0ouvl5Mbs4DO-CmglrspB4G8Scd1l58/exec', true);
    xhr.onload = function() {
      // Habilita el botón después de la respuesta
      botonEnviar.disabled = false;

      // Muestra la respuesta en el div
      respuestaDiv.innerHTML = xhr.responseText;
    };
    xhr.send(formData);
  }
