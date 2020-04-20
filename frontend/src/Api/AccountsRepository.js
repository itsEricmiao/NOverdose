import axios from 'axios';
import { createHash } from 'crypto';

export class AccountsRepository {

    url = 'http://localhost:8000'

    config = {
    };

    getAccounts() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    console.log(x);
                    alert(x); // handle error
                    reject(x);
                });
        });
    }

    login(email, password) {
        console.log("login password", password);
        let obj = {
            email: email,
            password: password
        };
        console.log("obj: ", obj);
        const bodyFormData = new FormData();

        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/login`, { params: {email: email, password: password}})
            .then(resp => resolve(resp.data)/*handle receiving parent info*/)
            .catch(resp => alert(resp));
        });
    }

}