import { PlayerData, AllPlayerData } from "../../../ProjectTypes.types";
import { getDB } from "./db";
import type { NextApiRequest, NextApiResponse } from "next";

const getAllPlayerDetailsForMonth = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { year, month } = req.body;
  const { db } = getDB();
  return await db
    .any(
      `SELECT 	id, name,confirmation,hours_played,date
      FROM play_details
      WHERE  EXTRACT(YEAR FROM date) = ${year}
      AND EXTRACT(MONTH FROM date) = ${month}`
    )
    .then((data) => {
      const isEmptyArray = data.length === 0;
      if (isEmptyArray) {
        res.status(200).send([]);
      } else {
        // console.log(data);
        let allPlayerData: AllPlayerData = data.reduce(
          (accumulator, current) => {
            if (
              !accumulator.some((acc: PlayerData) => acc.name === current.name)
            ) {
              let obj = {
                name: current.name,
                hours_played: +current.hours_played,
                confirmedAndNotPlayed:
                  current.confirmation === "yes" && +current.hours_played === 0
                    ? 1
                    : 0,
                notConfirmedAndPlayed: current.confirmation === "no" ? 1 : 0,
              };
              accumulator.push(obj);
            } else {
              //Find index of specific object using findIndex method.
              let objIndex = accumulator.findIndex(
                (obj: PlayerData) => obj.name == current.name
              );
              //update the specific object using index
              accumulator[objIndex].hours_played += +current.hours_played;
              if (
                current.confirmation === "yes" &&
                +current.hours_played === 0
              ) {
                accumulator[objIndex].confirmedAndNotPlayed++;
              }
              if (current.confirmation === "no") {
                accumulator[objIndex].notConfirmedAndPlayed++;
              }
            }
            return accumulator;
          },
          []
        );
        // console.log(allPlayerData);
        res.status(200).send(allPlayerData);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export default getAllPlayerDetailsForMonth;
