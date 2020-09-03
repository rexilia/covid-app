import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { PatientRecordService } from '../../shared/patient-record.service';

@Component({
    selector: 'app-patient-record',
    templateUrl: './patient-record.component.html',
    styleUrls: ['./patient-record.component.css'],
})
export class PatientRecordComponent implements OnInit {
    personalDetailsForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private prs: PatientRecordService,
        private as: AuthService
    ) {}

    ngOnInit(): void {
        this.initaliseForms();
    }

    private initaliseForms() {
        this.personalDetailsForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            gender: ['Male', [Validators.required]],
            age: [1, [Validators.required, Validators.max(110)]],
            dob: [new Date(1970, 1, 0)],
            nationality: ['Indian', [Validators.required]],
            passportNumber: [
                '',
                [Validators.minLength(6), Validators.maxLength(11)],
            ],
            place:['',[Validators.required]],
        });
    }

    save() {
        const value = this.personalDetailsForm.value;
        //if (value.dob) {
          //  value.dob = value.dob.getTime();
        //}
        const saveValue: any = { personalDetails: value };
        console.log(saveValue);
        this.personalDetailsForm.markAsPristine();
        this.as.currentUser.pipe(take(1)).subscribe((val) => {
            console.log(val);
            this.prs
                .addNewPatientRecord(saveValue, val.uid)
                .then((v) => {
                    console.log(v.key);
                })
                .catch(console.error);
        });
    }
}