import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdftextComponent } from './pdftext.component';

describe('PdftextComponent', () => {
  let component: PdftextComponent;
  let fixture: ComponentFixture<PdftextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdftextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdftextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
