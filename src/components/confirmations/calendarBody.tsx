import { useCallback, useEffect, useState } from 'react';
import styles from './calendarBody.module.css';
import Image from 'next/image';
import LeftBottom from '../../assets/svg/LeftBottom.svg';
import RightTop from '../../assets/svg/RightTop.svg';
import NotFound from '../../assets/svg/not_found2.svg';
import {
  PlayerData,
  MonthlyPlayerDataNoCost,
} from '../../../ProjectTypes.types';

type IndividualPlayerDailyConfirmation = { confirmation: string; date: string };
type MonthlyData = IndividualPlayerDailyConfirmation[];

export const ConfirmationsCalendarBody = ({
  date,
  month,
  year,
  currentMonth,
}: {
  date: Date;
  month: number;
  year: number;
  currentMonth: string;
}) => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData>([]);

  const adjustedMonthNumber = month + 1;

  const getMonthlyData = useCallback(
    async (url: string) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ year, adjustedMonthNumber }),
      });
      const data: MonthlyData = await response.json();

      const confirmed = data.filter(
        (item: IndividualPlayerDailyConfirmation) => item.confirmation === 'yes'
      );

      setMonthlyData(confirmed);
    },

    [year, adjustedMonthNumber]
  );

  useEffect(() => {
    getMonthlyData('/api/getMonthlyData');
  }, [month, year, adjustedMonthNumber, getMonthlyData]);

  let firstDayOfMonth = new Date(year, month, 1).getDay(), // getting first day of month
    lastDateOfMonth = new Date(year, month + 1, 0).getDate(); // getting last date of month

  const renderEmptyDays = (day: number) => {
    let keyVal = `e${day}`; //'e' is there just to differentiate the keys of "Empty days" with "Days"
    return <li className='inactive' key={keyVal}></li>;
  };

  let emptyDaysOfMonth = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    emptyDaysOfMonth.push(i);
  }

  const renderDays = (day: number) => {
    //check is the day is today (if yes, we will highlight it on the calendar)
    let isToday =
      day === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? 'active'
        : '';

    //check if the days are weekends (for weekends, we shot stop symbol)
    let isWeekend =
      new Date(year, month, day).getDay() === 0 ||
      new Date(year, month, day).getDay() === 6;

    //get the confirmations on any given day
    const dayConfirmations = monthlyData.filter(
      (item) =>
        item.date ===
        `${year}-${adjustedMonthNumber.toString().padStart(2, '0')}-${day
          .toString()
          .padStart(2, '0')}`
    );

    if (isWeekend) {
      return (
        <li key={day}>
          <div className={`${styles.dayInfo} ${styles.weekend}`}>
            <div className={`${styles.day} `}>{day}</div>
            <div
              className={`material-symbols-rounded ${styles[isToday]} ${styles.weekend} ${styles.confirmations}`}
            >
              Block
            </div>
          </div>
        </li>
      );
    } else {
      return (
        <li key={day}>
          <div className={`${styles.dayInfo}`}>
            <div className={`${styles.day}`}>{day}</div>
            <div
              className={`${styles[isToday]} ${styles.weekday} ${styles.confirmations}`}
            >
              {!dayConfirmations.length ? '-' : dayConfirmations.length}
            </div>
          </div>
        </li>
      );
    }
  };

  let daysOfMonth = [];
  for (let i = 1; i <= lastDateOfMonth; i++) {
    daysOfMonth.push(i);
  }

  const allDaysRender = daysOfMonth.map((item) => renderDays(item));
  const allEmptyDaysRender = emptyDaysOfMonth.map((item) =>
    renderEmptyDays(item)
  );
  const arr = [...allEmptyDaysRender, ...allDaysRender];

  const isEmptyObject = monthlyData == null;

  return (
    <>
      {isEmptyObject ? (
        <div className={`${styles['no-summary']}`}>
          <Image
            src={RightTop}
            alt='background'
            className={`${styles['left-top']}`}
          />

          <Image
            src={NotFound}
            alt='background'
            className={`${styles['not-found']}`}
          />
          <Image
            src={LeftBottom}
            alt='background'
            className={`${styles['right-bottom']}`}
          />
        </div>
      ) : (
        <div className={`${styles['calendar-body']}`}>
          <Image
            src={RightTop}
            alt='background'
            className={`${styles['left-top']}`}
          />
          <Image
            src={LeftBottom}
            alt='background'
            className={`${styles['right-bottom']}`}
          />
          <ul className={`${styles.weeks}`}>
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          <ul className={`${styles.days}`}>{arr}</ul>
        </div>
      )}
    </>
  );
};
