export class Channel {
  id?: string;
  channelCreator: any;
  description?: any;
  creationDate: any;
  channelUser: any;

  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.channelCreator = obj ? obj.channelCreator : '';
    this.description = obj ? obj.description : '';
    this.creationDate = obj ? obj.creationDate : '';
    this.channelUser = obj ? obj.channelUser : '';
  }
}
