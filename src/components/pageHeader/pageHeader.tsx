import styles from './pageHeader.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Home from './home.svg';
import Login from './sign-in-alt.svg';
import Team from './users-alt.svg';
import Confirmations from './calendar-check.svg';
export const PageHeader = () => {
  const { asPath } = useRouter();

  let homeRegex = /^\/(?!.)/; //Negative lookahead assertion used only to match '/' in path
  let gsRegex = /^\/group.*/;
  let psRegex = /^\/player.*/;
  let loginRegex = /^\/login.*/;

  const menuInfo = [
    { route: 'Home', icon: Home, path: '/', pathRegEx: homeRegex },
    {
      route: 'Team',
      icon: Team,
      path: '/groupSummary',
      pathRegEx: gsRegex,
    },
    {
      route: 'Confirmations',
      icon: Confirmations,
      path: '/confirmations',
      pathRegEx: psRegex,
    },
    {
      route: 'Login',
      icon: Login,
      path: '/login',
      pathRegEx: loginRegex,
    },
  ];

  const linksToRender = menuInfo.map((item) => (
    <Link
      className={`${
        item.pathRegEx.test(asPath) ? styles.active : styles.inactive
      }`}
      href={item.path}
      key={item.route}
    >
      <div className={`${styles['link']}`}>
        <Image
          src={item.icon}
          alt={item.route}
          width={24}
          height={24}
          className={`${styles['link-logo']}`}
        />
        <span className={`${styles['link-text']}`}>{item.route}</span>
      </div>
    </Link>
  ));

  return (
    <header className={`${styles.wrapper}`}>
      <Link href={'/'} className={`${styles['logo']}`}>
        PaulA
      </Link>
      <div className={`${styles['links']}`}>{linksToRender}</div>
    </header>
  );
};
