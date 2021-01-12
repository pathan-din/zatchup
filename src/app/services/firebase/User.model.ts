export class User{
    id: any
    email: any;
    firstName: any;
    lastName: any;
    photoUrl: any;

    constructor(id: number, email: string, first_name: string, last_name: string, photoUrl: string){
        this.id = id;
        this.email = email;
        this.firstName = first_name;
        this.lastName = last_name;
        this.photoUrl = photoUrl
    }
}

export class SignupUser{
    uid: any;
    firstName: any;
    lastName: any
    email: any
}