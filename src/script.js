import { DayCalculator } from "./scripts/day-calculator.js";
import { ConfigDialog } from "./scripts/dialog.js";

document.onload = onLoad();

var configDialog;
var dayCalculator;

function onLoad() {
  dayCalculator = new DayCalculator();
  configDialog = new ConfigDialog(dayCalculator);

  dayCalculator.init();

  document.getElementById("config-button").onclick = () =>
    configDialog.toggleDialog();

  if (dayCalculator.needsDateInput) {
    configDialog.toggleDialog();
  } else {
    document.getElementById("config-dialog-start-date-input").value =
      dayCalculator.startDateISO;

    document.getElementById("config-dialog-end-date-input").value =
      dayCalculator.endDateISO;
  }
}
