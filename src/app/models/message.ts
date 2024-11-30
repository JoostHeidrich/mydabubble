export class Message {
  id?: string;
  userId: any;
  date: number;
  message: string;
  fileUrl: any;
  fileName: any;
  threadCount?: any;
  lastThreadMessage?: any;
  checkMark: any;
  handshake: any;
  thumbsUp: any;
  thumbsDown: any;
  rocket: any;
  nerdFace: any;
  noted: any;
  shushingFace: any;

  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.userId = obj ? obj.userId : '';
    this.date = obj ? obj.date : '';
    this.message = obj ? obj.message : '';
    this.fileUrl = obj ? obj.fileUrl : '';
    this.fileName = obj ? obj.fileName : '';
    this.threadCount = obj ? obj.threadCount : '';
    this.lastThreadMessage = obj ? obj.lastThreadMessage : '';
    this.checkMark = obj ? obj.checkMark : '';
    this.handshake = obj ? obj.handshake : '';
    this.thumbsUp = obj ? obj.thumbsUp : '';
    this.thumbsDown = obj ? obj.thumbsDown : '';
    this.rocket = obj ? obj.rocket : '';
    this.nerdFace = obj ? obj.nerdFace : '';
    this.noted = obj ? obj.noted : '';
    this.shushingFace = obj ? obj.shushingFace : '';
  }
}
