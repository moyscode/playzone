import { getDB } from './db';
import type { NextApiRequest, NextApiResponse } from 'next';

const getMonthlyData = async (req: NextApiRequest, res: NextApiResponse) => {
  const { year, adjustedMonthNumber } = req.body;
  const { db } = getDB();

  return await db
    .any(
      `SELECT confirmation,date, CAST(date as CHAR(10)) FROM play_details
      WHERE EXTRACT(YEAR FROM date) = ${year}
      AND  EXTRACT(MONTH FROM date) = ${adjustedMonthNumber}`
    )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      return err;
    });
};

export default getMonthlyData;
