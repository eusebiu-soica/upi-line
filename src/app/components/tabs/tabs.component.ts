import { Component, HostListener } from '@angular/core';
import { EditorServiceService } from 'src/app/services/editor-service.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastServiceService } from 'src/app/services/toast-service.service';
// import { KeyboardEventsService } from 'src/app/services/keyboard-events.service';

@Component({
  selector: 'app-tabs',

  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  constructor(
    public editor: EditorServiceService,
    public clipboard: Clipboard,
    public toast: ToastServiceService // public key: KeyboardEventsService
  ) {}

  currentEditor: string = 'html';
  html: string;
  css: string;
  js: string;

  handleCode() {
    this.html = this.editor.getCode('html').value;
    this.css = this.editor.getCode('css').value;
    this.js = this.editor.getCode('js').value;
  }

  setEditor(value: string) {
    this.currentEditor = value;
  }

  clearEditor() {
    this.editor.setCode(this.currentEditor, '');
  }

  isNull() {
    this.handleCode();
    switch (this.currentEditor) {
      case 'html':
        return this.html === '';
      case 'css':
        return this.css === '';
      case 'js':
        return this.js === '';
      default:
        return true;
    }
  }
  copyCode() {
    if (this.isNull()) {
      this.toast.showMessage('Nothing to copy!', 'warning');
    } else {
      switch (this.currentEditor) {
        case 'html':
          try {
            let copy = this.clipboard.beginCopy(this.html);
            const copyed = copy.copy();
            if (copyed) {
              this.toast.showMessage(
                'Code copied to clipboard successfully.',
                'success'
              );
            }
          } catch (err) {
            this.toast.showMessage(err, 'success');
          }
          break;

        case 'css':
          try {
            let copy = this.clipboard.beginCopy(this.css);
            const copyed = copy.copy();
            if (copyed) {
              this.toast.showMessage(
                'Code copied to clipboard successfully.',
                'success'
              );
            }
          } catch (err) {
            this.toast.showMessage(err, 'error');
          }
          break;

        case 'js':
          try {
            let copy = this.clipboard.beginCopy(this.js);
            const copyed = copy.copy();
            if (copyed) {
              this.toast.showMessage(
                'Code copied to clipboard successfully.',
                'success'
              );
            }
          } catch (err) {
            this.toast.showMessage(err, 'error');
          }
          break;
      }
    }
  }

  pasteCode() {
    navigator.clipboard
      .readText()
      .then((text) => {
        this.editor.setCode(this.currentEditor, text);
      })
      .catch((err) => {
        this.toast.showMessage(
          'Clipboard access denied. Please allow clipboard access and try again.',
          'error'
        );
      });
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
}
