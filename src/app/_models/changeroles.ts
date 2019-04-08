import { Role } from './role';

export class ChangeUserRoles {
    public id: string;
    public email: string;
    public allRoles: Role[];
    public userRoles: string[];
}

