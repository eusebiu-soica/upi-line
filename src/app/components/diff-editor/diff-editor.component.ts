import { Component } from '@angular/core';
import { DiffEditorModel } from 'ngx-monaco-editor-v2';
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { ThemeChangeService } from 'src/app/services/theme-change.service';

@Component({
  selector: 'app-diff-editor',
  templateUrl: './diff-editor.component.html',
  styleUrls: ['./diff-editor.component.scss'],
})
export class DiffEditorComponent {
  constructor(
    private toast: ToastServiceService,
    public themeEditor: ThemeChangeService
  ) {}

  ngOnInit() {
    this.themeEditor.getTheme().subscribe((theme) => {
      this.options = { ...this.options, theme };
    });
  }

  fileName1 = '';
  fileName2 = '';

  options = {
    theme: 'vs-dark',
    readonly: false,
    originalEditable: true,
    automaticLayout: true,
  };
  originalModel: DiffEditorModel = {
    code: '',
    language: 'text/plain',
  };

  modifiedModel: DiffEditorModel = {
    code: '',
    language: 'text/plain',
  };

  clearAll() {
    this.fileName1 = '';
    this.fileName2 = '';
    this.originalModel = {
      code: '',
      language: 'text/plain',
    };
    this.modifiedModel = {
      code: '',
      language: 'text/plain',
    };
  }

  pasteCode(side) {
    if (side == 'left') {
      navigator.clipboard
        .readText()
        .then((text) => {
          this.originalModel = {
            code: text,
            language: 'text/plain',
          };
        })
        .catch((err) => {
          this.toast.showMessage(
            'Clipboard access denied. Please allow clipboard access and try again.',
            'error'
          );
        });
    }
    if (side == 'right') {
      navigator.clipboard
        .readText()
        .then((text) => {
          this.modifiedModel = {
            code: text,
            language: 'text/plain',
          };
        })
        .catch((err) => {
          this.toast.showMessage(
            'Clipboard access denied. Please allow clipboard access and try again.',
            'error'
          );
        });
    }
  }
}
