import { User } from './user';

export interface UserProfile extends User {
    email: string;
    photoURL: string;
}
