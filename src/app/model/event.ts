export interface Event {
    id?: string;
    templateId: string;
    name: string;
    start: any; // firebase.firestore.Timestamp
    message: string;
}
