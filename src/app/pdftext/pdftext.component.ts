import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {
  LinkAnnotationService,
  BookmarkViewService,
  MagnificationService,
  ThumbnailViewService,
  ToolbarService,
  NavigationService,
  TextSearchService,
  TextSelectionService,
  PrintService,
  AnnotationService,
  FormFieldsService,
} from '@syncfusion/ej2-angular-pdfviewer';

/**
 * Default PdfViewer Controller
 */
@Component({
  selector: 'app-pdftext',
  templateUrl: 'pdftext.component.html',
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:max-line-length
  providers: [
    LinkAnnotationService,
    BookmarkViewService,
    MagnificationService,
    ThumbnailViewService,
    ToolbarService,
    NavigationService,
    TextSearchService,
    TextSelectionService,
    PrintService,
    AnnotationService,
    FormFieldsService,
  ],
})
export class PdftextComponent {
  public service: string =
    'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
  public document: string = 'PDF_Succinctly.pdf';
  ngOnInit(): void {
    // ngOnInit function
  }
  public extractTextCompleted(e: any): void {
    // Extract the Complete text of load document
    console.log(e);
    console.log(e.documentTextCollection[1]);
    // Extract the Text data.
    console.log(e.documentTextCollection[1][1].TextData);
    // Extract Text in the Page.
    console.log('sonaliiiiiiiiiii', e.documentTextCollection[6].PageText);
    // Extract Text along with Bounds
    console.log(e.documentTextCollection[1][1].TextData[0].Bounds);
  }
}
