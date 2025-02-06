import { Injectable } from '@angular/core';
import { GlobalConstants } from '../Type/global-constants';
declare var window: any;
@Injectable({
  providedIn: 'root'
})
export class AlertmessageService {
  ttl:number = 2000; // what is this , why am i updating it.
  constructor() { }

  notify(title: string, message: string, type:string) {
    this.setnotify(title, message, type);
}

setnotify(title: string, message: string, type:string):void {
    let that = this;
    if(type===GlobalConstants.NOTICE_ERROR){
        this.ttl = 5000;
    }
    if(type===GlobalConstants.NOTICE_SUCCESS) {
      this.ttl = 5000;
    }
    window.RAUL.commands.toast({
        tagName: 'raul-snackbar',
        timeout: this.ttl,
        variant: type,
        heading:title,
        content:message,
        ctaMessage:null,
        ctaUrl:null,
        dismissable: true
    })
}
}
