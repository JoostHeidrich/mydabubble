export class Channel {
  id?: string;
  creator: any;
  description?: any;
  date: any;
  user: any;
  name: any;

  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.name = obj ? obj.name : '';
    this.creator = obj ? obj.creator : '';
    this.description = obj ? obj.description : '';
    this.date = obj ? obj.creationDate : '';
    this.user = obj ? obj.user : '';
  }
}
