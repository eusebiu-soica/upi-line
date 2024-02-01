import { Injectable } from '@angular/core';

export interface ToastInfo {
  body: string;
  type: string;
  class: string;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastServiceService {
  public toasts: ToastInfo[] = [];
  private show(data: any) {
    this.toasts.push(data);
  }

  primaryClass = 'text-bg-primary';
  infoClass = 'text-bg-info';
  errorClass = 'text-bg-danger';
  warningClass = 'text-bg-warning';
  successClass = 'text-bg-success';

  primaryIcon = '<i class="bi bi-bell-fill"></i>';
  infoIcon = '<i class="bi bi-info-circle-fill"></i>';
  errorIcon = '<i class="bi bi-x-circle-fill"></i>';
  warningIcon = '<i class="bi bi-exclamation-circle-fill"></i>';
  successIcon = '<i class="bi bi-check-circle-fill"></i>';

  showMessage(body: string, type: string) {
    switch (type) {
      case 'info':
        this.show({
          body: body,
          type: type,
          class: this.infoClass,
          icon: this.infoIcon,
        });
        break;
      case 'error':
        this.show({
          body: body,
          type: type,
          class: this.errorClass,
          icon: this.errorIcon,
        });
        break;
      case 'warning':
        this.show({
          body: body,
          type: type,
          class: this.warningClass,
          icon: this.warningIcon,
        });
        break;
      case 'success':
        this.show({
          body: body,
          type: type,
          class: this.successClass,
          icon: this.successIcon,
        });
        break;
      case 'default':
        this.show({
          body: body,
          type: type,
          class: this.primaryClass,
          icon: this.primaryIcon,
        });
        break;

      default:
        this.show({
          body: body,
          type: type,
          class: this.primaryClass,
          icon: this.primaryIcon,
        });
        break;
    }
  }
}
