import { CalendarBody } from './calendarBody';
import { Header } from './header';
import styles from './calendar.module.css';

export const Calendar = ({
  date,
  month,
  monthNumber,
  year,
  onClick,
  playerName,
}: {
  date: Date;
  month: string;
  monthNumber: number;
  year: number;
  onClick: (val: string) => void;
  playerName?: string;
}) => {
  return (
    <div className={`${styles.wrapper} ${styles['calendar']}`}>
      <Header month={month} year={year} onClick={onClick} />
      <CalendarBody
        date={date}
        month={monthNumber}
        year={year}
        currentMonth={month}
        playerName={playerName}
      />
    </div>
  );
};
