import { Component } from '@angular/core';
import { ThemeChangeService } from 'src/app/services/theme-change.service';
import { EditorServiceService } from 'src/app/services/editor-service.service';

@Component({
  selector: 'app-editor-css',
  templateUrl: './editor-css.component.html',
  styleUrls: ['./editor-css.component.scss'],
})
export class EditorCssComponent {
  constructor(
    public themeEditor: ThemeChangeService,
    public editor: EditorServiceService
  ) {}

  editorOptions = { theme: 'vs-dark', language: 'css', automaticLayout: true };
  code: string;
  ngOnInit() {
    this.themeEditor.getTheme().subscribe((theme) => {
      this.editorOptions = { ...this.editorOptions, theme };
    });
    this.editor.getCode('css').subscribe((code: any) => {
      this.code = code;
    });
  }

  private setCodeTimeout: any;
  setCode() {
    if (this.editor.livePreview) {
      clearTimeout(this.setCodeTimeout);
      this.setCodeTimeout = setTimeout(() => {
        this.editor.setCode('css', this.code);
      }, 1000);
    } else {
      this.editor.setCode('css', this.code);
    }
  }
}
