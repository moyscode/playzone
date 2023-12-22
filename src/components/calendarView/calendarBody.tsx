import { useCallback, useEffect, useState } from 'react';
import styles from './calendarBody.module.css';
import Image from 'next/image';
import LeftBottom from '../../assets/svg/LeftBottom.svg';
import RightTop from '../../assets/svg/RightTop.svg';
import NotFound from '../../assets/svg/not_found2.svg';
import { Legends } from './legends';
import {
  PlayerData,
  MonthlyPlayerData,
  MonthlyPlayerDataNoCost,
} from '../../../ProjectTypes.types';
import { useRouter } from 'next/router';

export const CalendarBody = ({
  date,
  month,
  year,
  currentMonth,
  playerName,
}: {
  date: Date;
  month: number;
  year: number;
  currentMonth: string;
  playerName?: string;
}) => {
  const [playerData, setPlayerData] = useState<PlayerData[]>([]);

  const [monthlyPlayerData, setMonthlyPlayerData] =
    useState<MonthlyPlayerData>();

  const { asPath } = useRouter();
  let player = playerName || asPath.substring(asPath.lastIndexOf('/') + 1);
  const adjustedMonthNumber = month + 1;

  const getPlayerDataForMonth = useCallback(
    async (url: string) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player, year, adjustedMonthNumber }),
      });
      const data = await response.json();
      setPlayerData(data);

      return data;
    },
    [player, year, adjustedMonthNumber]
  );

  useEffect(() => {
    getPlayerDataForMonth('/api/getOnePlayerDetailsForMonth');
  }, [player, month, year, adjustedMonthNumber, getPlayerDataForMonth]);

  const getSummaryValues = (data: PlayerData[]) => {
    let consolidatedPlayerData = data.reduce(
      (accumulator: MonthlyPlayerDataNoCost[], current: any) => {
        if (
          !accumulator.some(
            (acc: MonthlyPlayerDataNoCost) => acc.name === current.name
          )
        ) {
          let obj = {
            name: current.name,
            hours_played: +current.hours_played,
            confirmedAndNotPlayed:
              current.confirmation === 'yes' && +current.hours_played === 0
                ? 1
                : 0,
            notConfirmedAndPlayed: current.confirmation === 'no' ? 1 : 0,
          };
          accumulator.push(obj);
        } else {
          //Find index of specific object using findIndex method.
          let objIndex = accumulator.findIndex(
            (obj: MonthlyPlayerDataNoCost) => obj.name == current.name
          );

          //update the specific object using index
          accumulator[objIndex].hours_played += +current.hours_played;

          if (current.confirmation === 'yes' && +current.hours_played === 0) {
            accumulator[objIndex].confirmedAndNotPlayed++;
          }

          if (current.confirmation === 'no') {
            accumulator[objIndex].notConfirmedAndPlayed++;
          }
        }

        return accumulator;
      },
      []
    );

    const monthlyData: any = consolidatedPlayerData.map((obj: any) => ({
      ...obj,
      cost:
        obj['hours_played'] * 90 +
        (obj['confirmedAndNotPlayed'] + obj['notConfirmedAndPlayed'] > 1
          ? (obj['confirmedAndNotPlayed'] + obj['notConfirmedAndPlayed'] - 1) *
            45
          : 0),
    }));
    setMonthlyPlayerData(monthlyData[0]);
  };

  useEffect(() => {
    getSummaryValues(playerData);
  }, [playerData]);

  const playedDatesUnFormatted = playerData.map((a: PlayerData) => a.date);
  const playedDates = playedDatesUnFormatted.map((b) => b.substring(0, 10));

  let firstDayOfMonth = new Date(year, month, 1).getDay(), // getting first day of month
    lastDateOfMonth = new Date(year, month + 1, 0).getDate(); // getting last date of month

  const renderEmptyDays = (day: number) => {
    let keyVal = `e${day}`; //'e' is there just to differentiate the keys of "Empty days" with "Days"
    return <li className='inactive' key={keyVal}></li>;
  };

  let emptyDaysOfMonth = [];
  for (var i = 0; i < firstDayOfMonth; i++) {
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

    //check is the player has played on this date
    let played = playedDates.includes(
      new Date(year, month, day).toISOString().substring(0, 10)
    );

    let playedHrs = '-';
    let confirmation = '';

    // If the player has played on that day, we get additional data to show it appropriately on the calendar;
    if (played) {
      let playedData: PlayerData[] = playerData.filter((item: PlayerData) => {
        return (
          item['date'].substring(0, 10) ===
          new Date(year, month, day).toISOString().substring(0, 10)
        );
      });
      playedHrs = playedData[0].hours_played;
      confirmation = playedData[0].confirmation;
    }

    if (isWeekend) {
      return (
        <li key={day}>
          <div className={`${styles.dayInfo} ${styles.weekend}`}>
            <div className={`${styles.day} `}>{day}</div>
            <div
              className={`material-symbols-rounded ${styles[`${isToday}`]} ${
                styles.weekend
              } ${styles.hrs}`}
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
              className={`${styles[`${isToday}`]} ${styles.weekday} ${
                styles.hrs
              } ${
                confirmation === 'yes' && +playedHrs > 0
                  ? `${styles.playedAsPlanned}`
                  : ''
              } ${
                confirmation === 'no' && +playedHrs > 0
                  ? `${styles.notConfirmedButPlayed}`
                  : ''
              }
              ${
                confirmation === 'yes' && +playedHrs == 0
                  ? `${styles.notTurnedUp}`
                  : ''
              }`}
            >
              {playedHrs}
            </div>
          </div>
        </li>
      );
    }
  };

  let daysOfMonth = [];
  for (var i = 1; i <= lastDateOfMonth; i++) {
    daysOfMonth.push(i);
  }

  const allDaysRender = daysOfMonth.map((item) => renderDays(item));
  const allEmptyDaysRender = emptyDaysOfMonth.map((item) =>
    renderEmptyDays(item)
  );
  const arr = [...allEmptyDaysRender, ...allDaysRender];

  const isEmptyObject = monthlyPlayerData == null;

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
          <div
            className={`${styles['summary-text']}`}
          >{`${player} has played for ${
            monthlyPlayerData?.hours_played
          } hrs with ${
            (monthlyPlayerData?.confirmedAndNotPlayed || 0) +
            (monthlyPlayerData?.notConfirmedAndPlayed || 0)
          } penalty hrs.Total cost is ${monthlyPlayerData?.cost}.`}</div>
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
          <Legends />
        </div>
      )}
    </>
  );
};
