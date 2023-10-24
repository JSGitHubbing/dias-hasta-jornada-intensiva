var contador;
var texto;

var textoPlural = "Tardes hasta jornada intensiva";
var textoSingular = "Tarde hasta jornada intensiva";
var textoIntensiva = "¡Estamos de jornada intensiva!";

function onLoad() {
  texto = document.getElementById("texto-dias");
  if (!esIntensiva()) {
    var dias = calcularDias();
    var contador = document.getElementById("contador");
    contador.innerHTML = dias;
    document.title += ' (' + dias + ')';

    texto.innerHTML = dias === 1 ? textoSingular : textoPlural;
  } else {
    var container = document.getElementById("contador-container");
    container.style.display = "none";
    texto.innerHTML = textoIntensiva;
  }
}

function esFestivo(fecha) {
  var festivos = [
    { dia: 1, mes: 1 },
    { dia: 6, mes: 1 },
    { dia: 1, mes: 3 },
    { dia: 15, mes: 8 },
    { dia: 12, mes: 10 },
    { dia: 1, mes: 11 },
    { dia: 6, mes: 12 },
    { dia: 8, mes: 12 },
    { dia: 25, mes: 12 },
    viernesSanto(fecha),
  ];

  festivos.find((festivo) => {
    fecha.getMonth() + 1 === festivo.mes && fecha.getDate() === festivo.dia;
  });
}

function viernesSanto(fecha) {
  if (fecha.getFullYear() === 2024) return { dia: 29, mes: 3 };
  if (fecha.getFullYear() === 2025) return { dia: 18, mes: 4 };
  return [];
}

function calcularDias() {
  var hoy = new Date();

  var siguienteJornadaIntensiva = new Date(hoy.getFullYear(), 6, 1);
  if (hoy > siguienteJornadaIntensiva) {
    siguienteJornadaIntensiva.setFullYear(hoy.getFullYear() + 1);
  }

  var dias = 0;
  while (hoy < siguienteJornadaIntensiva) {
    if (hoy.getDay() >= 1 && hoy.getDay() <= 4 && !esFestivo(hoy)) {
      dias++;
    }

    hoy.setDate(hoy.getDate() + 1);
  }

  return dias;
}

function esIntensiva() {
  var hoy = new Date();

  var inicioIntensiva = new Date(hoy.getFullYear(), 6, 1);
  var finIntensiva = new Date(hoy.getFullYear(), 8, 15);

  return hoy >= inicioIntensiva && hoy < finIntensiva;
}
