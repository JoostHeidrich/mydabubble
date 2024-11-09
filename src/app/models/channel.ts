export class Channel {
  id?: string;
  channelCeationTime: any;
  channelCreatorUid: any;
  channelDescription: any;
  channelUser: any;

  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.channelCeationTime = obj ? obj.channelCeationTime : '';
    this.channelCreatorUid = obj ? obj.channelCreatorUid : '';
    this.channelDescription = obj ? obj.channelDescription : '';
    this.channelUser = obj ? obj.channelUser : '';
  }
}
