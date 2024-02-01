import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { QRCodeModule } from 'angularx-qrcode';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastServiceService } from './services/toast-service.service';
import { ToastsComponent } from './components/toasts/toasts.component';
import { EditorContainerComponent } from './components/editor-container/editor-container.component';
import { PreviewComponent } from './components/preview/preview.component';
import { EditorsComponent } from './components/editors/editors.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { EditorHtmlComponent } from './components/editor-html/editor-html.component';
import { EditorCssComponent } from './components/editor-css/editor-css.component';
import { EditorJsComponent } from './components/editor-js/editor-js.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeChangeService } from './services/theme-change.service';
import { EditorServiceService } from './services/editor-service.service';
import { DiffEditorComponent } from './components/diff-editor/diff-editor.component';
import { DiffEditorModel } from 'ngx-monaco-editor-v2';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { KeyboardEventsService } from './services/keyboard-events.service';
import { ResourcesComponent } from './components/resources/resources.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EditorContainerComponent,
    PreviewComponent,
    EditorsComponent,
    EditorHtmlComponent,
    EditorCssComponent,
    EditorJsComponent,
    TabsComponent,
    DiffEditorComponent,
    ResourcesComponent,
  ],
  // exports: [HeaderComponent, PreviewComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbToast,
    QRCodeModule,
    ToastsComponent,
    MatTabsModule,
    BrowserAnimationsModule,
    NgbTooltip,
    CommonModule,
    NgxSpinnerModule,

    MonacoEditorModule.forRoot(),
  ],

  providers: [
    ToastServiceService,
    ThemeChangeService,
    EditorServiceService,
    KeyboardEventsService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
