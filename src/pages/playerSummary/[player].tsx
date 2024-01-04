import { useContext } from 'react';
import { MonthContext } from '@/contexts/MonthContextProvider';
import { PageHeader } from '@/components/pageHeader/pageHeader';
import { Footer } from '@/components/footer/Footer';
import styles from './playerSummary.module.css';
import { Calendar } from '@/components/calendarView/calendar';
import { useRouter } from 'next/router';

export default function Player() {
  const monthContextObject = useContext(MonthContext);
  const monthNumber = monthContextObject?.monthNumber;
  const month = monthContextObject?.month;
  const year = monthContextObject?.year;
  const changeMonth = monthContextObject?.changeMonth;
  const todaysDate = new Date();

  const router = useRouter();

  return (
    <>
      <PageHeader />
      <main className={`${styles.main}`}>
        <Calendar
          date={todaysDate}
          monthNumber={monthNumber!} // 👈️ non-null assertion
          month={month!} // 👈️ non-null assertion
          year={year!} // 👈️ non-null assertion
          onClick={changeMonth!} // 👈️ non-null assertion
          playerName={router.query.player as string}
        />
      </main>
      <Footer />
    </>
  );
}
