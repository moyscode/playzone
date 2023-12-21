import { PageHeader } from '@/components/pageHeader/pageHeader';
import { Footer } from '../components/footer/Footer';
import styles from './Home.module.css';
import Image from 'next/image';
import Players from '../assets/svg/Badminton_players.svg';
import Smash from '../assets/svg/Badminton_jumpSmash_ladyMan.svg';
import { useState, useEffect } from 'react';

export default function Home() {
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
  const isBeforeDeadline = +currentTime.substring(0, 2) > 17;

  const hrsList = [0.5, 1.0, 1.5, 2.0, 2.5];

  const [confirmation, setConfirmation] = useState(false);
  const [hrs, setHrs] = useState(1);
  console.log('🚀 ~ file: index.tsx:31 ~ Home ~ hrs:', hrs);

  const fetchData = async () => {
    const res = await fetch('/api/addConfirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player: 'mani1',
        confirmation: 'yes',
        date: dateForDatabase,
      }),
    });
    const newData = await res.json();
    setConfirmation((current) => !current);
  };

  const confirmButtonTextFunction = () => {
    if (isBeforeDeadline) {
      return 'Deadline over';
    } else if (confirmation === false) {
      return 'Confirm';
    } else {
      return 'Confirmed';
    }
  };

  const confirmButtonText = confirmButtonTextFunction();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    fetchData();
  };

  useEffect(() => {}, [confirmation]);

  return (
    <>
      <PageHeader />
      <main className={`${styles.main}`}>
        <div className={`${styles.confirm}`}>
          <Image
            src={Players}
            alt='background'
            className={`${styles['players']}`}
          />
          <section className={`${styles['confirm-text']}`}>
            <h3>Confirmation</h3>
            <p>
              {`Confirm your participation for ${tomorrowsDate.toDateString()}`}
            </p>
            <button
              disabled={isBeforeDeadline}
              className={`${styles['confirm-button']} ${styles.disabled}`}
              onClick={handleClick}
            >
              {confirmButtonText}
            </button>
          </section>
        </div>
        <div className={`${styles.played}`}>
          <Image
            src={Smash}
            alt='background'
            className={`${styles['smash']}`}
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
              {/* <select defaultValue={'1'} name='hrs' id={`${styles['hrs']}`}>
                <option value='0.5'>0.5</option>
                <option value='1'>1</option>
                <option value='1.5'>1.5</option>
                <option value='2'>2</option>
                <option value='2.5'>2.5</option>
              </select> */}
            </div>
            <button>Submit</button>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
