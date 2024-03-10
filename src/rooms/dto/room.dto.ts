export class RoomDto {
  title: string;
  members: string[];

  constructor(title: string, members: string[]) {
    this.title = title;
    this.members = members;
  }
}
