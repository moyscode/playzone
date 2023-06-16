import { getDB } from "./db";
import type { NextApiRequest, NextApiResponse } from "next";

const addConfirmation = async (req: NextApiRequest, res: NextApiResponse) => {
  const { player, confirmation, date } = req.body;
  const { db } = getDB();

  return await db
    .any(
      `INSERT INTO play_details (name,confirmation,hours_played,date)
      VALUES ('${player}', '${confirmation}','0','${date}')
      ON CONFLICT (name,date)
      DO UPDATE SET confirmation = '${confirmation}'
      RETURNING *`
    )
    .then((info) => {
      res.status(200).send(info);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export default addConfirmation;
