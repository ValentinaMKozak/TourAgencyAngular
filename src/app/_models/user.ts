
export class User {
    public id: string;
    public userName: string;
    public email: string;
    public password: string;

     constructor(userName: string, email: string, password: string) {
          this.userName = userName;
          this.email = email;
          this.password = password;
     }
}
