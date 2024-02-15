import { Routes } from '@angular/router';
import { Step1Component } from './component/step1/step1.component';
import { Step2Component } from './component/step2/step2.component';
import { Step3Component } from './component/step3/step3.component';

export const routes: Routes = [
    { path: '', component:Step1Component},
    { path: 'step1', component: Step1Component },
    { path: 'step2', component: Step2Component },
    { path: 'step3', component: Step3Component },
    { path: '**', redirectTo: 'step1', pathMatch: 'full' }
];
