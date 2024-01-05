import React, { useState, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/pageHeader/pageHeader';
import { Footer } from '@/components/footer/Footer';
import axios from 'axios';
import styles from './login.module.css';
import Image from 'next/image';
import Smash from '@/assets/svg/Badminton_jumpSmash.svg';
import MailSent from '@/assets/svg/Mail_sent.svg';
import NoUser from '@/assets/svg/401_error_unauthorized.svg';
import { AutoComplete } from '@/components/autoComplete/autoComplete';

export default function Login() {
  const [players, setPlayers] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [email, setEmail] = useState<string>('');

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
    try {
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
      setEmail(resData);
      setShowMailSentDialogModal(true);
    } catch (error: any) {
      if (error.response.data === 'User does not exist') {
        setShowNoUserDialogModal(true);
      } else {
        console.log(error.response.data);
      }
    }
  };

  const handleSubmit = () => {
    userAuthApiCall();
  };

  const mailSentDialog = useRef<HTMLDialogElement>(null);
  const [showMailSentDialogModal, setShowMailSentDialogModal] = useState(false);

  useEffect(() => {
    if (mailSentDialog.current?.open && !showMailSentDialogModal) {
      mailSentDialog.current?.close();
    } else if (!mailSentDialog.current?.open && showMailSentDialogModal) {
      mailSentDialog.current?.showModal();
    }
  }, [showMailSentDialogModal]);

  const noUserDialog = useRef<HTMLDialogElement>(null);
  const [showNoUserDialogModal, setShowNoUserDialogModal] = useState(false);

  useEffect(() => {
    if (noUserDialog.current?.open && !showNoUserDialogModal) {
      noUserDialog.current?.close();
    } else if (!noUserDialog.current?.open && showNoUserDialogModal) {
      noUserDialog.current?.showModal();
    }
  }, [showNoUserDialogModal]);

  return (
    <>
      <PageHeader />
      <main className={`${styles.main}`}>
        <dialog ref={mailSentDialog}>
          <h3>Mail Sent!</h3>
          <Image src={MailSent} alt='Mail Sent' />
          <p>
            Mail sent with login information to {email}. Follow the
            instructions.
          </p>
          <button onClick={() => setShowMailSentDialogModal(false)}>
            Close
          </button>
        </dialog>
        <dialog ref={noUserDialog}>
          <h3>No Entry!</h3>
          <Image src={NoUser} alt='No such user' />
          <p>The username you entered does not exist.</p>
          <button onClick={() => setShowNoUserDialogModal(false)}>Close</button>
        </dialog>
        <Image src={Smash} alt='background' className={`${styles['smash']}`} />
        <section className={`${styles['content']}`}>
          <p>Enter your USERNAME</p>
          <AutoComplete userNameUpdate={setUserInput} suggestions={players} />
          <button
            className={`${styles.submit}`}
            onClick={handleSubmit}
            disabled={userInput.length < 3}
          >
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
