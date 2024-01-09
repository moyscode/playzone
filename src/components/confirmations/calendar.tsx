import { ConfirmationsCalendarBody } from './calendarBody';
import { Header } from './header';
import styles from './calendar.module.css';

export const ConfirmationsCalendar = ({
  date,
  month,
  monthNumber,
  year,
  onClick,
}: {
  date: Date;
  month: string;
  monthNumber: number;
  year: number;
  onClick: (val: string) => void;
}) => {
  return (
    <div className={`${styles.wrapper} ${styles['calendar']}`}>
      <Header month={month} year={year} onClick={onClick} />
      <ConfirmationsCalendarBody
        date={date}
        month={monthNumber}
        year={year}
        currentMonth={month}
      />
    </div>
  );
};
