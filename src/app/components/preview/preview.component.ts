import { Component, forwardRef, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EditorServiceService } from 'src/app/services/editor-service.service';
import { KeyboardEventsService } from 'src/app/services/keyboard-events.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
  constructor(
    public editor: EditorServiceService,
    private sanitizer: DomSanitizer,
    private key: KeyboardEventsService // @Inject(forwardRef(() => HeaderComponent)) private header: HeaderComponent
  ) {}

  url: any;
  ngOnInit() {
    this.editor.getURL().subscribe((url: any) => {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });

    const ifr = document.querySelector('#preview') as HTMLIFrameElement;

    ifr.addEventListener('load', () => {
      try {
        ifr.contentDocument?.addEventListener('keydown', (event) => {
          if (event.key === 'r' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            this.reloadFrame();
          }
          if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
          }
          if (event.key === 'F5') {
            console.log('in iframe');
            event.preventDefault();
            this.reloadFrame();
          }
          if (event.key === ';' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            this.key.fullScreenEditor();
          }
          if (event.key === "'" && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            this.fullScreenPreview();
          }
          if (event.key === 'q' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  fullScreenPreview() {
    this.key.fullScreenPreview();
  }

  reloadFrame() {
    this.key.reloadFrame();
  }
}
