import axios from 'axios';
import { createHash } from 'crypto';

export class NoverdoseRepo {

    url = 'http://localhost:8000'

    config = {
    };

    login(email, password) {
        console.log("login password", password);
        let obj = {
            email: email,
            password: password
        };
        console.log("obj: ", obj);

        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/login`, { params: {email: email, password: password}})
            .then(resp => resolve(resp.data)/*handle receiving parent info*/)
            .catch(resp => alert(resp));
        });
    }

    addUser(user) {
        console.log(user);
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addUser`, user, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }
    

}
