import { Injectable } from '@angular/core';
declare global {
	interface Window {
		OneSignal: any;
	}
}

@Injectable({
  providedIn: 'root'
})
export class OnesignalService {

  constructor() { }

  async onLoad(): Promise<any> {
    window.OneSignal = window.OneSignal || [];
    return new Promise((resolve) => {
      window.OneSignal.push(function() {
        resolve(window.OneSignal);
      });
    });
  }

  onInit():void {
    this.onLoad().then((OneSignal)=>{
      OneSignal.init({
        appId: "BG3uFwjfbA541JKmBu_jqwTt83nuMWpVhllXGuQ1kTRHoovzQd6os7YQ3un0LQeSr286GBIZniblSgg4m9LvVFo",
      });
    });
  }
  sendTags(user:any):void {
    this.onLoad().then((OneSignal)=>{
      OneSignal.sendTags({
        user: user,
      });
    });
  }
}
