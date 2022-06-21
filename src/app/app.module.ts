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
import { PdftextComponent } from './pdftext/pdftext.component';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { LandingComponent } from './landing/landing.component';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { SinglepdfcompareComponent } from './singlepdfcompare/singlepdfcompare.component';
import { DatalayerService } from './datalayer.service';

// import { PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CompareEditorComponent,
    PdftextComponent,
    LandingComponent,
    MultiselectComponent,
    SinglepdfcompareComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PdfViewerModule,
    ToolbarModule, DialogModule, 
    
    MonacoEditorModule.forRoot(),
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })
  ],
  providers: [DatalayerService],
  exports:[
    PdfViewerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
