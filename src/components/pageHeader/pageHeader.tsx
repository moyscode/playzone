import styles from './pageHeader.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Home from '../../assets/svg/home.svg';
import Login from '../../assets/svg/login.svg';
import Team from '../../assets/svg/team.svg';

export const PageHeader = () => {
  const { asPath } = useRouter();

  let homeRegex = /^\/(?!.)/; //Negative lookahead assertion used only to match '/' in path
  let gsRegex = /^\/group.*/;
  let psRegex = /^\/player.*/;

  const menuInfo = [
    { route: 'Home', icon: Home, path: '/', pathRegEx: homeRegex },
    {
      route: 'Team',
      icon: Team,
      path: '/groupSummary',
      pathRegEx: gsRegex,
    },
    {
      route: 'Login',
      icon: Login,
      path: '/playerSummary',
      pathRegEx: psRegex,
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
    <div className={`${styles.wrapper}`}>
      <div className={`${styles['logo']}`}>Paul A</div>
      <div className={`${styles['links']}`}>{linksToRender}</div>
    </div>
  );
};
