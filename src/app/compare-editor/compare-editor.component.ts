
// require('pdfjs-dist');
// import { PDFJS } from "pdfjs-dist";
import * as PDFJS from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import { PDFJSStatic } from 'pdfjs-dist';
//  const PDFJS: PDFJSStatic = require('pdfjs-dist');
// PDFJS.getDocument('helloworld.pdf').then(console.log);


import {

  Component,
  ViewEncapsulation,
  Input,
  Output,
  OnInit,
  ViewChild
} from '@angular/core';
import { DiffEditorModel } from 'ngx-monaco-editor';
//
// import { PDFJS } from "pdfjs-dist";
// declare module "pdfjs-dist" {
//   export = { PDFJS };
// }
//
import * as pdfjsLib from 'pdfjs-dist';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

// import { PDFJSStatic } from 'pdfjs-dist';
// const PDFJS: PDFJSStatic = require('pdfjs-dist');
// PDFJS.getDocument('helloworld.pdf').then(console.log);
//  import * as pdfjslib from 'pdfjs-dist';
// let PDFJS = pdfjslib.PDFJS;
// PDFJS.disableTextLayer = true;
// PDFJS.disableWorker = true;
@Component({
  selector: 'widget-compare-editor',
  styleUrls: ['./compare-editor.component.css'],
  templateUrl: './compare-editor.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CompareEditorComponent implements OnInit {
   arrbuff;
    full_text = "";
    full_text2 = "";
  text1 = '';
  text2 = '';
  isCompared = false;
  pdfSrc1 = "";
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

  public ngOnInit() {
    function Pdf2TextClass1() {
      var self = this;
      this.complete = 0;

      this.pdfToText = function (data, callbackPageDone, callbackAllDone) {
        console.assert(data instanceof ArrayBuffer || typeof data == 'string');
        var loadingTask = pdfjsLib.getDocument(data);
        loadingTask.promise.then(function (pdf) {


          var total = pdf._pdfInfo.numPages;
          //callbackPageDone( 0, total );        
          var layers = {};
          for (let i = 1; i <= total; i++) {
            pdf.getPage(i).then(function (page) {
              var n = page.pageNumber;
              page.getTextContent().then(function (textContent) {

                //console.log(textContent.items[0]);0
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
                //callbackPageDone( self.complete, total );
                if (self.complete == total) {
                  window.setTimeout(function () {
                    var full_text = "";
                    var num_pages = Object.keys(layers).length;
                    for (var j = 1; j <= num_pages; j++)
                      full_text += layers[j];
                    console.log(full_text);
                  }, 1000);
                }
              }); // end  of page.getTextContent().then
            }); // end of page.then
          } // of for
        });
      }; // end of pdfToText()
    }; // end of class
    this.yourMethodName('src/assets/documents/pdf');
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

   var mytext1= localStorage.getItem('oooooooooooooooooooooooooooom');
   this.text1 = mytext1;
   var mytext2= localStorage.getItem('oooooooooooooooooooooooooooom2');
   this.text2 = mytext2;

    this.originalModel = Object.assign({}, this.originalModel, {
      code: this.text1
    });
    this.modifiedModel = Object.assign({}, this.originalModel, {
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


  ////
  yourMethodName(data) {
    debugger;
    PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker
// this.loadingTask = PDFJS.getDocument({ data: self.pdfData })
 //   PDFJS.GlobalWorkerOptions.workerSrc = 'node_modules/pdfjs-dist/build/pdf.worker.js';
    // pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
    const loadingTask = pdfjsLib.getDocument('https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf');
console.log("textsssss", PDFJS);
    // PDFJS.disableTextLayer = true;
    // PDFJS.disableWorker = true;
    PDFJS.getDocument(data).then(function (PDFDocumentInstance) {

      var totalPages = PDFDocumentInstance._pdfInfo.numPages;
      var pageNumber = 1;

      // Extract the text
      this.getPageText(pageNumber, PDFDocumentInstance).then(function (textPage) {
        // Show the text of the page in the console
        console.log(textPage);
      });

    }, function (reason) {
      // PDF loading error
      console.error(reason);
    });
  }
  getPageText(pageNum, PDFDocumentInstance) {
    // Return a Promise that is solved once the text of the page is retrieven
    return new Promise(function (resolve, reject) {
      PDFDocumentInstance.getPage(pageNum).promise.then(function (pdfPage) {
        // The main trick to obtain the text of the PDF page, use the getTextContent method
        pdfPage.getTextContent().then(function (textContent) {
          var textItems = textContent.items;
          var finalString = "";

          // Concatenate the string of the item to the final string
          for (var i = 0; i < textItems.length; i++) {
            var item = textItems[i];

            finalString += item.str + " ";
          }

          // Solve promise with the text retrieven from the page
          resolve(finalString);
        });
      });
    });
  }

  Pdf2TextClass() {
    var self = this;
    this.complete = 0;

    /**
     *
     * @param data ArrayBuffer of the pdf file content
     * @param callbackPageDone To inform the progress each time
     *        when a page is finished. The callback function's input parameters are:
     *        1) number of pages done;
     *        2) total number of pages in file.
     * @param callbackAllDone The input parameter of callback function is 
     *        the result of extracted text from pdf file.
     *
     */
    debugger;
    this.pdfToText = function (data, callbackPageDone, callbackAllDone) {
      console.assert(data instanceof ArrayBuffer || typeof data == 'string');
      PDFJS.getDocument(data).promise.then(function (pdf) {
        var div = document.getElementById('viewer');

        var total = pdf.numPages;
        callbackPageDone(0, total);
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
              callbackPageDone(self.complete, total);
              if (self.complete == total) {
                window.setTimeout(function () {
                  var full_text = "";
                  var num_pages = Object.keys(layers).length;
                  for (var j = 1; j <= num_pages; j++)
                    full_text += layers[j];
                  callbackAllDone(full_text);
                }, 1000);
              }
            }); // end  of page.getTextContent().then
          }); // end of page.then
        } // of for
      });
    }; // end of pdfToText()
  }; // end of class

  pdfToText2(data, callbackPageDone:any, callbackAllDone , whichtime) {
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
            if (self.complete == total) {
              window.setTimeout(function () {
              
                var num_pages = Object.keys(layers).length;
                for (var j = 1; j <= num_pages; j++)
                
                  if(whichtime == 11){
                    this.full_text += layers[j];
                    console.log("oooooooooooooooooooooooooooom1111" +this.full_text)
                    localStorage.setItem('oooooooooooooooooooooooooooom', this.full_text);
                  }else{
                    this.full_text2 += layers[j];
                    console.log("oooooooooooooooooooooooooooom2222" +this.full_text2)
                    localStorage.setItem('oooooooooooooooooooooooooooom2', this.full_text2);
                  }
                 
             //   callbackAllDone(full_text);
              }, 1000);
            }
          }); // end  of page.getTextContent().then
        }); // end of page.then
      } // of for
    });
    // this.text1 = this.full_text;
    // this.text2 = this.full_text;
    // this.originalModel = Object.assign({}, this.originalModel, {
    //   code: this.text1
    // });
    // this.modifiedModel = Object.assign({}, this.originalModel, {
    //   code: this.text2
    // });
  }; // end of pdfToText()

  async onFileSelected1() {
    var $img: any = document.querySelector('#file1');

    if (typeof (FileReader) !== 'undefined') {
      this.reader = new FileReader();
      this.reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

       this.arrbuff = this.reader.readAsArrayBuffer($img.files[0]);

       this.pdfToText2(this.pdfSrc,1,0,11);
    
      // this.omnamhshiway_getPageText(1,this.pdfSrc);
     // this.yourMethodName(this.pdfSrc);
    }

  }
  async pageRendered1(e: CustomEvent) {
    console.log('(page-rendered)', "dgd");
   
    // this.omnamhshiway_getPageText("",this.arrbuff);
      //this.yourMethodName($img.files[0]);
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
  onchangemm(){

  }
  
onFileSelected2() {
  let $img: any = document.querySelector('#file2');

  if (typeof (FileReader) !== 'undefined') {
    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.pdfSrc1 = e.target.result;
     // console.log("my path see", e.target.value);
    };
   //  var text =reader.readAsText($img.files[0]);
    //  console.log("my text see", e.target.value);
    reader.readAsArrayBuffer($img.files[0]);
    this.pdfToText2(this.pdfSrc,1,0,22);
  }

}
  pageRendered2(e: CustomEvent) {
    console.log('(page-rendered)', e);
    // var om=  await reader.readAsText($img.files[0]);
    // console.log("omnamhshiway" + om);
    // this.pdfComponent.pdfViewer.currentScaleValue = 'page-fit';
  }
}




