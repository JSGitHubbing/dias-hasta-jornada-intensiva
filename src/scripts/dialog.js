import { START_DATE_TAG, END_DATE_TAG } from "./constants.js";

export class ConfigDialog {

  set dialogDisplay(value) {
    this._dialogDisplay = value
    dialog.style.setProperty(
      "visibility",
      this._dialogDisplay ? "visible" : "hidden"
    );
  }

  constructor(dayCalculator) {
    this.dayCalculator = dayCalculator;

    this.dialog = document.getElementById("dialog");
    this._dialogDisplay = false;

    document.getElementById("config-dialog-backdrop").onclick = () =>
      this.toggleDialog();

    document.getElementById("config-dialog-start-date-input").onchange = (
      event
    ) => this.setStartDate(event);

    document.getElementById("config-dialog-end-date-input").onchange = (
      event
    ) => this.setEndDate(event);

    document.getElementById("config-dialog-calculation-config").value = dayCalculator.currentConfig
    document.getElementById("config-dialog-calculation-config").onchange = (
      event
    ) => this.setCalculationConfig(event);

    document.getElementById("config-dialog-confirm-button").onclick = () =>
      {
        this.dialogDisplay = false;
        this.dayCalculator.calculate();
      }
  }

  toggleDialog() {
    this.dialogDisplay = !this.dialogDisplay;
  }

  setStartDate(event) {
    localStorage.setItem(START_DATE_TAG, event.target.value);
    this.dayCalculator.calculate();
  }

  setEndDate(event) {
    localStorage.setItem(END_DATE_TAG, event.target.value);
    this.dayCalculator.calculate();
  }

  setCalculationConfig(event) {
    this.dayCalculator.setCalculationConfig(event.target.value)
  }
}
