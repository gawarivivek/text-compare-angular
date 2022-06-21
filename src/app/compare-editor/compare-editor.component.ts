
import * as PDFJS from 'pdfjs-dist'
import { diff-match-patch } from 'diff-Match-patch';
import { 

  Component,
  ViewEncapsulation,
  Input,
  Output,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { DiffEditorModel } from 'ngx-monaco-editor';

import * as pdfjsLib from 'pdfjs-dist';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { DatalayerService } from '../datalayer.service';
import { ControlValueAccessor } from '@angular/forms';
const PDF = require('pdfjs-dist');
PDF.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry')
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
  pdfSrc2 = "";

  // PDF1_data_19: any;
  // PDF2_data_19: any;

  // @ViewChild(PdfViewerComponent, { static: false })
  // public pdfComponent!: PdfViewerComponent;
  @ViewChild('pdfViewer1') pdfComponent1: PdfViewerComponent;
  @ViewChild('pdfViewer2') pdfComponent2: PdfViewerComponent;


  // this.elementRef.nativeElement.getElementsByClassName('ng2-pdf-viewer-container')[0]
  //   @ViewChild(PdfViewerComponent)
  //    public pdfComponent1: PdfViewerComponent;

  //  @ViewChild(PdfViewerComponent) 
  //  public pdfComponent2: PdfViewerComponent;
  @ViewChild("diffeditor") editor1: any;
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
  physical: string;
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
  public datalayer;
  constructor(datalayer1: DatalayerService) {
    this.datalayer = datalayer1;
  }

  public ngOnInit() {
    this.physical = "physical";
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
    this.datalayer;
    var mytext1 = localStorage.getItem('pdf1');
    this.text1 = mytext1;
    var mytext2 = localStorage.getItem('pdf2');
    this.text2 = mytext2;
const dmp = ();
const difff = dmp.diff_main('dogs bark', 'cats bark');
  

    const  diff = (diffMe, diffBy)=>diffMe.split(diffBy).join('')
    const c = diff(mytext1, mytext2)
    console.log(c);
    // this.pdfComponent.pdfFindController.executeCommand('find', {
    //   query: "Physical",
    //   highlightAll: true
    // });
    // just comment ubove 4 lines to check with text compare
    this.originalModel = Object.assign({}, this.originalModel, {
      code: this.text1
    });
    this.modifiedModel = Object.assign({}, this.modifiedModel, {
      code: this.text2
    });
    this.isCompared = true;
    this.pdfComponent1.pdfFindController.executeCommand('find', {
      query: "Virtual",
      highlightAll: true
    });
    this.pdfComponent2.pdfFindController.executeCommand('find', {
      query: "Physical",
      highlightAll: true
    });
    //  var val=  this.editor1.getModel().getValueInRange(this.editor1.getSelection())
    window.scrollTo(0, 0); // scroll the window to top


    // this.pdfComponent2.pdfFindController.executeCommand('find', {
    //   query: "Physical",
    //   highlightAll: true
    // });
    // var diffEditor = monaco.editor.createDiffEditor(document.getElementById("diffeditor"));
    //  diffEditor.setModel({
    //   original: this.originalModel,
    //   modified: this.modifiedModel,
    // });
    // window.diffEditor.getModel().getValueInRange(window.editor.getSelection())
  }
  // onInitDiffEditor(diffEditor: monaco.editor.IStandaloneDiffEditor) {
  //   const findFirstDiff = (str1, str2) =>
  //     str2[[...str1].findIndex((el, index) => el !== str2[index])];


  //   var text1 = diffEditor.getModel().modified.getValue();
  //   var text2 = diffEditor.getModel().original.getValue();
  //   let myval = findFirstDiff(text1, text2);


  //   debugger;
  //   if (!diffEditor) {
  //     return;
  //   }
  //   // onDidBlurEditorText
  //   diffEditor.getOriginalEditor().onDidFocusEditorText
  //   this.originalModel.code;
  //   diffEditor.getDiffLineInformationForModified(2);
  //   //  monEditor.onDidChangeModelContent(function (e) {
  //   //     render();
  //   // });
  //   // this.oncompare2(diffEditor)
  //   diffEditor.getModifiedEditor().getConfiguration();
  //   const content = diffEditor.getModel().modified.getAllDecorations();
  //   diffEditor.getLineChanges()
  //   // const code =this.originalModel.code;
  //   // monaco.editor.colorize(code, "javascript",'red')
  //   //   .then(html => document.getElementById("yourElement").innerHTML = html);
  //   diffEditor.getModifiedEditor().onDidChangeModelContent(() => {

  //     const content = diffEditor.getModel().modified.getAllDecorations();
  //     console.log(content);
  //   });



  //   diffEditor.getModifiedEditor().onDidChangeModelContent(() => {
  //     const content = diffEditor.getModel().modified.getValue().charAt(16)
  //     console.log(content);
  //   });
  // }
  oncompare2(diffEditor) {


    var navi = diffEditor.createDiffNavigator(diffEditor, {
      followsCaret: true, // resets the navigator state when the user selects something in the editor
      ignoreCharChanges: true // jump from line to line
    });
    debugger;
    window.setInterval(function () {
      navi.next();
    }, 2000);
  }
  onClear() {
    this.text1 = '';
    this.text2 = '';
    this.isCompared = false;
    window.scrollTo(0, 0); // scroll the window to top
  }


  async pdfToText1(data, callbackPageDone: any, callbackAllDone, whichtime, pdfnum) {
    var self = this;
    this.complete = 0;
    // let comparisonResults = await new comparePdf()
    // .actualPdfFile("notSame.pdf")
    // .baselinePdfFile("baseline.pdf")
    // .compare("byBase64");
    // this.PDF1_data_19 = data;
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
            var totalcount = page.pageNumber;
            // var num_pages = Object.keys(layers).length;
            // callbackPageDone(self.complete, total);
            if (self.complete == total) {
              window.setTimeout(function () {

                var num_pages = Object.keys(layers).length;
                for (var j = 1; j <= num_pages; j++) {

                  if (whichtime == 11) {
                    this.full_text += layers[j];
                    // console.log("oooooooooooooooooooooooooooom1111" + this.full_text)
                    // localStorage.setItem('oooooooooooooooooooooooooooom', this.full_text);
                  } else {
                    if (j <= num_pages) {
                      if (j === 1) {
                        this.full_text = '';
                        this.full_text += layers[j];
                        // console.log("oooooooooooooooooooooooooooom2222" + this.full_text2)
                        this.text1 = this.full_text;
                        this.originalModel = Object.assign({}, this.originalModel, {
                          code: this.text1
                        });
                        localStorage.setItem('pdf1', this.full_text);
                      } else {
                        this.full_text += layers[j];
                        // console.log("oooooooooooooooooooooooooooom2222" + this.full_text2)
                        this.text1 = this.full_text;
                        this.originalModel = Object.assign({}, this.originalModel, {
                          code: this.text1
                        });
                        localStorage.setItem('pdf1', this.full_text);
                      }
                    }
                  }
                }
                //   callbackAllDone(full_text);
              }, 1000);
            };
            // localStorage.setItem('pdf1', this.full_text);
          }); // end  of page.getTextContent().then
        }); // end of page.then
      } // of for

    });



  }; // end of pdfToText()

  pdfToText2(data, callbackPageDone: any, callbackAllDone, whichtime, pdfnum) {

    var self = this;
    this.complete = 0;
    // this.PDF2_data_19 = data;
    // localStorage.setItem(this.PDF2_data_19, "PDF2_data_19");
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
            var num_pages = Object.keys(layers).length;
            //  callbackPageDone(self.complete, total);
            if (self.complete == total) {
              window.setTimeout(function () {

                var num_pages = Object.keys(layers).length;
                for (var j = 1; j <= num_pages; j++) {


                  if (whichtime == 11) {
                    this.full_text += layers[j];
                  } else {
                    if (j <= num_pages) {
                      if (j === 1) {
                        this.full_text2 = '';
                        this.full_text2 += layers[j];
                        // console.log("oooooooooooooooooooooooooooom2222" + this.full_text2)
                        this.text2 = this.full_text2;
                        this.modifiedModel = Object.assign({}, this.modifiedModel, {
                          code: this.text2
                        });
                        localStorage.setItem('pdf2', this.full_text2);
                      }
                      else {
                        this.full_text2 += layers[j];
                        // console.log("oooooooooooooooooooooooooooom2222" + this.full_text2)
                        this.text2 = this.full_text2;
                        this.modifiedModel = Object.assign({}, this.modifiedModel, {
                          code: this.text2
                        });
                        localStorage.setItem('pdf2', this.full_text2);
                      }

                    }
                  }

                }
                //   callbackAllDone(full_text);
              }, 1000);
            }
            // localStorage.setItem('pdf2', layers[1]);
            // this.datalayer.pdf2Text = "sonali2";
          }); // end  of page.getTextContent().then
        }); // end of page.then
      } // of for
    });



  }; // end of pdfToText()

  pageRendered1(e: CustomEvent) {

    this.pdfToText1(this.pdfSrc1, 1, 0, 22, 'one');

  }
  pageRendered2(e: CustomEvent) {

    this.pdfToText2(this.pdfSrc2, 1, 0, 22, 'two');
    // this.compare2PDF(this.pdfSrc1,this.pdfSrc1, 1,);
  }


  compare2PDF(pdf1, pdf2, whichtime) {
    PDFJS.getDocument(pdf1).promise.then(function (pdf_1) {
      var total = pdf_1.numPages;
      // callbackPageDone(0, total);
      var layers = {};
      PDFJS.getDocument(pdf2).promise.then(function (pdf_2) {
        var total = pdf_2.numPages;
        // callbackPageDone(0, total);
        var layers = {};
        for (var i = 1; i <= total; i++) {

          pdf_2.getPage(i).then(function (page2) {
            var n = page2.pageNumber;
            page2.getTextContent().then(function (textContent) {
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


            });
          }); // end of page.then


          // start of pdf2
          pdf_1.getPage(i).then(function (page) {
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


            });
          }); // end of  of pdf2
        }

      });

    });



  };

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




  //#region ControlValueAccessor

}




