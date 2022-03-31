/* tslint:disable:typedef */
import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly zone: NgZone
  ) {
  }

  default(message: string, duration: number = 2000) {
    if (message) {
      this.show(message, {
        duration,
        panelClass: 'default-notification-overlay',
      });
    }
  }

  info(message: string, duration: number = 2000) {
    if (message) {
      this.show(message, {
        duration,
        panelClass: 'info-notification-overlay',
      });
    }
  }

  success(message: string, duration: number = 3000) {
    this.show(message, {
      duration,
      panelClass: 'success-notification-overlay',
    });
  }

  warn(message: string, duration: number = 2500) {
    this.show(message, {
      duration,
      panelClass: 'warning-notification-overlay',
    });
  }

  error(message: string, duration: number = 3000) {
    if (message) {
      this.show(message, {
        duration,
        panelClass: 'error-notification-overlay',
      });
    }
  }

  private show(message: string, configuration: MatSnackBarConfig) {
    // Need to open snackBar from Angular zone to prevent issues with its position per
    this.snackBar.open
    this.zone.run(() => this.snackBar.open(message, undefined, configuration));
  }

  dismiss() {
    this.zone.run(() => this.snackBar.dismiss());
  }


}
