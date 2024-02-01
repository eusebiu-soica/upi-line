import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, zip } from 'rxjs';
import { ToastServiceService } from './toast-service.service';
import { KeyboardEventsService } from './keyboard-events.service';
import * as JSZip from 'jszip';
@Injectable({
  providedIn: 'root',
})
export class EditorServiceService {
  private html: any = new BehaviorSubject<string>('');
  private css: any = new BehaviorSubject<string>('');
  private js: any = new BehaviorSubject<string>('');
  private urlCase: any = new BehaviorSubject<string>('');
  private url: any = new BehaviorSubject<string>('');
  public downloadName: string = 'index';
  private arhiveName = 'myProject';
  public livePreview: boolean = true;
  public save: boolean = true;

  constructor(
    private toast: ToastServiceService,
    private key: KeyboardEventsService
  ) {}

  createPage() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="Upi Line Editor">
        <meta name="description" content="Generic webpage created by Upi Line">
        <title>Upi Line Editor</title>

        <!----- Pooper ------->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.8/umd/popper.min.js" integrity="sha512-TPh2Oxlg1zp+kz3nFA0C5vVC6leG/6mm1z9+mA81MI5eaUVqasPLO8Cuk4gMF4gUfP5etR73rgU/8PNMsSesoQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> 
    
        <!----- Bootstrap v5.3.1 ------->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>

        <!----- Bootstrap Icons v1.10.5 ----->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    
        <!----- JQUERY v3.7.0 ------->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js" integrity="sha512-3gJwYpMe3QewGELv8k/BX9vcqhryRdzRMxVfq6ngyWXwo03GFEzjsUm8Q7RZcHPHksttq7/GFoxjCVUjkjvPdw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>    
        <style>
            ${this.css.value}
        </style>
    </head>
    <body>
    ${this.html.value}
    <script>
    ${this.js.value}</script>
    </body>
    </html>`;

    return html;
  }

  createURL(type: string) {
    switch (type) {
      case 'full':
        try {
          if (this.livePreview) {
            const blob = new Blob([this.createPage()], { type: 'text/html' });
            this.url.next(URL.createObjectURL(blob));
            this.save = true;
          } else {
            document.addEventListener('keydown', (event) => {
              if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();

                const blob = new Blob([this.createPage()], {
                  type: 'text/html',
                });
                this.url.next(URL.createObjectURL(blob));
                this.save = true;
              }
            });
          }
        } catch (err) {
          console.log('Eroare la crearea URL');
          console.log(err);
          this.toast.showMessage('Unexpected error ocured!', 'error');
        }
        break;

      case 'svg':
        try {
          const blob = new Blob([this.html.value], { type: 'text/svg' });
          this.urlCase.next(URL.createObjectURL(blob));
        } catch (err) {
          console.log('Eroare la crearea URL');
          console.log(err);
          this.toast.showMessage('Unexpected error ocured!', 'error');
        }
        break;

      case 'css':
        try {
          const blob = new Blob([this.css.value], { type: 'text/css' });
          this.urlCase.next(URL.createObjectURL(blob));
        } catch (err) {
          console.log('Eroare la crearea URL');
          console.log(err);
          this.toast.showMessage('Unexpected error ocured!', 'error');
        }
        break;

      case 'js':
        try {
          const blob = new Blob([this.js.value], { type: 'text/javascript' });
          this.urlCase.next(URL.createObjectURL(blob));
        } catch (err) {
          console.log('Eroare la crearea URL');
          console.log(err);
          this.toast.showMessage('Unexpected error ocured!', 'error');
        }
        break;
    }

    return null;
  }

  getURL() {
    return this.url;
  }

  download() {
    if (!this.save) {
      this.toast.showMessage('You need to save your work first', 'warning');
      return;
    }
    try {
      if (
        this.html.value == '' &&
        this.css.value == '' &&
        this.js.value == ''
      ) {
        this.toast.showMessage('Nothing to download!', 'info');
      } else {
        document
          .querySelector('.downloadButton')
          .setAttribute('disabled', 'true');
        this.toast.showMessage('Start generating download...', 'info');
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.href = this.url.value;
        a.download = this.downloadName + '.html';
        a.click();
        this.toast.showMessage('Download success!', 'success');
        document.querySelector('.downloadButton').removeAttribute('disabled');
      }
    } catch (err) {
      console.log(err);
      this.toast.showMessage('Unexpected error ocured!', 'error');
    }
  }

  downloadSVG() {
    if (!this.save) {
      this.toast.showMessage('You need to save your work first', 'warning');
      return;
    }
    this.createURL('svg');
    try {
      if (this.html.value == '') {
        this.toast.showMessage('Nothing to download in HTML section!', 'info');
      } else {
        document
          .querySelector('.downloadButton')
          .setAttribute('disabled', 'true');
        this.toast.showMessage('Start generating download...', 'info');
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.href = this.urlCase.value;
        a.download = this.downloadName + '.svg';
        a.click();
        this.toast.showMessage('Download success!', 'success');
        document.querySelector('.downloadButton').removeAttribute('disabled');
      }
    } catch (err) {
      console.log(err);
      this.toast.showMessage('Unexpected error ocured!', 'error');
    }
  }

  downloadCSS() {
    if (!this.save) {
      this.toast.showMessage('You need to save your work first', 'warning');
      return;
    }
    this.createURL('css');
    try {
      if (this.css.value == '') {
        this.toast.showMessage('Nothing to download in CSS section!', 'info');
      } else {
        document
          .querySelector('.downloadButton')
          .setAttribute('disabled', 'true');
        this.toast.showMessage('Start generating download...', 'info');
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.href = this.urlCase.value;
        a.download = 'style.css';
        a.click();
        this.toast.showMessage('Download success!', 'success');
        document.querySelector('.downloadButton').removeAttribute('disabled');
      }
    } catch (err) {
      console.log(err);
      this.toast.showMessage('Unexpected error ocured!', 'error');
    }
  }

  downloadJS() {
    if (!this.save) {
      this.toast.showMessage('You need to save your work first', 'warning');
      return;
    }
    this.createURL('js');
    try {
      if (this.js.value == '') {
        this.toast.showMessage(
          'Nothing to download in JavaScript section!',
          'info'
        );
      } else {
        document
          .querySelector('.downloadButton')
          .setAttribute('disabled', 'true');
        this.toast.showMessage('Start generating download...', 'info');
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.href = this.urlCase.value;
        a.download = 'script.js';
        a.click();
        this.toast.showMessage('Download success!', 'success');
        document.querySelector('.downloadButton').removeAttribute('disabled');
      }
    } catch (err) {
      console.log(err);
      this.toast.showMessage('Unexpected error ocured!', 'error');
    }
  }

  downloadZIP() {
    if (this.html.value == '' && this.css.value == '' && this.js.value == '') {
      this.toast.showMessage('Nothing to download!', 'info');
    } else {
      let template = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="Upi Line Editor">
        <meta name="description" content="Generic webpage created by Upi Line">
        <title>Upi Line Editor</title>

        <!----- Pooper ------->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.8/umd/popper.min.js" integrity="sha512-TPh2Oxlg1zp+kz3nFA0C5vVC6leG/6mm1z9+mA81MI5eaUVqasPLO8Cuk4gMF4gUfP5etR73rgU/8PNMsSesoQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> 
    
        <!----- Bootstrap v5.3.1 ------->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>

        <!----- Bootstrap Icons v1.10.5 ----->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    
        <!----- JQUERY v3.7.0 ------->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js" integrity="sha512-3gJwYpMe3QewGELv8k/BX9vcqhryRdzRMxVfq6ngyWXwo03GFEzjsUm8Q7RZcHPHksttq7/GFoxjCVUjkjvPdw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>    
        
        <!----- Custom CSS file ------->
        ${
          this.css.value != '' ? '<link rel="stylesheet" href="style.css">' : ''
        }

    </head>
    <body>
    ${this.html.value}
    ${this.js.value != '' ? '<script src="script.js"></script>' : ''}
    </body>
    </html>`;

      try {
        if (!this.save) {
          this.toast.showMessage('You need to save your work first', 'warning');
          return;
        }
        this.toast.showMessage('Starting generate arhive...', 'info');
        let zip = new JSZip();
        let htmlFile = new File([template], 'index.html', {
          type: 'text/html',
        });

        zip.file(htmlFile.name, htmlFile);
        if (this.css.value != '') {
          let cssFile = new File([this.css.value], 'style.css', {
            type: 'text/css',
          });
          zip.file(cssFile.name, cssFile);
        }

        if (this.js.value != '') {
          let jslFile = new File([this.js.value], 'script.js', {
            type: 'text/javascript',
          });
          zip.file(jslFile.name, jslFile);
        }

        zip.generateAsync({ type: 'blob' }).then((content) => {
          let url = window.URL.createObjectURL(content);
          var link = document.createElement('a');
          link.href = url;
          this.toast.showMessage('Starting downloading...', 'info');
          link.download =
            this.downloadName != 'index' && this.downloadName != ''
              ? this.downloadName
              : this.arhiveName + '.zip';
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
        });
      } catch (err) {
        console.log(err);
        this.toast.showMessage('Unexpected error occured!', 'error');
      }
    }
  }

  setCode(type: string, code: string) {
    try {
      switch (type) {
        case 'html':
          this.html.next(code);
          break;
        case 'css':
          this.css.next(code);
          break;
        case 'js':
          this.js.next(code);
          break;
      }
      this.save = false;
      this.createURL('full');
    } catch (err) {
      this.toast.showMessage('Something went wrong!', 'error');
      console.log(err);
    }
  }

  getCode(type: any) {
    if (type == 'html') {
      return this.html;
    } else if (type == 'css') {
      return this.css;
    } else if (type == 'js') {
      return this.js;
    } else {
      return null;
    }
  }

  setName(value) {
    this.downloadName = value;
  }
  getName() {
    return this.downloadName;
  }

  setLivePreview(value: boolean) {
    this.livePreview = value;
  }

  openFile(event: Event, type: string) {
    var text: any;
    var fileType: string = type === 'svg' ? 'image/svg+xml' : 'text/' + type;

    try {
      let element = event.target as HTMLInputElement;
      const fileList = element.files;
      // console.log(fileList);
      if (fileList && fileList.length > 0) {
        if (fileList[0].type === fileType) {
          var reader = new FileReader();
          reader.onload = () => {
            text = reader.result;
            if (type === 'svg') {
              this.setCode('html', text);
              this.downloadName = fileList[0].name.replace('.html', '');
            }
            if (type === 'javascript') {
              this.setCode('js', text);
            }
            if (type === 'css') {
              this.setCode('css', text);
            }
            if (type === 'html') {
              const bodyContent = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
              const styleContent = text.match(
                /<style[^>]*>([\s\S]*?)<\/style>/i
              );

              // bodyContent[1] contine textul dintre tagurile body, sau null daca nu exista
              if (bodyContent && bodyContent.length > 1) {
                const textInBodyWithScript = bodyContent[1];
                // Utilizeaza o alta expresie regulata pentru a gasi tagurile <script>
                const scriptTags = textInBodyWithScript.match(
                  /<script\b[^>]*>([\s\S]*?)<\/script>/gi
                );

                let scriptTagValue: any;
                if (scriptTags) {
                  scriptTags.forEach((scriptTag: string, index: number) => {
                    console.log(`Script ${index + 1}:`);
                    const scriptText = scriptTag.replace(
                      /<script\b[^>]*>([\s\S]*?)<\/script>/i,
                      '$1'
                    );
                    scriptTagValue += scriptText;
                  });
                  this.setCode('js', scriptTagValue.replace('undefined', ''));
                }

                const textInsideBody = bodyContent[1].replace(
                  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                  ''
                );
                this.setCode('html', textInsideBody);
                this.downloadName = fileList[0].name.replace('.html', '');
              } else {
                console.log(
                  'Nu s-a gasit continut in interiorul tagurilor <body>.'
                );
                this.toast.showMessage('Nothing inside <body> tag.', 'warning');
              }
              if (styleContent && styleContent.length > 1) {
                const textInsideBody = styleContent[1];
                this.setCode('css', textInsideBody);
              } else {
                console.log(
                  'Nu s-a gasit continut in interiorul tagurilor <body>.'
                );
                this.toast.showMessage('Nothing inside <body> tag.', 'warning');
              }
            }
          };
          reader.readAsText(fileList[0]);
        } else {
          this.toast.showMessage(
            'You need to select a .' + type + ' file',
            'error'
          );
          return;
        }
      } else {
        return;
      }
    } catch (err) {
      this.toast.showMessage('Something went wrong!', 'error');
      console.log(err);
    }
  }

  openFolder(event: Event) {
    try {
      let element = event.target as HTMLInputElement;
      const fileList = element.files;
      if (fileList.length > 0) {
        for (let i in fileList) {
          if (fileList[i].type === 'text/html') {
            let text: any;
            let reader = new FileReader();
            reader.onload = () => {
              text = reader.result;
              const bodyContent = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
              if (bodyContent && bodyContent.length > 1) {
                const textInsideBody = bodyContent[1];
                this.setCode('html', textInsideBody);
              } else {
                console.log(
                  'Nu s-a gasit continut in interiorul tagurilor <body>.'
                );
                this.toast.showMessage('Nothing inside <body> tag.', 'warning');
              }
            };
            reader.readAsText(fileList[i]);
          }
          if (fileList[i].type === 'text/css') {
            let text: any;
            let reader = new FileReader();
            reader.onload = () => {
              text = reader.result;
              this.setCode('css', text);
            };
            reader.readAsText(fileList[i]);
          }
          if (fileList[i].type === 'text/javascript') {
            let text: any;
            let reader = new FileReader();
            reader.onload = () => {
              text = reader.result;
              this.setCode('js', text);
            };
            reader.readAsText(fileList[i]);
          }
        }
      }
    } catch (err) {
      console.log(err);
      this.toast.showMessage('Something went wrong!', 'error');
    }
  }
}
