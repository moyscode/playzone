import styles from './legends.module.css';

export const Legends = () => {
  return (
    <div className={`${styles.legend}`}>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.circle} ${styles.playedAsPlanned}`}></div>
        <span className={`${styles['legend-text']}`}>- Played as planned</span>
      </div>

      <div className={`${styles.wrapper}`}>
        <div
          className={`${styles.circle} ${styles.notConfirmedButPlayed}`}
        ></div>
        <span className={`${styles['legend-text']}`}>
          - Not confirmed but played
        </span>
      </div>

      <div className={`${styles.wrapper}`}>
        <div className={`${styles.circle} ${styles.notTurnedUp}`}></div>
        <span className={`${styles['legend-text']}`}>
          - Not turned up for playing
        </span>
      </div>
    </div>
  );
};
