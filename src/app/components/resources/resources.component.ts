import { Component } from '@angular/core';
import { ThemeChangeService } from 'src/app/services/theme-change.service';
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent {
  constructor(public themeEditor: ThemeChangeService) {}

  editorOptions = {
    theme: 'vs-dark',
    language: 'html',
    automaticLayout: true,
  };
  code: string;

  ngOnInit() {
    this.themeEditor.getTheme().subscribe((theme) => {
      this.editorOptions = { ...this.editorOptions, theme };
    });
    // this.editor.getCode('js').subscribe((code: any) => {
    //   this.code = code;
    // });
  }
}
