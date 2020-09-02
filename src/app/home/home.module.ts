import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { PatientRecordComponent } from './patient-record/patient-record.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [PatientRecordComponent, HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MatExpansionModule,
        MatInputModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatNativeDateModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatListModule,
        FormsModule,
    ],
})
export class HomeModule {}
