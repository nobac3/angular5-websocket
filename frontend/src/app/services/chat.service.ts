import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  msg = this.socket.fromEvent<Document>('msg');

  constructor(private socket:Socket, 
              private http: HttpClient) { }


  getSavedMessages(){ 

    return this.http.get('http://localhost:3000/messagelist')
  }

  getColor(c){

    this.socket.emit('color', c)
  }

  saveMessage(msgObject){

    this.http.post('http://localhost:3000/post',msgObject ).subscribe((res) =>{ console.log(res)})

  }

  signIn(username:string, room:string){

    this.socket.emit('username', username)
    this.socket.emit('room', room)
  }

  newMessage(msg:string){

    this.socket.emit('sentMessage', msg)
  }

  
}
