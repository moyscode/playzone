import { CalendarBody } from './calendarBody';
import { Header } from './header';
import styles from './calendar.module.css';
import { Legends } from './legends';

export const Calendar = ({
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
    <div className={`${styles['calendar']}`}>
      <Header month={month} year={year} onClick={onClick} />
      <CalendarBody
        date={date}
        month={monthNumber}
        year={year}
        currentMonth={month}
      />
      <Legends />
    </div>
  );
};
