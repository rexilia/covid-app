export interface IPatientRecord {
    $key: string;
    ts: number;
    createdBy: string;
    updatedTs: number;
    updatedBy: string;
    addressInformation: IAddressInformation;
    personalDetails: IPersonalDetails;
    contactInformation: IContactInformation;
    specimenInformation: ISpecimenInformation;
    patientCategory: string;
    exposureHistory: IExposureHistory;
    clinicalSymptoms: IClinicalSymptoms;
    underlyingConditions: IUnderlyingCondition;
    /* hospitalisation: IHospitalisation; */
}

export interface IAddressInformation {
    doorNumber: string;
    apartmentName?: string;
    address1: string;
    address2?: string;
    district: string;
    village: string;
    state: string;
    pincode?: number;
}

export interface IPersonalDetails {
    identity: number;
    name: string;
    gender: string;
    age: string;
    dob?: number;
    nationality: string;
    passportNumber?: string;
    aadharNumber?: number;
}

export interface IContactInformation {
    mobileNumber?: string;
    mobileOwnership: 'SELF' | 'FAMILY' | 'OTHER';
    email?: string;
}

export interface ISpecimenInformation {
    specimenType: string;
    collectionDate: number;
    label: string;
    repeatedSample: boolean;
    sampleCollectionFacility: string;
    collectionFacilityPinCode: number;
}

export interface IExposureHistory {
    travelAbroad: boolean;
    placeOfTravel: string;
    travelDurationFrom: number;
    travelDurationTo: number;
    contactWithConfirmedCOVID: boolean;
    nameOfContact: string;
    quaratined: boolean;
    healthCareWorker: boolean;
}

export interface IClinicalSymptoms {
    cough: boolean;
    breathlessness: boolean;
    sorethroat: boolean;
    sputum: boolean;
    diarrhoea: boolean;
    bausea: boolean;
    chestPain: boolean;
    abdominalPain: boolean;
    vomiting: boolean;
    haemoptysis: boolean;
    nasalDischarge: boolean;
    firstSymptom: string;
    bodyAche: boolean;
    fever: boolean;
    feverFrom: number;
    bodyAcheFrom: number;
    dateOfSymptom: number;
}

export interface IUnderlyingCondition {
    copd: boolean;
    crd: boolean;
    bronchitis: boolean;
    malignancy: boolean;
    diabetes: boolean;
    heartDisease: boolean;
    hypertension: boolean;
    asthma: boolean;
    immunocompromised: boolean;
    otherConditions: string;
}
