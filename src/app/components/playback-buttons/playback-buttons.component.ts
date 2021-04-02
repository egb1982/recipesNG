import { Component, OnInit, Input, NgZone } from '@angular/core';

import {
  SpeechSynthesisUtteranceFactoryService,
  SpeechSynthesisService,
} from '@kamiazya/ngx-speech-synthesis';

@Component({
  selector: 'app-playback-buttons',
  templateUrl: './playback-buttons.component.html',
  styleUrls: ['./playback-buttons.component.scss'],
  providers:[SpeechSynthesisUtteranceFactoryService]
})
export class PlaybackButtonsComponent implements OnInit {

  @Input('record') speakingList: SpeechSynthesisUtterance;
  playbackStatus: string;

  constructor(public speechUtteranceService: SpeechSynthesisUtteranceFactoryService,
    public speechSynthService: SpeechSynthesisService,
    private zone: NgZone) { }

  ngOnInit(): void {
    this.setListeners(this.speakingList);
  }

  setListeners( speechSyntUtt:SpeechSynthesisUtterance ) {
    speechSyntUtt.onstart = () =>{
      this.zone.run( () => {
        this.playbackStatus = 'playing';
        console.log(this.playbackStatus);  
      });
    }
    speechSyntUtt.onend = () =>{
      this.zone.run( () => {
        this.playbackStatus = 'stopped';
        console.log(this.playbackStatus);
        });
    }
    speechSyntUtt.onpause = () =>{
      this.zone.run( () => {
        this.playbackStatus = 'paused';
        console.log(this.playbackStatus);
        });
    }
    speechSyntUtt.onresume = () =>{
      this.zone.run( () => {
        this.playbackStatus = 'playing';
        console.log(this.playbackStatus);
        });
    }
  }


  reproduce(record:SpeechSynthesisUtterance) {
    this.cancel();
    this.speak(record);
  }

  speak(voicemsg){
    this.speechSynthService.speak(voicemsg);
  }

  cancel() {
    this.speechSynthService.cancel();
  }
  pause() {
    this.speechSynthService.pause();
  }

  resume() {
    this.speechSynthService.resume();
  }
}
