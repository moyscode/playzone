import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/pageHeader/pageHeader';
import { Footer } from '@/components/footer/Footer';
import axios from 'axios';
import styles from './login.module.css';
import Image from 'next/image';
import Smash from '@/assets/svg/Badminton_jumpSmash.svg';
import { AutoComplete } from '@/components/autoComplete/autoComplete';

export default function Login() {
  const [players, setPlayers] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>('');

  const getPlayers = async () => {
    const res = await axios('/api/getPlayerNames', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const playersFromDb: string[] = await res.data;
    setPlayers(playersFromDb);
  };

  useEffect(() => {
    getPlayers();
  }, []);

  const userAuthApiCall = async () => {
    const res = await axios('/api/userAuth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        playerName: userInput,
      },
    });
    const resData = await res.data;
    console.log(
      '🚀 ~ file: index.tsx:44 ~ userAuthApiCall ~ resData:',
      resData
    );
  };

  const handleSubmit = () => {
    userAuthApiCall();
  };

  return (
    <>
      <PageHeader />
      <main className={`${styles.main}`}>
        <Image src={Smash} alt='background' className={`${styles['smash']}`} />
        <section className={`${styles['content']}`}>
          <p>Enter your USERNAME</p>
          <AutoComplete userNameUpdate={setUserInput} suggestions={players} />
          <button className={`${styles.submit}`} onClick={handleSubmit}>
            Submit
          </button>
          <p className={`${styles['hint']}`}>
            Online registration is possible for this portal.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
