import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { chatDetail, chatList, currentUser, message, messageList } from '../models/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  constructor(
    private service: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {    
    this.load();
    this.newMessage = new message();
    this.selectedChat = new chatDetail();
    this.selectedChat.id = 0;
  }

  currentUserId: number;
  chats: chatDetail[];
  newMessage: message;
  messages: messageList[];
  selectedChat: chatDetail;

  load(chat = new chatDetail) {
    this.service.getCurrentUser().subscribe(user => {
      this.currentUserId = user.id;    
      this.service.getUserChats(user.id).subscribe((data: any) => {
        this.chats = data;
        this.chats.forEach(a => {
          var fromId = 0;
          a.clientId == user.id ? fromId = a.masterId : fromId = a.clientId;

          this.service.getUserById(fromId).subscribe((user: any) => {
            a.fromName = user.name;
            a.fromSurname = user.surname;
          });
        });        
      });
    });
    if (chat.id > 0) {
      this.selectChat(chat);
    }
  }

  send() {
    if (this.newMessage.text.length > 0) {
      let editChat = this.selectedChat;


      this.newMessage.chatId = this.selectedChat.id;
      this.newMessage.userFromId = this.currentUserId;

      this.selectedChat.clientId == this.currentUserId
        ? this.newMessage.userToId = this.selectedChat.masterId
        : this.newMessage.userToId = this.selectedChat.clientId;

      this.selectedChat.clientId == this.currentUserId
        ? editChat.masterSeen = false
        : editChat.clientSeen = false;
      
      this.service.sendMessage(this.newMessage).subscribe((data) => {
        this.newMessage = new message();
        this.load(editChat);
      });
    }
  }

  selectChat(chat: chatDetail) {
    this.selectedChat = chat;
    this.service.getMessages(chat.id).subscribe((data) => {
      this.messages = data;
    });
  }
}
