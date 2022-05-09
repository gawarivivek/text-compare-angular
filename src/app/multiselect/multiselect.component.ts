import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnInit {
  sourcefiles: any;
  targetfiles: any;
  pdfSrc = "";
  pdfSrc1 = "";


  // pdfComponent: any;


  constructor(private router: Router){}

  ngOnInit() {

  }

  onFileSelected1() {
    let $img: any = document.querySelector('#file1');

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        var lines = e.target.result.split(/\r?\n/);

      };
      reader.onloadend = (e: any) => {
        this.pdfSrc = e.target.result;
        var lines = e.target.result.split(/\r?\n/);
        var file = e.target.files[0];
        lines.forEach(function (line: any) {
          line;
        });
        reader.readAsText(file);
      };
      reader.readAsArrayBuffer($img.files[0]);
      // getting File instance


      // start reading

    }
  }
  onFileSelected2() {
    let $img: any = document.querySelector('#file2');

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc1 = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }
  }

  onChange() {

  }

  pageRendered() {
    // this.pdfComponent.pdfViewer.currentScaleValue = 'page-fit';
  }
  onFolderTargetSelected(event: any) {
    if (event.target.files.length > 0) {
      this.targetfiles = event.target.files;
      console.log(this.targetfiles);
    }
  }

  onFolderSourceSelected(event: any) {
    if (event.target.files.length > 0) {
      this.sourcefiles = event.target.files;
      console.log(this.sourcefiles);
    }
  }

  onCompare() {
    const url = this.router.serializeUrl(this.router.createUrlTree(['/Single_select_Component']));
    window.open(url, '_blank');
    window.open(url, '_blank');
    window.open(url, '_blank');
    window.open(url, '_blank');
  }

  
}