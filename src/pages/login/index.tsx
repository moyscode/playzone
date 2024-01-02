import { PageHeader } from '@/components/pageHeader/pageHeader';
import { Footer } from '@/components/footer/Footer';
import styles from './login.module.css';
import Image from 'next/image';
import Smash from '@/assets/svg/Badminton_jumpSmash.svg';

export default function Login() {
  return (
    <>
      <PageHeader />
      <main className={`${styles.main}`}>
        <Image src={Smash} alt='background' className={`${styles['smash']}`} />
        <section className={`${styles['content']}`}>
          <p>Enter your USERNAME</p>
          <input className={`${styles['input']}`}></input>
          <button className={`${styles.submit}`}>Submit</button>
          <p className={`${styles['hint']}`}>
            Online registration is possible for this portal.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
