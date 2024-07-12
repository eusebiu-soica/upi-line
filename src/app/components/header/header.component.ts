import { Component, OnInit, HostListener } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { ThemeChangeService } from 'src/app/services/theme-change.service';
import { EditorServiceService } from 'src/app/services/editor-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private clipboard: Clipboard,
    public toast: ToastServiceService,
    public theme: ThemeChangeService,
    public download: EditorServiceService,
    public name: EditorServiceService
  ) {}

  linkToShare = 'https://www.pangolin.com/wed-rfg-thy-ujh';
  deviceConnected = 0;
  fileName = '';
  firstTime: boolean = true;

  handleConnection() {
    if (this.deviceConnected > 0) {
      console.log('sdd');
      this.toast.showMessage('A new device was conected!', 'info');
    }
  }

  ngOnInit() {
    this.handleConnection();
  }

  currentTheme = 'vs-dark';
  changeTheme() {
    document.querySelector('html')?.classList.toggle('dark');
    document.querySelector('.theme')?.classList.toggle('bi-moon-stars');
    document.querySelector('.theme')?.classList.toggle('bi-sun');

    if (this.currentTheme === 'vs-light') {
      this.theme.setTheme('vs-dark');
      this.currentTheme = 'vs-dark';
    } else {
      this.theme.setTheme('vs-light');
      this.currentTheme = 'vs-light';
    }
  }

  copyLink() {
    try {
      let copy = this.clipboard.copy(this.linkToShare);
      if (copy) {
        this.toast.showMessage(
          'The link has been successfully copied.',
          'success'
        );
      }
    } catch (err) {
      this.toast.showMessage(
        "Something went wrong and we couldn't copy the link.",
        'error'
      );
    }
  }

  changeLayout(type: number) {
    switch (type) {
      case 1:
        document
          .querySelector('.upi-editor-container')
          ?.classList.add('layout-1');
        document
          .querySelector('.upi-editor-container')
          ?.classList.remove('layout-2');
        document
          .querySelector('.upi-editor-container')
          ?.classList.remove('layout-3');
        break;

      case 2:
        document
          .querySelector('.upi-editor-container')
          ?.classList.remove('layout-1');
        document
          .querySelector('.upi-editor-container')
          ?.classList.remove('layout-3');
        document
          .querySelector('.upi-editor-container')
          ?.classList.add('layout-2');
        break;

      case 3:
        document
          .querySelector('.upi-editor-container')
          ?.classList.add('layout-3');
        document
          .querySelector('.upi-editor-container')
          ?.classList.remove('layout-1');
        document
          .querySelector('.upi-editor-container')
          ?.classList.remove('layout-2');
        break;

      default:
        document
          .querySelector('.upi-editor-container')
          ?.classList.toggle('layout-1');
        break;
    }
  }

  setName() {
    this.name.setName(this.fileName);
  }

  public setLive(): void {
    let value = this.name.livePreview ? false : true;
    if (value) {
      document.querySelector('.live')?.classList.add('bi-eye');
      document.querySelector('.live')?.classList.remove('bi-eye-slash');
      document.querySelector('.live-badge')?.classList.remove('bg-danger');
      document.querySelector('.live-badge')?.classList.add('bg-success');
      if (this.firstTime) {
        this.toast.showMessage(
          "Live preview is enabled. Now you don't need to press CRTL  +S to save your work",
          'info'
        );
        this.firstTime = false;
      }
    } else {
      if (this.firstTime) {
        this.toast.showMessage(
          'Live preview is disabled. Now you need to press CRTL + S to save your work',
          'info'
        );
      }
      document.querySelector('.live-badge')?.classList.add('bg-danger');
      document.querySelector('.live-badge')?.classList.remove('bg-success');
      document.querySelector('.live')?.classList.remove('bi-eye');
      document.querySelector('.live')?.classList.add('bi-eye-slash');
    }
    this.name.setLivePreview(value);
  }

  openFile(type: string) {
    switch (type) {
      case 'css':
        const inputCss = document.querySelector(
          '#css-file'
        ) as HTMLInputElement;
        inputCss.click();
        break;
      case 'js':
        const inputJS = document.querySelector('#js-file') as HTMLInputElement;
        inputJS.click();
        break;
      case 'svg':
        const inputSVG = document.querySelector(
          '#svg-file'
        ) as HTMLInputElement;
        inputSVG.click();
        break;
      case 'html':
        const inputHTML = document.querySelector(
          '#html-file'
        ) as HTMLInputElement;
        inputHTML.click();
        break;
      case 'folder':
        const inputFolder = document.querySelector(
          '#folder-opener'
        ) as HTMLInputElement;
        inputFolder.click();
        break;
    }
  }

  // prevent page keys functions
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    try {
      if (event.key === 'q' && (event.ctrlKey || event.metaKey)) {
        this.setLive();
        event.preventDefault();
      }
    } catch (err) {
      console.log(err);
      this.toast.showMessage('Something went wrong', 'error');
    }
  }
}
