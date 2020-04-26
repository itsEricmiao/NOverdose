import axios from 'axios';
import { createHash } from 'crypto';

export class NoverdoseRepo {

    url = 'http://localhost:8000'

    config = {
    };

    login(email, password) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/login`, { params: {email: email, password: password}})
            .then(resp => resolve(resp.data))
            .catch(resp => alert(resp));
        });
    }

    addUser(name, email, password) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addUser`, {name: name, email: email, password: password}, this.config)
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    getUserById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/users/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }
    
    search(name, disease, symptom, min, max) {
        var where = "";
        if(name == 'N/A' || name == 'n/a')
        {
            if(disease == "N/A")
            {
                if(symptom == 'N/A')
                {
                    if(min == 'N/A' || min == 'n/a')
                    {
                        where = "WHERE price <= " + max;
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                    else if(max == 'N/A' || max == 'n/a')
                    {
                        where = "WHERE price >= " + min;
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                    else{
                        return new Promise((resolve, reject) => {
                            where = "WHERE price Between" + min + " AND " + max;
                            axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                }
                else
                {
                    where = "WHERE price <= " + max + " AND s.id =" + symptom; 
                    if(min == 'N/A' || min == 'n/a')
                    {
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {price: max, symptom: symptom}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                    else if(max == 'N/A' || max == 'n/a')
                    {
                        where = "WHERE price >= " + max + " AND s.id =" + symptom;
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {price: max, symptom: symptom}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                    else{
                        where = "WHERE price BETWEEN " + max + " AND " + min + " AND s.id =" + symptom;
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {max: max, min: min, symptom: symptom}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                }
            }
            else
            {
                if(symptom == 'N/A')
                {
                    if(min == 'N/A' || min == 'n/a')
                    {
                        where = "WHERE price <= " + max + " AND d.id = " + disease;
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                    else if(max == 'N/A' || max == 'n/a')
                    {
                        where = "WHERE price >= " + min + " AND d.id = " + disease;
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                    else{
                        return new Promise((resolve, reject) => {
                            where = "WHERE price Between" + min + " AND " + max + " AND D.id = " + disease;
                            axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                }
                else
                {
                    where = "WHERE price <= " + max + " AND s.id =" + symptom + " AND D.id = " + disease;
                    if(min == 'N/A' || min == 'n/a')
                    {
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {price: max, symptom: symptom}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                    else if(max == 'N/A' || max == 'n/a')
                    {
                        where = "WHERE price >= " + max + " AND s.id =" + symptom + " AND D.id = " + disease;
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {price: max, symptom: symptom}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                    else{
                        where = "WHERE price BETWEEN " + max + " AND " + min + " AND s.id =" + symptom + " AND D.id = " + disease;
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {max: max, min: min, symptom: symptom}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                }
            }
        }
        else
        {
            if(disease == "N/A")
            {
                if(symptom == 'N/A')
                {
                    if(min == 'N/A' || min == 'n/a')
                    {
                        where = "WHERE price <= " + max + " AND name = " + name;
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                    else if(max == 'N/A' || max == 'n/a')
                    {
                        where = "WHERE price >= " + min+ " AND name = " + name;
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                    else{
                        return new Promise((resolve, reject) => {
                            where = "WHERE price Between" + min + " AND " + max + " AND name = " + name;
                            axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                }
                else
                {
                    where = "WHERE price <= " + max + " AND s.id =" + symptom + " AND name = " + name;
                    if(min == 'N/A' || min == 'n/a')
                    {
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {price: max, symptom: symptom}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                    else if(max == 'N/A' || max == 'n/a')
                    {
                        where = "WHERE price >= " + max + " AND s.id =" + symptom + " AND name = " + name;
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {price: max, symptom: symptom}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                    else{
                        where = "WHERE price BETWEEN " + max + " AND " + min + " AND s.id =" + symptom + " AND name = " + name;
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {max: max, min: min, symptom: symptom}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                }
            }
            else
            {
                if(symptom == 'N/A')
                {
                    if(min == 'N/A' || min == 'n/a')
                    {
                        where = "WHERE price <= " + max + " AND d.id = " + disease + " AND name = " + name;
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                    else if(max == 'N/A' || max == 'n/a')
                    {
                        where = "WHERE price >= " + min + " AND d.id = " + disease + " AND name = " + name;
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                    else{
                        return new Promise((resolve, reject) => {
                            where = "WHERE price Between" + min + " AND " + max + " AND D.id = " + disease + " AND name = " + name;
                            axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                }
                else
                {
                    where = "WHERE price <= " + max + " AND s.id =" + symptom + " AND D.id = " + disease + " AND name = " + name;
                    if(min == 'N/A' || min == 'n/a')
                    {
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {price: max, symptom: symptom}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                    else if(max == 'N/A' || max == 'n/a')
                    {
                        where = "WHERE price >= " + max + " AND s.id =" + symptom + " AND D.id = " + disease + " AND name = " + name;
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {price: max, symptom: symptom}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                    else{
                        where = "WHERE price BETWEEN " + max + " AND " + min + " AND s.id =" + symptom + " AND D.id = " + disease + " AND name = " + name;
                        return new Promise((resolve, reject) => {
                            axios.get(`${this.url}/getDrugs`, {params: {max: max, min: min, symptom: symptom}})
                            .then(resp => resolve(resp.data))
                            .catch(resp => alert(resp));
                        });
                    }
                }
            }
        }
    }
}
