export class User {
    constructor(id, name, email, password, birthday, medications, profilePicUrl){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
        this.medications = medications;
        this.profilePicUrl = profilePicUrl;
    }
}
export default User;