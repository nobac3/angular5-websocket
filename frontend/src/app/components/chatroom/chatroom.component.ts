import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message'

import { ChatService } from '../../services/chat.service'

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  
  signInStatus : boolean = false
  messages: Message[] = []
  messageText: string = ''
  chatroom: string

  private _sub: Subscription;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    
    this.getMessages()
    
    this._sub = this.chatService.msg.subscribe(msg => {
      this.messages.push(msg)
      this.chatService.saveMessage(msg)
    })
    
  }


  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  getMessages(){
    this.chatService.getSavedMessages().subscribe(msg =>{ 

      this.messages = msg



    })
  }

  saveMessage(msgObject){

    this.chatService.saveMessage(msgObject)
  }

  createUser(username:string, room:string){

    this.signInStatus = true
    this.chatroom = room
    this.chatService.signIn(username, room)

  }

  onSubmit(message:string){
    this.messageText = ''
    this.chatService.newMessage(message)
  }
}
