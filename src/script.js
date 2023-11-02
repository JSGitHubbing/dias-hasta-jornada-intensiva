var contador;
var texto;

var textoPlural = "Tardes hasta jornada intensiva";
var textoSingular = "Tarde hasta jornada intensiva";
var textoIntensiva = "¡Estamos de jornada intensiva!";

var hoy = new Date();
var inicioIntensiva = null;
var finIntensiva = null;

var startDateTag = "startDate";
var endDateTag = "endDate";

function onLoad() {
  texto = document.getElementById("texto-dias");

  inicioIntensiva = new Date(localStorage.getItem(startDateTag));
  finIntensiva = new Date(localStorage.getItem(endDateTag));

  if (!inicioIntensiva || !finIntensiva) {
    toggleDialog();
  } else {
    var startDateInput = document.getElementById("startDateInput");
    startDateInput.value = inicioIntensiva.toISOString().split("T")[0];
    var endDateInput = document.getElementById("endDateInput");
    endDateInput.value = finIntensiva.toISOString().split("T")[0];
    setup();
  }
}

function setup() {
  if (!esIntensiva()) {
    if (hoy > inicioIntensiva) {
      inicioIntensiva.setFullYear(hoy.getFullYear() + 1);
    }
    var dias = calcularDias();
    var contador = document.getElementById("contador");
    contador.innerHTML = dias;
    document.title += " (" + dias + ")";

    texto.innerHTML = dias === 1 ? textoSingular : textoPlural;
  } else {
    var container = document.getElementById("contador-container");
    container.style.display = "none";
    texto.innerHTML = textoIntensiva;
  }
}

function recalcularDias() {
  toggleDialog();
  setup();
}

function setStartDate(input) {
  inicioIntensiva = new Date(input.value);
  localStorage.setItem(startDateTag, inicioIntensiva);
}

function setEndDate(input) {
  finIntensiva = new Date(input.value);
  localStorage.setItem(endDateTag, finIntensiva);
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
  var dias = 0;
  var fechaAcumulada = new Date();
  while (fechaAcumulada < inicioIntensiva) {
    if (
      fechaAcumulada.getDay() >= 1 &&
      fechaAcumulada.getDay() <= 4 &&
      !esFestivo(fechaAcumulada)
    ) {
      dias++;
    }

    fechaAcumulada.setDate(fechaAcumulada.getDate() + 1);
  }

  return dias;
}

function esIntensiva() {
  return hoy >= inicioIntensiva && hoy < finIntensiva;
}
