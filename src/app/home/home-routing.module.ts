import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientRecordComponent } from './patient-record/patient-record.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'add', component: PatientRecordComponent },
    { path: ':id', component: PatientRecordComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
