import styles from "./summary.module.css";
import { SummaryTable } from "./summaryTable";
import { Header } from "../calendarView/header";

export const Summary = ({
  month,
  monthNumber,
  year,
  onClick,
}: {
  month: string;
  monthNumber: number;
  year: number;
  onClick: (val: string) => void;
}) => {
  return (
    <div className={`wrapper ${styles.summary}`}>
      <Header month={month} year={year} onClick={onClick} />
      <SummaryTable
        currentMonth={month}
        monthNumber={monthNumber}
        year={year}
      />
    </div>
  );
};
