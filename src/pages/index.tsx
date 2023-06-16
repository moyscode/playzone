import { PageHeader } from "@/components/pageHeader/pageHeader";
import styles from "./Home.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  // Depending on timezone, your results will vary
  const todaysDate = new Date();
  const dateForDatabase = todaysDate.toISOString().split("T")[0];

  const getNextWorkDay = (date: Date) => {
    let day = date.getDay(),
      add = 1;
    if (day === 6) add = 2;
    else if (day === 5) add = 3;
    date.setDate(date.getDate() + add); // will correctly handle 31+1 > 32 > 1st next month
    return date;
  };
  let tomorrowsDate = getNextWorkDay(new Date());

  const currentTime = todaysDate.toLocaleTimeString("en-IN", { hour12: false });
  const isBeforeDeadline = +currentTime.substring(0, 2) > 17;

  const [confirmation, setConfirmation] = useState(false);

  const fetchData = async () => {
    const res = await fetch("/api/addConfirmation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player: "mani1",
        confirmation: "yes",
        date: dateForDatabase,
      }),
    });
    const newData = await res.json();
    setConfirmation((current) => !current);
  };

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
          <span>
            Confirmation for
            <span className={`${styles.color}`}>
              {` ${tomorrowsDate.toDateString()}`}
            </span>
          </span>
          <button
            disabled={isBeforeDeadline}
            className={`${styles.disabled}`}
            onClick={handleClick}
          >
            {isBeforeDeadline
              ? "Deadline over"
              : confirmation === false
              ? "Confirm"
              : "Confirmed"}
          </button>
        </div>
        <div className={`${styles.played}`}>
          <span>
            Played Hrs for{" "}
            <input
              type="date"
              id="payment-date"
              name="payment"
              defaultValue={dateForDatabase}
            ></input>
          </span>
          <select defaultValue={"1"} name="hrs" id="hrs">
            <option value="0.5">0.5</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
            <option value="2.5">2.5</option>
          </select>
          <button>Submit</button>
        </div>
        <div className={`${styles.payment}`}>
          <span>Payment</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]+"
            id="payment"
            name="payment"
          ></input>
          <input type="date" id="payment-date" name="payment"></input>
          <button>Submit</button>
        </div>
        <Link href="/playerSummary">
          <button>Player Summary</button>
        </Link>
        <Link href="/groupSummary">
          <button>Group Summary</button>
        </Link>
      </main>
    </>
  );
}
