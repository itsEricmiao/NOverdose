export class User {
    constructor(id, name, email, password,birthday,specialist,profilePicUrl){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
        this.specialist = specialist;
        this.profilePicUrl = profilePicUrl;
    }
}
export default User;