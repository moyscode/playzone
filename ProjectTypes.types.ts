export type PlayerData = {
  id: number;
  name: string;
  confirmation: string;
  hours_played: string;
  date: string;
};

export type AllPlayerData = PlayerData[];

export type MonthlyPlayerData = {
  name: string;
  hours_played: number;
  confirmedAndNotPlayed: number;
  notConfirmedAndPlayed: number;
  cost: number;
};

export type MonthlyPlayerDataNoCost = {
  name: string;
  hours_played: number;
  confirmedAndNotPlayed: number;
  notConfirmedAndPlayed: number;
};

export type AllMonthlyPlayerData = MonthlyPlayerData[];
