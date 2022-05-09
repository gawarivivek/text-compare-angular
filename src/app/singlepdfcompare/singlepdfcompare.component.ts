
import * as PDFJS from 'pdfjs-dist'
import {

  Component,
  ViewEncapsulation,
  Input,
  Output,
  OnInit,
  ViewChild
} from '@angular/core';
import { DiffEditorModel } from 'ngx-monaco-editor';

import * as pdfjsLib from 'pdfjs-dist';
import { PdfViewerComponent } from 'ng2-pdf-viewer';


@Component({
  selector: 'widget-compare-editor',
  styleUrls: ['./singlepdfcompare.component.css'],
  templateUrl: './singlepdfcompare.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SinglepdfcompareComponent implements OnInit {
  arrbuff;
  full_text = "";
  full_text2 = "";
  text1 = '';
  text2 = '';
  isCompared = false;
  pdfSrc1 = "";
  pdfSrc2 = "";
  @ViewChild(PdfViewerComponent, { static: false })
  public pdfComponent!: PdfViewerComponent;
  @Output()
  selectedLang = 'plaintext';
  @Output()
  selectedTheme = 'vs';

  @Input()
  languages = [
    'bat',
    'c',
    'coffeescript',
    'cpp',
    'csharp',
    'csp',
    'css',
    'dockerfile',
    'fsharp',
    'go',
    'handlebars',
    'html',
    'ini',
    'java',
    'javascript',
    'json',
    'less',
    'lua',
    'markdown',
    'msdax',
    'mysql',
    'objective-c',
    'pgsql',
    'php',
    'plaintext',

  ];

  @Input()
  themes = [
    {
      value: 'vs',
      name: 'Visual Studio'
    },
    {
      value: 'vs-dark',
      name: 'Visual Studio Dark'
    },
    {
      value: 'hc-black',
      name: 'High Contrast Dark'
    }
  ];

  // input
  inputOptions = {
    theme: 'vs',
    language: 'plaintext',
    minimap: {
      enabled: false
    },
    scrollbar: {
      // Subtle shadows to the left & top. Defaults to true.
      useShadows: false,
      // Render vertical arrows. Defaults to false.
      verticalHasArrows: false,
      // Render horizontal arrows. Defaults to false.
      horizontalHasArrows: false,
      // Render vertical scrollbar.
      // Accepted values: 'auto', 'visible', 'hidden'.
      // Defaults to 'auto'
      vertical: 'hidden',
      // Render horizontal scrollbar.
      // Accepted values: 'auto', 'visible', 'hidden'.
      // Defaults to 'auto'
      horizontal: 'hidden'
    }
  };
  // compare, output
  diffOptions = {
    theme: 'vs',
    language: 'plaintext',
    readOnly: true,
    renderSideBySide: true
  };
  originalModel: DiffEditorModel = {
    code: '',
    language: 'plaintext'
  };

  modifiedModel: DiffEditorModel = {
    code: '',
    language: 'plaintext'
  };
  // pdfToText: (data: any, callbackPageDone: any, callbackAllDone: any) => void;
  complete: number;
  reader: FileReader;
  pdfSrc: any;
  pdfToText: (data: any, callbackPageDone: any, callbackAllDone: any) => void;
  public document: string = 'C:\Users\V884693\Desktop\PdfCompa1.pdf';
  public ngOnInit() {
    // this.yourMethodName('src/assets/documents/om.pdf');
  }

  onChangeLanguage(language) {
    this.inputOptions = Object.assign({}, this.inputOptions, {
      language: language
    });
    this.originalModel = Object.assign({}, this.originalModel, {
      language: language
    });
    this.modifiedModel = Object.assign({}, this.modifiedModel, {
      language: language
    });
  }
  onChangeTheme(theme) {
    this.inputOptions = Object.assign({}, this.inputOptions, { theme: theme });
    this.diffOptions = Object.assign({}, this.diffOptions, { theme: theme });
  }

  onChangeInline(checked) {
    this.diffOptions = Object.assign({}, this.diffOptions, {
      renderSideBySide: !checked
    });
  }

  onCompare() {

    var mytext1 = localStorage.getItem('pdf1');
    this.text1 = mytext1;
    var mytext2 = localStorage.getItem('pdf2');
    this.text2 = mytext2;

    // just comment ubove 4 lines to check with text compare
    this.originalModel = Object.assign({}, this.originalModel, {
      code: this.text1
    });
    this.modifiedModel = Object.assign({}, this.modifiedModel, {
      code: this.text2
    });
    this.isCompared = true;
    window.scrollTo(0, 0); // scroll the window to top
  }
  onClear() {
    this.text1 = '';
    this.text2 = '';
    this.isCompared = false;
    window.scrollTo(0, 0); // scroll the window to top
  }


  pdfToText1(data, callbackPageDone: any, callbackAllDone, whichtime, pdfnum) {
    var self = this;
    this.complete = 0;
    // PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    // console.assert(data instanceof ArrayBuffer || typeof data == 'string');
    PDFJS.getDocument(data).promise.then(function (pdf) {
      var div = document.getElementById('viewer');

      var total = pdf.numPages;
      // callbackPageDone(0, total);
      var layers = {};
      for (var i = 1; i <= total; i++) {
        pdf.getPage(i).then(function (page) {
          var n = page.pageNumber;
          page.getTextContent().then(function (textContent) {
            if (null != textContent.items) {
              var page_text = "";
              var last_block = null;
              for (var k = 0; k < textContent.items.length; k++) {
                var block = textContent.items[k];
                if (last_block != null && last_block.str[last_block.str.length - 1] != ' ') {
                  if (block.x < last_block.x)
                    page_text += "\r\n";
                  else if (last_block.y != block.y && (last_block.str.match(/^(\s?[a-zA-Z])$|^(.+\s[a-zA-Z])$/) == null))
                    page_text += ' ';
                }
                page_text += block.str;
                last_block = block;
              }

              textContent != null && console.log("page " + n + " finished."); //" content: \n" + page_text);
              layers[n] = page_text + "\n\n";
            }
            ++self.complete;
            // callbackPageDone(self.complete, total);
            if (self.complete == 2) {
              window.setTimeout(function () {

                var num_pages = Object.keys(layers).length;
                for (var j = 1; j <= num_pages; j++)

                  if (whichtime == 11) {
                    this.full_text += layers[j];
                    // console.log("oooooooooooooooooooooooooooom1111" + this.full_text)
                    // localStorage.setItem('oooooooooooooooooooooooooooom', this.full_text);
                  } else {
                    this.full_text += layers[j];
                    // console.log("oooooooooooooooooooooooooooom2222" + this.full_text2)
                    this.text1 = this.full_text;
                    this.originalModel = Object.assign({}, this.originalModel, {
                      code: this.text1
                    });
                    localStorage.setItem('pdf1', this.full_text);
                  }

                //   callbackAllDone(full_text);
              }, 1000);
            }
          }); // end  of page.getTextContent().then
        }); // end of page.then
      } // of for
    });
    this.text1 = this.full_text;
    // this.text2 = this.full_text;
    // if (pdfnum === 'one') {
    //   this.originalModel = Object.assign({}, this.originalModel, {
    //     code: this.text1
    //   });
    // }
    // if (pdfnum === 'two') {
    //   this.modifiedModel = Object.assign({}, this.modifiedModel, {
    //     code: this.text2
    //   });
    // }


  }; // end of pdfToText()

  pdfToText2(data, callbackPageDone: any, callbackAllDone, whichtime, pdfnum) {
    var self = this;
    this.complete = 0;
    // PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    // console.assert(data instanceof ArrayBuffer || typeof data == 'string');
    PDFJS.getDocument(data).promise.then(function (pdf) {
      var div = document.getElementById('viewer');

      var total = pdf.numPages;
      // callbackPageDone(0, total);
      var layers = {};
      for (var i = 1; i <= total; i++) {
        pdf.getPage(i).then(function (page) {
          var n = page.pageNumber;
          page.getTextContent().then(function (textContent) {
            if (null != textContent.items) {
              var page_text = "";
              var last_block = null;
              for (var k = 0; k < textContent.items.length; k++) {
                var block = textContent.items[k];
                if (last_block != null && last_block.str[last_block.str.length - 1] != ' ') {
                  if (block.x < last_block.x)
                    page_text += "\r\n";
                  else if (last_block.y != block.y && (last_block.str.match(/^(\s?[a-zA-Z])$|^(.+\s[a-zA-Z])$/) == null))
                    page_text += ' ';
                }
                page_text += block.str;
                last_block = block;
              }

              textContent != null && console.log("page " + n + " finished."); //" content: \n" + page_text);
              layers[n] = page_text + "\n\n";
            }
            ++self.complete;
            // callbackPageDone(self.complete, total);
            if (self.complete == 2) {
              window.setTimeout(function () {

                var num_pages = Object.keys(layers).length;
                for (var j = 1; j <= num_pages; j++)

                  if (whichtime == 11) {
                    this.full_text += layers[j];
                    // console.log("oooooooooooooooooooooooooooom1111" + this.full_text)
                    // localStorage.setItem('oooooooooooooooooooooooooooom', this.full_text);
                  } else {
                    this.full_text2 += layers[j];
                    // console.log("oooooooooooooooooooooooooooom2222" + this.full_text2)
                    this.text2 = this.full_text2;
                    this.modifiedModel = Object.assign({}, this.modifiedModel, {
                      code: this.text2
                    });
                    localStorage.setItem('pdf2', this.full_text2);
                  }

                //   callbackAllDone(full_text);
              }, 1000);
            }
          }); // end  of page.getTextContent().then
        }); // end of page.then
      } // of for
    });
    // this.text1 = this.full_text;
    // this.text2 = this.full_text2;
    // if (pdfnum === 'one') {
    //   this.originalModel = Object.assign({}, this.originalModel, {
    //     code: this.text1
    //   });
    // }
    // if (pdfnum === 'two') {
    //   this.modifiedModel = Object.assign({}, this.modifiedModel, {
    //     code: this.text2
    //   });
    // }


  }; // end of pdfToText()

  pageRendered1(e: CustomEvent) {
   
    this.pdfToText1(this.pdfSrc1, 1, 0, 22, 'one');
  }
  pageRendered2(e: CustomEvent) {
    
    this.pdfToText2(this.pdfSrc2, 1, 0, 22, 'two');
  }

  omnamhshiway_getPageText(pageNum, PDFDocumentInstance) {
    return new Promise(function (resolve, reject) {
      PDFDocumentInstance.getPage(1).then(function (pdfPage) {
        pdfPage.getTextContent().then(function (textContent) {
          var textItems = textContent.items;
          var finalString = "";

          for (var i = 0; i < textItems.length; i++) {
            var item = textItems[i];

            finalString += item.str + " ";
          }

          resolve(finalString);
        });
      });
    });

  }
 

  onFileSelected2() {
    let $img: any = document.querySelector('#file2');

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc2 = e.target.result;
      };
      reader.readAsArrayBuffer($img.files[0]);
    }

  }
  onFileSelected1() {
    const $pdf: any = document.querySelector('#file1');
    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc1 = e.target.result;
      };
      reader.readAsArrayBuffer($pdf.files[0]);
      // $pdf.filePath
    
    }

  }

 

  gettext(pdfUrl) {
    var pdf = pdfjsLib.getDocument(pdfUrl);
    return pdf.then(function (pdf) { // get all pages text
      var maxPages = pdf.pdfInfo.numPages;
      var countPromises = []; // collecting all page promises
      for (var j = 1; j <= maxPages; j++) {
        var page = pdf.getPage(j);

        var txt = "";
        countPromises.push(page.then(function (page) { // add page promise
          var textContent = page.getTextContent();
          return textContent.then(function (text) { // return content promise
            return text.items.map(function (s) { return s.str; }).join(''); // value page text 
          });
        }));
      }
      // Wait for all pages and join text
      return Promise.all(countPromises).then(function (texts) {
        return texts.join('');
      });
    });
  }











}




