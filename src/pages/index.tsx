import { PageHeader } from "@/components/pageHeader/pageHeader";
import styles from "./Home.module.css";
import Link from "next/link";

export default function Home() {
  // Depending on timezone, your results will vary
  const todaysDate = new Date();
  let tomorrowsDate = new Date();
  tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
  const currentTime = todaysDate.toLocaleTimeString("en-IN", { hour12: false });

  const isBeforeDeadline = +currentTime.substring(0, 2) > 17;
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
          <button disabled={isBeforeDeadline} className={`${styles.disabled}`}>
            {isBeforeDeadline ? "Deadline over" : "Confirm"}
          </button>
        </div>
        <div className={`${styles.played}`}>
          <span>
            Played Hrs for <b>{todaysDate.toDateString()}</b>
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
