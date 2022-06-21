import { Injectable } from '@angular/core';
import { PdftextComponent } from './pdftext/pdftext.component';

@Injectable({
  providedIn: 'root'
})
export class DatalayerService {
 public pdf1Text: string;
 public pdf2Text: string;
  constructor() { }
}
