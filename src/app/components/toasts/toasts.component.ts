import { Component } from '@angular/core';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-toasts',
  standalone: true,
  templateUrl: './toasts.component.html',
  imports: [NgbToastModule, NgForOf],
  styleUrls: ['./toasts.component.scss'],
})
export class ToastsComponent {
  constructor(public toastService: ToastServiceService) {}
}
