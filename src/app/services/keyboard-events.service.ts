import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class KeyboardEventsService {
  constructor() {} // @Inject(forwardRef(() => TabsComponent)) private tabs: TabsComponent

  keyEvent(event: KeyboardEvent): any {
    try {
      if (event.key === ';' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        this.fullScreenEditor();
      }
      if (event.key === "'" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        this.fullScreenPreview();
      }
      if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
      }
      if (event.key === 'r' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        this.reloadFrame();
      }

      if (event.key === 'F5') {
        console.log('in iframe');
        event.preventDefault();
        this.reloadFrame();
      }
    } catch (err) {
      console.log(err);
    }
  }

  reloadFrame() {
    const iframe = document.getElementById('preview') as HTMLIFrameElement;
    const icon = document.querySelector('.bi-arrow-clockwise') as HTMLElement;
    icon.classList.add('rotate');
    iframe.contentDocument.location.reload();
    iframe.onload = () => {
      setTimeout(() => {
        icon.classList.remove('rotate');
      }, 1000);
    };
  }

  fullScreenEditor() {
    document
      .querySelector('.upi-editor-container')
      ?.classList.toggle('layout-4');
    if (
      document
        .querySelector('.upi-editor-container')
        ?.classList.contains('layout-5')
    ) {
      document
        .querySelector('.upi-editor-container')
        ?.classList.toggle('layout-5');
    }
    document
      .querySelector('.fullScreen')
      ?.classList.toggle('bi-fullscreen-exit');
    document.querySelector('.fullScreen')?.classList.toggle('bi-fullscreen');
  }

  fullScreenPreview() {
    document
      .querySelector('.upi-editor-container')
      ?.classList.toggle('layout-5');
    if (
      document
        .querySelector('.upi-editor-container')
        ?.classList.contains('layout-4')
    ) {
      document
        .querySelector('.upi-editor-container')
        ?.classList.toggle('layout-4');
    }
    document
      .querySelector('.fullscreen-preview')
      ?.classList.toggle('bi-fullscreen-exit');
    document
      .querySelector('.fullscreen-preview')
      ?.classList.toggle('bi-fullscreen');
  }
}
