import { Component } from '@angular/core';
import { ThemeChangeService } from 'src/app/services/theme-change.service';
import { EditorServiceService } from 'src/app/services/editor-service.service';

@Component({
  selector: 'app-editor-js',
  templateUrl: './editor-js.component.html',
  styleUrls: ['./editor-js.component.scss'],
})
export class EditorJsComponent {
  constructor(
    public themeEditor: ThemeChangeService,
    public editor: EditorServiceService
  ) {}

  editorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    automaticLayout: true,
  };
  code: string;

  ngOnInit() {
    this.themeEditor.getTheme().subscribe((theme) => {
      this.editorOptions = { ...this.editorOptions, theme };
    });
    this.editor.getCode('js').subscribe((code: any) => {
      this.code = code;
    });
  }

  private setCodeTimeout: any;
  setCode() {
    if (this.editor.livePreview) {
      clearTimeout(this.setCodeTimeout);
      this.setCodeTimeout = setTimeout(() => {
        this.editor.setCode('js', this.code);
      }, 1000);
    } else {
      this.editor.setCode('js', this.code);
    }
  }
}
