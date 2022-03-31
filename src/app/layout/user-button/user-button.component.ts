import { Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { UserSessionService } from 'src/app/core/user-session/service/user-session.service';

const DEFAULT_IMAGE = '../../../assets/img/default_user_image.jpg';

@Component({
  selector: 'user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss'],
})
export class UserButtonComponent implements OnInit {
  @Input() static: boolean = false;
  @Input() isLogged: boolean = false;

  @HostListener('document:click', ['$event.target'])
  public onPageClick(targetElement) {
    // detect click outside dropdown
    const clickedInside = this.ref.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.showDropdown = false;
    }
  }

  constructor(
    private auth: AuthService,
    private user: UserSessionService,
    private ref: ElementRef
  ) {}

  public userInfo = { name: '', picture: '' };
  public showDropdown = false;

  cognitoLogin() {
    this.auth.loginWithGoogle();
  }

  cognitoLogout() {
    this.auth.logout();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  ngOnInit(): void {
    const userInfo = this.user.getUserData();
    console.log(userInfo);
    if (!!userInfo.name && !!userInfo.picture) {
      const { name, picture } = this.user.getUserData();
      this.userInfo = { name, picture };
    } else {
      this.userInfo.name = 'Oranger';
      this.userInfo.picture = DEFAULT_IMAGE;
    }
  }
}
