import { getDB } from './db';
import type { NextApiRequest, NextApiResponse } from 'next';

const getPlayerNames = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = getDB();

  return await db
    .any(`SELECT DISTINCT player FROM players`)
    .then((dbResponse) => {
      res.status(200).send(dbResponse);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export default getPlayerNames;
