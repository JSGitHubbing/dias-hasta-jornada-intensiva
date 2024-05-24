import {
  START_DATE_TAG,
  END_DATE_TAG,
  INVALID_DATE_ERROR,
  CALCULATION_CONFIG_TAG,
} from "./constants.js";
import { CALCULATION_CONFIGS } from "./configurations/work-day-config.js";

export class DayCalculator {
  get startDateISO() {
    return this.startDate.toISOString().split("T")[0];
  }

  get endDateISO() {
    return this.endDate.toISOString().split("T")[0];
  }

  constructor() {
    this.currentConfig = localStorage.getItem(CALCULATION_CONFIG_TAG) ?? 0;
    this.startDate = null;
    this.endDate = null;
    this.needsDateInput = true;
    this.today = new Date();
  }

  init() {
    this.texto = document.getElementById("texto-dias");
    this.loadSavedDates();
    this.calculate();
  }

  calculate() {

    const config = CALCULATION_CONFIGS[this.currentConfig]

    if (!this.esIntensiva()) {
      if (this.today > this.startDate) {
        this.startDate.setFullYear(this.today.getFullYear() + 1);
      }
      var days = this.calculaDias();
      var counter = document.getElementById("counter");
      counter.innerHTML = days;
      document.title = "Jornada Intensiva (" + days + ")";

      this.texto.innerHTML =
        days === 1
          ? config.singularText
          : config.pruralText;
    } else {
      var container = document.getElementById("counter-container");
      container.style.display = "none";
      this.texto.innerHTML = config.intensivePeriodText;
    }
  }

  loadSavedDates() {
    var localStartDate = localStorage.getItem(START_DATE_TAG);
    var localEndDate = localStorage.getItem(END_DATE_TAG);
    this.needsDateInput = false;

    try {
      this.startDate = new Date(localStartDate);
      if (this.startDate == INVALID_DATE_ERROR)
        throw new Error(INVALID_DATE_ERROR);
    } catch {
      this.startDate = new Date();
      this.needsDateInput = true;
    }

    try {
      this.endDate = localStartDate ? new Date(localEndDate) : new Date();
      if (this.endDate == INVALID_DATE_ERROR)
        throw new Error(INVALID_DATE_ERROR);
    } catch {
      this.endDate = new Date();
      this.needsDateInput = true;
    }
  }

  calculaDias() {
    var days = 0;
    var dateSum = new Date();
    const config = CALCULATION_CONFIGS[this.currentConfig]
    while (dateSum < this.startDate) {
      if (config.condition(dateSum)) days++;

      dateSum.setDate(dateSum.getDate() + 1);
    }

    return days;
  }

  esIntensiva() {
    return this.today >= this.startDate && this.today < this.endDate;
  }

  setCalculationConfig(value) {
    this.currentConfig = value;
    localStorage.setItem(CALCULATION_CONFIG_TAG, value);
  }
}
