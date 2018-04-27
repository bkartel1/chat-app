import { Component, ViewChild } from '@angular/core';
import { NavController, Events, Content } from 'ionic-angular';

import { ChatService } from './chat.service';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  @ViewChild(Content) content: Content;

  private message: string;

  constructor(
    public navCtrl: NavController,
    private chatService: ChatService,
    public events: Events
  ) {
    this.getWatsonMessage('oi'); // so watson sends a message first for the user
    events.subscribe('displayMessage', (message, watson) => {
      console.log("DISPLAY MESSAGE EVENT");
      this.displayMessage(message,watson);
    });
    events.subscribe('lectureFeedback', () => {
      console.log('LECTURE FEEDBACK EVENT');
      this.getWatsonMessage('feedback');
    });
  }

  displayMessage(message, watson) {    
    let divClass = watson?'watson':'user';
    let bubble = '<div class="bubble '+divClass+'">'+message+'</div>';
    document.getElementById('chat_body').insertAdjacentHTML('beforeend',bubble);
    this.content.scrollToBottom();
  }

  sendUserMessage(userMessage) {
    if (userMessage != '') {
      this.displayMessage(userMessage,false);
      this.getWatsonMessage(userMessage);
      this.message = '';
    }
  }

  getWatsonMessage(message) {
    let params = {
       user: JSON.parse(localStorage.getItem('user')),
       text: message
    };

    this.chatService.sendMessage(params).then((result) => {
      let texts =  result.output.text;
        
      if (result.output.map_image !== undefined )
          texts.push("<img src ='"+result.output.map_image+"'>");

      for (let text in texts) {
          this.displayMessage(texts[text], true);
      }
    }).catch((error) => {
      this.displayMessage('Um erro ocorreu, verifique sua internet e tente mais tarde.', true);
    });
  }

}
