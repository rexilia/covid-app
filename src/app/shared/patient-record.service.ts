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
      upDate(
        patientId: string,
        patientRecord: Partial<IPatientRecord>,
        uid: string
        ) 
        {
            if ($key != null)
            this.afd.list('patients').update($key,'');
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

    deletePatientRecord(patientId: string, uid: string) {
        // Special handling needed
    }

    getPatientById(patientId: string,patientRecord: Partial<IPatientRecord>) {
       var groupId = patientId.$key;
      /*var array=patientArray.find(function(element){
          if( IPatientRecord.patientId.personalDetails.identity == patientId)
          return patientId.value;
      })
      console.log(array);*/
      //console.log(this.afd.list('groupId'));
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
