import styles from './header.module.css';

export const Header = ({
  month,
  year,
  onClick,
}: {
  month: string;
  year: number;
  onClick: (val: string) => void;
}) => {
  return (
    <header className={`${styles.header}`}>
      <p className={`${styles['current-date']}`}>
        {month} {year}
      </p>
      <div className={`${styles.icons}`}>
        <span
          id='prev'
          className='material-symbols-rounded'
          onClick={() => onClick('prev')}
          onKeyDown={() => onClick('prev')}
        >
          chevron_left
        </span>
        <span
          id='next'
          className='material-symbols-rounded'
          onClick={() => onClick('next')}
          onKeyDown={() => onClick('next')}
        >
          chevron_right
        </span>
      </div>
    </header>
  );
};
