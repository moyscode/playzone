import { useContext } from 'react';
import { MonthContext } from '@/contexts/MonthContextProvider';
import { Summary } from '@/components/summary/summary';
import { PageHeader } from '@/components/pageHeader/pageHeader';
import styles from './groupSummary.module.css';
import { Footer } from '@/components/footer/Footer';

export default function Home() {
  const monthContextObject = useContext(MonthContext);
  const monthNumber = monthContextObject?.monthNumber;
  const month = monthContextObject?.month;
  const year = monthContextObject?.year;
  const changeMonth = monthContextObject?.changeMonth;

  return (
    <>
      <PageHeader />
      <main className={`${styles.main}`}>
        <Summary
          monthNumber={monthNumber!} // 👈️ non-null assertion
          month={month!} // 👈️ non-null assertion
          year={year!} // 👈️ non-null assertion
          onClick={changeMonth!} // 👈️ non-null assertion
        />
      </main>
      <Footer />
    </>
  );
}
