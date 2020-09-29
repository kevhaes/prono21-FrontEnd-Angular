export class Bet {
  constructor(
    public id: string,
    public user_id: string,
    public match_id: number,
    public homeTeamBet: number,
    public awayTeamBet: number,
    public obtainedpoints: number
  ) {}
}


// awayTeamBet: 0
// homeTeamBet: 0
// match_id: null
// user_id: null
