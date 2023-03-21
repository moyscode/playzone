import { createContext, useState, PropsWithChildren } from "react";

type MonthContextType = {
  monthNumber: number;
  month: string;
  year: number;
  changeMonth: (val: string) => void;
};

export const MonthContextProvider = ({ children }: PropsWithChildren) => {
  let date = new Date();
  // storing full name of all months in array
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentMonth, SetCurrentMonth] = useState<string>(
    months[date.getMonth()]
  );
  const [currentYear, SetCurrentYear] = useState<number>(date.getFullYear());

  const changeMonth = (val: string) => {
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    if (val === "prev") {
      if (currentMonth === "January") {
        SetCurrentMonth(months[11]);
        SetCurrentYear((currentYear) => currentYear - 1);
      } else {
        SetCurrentMonth(months[months.indexOf(currentMonth) - 1]);
      }
    } else {
      if (currentMonth === "December") {
        SetCurrentMonth(months[0]);
        SetCurrentYear((currentYear) => currentYear + 1);
      } else {
        SetCurrentMonth(months[months.indexOf(currentMonth) + 1]);
      }
    }
  };

  const monthContextItems = {
    monthNumber: months.indexOf(currentMonth),
    month: currentMonth,
    year: currentYear,
    changeMonth: changeMonth,
  };

  return (
    <MonthContext.Provider value={monthContextItems}>
      {children}
    </MonthContext.Provider>
  );
};

export const MonthContext = createContext<MonthContextType | null>(null);
