import { Team } from "../team/team.model";

export class Match {
  constructor(
    public id: string,
    public hometeam: Team,
    public awayteam: Team,
    public hometeamscore: number,
    public awayteamscore: number,
    public matchdate: Date,
    public status: number,
    public hasBet?: boolean,
    public homeBet?: number,
    public awayBet?: number,
    public isInModificationMode?: boolean
  ) {}
}
