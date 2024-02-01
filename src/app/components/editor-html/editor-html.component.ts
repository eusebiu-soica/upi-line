import { ChangeDetectorRef, Component } from '@angular/core';
import { ThemeChangeService } from 'src/app/services/theme-change.service';
import { EditorServiceService } from 'src/app/services/editor-service.service';

@Component({
  selector: 'app-editor-html',
  templateUrl: './editor-html.component.html',
  styleUrls: ['./editor-html.component.scss'],
})
export class EditorHtmlComponent {
  constructor(
    public themeEditor: ThemeChangeService,
    public editor: EditorServiceService
  ) {}

  editorOptions = {
    theme: 'vs-dark',
    language: 'html',
    automaticLayout: true,
  };
  code: string = this.editor.getCode('html');

  ngOnInit() {
    this.themeEditor.getTheme().subscribe((theme) => {
      this.editorOptions = { ...this.editorOptions, theme };
    });
    this.editor.getCode('html').subscribe((code: any) => {
      this.code = code;
    });
  }

  private setCodeTimeout: any;
  setCode() {
    if (this.editor.livePreview) {
      clearTimeout(this.setCodeTimeout);
      this.setCodeTimeout = setTimeout(() => {
        this.editor.setCode('html', this.code);
      }, 1000);
    } else {
      this.editor.setCode('html', this.code);
    }
  }
}
