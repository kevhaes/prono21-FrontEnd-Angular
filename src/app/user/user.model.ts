export class User {
  constructor(
    public id?: string,
    public username?: string,
    public firstname?: string,
    public lastname?: string,
    public totalscore?: number,
    public password?: string,
    public role?: string,
    public isActive?: boolean,
    public description?: string,
    public imageurl?: string
  ) {}
}
