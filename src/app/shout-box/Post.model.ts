export class Post {
  constructor() {
    //this.id = "";
    this.title = "";
    this.description = "";
    this.author_username = "";
    this.publishedOn = "";
    this.isReadMoremodus = false;
  }
  public id;
  public title;
  public description;
  public author_username;
  public author?;
  public publishedOn;
  public isReadMoremodus;
  public comments;
}
