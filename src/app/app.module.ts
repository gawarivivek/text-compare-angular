import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CompareEditorComponent } from './compare-editor/compare-editor.component';

import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';

// routes
import { appRoutes } from './app.route';
import * as PDFJS from "pdfjs-dist";
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CompareEditorComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PdfViewerModule,
    MonacoEditorModule.forRoot(),
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })
  ],
  providers: [],
  exports:[
    PdfViewerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
