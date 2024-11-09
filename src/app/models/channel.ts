export class Channel {
  id?: string;
  channelName: any;
  channelCeationTime: any;
  channelCreatorUid: any;
  channelDescription: any;
  channelUser: any;

  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.channelName = obj ? obj.channelName : '';
    this.channelCeationTime = obj ? obj.channelCeationTime : '';
    this.channelCreatorUid = obj ? obj.channelCreatorUid : '';
    this.channelDescription = obj ? obj.channelDescription : '';
    this.channelUser = obj ? obj.channelUser : '';
  }
}
