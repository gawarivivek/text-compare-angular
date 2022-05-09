import { RouterModule, Routes } from '@angular/router';

// components
import { HomeComponent } from './home/home.component';
import { CompareEditorComponent } from './compare-editor/compare-editor.component';
import { LandingComponent } from './landing/landing.component';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { SinglepdfcompareComponent } from './singlepdfcompare/singlepdfcompare.component';

export const appRoutes: Routes = [
  // { path: '', component: CompareEditorComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'textcompare', component: CompareEditorComponent },
  // // otherwise redirect to home
  // { path: '**', redirectTo: '' }


  { path: '', component: LandingComponent },
  { path: 'Single_select_Component', component: SinglepdfcompareComponent },
  // { path: 'Single_select_Component', component: CompareEditorComponent },
  { path: 'Multi_select_Component', component: MultiselectComponent },
];
