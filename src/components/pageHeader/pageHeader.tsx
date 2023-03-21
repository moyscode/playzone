import styles from "./pageHeader.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export const PageHeader = () => {
  const { asPath } = useRouter();

  let gsRegex = /^\/group.*/;
  let psRegex = /^\/player.*/;

  return (
    <div className={`${styles.wrapper}`}>
      <Link
        className={`${asPath === "/" ? styles.active : styles.inactive}`}
        href="/"
      >
        HOME
      </Link>
      <Link
        className={` ${psRegex.test(asPath) ? styles.active : styles.inactive}`}
        href="/playerSummary"
      >
        PLAYER-SUMMARY
      </Link>

      <Link
        className={` ${gsRegex.test(asPath) ? styles.active : styles.inactive}`}
        href="/groupSummary"
      >
        GROUP-SUMMARY
      </Link>
    </div>
  );
};
