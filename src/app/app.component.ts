import { Component } from '@angular/core';
import { OnesignalService } from './onesignal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public readonly  VAPID_PUBLIC_KEY = "FWczc1htoNapHpekmNFFGpbX4Qzi47kkDnwRnsxCb5qo"

  title = 'login-firebase';

  constructor(private onesignal: OnesignalService){}
  ngOnInit(): void {
    this.onesignal.onInit()
  }

}
