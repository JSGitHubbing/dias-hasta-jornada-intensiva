import { HolidayCalculator } from "../holiday-calculator/holiday-calculator.js";

export const INTENSIVE_PERIOND_TEXT = "¡Estamos en jornada intensiva!";

const EveningConfig = {
  pruralText: "Tardes de trabajo hasta jornada intensiva",
  singularText: "Tarde de trabajo hasta jornada intensiva",
  intensivePeriodText: INTENSIVE_PERIOND_TEXT,
  condition: (date) =>
    date.getDay() >= 1 &&
    date.getDay() <= 4 &&
    !HolidayCalculator.isHolyday(date),
};

const WorkDayConfig = {
  pruralText: "Días de trabajo hasta jornada intensiva",
  singularText: "Día de trabajo hasta jornada intensiva",
  intensivePeriodText: INTENSIVE_PERIOND_TEXT,
  condition: (date) =>
    date.getDay() >= 1 &&
    date.getDay() <= 5 &&
    !HolidayCalculator.isHolyday(date),
};

const NaturalDayConfig = {
  pruralText: "Días hasta jornada intensiva",
  singularText: "Día hasta jornada intensiva",
  intensivePeriodText: INTENSIVE_PERIOND_TEXT,
  condition: (date) => true,
};

export const CALCULATION_CONFIGS = [NaturalDayConfig, WorkDayConfig, EveningConfig]
