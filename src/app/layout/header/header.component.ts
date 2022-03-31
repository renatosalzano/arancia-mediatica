import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { CognitoAuthService } from 'src/app/core/auth/services/cognito/cognito-auth.service';
import { CheckViewportSizeService } from 'src/app/service/check-viewport-size.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cssClass = 'navbar';
  menuCssClass = 'menu';
  isMobile = false;
  isLogged = false;

  constructor(
    private checkViewport: CheckViewportSizeService,
    private cognito: CognitoAuthService,
    private auth: AuthService
  ) {
    this.checkViewport.isMobile$.subscribe((mobile) => {
      if (mobile) {
        this.isMobile = true;
        this.cssClass = 'navbar mobile';
        this.menuCssClass = 'menu mobile';
      } else {
        this.isMobile = false;
        this.cssClass = 'navbar';
        this.menuCssClass = 'menu';
        this.showMenu = false;
      }
      this.setMenuClass();
    });
  }

  public cognitoLogin() {
    this.auth.loginWithGoogle();
  }

  public showMenu = false;

  public toggleMenu() {
    this.showMenu = !this.showMenu;
    this.setMenuClass();
  }

  private setMenuClass() {
    let classname = 'menu';
    if (this.isMobile) classname += ' mobile';
    if (this.showMenu) classname += ' open';
    this.menuCssClass = classname;
  }

  async isAuth() {
    this.isLogged = await this.cognito.isAuthenticated();
    console.log('IS LOGGED', this.isLogged);
  }

  ngOnInit() {
    this.isAuth();
  }

  ngOnDestroy(): void {
    this.checkViewport.isMobile$.unsubscribe();
  }
}
