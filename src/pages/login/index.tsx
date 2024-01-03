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
  console.log('🚀 ~ file: index.tsx:11 ~ Login ~ players:', players);

  const getPlayers = async () => {
    const res = await axios('/api/getPlayerNames', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const playerNamesData: { player: string }[] = await res.data;
    let players: string[] = [];
    for (const playerItem of playerNamesData) {
      players.push(playerItem.player.trim());
    }
    setPlayers(players);
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <>
      <PageHeader />
      <main className={`${styles.main}`}>
        <Image src={Smash} alt='background' className={`${styles['smash']}`} />
        <section className={`${styles['content']}`}>
          <p>Enter your USERNAME</p>
          <AutoComplete suggestions={players} />
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
