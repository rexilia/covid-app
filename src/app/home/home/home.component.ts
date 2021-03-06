import { Component, OnInit } from '@angular/core';
import { Observable, identity } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { IPatientRecord } from 'src/app/shared/interfaces';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { PatientRecordService } from 'src/app/shared/patient-record.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    allPatients: Observable<IPatientRecord[]>;
    errorMessage: any;
    constructor(private prs: PatientRecordService, private as: AuthService,private fb: FormBuilder,private router: Router,) {}
    patientArray: AngularFireList<any>;
    showDeletedMessage: boolean;
    
    searchText: string = "";
    updateForm : FormGroup;
    private initaliseForms() {
        this.updateForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            gender: ['Male', [Validators.required]],
            age: [1, [Validators.required, Validators.max(110)]],
            nationality: ['Indian', [Validators.required]],
            passportNumber: [
                '',
                [Validators.minLength(6), Validators.maxLength(11)],
            ],
            place: ['',[Validators.required]],
        });
    }
    ngOnInit():void{
        this.initaliseForms();
            this.allPatients = this.as.currentUser.pipe(
                map((user) => user.uid),
                switchMap((uid) => this.prs.getAllPatientRecordsForUser(uid)),
                tap(console.log)
            );
    }
               
    populateForm( patientId:string ){
            
            this.updateForm.setValue(patientId.personalDetails);   
    }
    upDate(patient:string)
    {
        console.log(patient);
            const value = this.updateForm.value;
            //if (value.dob) {
              //  value.dob = value.dob.getTime();
            //}
            const saveValue: any = { personalDetails: value };
            console.log(saveValue);
            this.updateForm.markAsPristine();
            this.as.currentUser.pipe(take(1)).subscribe((val) => {
                console.log(val);
                this.prs
                    .upDatePatient(patient,saveValue, val.uid)
                    /*.then((v) => {
                        console.log(v.key);
                    })*/
                    .catch(console.error);
            });
    }
    delete(patient:string)
    {
            this.as.currentUser.pipe(take(1)).subscribe((val) => {
                console.log(val);
                this.prs
                    .deletePatientRecord(patient,val.uid)
                    /*.then((v) => {
                        console.log(v.key);
                    })*/
            });
    }
    logout() {
        this.as
            .logout()
            .then(() => this.navigateToLogin())
            .catch((err) => {
                this.errorMessage = err.message;
            });
    }
    navigateToLogin()
    {
        this.router.navigate(['\login']);
    }
}
