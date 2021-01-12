import { ToastComponent } from './../shared/toaster/toast/toast.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService implements OnInit {
  durationSeconds = 5;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.config = {
      duration: this.durationSeconds * 1000
    };
  }

  toastSuccess(message: string): void {
    this.toast(message, '𐄂', {
      data: { message },
      panelClass: '',
      ...this.config
    });
  }

  toastError(message: string): void {
    this.toast(message, '𐄂', {
      data: { message },
      panelClass: '',
      ...this.config
    });
  }

  toastWarning(message: string): void {
    this.toast(message, '𐄂', {
      data: { message },
      panelClass: '',
      ...this.config
    });
  }

  toastNeutral(message: string): void {
    this.toast(message, '𐄂', {
      data: { message },
      panelClass: '',
      ...this.config
    });
  }

  toast(config: MatSnackBarConfig): void {
    this.snackBar.openFromComponent(ToastComponent, config);
  }
}
