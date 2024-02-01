import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ToastServiceService } from './services/toast-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderComponent } from './components/header/header.component';
import { KeyboardEventsService } from './services/keyboard-events.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'upiLine';
  loading: boolean = true;

  constructor(
    private toast: ToastServiceService,
    private spinner: NgxSpinnerService,
    private key: KeyboardEventsService
  ) {}
  @ViewChild(HeaderComponent, { static: false })
  headerComponent: HeaderComponent;

  ngOnInit() {
    this.spinner.show();
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.loading = false;
        this.spinner.hide();
        window.removeEventListener('load', () => {});
      }, 500);
    });

    let sessionID = sessionStorage.getItem('sessionID');
    if (!sessionID) {
      sessionID = uuid();
      sessionStorage.setItem('sessionID', sessionID);
    }
  }

  // prevent page keys functions
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    this.key.keyEvent(event);
    try {
      if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
      }
    } catch (err) {
      console.log(err);
      this.toast.showMessage('Something went wrong', 'error');
    }
  }
}
