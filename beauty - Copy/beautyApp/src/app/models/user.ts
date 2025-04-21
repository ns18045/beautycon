export class userEditModel {
  name: string;
  surname: string;
  adress: string;
  description: string;
  service: string;
  role: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface IUserListModule {
  id: number;
  name: string;
  surname: string;
  adress: string;
  description: string;
  service: string;
  role: string;
  email: string;
  password: string;
  phoneNumber: string;
  rating: number;
}

export class UserFilter {
  name: string;
  adress: string;
  service: string;
  ratingFrom: number;
  ratingTo: number;
}

export interface IUserDetailModule {
  id: number;
  name: string;
  surname: string;
  adress: string;
  description: string;
  service: string;
  role: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export class userFeedbackEditModel {
  feedbackText: string;
  mark: number;
  userId: number;
}

export class appointment {
  date: string;
  timeStart: string;
  timeEnd: string;
  description: string;
  canceled: boolean;
  masterId?: number;
  clientId?: number;
}

export class appointmentEdit {
  id: number;
  date: string;
  timeStart: string;
  timeEnd: string;
  description: string;
  canceled: boolean;
  masterId?: number;
  clientId?: number;
}

export class appointmentList {
  id: number;
  date: string;
  timeStart: string;
  timeEnd: string;
  description: string;
  canceled: boolean;
  masterId?: number;
  clientId?: number;
  clientName?: string;
  clientSurname?: string;
  clientNumber?: string;
  clientEmail?: string;
  masterName?: string;
  masterSurname?: string;
}
export class currentUser {
  id: number;
  email: string;
  role: string;
}

export class loginUser {
  username: string;
  password: string;
}

export class chatList {
  id: number;
  masterId: number;
  clientId: number;
  masterSeen: boolean;
  clientSeen: boolean;
}

export class chatCreate {
  masterId: number;
  clientId: number;
  masterSeen: boolean;
  clientSeen: boolean;
}

export class chatDetail {
  id: number;
  masterId: number;
  clientId: number;
  masterSeen: boolean;
  clientSeen: boolean;
  fromName: string;
  fromSurname: string;
}

export class message {
  chatId: number;
  userFromId: number;
  userToId: number;
  text: string;
}

export class messageList {
  id: number;
  chatId: number;
  userFromId: number;
  userToId: number;
  text: string;
}

export class userById {
  email: string;
}
