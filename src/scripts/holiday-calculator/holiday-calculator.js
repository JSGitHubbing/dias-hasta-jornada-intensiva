import { HOLY_FRIDAY_LIST } from "./holy-fridays.js";
import { DEFAULT_HOLIDAYS } from "./default-holidays.js";

export const HolidayCalculator = {
  isHolyday(date) {
    var holidays = [
      ...DEFAULT_HOLIDAYS,
      HOLY_FRIDAY_LIST[date.getFullYear().toString()],
    ];

    holidays.find((holiday) => {
      date.getMonth() + 1 === holiday.month && date.getDate() === holiday.day;
    });
  },
};
