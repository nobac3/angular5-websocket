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
  user:string
  color:string

  private _sub: Subscription;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    
    this._sub = this.chatService.msg.subscribe(msg => {
      
      this.messages.push(msg)
      this.chatService.saveMessage(msg)
    })
    
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  colorCheck: boolean = true
  length: number
  i:number = 1

  getMessages(){
    this.chatService.getSavedMessages().subscribe(msg =>{ 

      this.length = msg.length
      //var colorCheck = true
      msg.forEach(m =>{ 
        
        //loads the messages for the right room
        if(m.room == this.chatroom) {
          this.messages.push(m)
        }

        console.log(this.colorCheck)
        if(this.colorCheck == true) {

          if(m.user == this.user){


            this.color = m.color
            this.colorCheck = false

          }
      
        }

        if(this.colorCheck == true && this.i == this.length){ 


          var letters = '0123456789ABCDEF';
          var c = '#';
          for (var i = 0; i < 6; i++) {
            c += letters[Math.floor(Math.random() * 16)];
          }

          this.color = c

        }

        this.i++
      })
   
      
    })
    
    setTimeout(() =>{ 

    this.chatService.getColor(this.color)

      }, 300) 
  }

  saveMessage(msgObject){

    this.chatService.saveMessage(msgObject)
  }

  createUser(username:string, room:string){

    this.signInStatus = true
    this.chatroom = room
    this.user = username
    this.getMessages()
    this.chatService.signIn(username, room)

  }

  onSubmit(message:string){
    this.messageText = ''
    this.chatService.newMessage(message)
  }
}
