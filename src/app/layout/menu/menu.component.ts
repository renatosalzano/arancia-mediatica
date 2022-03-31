import { EventEmitter } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Input, Output } from '@angular/core';
import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CognitoAuthService } from 'src/app/core/auth/services/cognito/cognito-auth.service';
import { UserData } from 'src/app/core/user-session/models/user-session.models';
import { UserSessionService } from 'src/app/core/user-session/service/user-session.service';
import { CheckViewportSizeService } from 'src/app/service/check-viewport-size.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  @Input() isMobile = false;
  @Output() linkClick = new EventEmitter();

  public handleClick() {
    this.linkClick.emit();
  }

  public cssClass = 'menu';
  public user: UserData = {} as UserData;

  constructor(
    private checkViewport: CheckViewportSizeService,
    private cognito: CognitoAuthService,
    private userSession: UserSessionService,
    private ref: ElementRef
  ) {}

  cognitoLogout() {
    this.cognito.logout();
    this.linkClick.emit();
  }

  ngOnInit(): void {
    this.checkViewport.isMobile$.subscribe((mobile) => {
      if (mobile) this.cssClass = 'link-container mobile';
      else this.cssClass = 'link-container';
    });
    this.user = this.userSession.getUserData();
  }

  ngOnDestroy(): void {
    this.checkViewport.isMobile$.unsubscribe();
  }
}
