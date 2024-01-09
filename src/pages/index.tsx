import { PageHeader } from '@/components/pageHeader/pageHeader';
import { Footer } from '@/components/footer/Footer';
import styles from './Home.module.css';
import axios from 'axios';
import Image from 'next/image';
import Man from '@/assets/svg/Badminton_players_man.svg';
import Woman from '@/assets/svg/Badminton_players_woman.svg';
import Dialog from '@/assets/svg/Confused_failure.svg';
import { useState, useContext, useRef, useEffect } from 'react';
import { Calendar } from '@/components/calendarView/calendar';
import { MonthContext } from '@/contexts/MonthContextProvider';

export default function Home() {
  const monthContextObject = useContext(MonthContext);
  const monthNumber = monthContextObject?.monthNumber;
  const month = monthContextObject?.month;
  const year = monthContextObject?.year;
  const changeMonth = monthContextObject?.changeMonth;

  // Depending on timezone, your results will vary
  const todaysDate = new Date();
  const dateForDatabase = todaysDate.toISOString().split('T')[0];

  const getNextWorkDay = (date: Date) => {
    let day = date.getDay(),
      add = 1;
    if (day === 6) add = 2;
    else if (day === 5) add = 3;
    date.setDate(date.getDate() + add); // will correctly handle 31+1 > 32 > 1st next month
    return date;
  };
  let tomorrowsDate = getNextWorkDay(new Date());

  const currentTime = todaysDate.toLocaleTimeString('en-IN', { hour12: false });
  const isAfterDeadline = +currentTime.substring(0, 2) > 17;

  const hrsList = [0.5, 1.0, 1.5, 2.0, 2.5];

  const [confirmation, setConfirmation] = useState(false);
  const [hrs, setHrs] = useState(1);

  const confirmationApiCall = async () => {
    const res = await axios('/api/addConfirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        player: 'mani1',
        confirmation: 'yes',
        date: dateForDatabase,
      },
    });
    const newData = await res.data;
    setConfirmation((current) => !current);
  };

  const confirmButtonTextFunction = () => {
    if (isAfterDeadline) {
      return 'Deadline over';
    } else if (confirmation === false) {
      return 'Confirm';
    } else {
      return 'Confirmed';
    }
  };

  const confirmButtonText = confirmButtonTextFunction();

  const user = 'John Doe';
  const confirmationButtonClick = () => {
    if (user === 'John Doe') {
      setShowModal(true);
    } else {
      confirmationApiCall();
    }
  };

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (dialogRef.current?.open && !showModal) {
      dialogRef.current?.close();
    } else if (!dialogRef.current?.open && showModal) {
      dialogRef.current?.showModal();
    }
  }, [showModal]);

  return (
    <>
      <PageHeader />
      <h3 className={`${styles['player-name']}`}>John Doe</h3>
      <main className={`${styles.main}`}>
        <dialog ref={dialogRef}>
          <h3>John Doe is imaginary!</h3>
          <Image src={Dialog} alt='Event Failure' />
          <p>Join our group and login to perform this action.</p>
          <button onClick={() => setShowModal(false)}>Close</button>
        </dialog>
        <div className={`${styles.confirm}`}>
          <Image src={Man} alt='background' className={`${styles['man']}`} />
          <section className={`${styles['confirm-text']}`}>
            <h3>Confirmation</h3>
            <p>
              {`Confirm your participation for ${tomorrowsDate.toDateString()}`}
            </p>
            <button
              disabled={isAfterDeadline}
              className={`${styles['confirm-button']} ${
                isAfterDeadline ? styles.disabled : ''
              }`}
              onClick={confirmationButtonClick}
            >
              {confirmButtonText}
            </button>
          </section>
        </div>
        <div className={`${styles.played}`}>
          <Image
            src={Woman}
            alt='background'
            className={`${styles['woman']}`}
          />
          <section className={`${styles['played-text']}`}>
            <h3>Played Hrs</h3>
            <div>
              <p>
                For{' '}
                <input
                  type='date'
                  id={`${styles['played-date']}`}
                  name='played'
                  defaultValue={dateForDatabase}
                ></input>
              </p>
              <div className={`${styles['hrs-list']} `}>
                {hrsList.map((hr) => (
                  <div
                    key={hr}
                    className={`${styles['hr']} ${
                      hr === hrs ? styles['selected-hr'] : ''
                    }`}
                    onClick={() => setHrs(hr)}
                    onKeyDown={() => setHrs(hr)}
                    role='listbox'
                    tabIndex={hr}
                  >
                    {hr}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={confirmationButtonClick}>Submit</button>
          </section>
        </div>
        <section className={`${styles['player-calendar']}`}>
          <Calendar
            date={todaysDate}
            monthNumber={monthNumber!} // 👈️ non-null assertion
            month={month!} // 👈️ non-null assertion
            year={year!} // 👈️ non-null assertion
            onClick={changeMonth!} // 👈️ non-null assertion
            playerName='John Doe'
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
