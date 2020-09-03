import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction, AngularFireList } from '@angular/fire/database';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { FormControl, FormGroup, Validators, SelectControlValueAccessor } from "@angular/forms";
import { IPatientRecord } from './interfaces';

@Injectable({
    providedIn: 'root',
})
export class PatientRecordService {

    constructor(private afd: AngularFireDatabase) { }
      upDatePatient(
        patientId: string,
        patientRecord: Partial<IPatientRecord>,
        uid: string
        ) 
        {
            const saveValue = this._setAuditField(
                patientRecord,
                uid,
            );
            console.log(saveValue);
            console.log(patientId);
            return this.afd.object('/patients/'+patientId.$key).update(saveValue);
        }
    
    addNewPatientRecord(patientRecord: Partial<IPatientRecord>, uid: string) {
        console.log('Service Called');
        const updatedPatientRecord = this._setAuditField(
            patientRecord,
            uid,
            true
        );
        console.log(updatedPatientRecord);
        return this.afd.list('patients').push(updatedPatientRecord);
    }

    getAllPatientRecordsForUser(userId: string) {
        return this.afd
            .list('patients', (ref) =>
                ref.orderByChild('createdBy').equalTo(userId)
            )
            .snapshotChanges()
            .pipe(
                map((val: SnapshotAction<IPatientRecord>[]) => {
                    return val.map((action: SnapshotAction<IPatientRecord>) => {
                        const $key = action.payload.key;
                        return { $key, ...action.payload.val() };
                    });
                }),
                catchError((err) => {
                    console.log(err);
                    return of([]);
                }),
                shareReplay()
            );
    }
    deletePatientRecord(patientId: string)
    {
        console.log(patientId);
         this.afd.object('/patients/'+patientId.$key).remove();
    }

    getPatientById(patientId: string,patientRecord: Partial<IPatientRecord>) {
      console.log(patientId);
      return patientId;
    }

    _setAuditField(
        patientRecord: Partial<IPatientRecord>,
        uid: string,
        create: boolean = false
    ) {
        if (create) {
            patientRecord.ts = new Date().getTime();
            patientRecord.createdBy = uid;
        }
        patientRecord.updatedTs = new Date().getTime();
        patientRecord.updatedBy = uid;
        return patientRecord;
    }
    
}
