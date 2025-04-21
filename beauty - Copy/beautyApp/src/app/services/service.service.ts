import { Injectable } from '@angular/core';
import { appointment, appointmentEdit, chatCreate, chatList, currentUser, IUserDetailModule, IUserListModule, loginUser, message, messageList, userById, userEditModel, userFeedbackEditModel } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ServiceService {

  constructor(public http: HttpClient) { }

  public get apiUrl(): string { return `https://localhost:7075/api/` }

  createUser(item: userEditModel): Observable<IUserListModule> {
    console.log(item);
    return this.http.post<IUserListModule>(this.apiUrl+"Users", item);
  }

  getUsers(): Observable<IUserListModule[]> {
    return this.http.get<IUserListModule[]>(this.apiUrl + "Users");
  }

  getUserById(id: number): Observable<IUserDetailModule> {
    return this.http.get<IUserDetailModule>(this.apiUrl + "Users/" + id);
  }

  createFeedback(item: userFeedbackEditModel) {
    return this.http.post<number>(this.apiUrl + "UserFeedbacks", item);
  }

  deleteFeedback(id: number) {
    return this.http.delete<number>(this.apiUrl + "UserFeedbacks/" + id);
  }

  createAppointment(item: appointment) {
    return this.http.post<number>(this.apiUrl + "Appointments", item);
  }

  saveEditAppointment(item: appointmentEdit) {
    return this.http.put<number>(this.apiUrl + "Appointments/"+item.id, item);
  }

  deleteAppointment(id: number) {
    return this.http.delete<number>(this.apiUrl + "Appointments/" + id);
  }

  getAppointmentsByMaster(id: number): Observable<appointmentEdit[]> {
    return this.http.get<appointmentEdit[]>(this.apiUrl + "Appointments/master/" + id);
  }

  getAppointmentsByClient(id: number): Observable<appointmentEdit[]> {
    return this.http.get<appointmentEdit[]>(this.apiUrl + "Appointments/client/" + id);
  }

  getFeedbacksByUser(id: number): Observable<userFeedbackEditModel[]> {
    return this.http.get<userFeedbackEditModel[]>(this.apiUrl + "UserFeedbacks/user/" + id);
  }

  login(data: loginUser): Observable<number> {
    return this.http.post<number>(this.apiUrl + "Users/login", data);
  }

  getCurrentUser(): Observable<currentUser> {
    return this.http.get<currentUser>(this.apiUrl + "Users/current");
  }

  logout(): Observable<number> {
    return this.http.get<number>(this.apiUrl + "Users/logout");
  }

  applyToAppointment(appointment: appointmentEdit): Observable<number> {
    return this.http.put<number>(this.apiUrl + "Appointments/" + appointment.id, appointment);
  }

  editUser(user: IUserDetailModule): Observable<number> {
    return this.http.put<number>(this.apiUrl + "Users/" + user.id, user);
  }



  getUserChats(userId: number): Observable<chatList[]> {
    return this.http.get<chatList[]>(this.apiUrl + "Chats/User/" + userId);
  }

  createChat(data: chatCreate): Observable<number> {
    return this.http.post<number>(this.apiUrl + "Chats", data);
  }

  getMessages(id: number): Observable<messageList[]> {
    return this.http.get<messageList[]>(this.apiUrl + "Chats/Messages/" + id);
  }

  sendMessage(data: message): Observable<chatList> {
    return this.http.post<chatList>(this.apiUrl + "Chats/Message", data);
  }

  getUserByEmail(data: userById): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + "Users/Email", data);
  }
}
