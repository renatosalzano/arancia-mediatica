import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CheckViewportSizeService } from './service/check-viewport-size.service';
import { UserInfoService } from './service/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'aranciamediatica';
  isMobile = false;
  constructor(
    private checkViewport: CheckViewportSizeService,
    private user: UserInfoService
  ) {}

  ngOnInit(): void {
    this.checkViewport.isMobile$.subscribe(
      (mobile) => (this.isMobile = mobile)
    );
    this.user.getUserInfo();
  }

  ngOnDestroy(): void {
    this.checkViewport.isMobile$.unsubscribe();
  }
}
