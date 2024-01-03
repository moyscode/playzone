import { getDB } from './db';
import type { NextApiRequest, NextApiResponse } from 'next';

const userAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = getDB();
  const { playerName } = req.body;

  if (typeof playerName === 'string' || playerName instanceof String) {
    return await db
      .any(
        `SELECT email FROM players
     WHERE player LIKE '${playerName}%'`
      )
      .then((dbResponse) => {
        let email: string = dbResponse[0].email.trim();
        const emailBeforeAt = email.split('@')[0];
        const hiddenEmail =
          emailBeforeAt.slice(0, -3) + 'XXX' + email.split('@')[1];

        res.status(200).send(hiddenEmail);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    res.status(400).send('Query does not match the required format');
  }
};

export default userAuth;
