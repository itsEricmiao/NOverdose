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
    updateUserByID(id, name, email, password, specialist, dob) {
        console.log(id);
        new Promise((resolve, reject) => {
            axios.put(`${this.url}/updateUser`,
                {
                            id: id,
                            name: name,
                            email:email,
                            password:password,
                            specialist: specialist,
                            dob: dob
                        }, this.config)
                .then(response=>{
                        console.log(response);
                     }
                )
                .catch(error => {
                   alert( error)
                });
        });
    }

    addPerscription(drugId,userId) {
        var checkIfInDb = 0;
        var returnValue = 0;
        console.log('here');
        new Promise((resolve, reject) => {
            axios.get(`${this.url}/searchPerscription`, {params: {drugId: drugId, userId: userId}}, this.config)
                .then(x => {
                    console.log(x.data.data);
                    if(x.data.data == "1")
                    {
                        console.log('here');
                        checkIfInDb = 1;
                    }
                    else
                    {
                        return new Promise((resolve, reject) => {
                            axios.post(`${this.url}/addPerscription`, {drugId: drugId, userId: userId}, this.config)
                                .then(x => {
                                    console.log("perscriptionAdded");
                                    returnValue = 1;
                                })
                                .catch(x => {
                                    alert(x);
                                    reject(x);
                                });
                        });
                    }
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
        if(checkIfInDb == 1)
        {
            return 0;
        }
        else
        {
            return 1;
        }
    }

    symptoms()
    {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getSymptoms`, {})
            .then(resp => resolve(resp.data))
            .catch(resp => alert(resp));
        });
    }
    
    search(name, disease, symptom, min, max, sideEffect) {
        var where = "";
        if(sideEffect == 1)
        {
            if(name == '"N/A"' || name == '"n/a"')
            {
                if(disease == 1)
                {
                    if(symptom == 1)
                    {
                        if(min == 'N/A' || min == 'n/a')
                        {
                            if(max == 'N/A' || max == 'n/a')
                            {
                                where = "";
                                return new Promise((resolve, reject) => {
                                    axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                    .then(resp => resolve(resp.data))
                                    .catch(resp => alert(resp));
                                });
                            }
                            else
                            {
                                where = "WHERE d.price <= " + max;
                                return new Promise((resolve, reject) => {
                                    axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                    .then(resp => resolve(resp.data))
                                    .catch(resp => alert(resp));
                                });
                            }
                        }
                        else if(max == 'N/A' || max == 'n/a')
                        {
                            where = "WHERE d.price >= " + min;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                        else{
                            return new Promise((resolve, reject) => {
                                where = "WHERE d.price Between " + min + " AND " + max;
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                    }
                    else
                    {
                        if(min == 'N/A' || min == 'n/a')
                        {
                            if(max == 'N/A' || max == 'n/a')
                            {
                                where = "WHERE s.symptomId =" + symptom; 
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                            else
                            {
                                where = "WHERE d.price <= " + max + " AND s.symptomId =" + symptom; 
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                        }
                        else if(max == 'N/A' || max == 'n/a')
                        {
                            where = "WHERE d.price >= " + max + " AND s.symptomId =" + symptom;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                        else{
                            where = "WHERE d.price BETWEEN " + max + " AND " + min + " AND s.symptomId =" + symptom;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                    }
                }
                else
                {
                    if(symptom == 1)
                    {
                        if(min == 'N/A' || min == 'n/a')
                        {
                            if(max == 'N/A' || max == 'n/a')
                            {
                                where = "WHERE dis.diseaseId = " + disease;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                            else
                            {
                                where = "WHERE d.price <= " + max + " AND dis.diseaseId = " + disease;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                        }
                        else if(max == 'N/A' || max == 'n/a')
                        {
                            where = "WHERE d.price >= " + min + " AND dis.diseaseId = " + disease;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                        else{
                            return new Promise((resolve, reject) => {
                                where = "WHERE d.price Between " + min + " AND " + max + " AND dis.diseaseId = " + disease;
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                    }
                    else
                    {
                        if(min == 'N/A' || min == 'n/a')
                        {
                            if(max == 'N/A' || max == 'n/a')
                            {
                                where = "WHERE s.symptomId =" + symptom + " AND disdiseaseId = " + disease;
                                return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                            else
                            {
                                where = "WHERE d.price <= " + max + " AND s.symptomId =" + symptom + " AND disdiseaseId = " + disease;
                                return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                        }
                        else if(max == 'N/A' || max == 'n/a')
                        {
                            where = "WHERE d.price >= " + max + " AND s.symptomId =" + symptom + " AND dis.diseaseId = " + disease;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                        else{
                            where = "WHERE d.price BETWEEN " + max + " AND " + min + " AND s.symptomId =" + symptom + " AND dis.diseaseId = " + disease;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                    }
                }
            }
            else
            {
                if(disease == 1)
                {
                    if(symptom == 1)
                    {
                        if(min == 'N/A' || min == 'n/a')
                        {
                            if(max == 'N/A' || max == 'n/a')
                            {
                                console.log('here');
                                where = "WHERE d.name = " + name;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                            else
                            {
                                where = "WHERE d.price <= " + max + " AND d.name = " + name;
                                return new Promise((resolve, reject) => {
                                    axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                    .then(resp => resolve(resp.data))
                                    .catch(resp => alert(resp));
                                });
                            }
                        }
                        else if(max == 'N/A' || max == 'n/a')
                        {
                            where = "WHERE d.price >= " + min+ " AND d.name = " + name;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                        else{
                            return new Promise((resolve, reject) => {
                                where = "WHERE d.price Between " + min + " AND " + max + " AND d.name = " + name;
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                    }
                    else
                    {
                        if(min == 'N/A' || min == 'n/a')
                        {
                            if(max == 'N/A' || max == 'n/a')
                            {
                                where = "WHERE s.symptomId =" + symptom + " AND d.name = " + name;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                            else
                            {
                                where = "WHERE d.price <= " + max + " AND s.symptomId =" + symptom + " AND d.name = " + name;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                        }
                        else if(max == 'N/A' || max == 'n/a')
                        {
                            where = "WHERE d.price >= " + max + " AND s.symptomId =" + symptom + " AND d.name = " + name;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                        else{
                            where = "WHERE d.price BETWEEN " + max + " AND " + min + " AND s.symptomId =" + symptom + " AND d.name = " + name;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                    }
                }
                else
                {
                    if(symptom == 1)
                    {
                        if(min == 'N/A' || min == 'n/a')
                        {
                            if(max == 'N/A' || max == 'n/a')
                            {
                                where = "WHERE dis.diseaseId = " + disease + " AND d.name = " + name;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                            else
                            {
                                where = "WHERE d.price <= " + max + " AND dis.diseaseId = " + disease + " AND d.name = " + name;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                        }
                        else if(max == 'N/A' || max == 'n/a')
                        {
                            where = "WHERE d.price >= " + min + " AND dis.diseaseId = " + disease + " AND d.name = " + name;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                        else{
                            return new Promise((resolve, reject) => {
                                where = "WHERE d.price Between " + min + " AND " + max + " AND dis.diseaseId = " + disease + " AND d.name = " + name;
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                    }
                    else
                    {
                        if(min == 'N/A' || min == 'n/a')
                        {
                            if(max == 'N/A' || max == 'n/a')
                            {
                                where = "WHERE s.symptomId =" + symptom + " AND dis.diseaseId = " + disease + " AND d.name = " + name;
                                return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                            else
                            {
                                where = "WHERE d.price <= " + max + " AND s.symptomId =" + symptom + " AND dis.diseaseId = " + disease + " AND d.name = " + name;
                                return new Promise((resolve, reject) => {
                                    axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                    .then(resp => resolve(resp.data))
                                    .catch(resp => alert(resp));
                                });
                            }
                        }
                        else if(max == 'N/A' || max == 'n/a')
                        {
                            where = "WHERE d.price >= " + max + " AND s.symptomId =" + symptom + " AND dis.diseaseId = " + disease + " AND d.name = " + name;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                        else{
                            where = "WHERE d.price BETWEEN " + max + " AND " + min + " AND s.symptomId =" + symptom + " AND dis.diseaseId = " + disease + " AND d.name = " + name;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {mwhere: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                    }
                }
            }
        }
        else
        {
            if(name == '"N/A"' || name == '"n/a"')
            {
                if(disease == 1)
                {
                    if(symptom == 1)
                    {
                        if(min == 'N/A' || min == 'n/a')
                        {
                            if(max == 'N/A' || max == 'n/a')
                            {
                                where = "WHERE se.sideEffectId = " + sideEffect; 
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                            else
                            {
                                where = "WHERE d.price <= " + max + " AND se.sideEffectId = " + sideEffect; 
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                        }
                        else if(max == 'N/A' || max == 'n/a')
                        {
                            where = "WHERE d.price >= " + min+ " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                        else{
                            return new Promise((resolve, reject) => {
                                where = "WHERE d.price Between " + min + " AND " + max + " AND se.sideEffectId = " + sideEffect;
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                    }
                    else
                    {
                        if(min == 'N/A' || min == 'n/a')
                        {
                            if(max == 'N/A' || max == 'n/a')
                            {
                                where = "WHERE s.symptomId =" + symptom + " AND se.sideEffectId = " + sideEffect; 
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                            else
                            {
                                where = "WHERE d.price <= " + max + " AND s.symptomId =" + symptom + " AND se.sideEffectId = " + sideEffect; 
                                return new Promise((resolve, reject) => {
                                    axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                    .then(resp => resolve(resp.data))
                                    .catch(resp => alert(resp));
                                });
                            }
                        }
                        else if(max == 'N/A' || max == 'n/a')
                        {
                            where = "WHERE d.price >= " + max + " AND s.symptomId =" + symptom + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                        else{
                            where = "WHERE d.price BETWEEN " + max + " AND " + min + " AND s.symptomId =" + symptom + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                    }
                }
                else
                {
                    if(symptom == 1)
                    {
                        if(min == 'N/A' || min == 'n/a')
                        {
                            if(max == 'N/A' || max == 'n/a')
                            {
                                where = "WHERE dis.diseaseId = " + disease + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                            else
                            {
                                where = "WHERE d.price <= " + max + " AND dis.diseaseId = " + disease + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                        }
                        else if(max == 'N/A' || max == 'n/a')
                        {
                            where = "WHERE d.price >= " + min + " AND dis.diseaseId = " + disease + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                        else{
                            return new Promise((resolve, reject) => {
                                where = "WHERE d.price Between " + min + " AND " + max + " AND dis.diseaseId = " + disease + " AND se.sideEffectId = " + sideEffect;
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                    }
                    else
                    {
                        if(min == 'N/A' || min == 'n/a')
                        {
                            if(max == 'N/A' || max == 'n/a')
                            {
                                where = "WHERE s.symptomId =" + symptom + " AND dis.diseaseId = " + disease + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                            else
                            {
                                where = "WHERE d.price <= " + max + " AND s.symptomId =" + symptom + " AND dis.diseaseId = " + disease + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                        }
                        else if(max == 'N/A' || max == 'n/a')
                        {
                            where = "WHERE d.price >= " + max + " AND s.symptomId =" + symptom + " AND dis.diseaseId = " + disease + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                        else{
                            where = "WHERE d.price BETWEEN " + max + " AND " + min + " AND s.symptomId =" + symptom + " AND dis.diseaseId = " + disease+ " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                    }
                }
            }
            else
            {
                if(disease == 1)
                {
                    if(symptom == 1)
                    {
                        if(min == 'N/A' || min == 'n/a')
                        {
                            if(max == 'N/A' || max == 'n/a')
                            {
                                where = "WHERE d.name = " + name + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                            else
                            {
                                where = "WHERE d.price <= " + max + " AND d.name = " + name + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                        }
                        else if(max == 'N/A' || max == 'n/a')
                        {
                            where = "WHERE d.price >= " + min+ " AND d.name = " + name + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                        else{
                            return new Promise((resolve, reject) => {
                                where = "WHERE d.price Between " + min + " AND " + max + " AND d.name = " + name + " AND se.sideEffectId = " + sideEffect;
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                    }
                    else
                    {
                        if(min == 'N/A' || min == 'n/a')
                        {
                            if(max == 'N/A' || max == 'n/a')
                            {
                                where = "WHERE s.symptomId =" + symptom + " AND d.name = " + name + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                            else
                            {
                                where = "WHERE d.price <= " + max + " AND s.symptomId =" + symptom + " AND d.name = " + name + " AND se.sideEffectId = " + sideEffect;
                                return new Promise((resolve, reject) => {
                                    axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                    .then(resp => resolve(resp.data))
                                    .catch(resp => alert(resp));
                                });
                            }
                        }
                        else if(max == 'N/A' || max == 'n/a')
                        {
                            where = "WHERE d.price >= " + max + " AND s.symptomId =" + symptom + " AND d.name = " + name + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                        else{
                            where = "WHERE d.price BETWEEN " + max + " AND " + min + " AND s.symptomId =" + symptom + " AND d.name = " + name + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                    }
                }
                else
                {
                    if(symptom == 1)
                    {
                        if(min == 'N/A' || min == 'n/a')
                        {
                            if(max == 'N/A' || max == 'n/a')
                            {
                                where = "WHERE dis.diseaseId = " + disease + " AND d.name = " + name + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                            else
                            {
                                where = "WHERE d.price <= " + max + " AND dis.diseaseId = " + disease + " AND d.name = " + name + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                        }
                        else if(max == 'N/A' || max == 'n/a')
                        {
                            where = "WHERE d.price >= " + min + " AND dis.diseaseId = " + disease + " AND d.name = " + name + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                        else{
                            return new Promise((resolve, reject) => {
                                where = "WHERE d.price  " + min + " AND " + max + " AND dis.diseaseId = " + disease + " AND d.name = " + name + " AND se.sideEffectId = " + sideEffect; 
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                    }
                    else
                    {
                        if(min == 'N/A' || min == 'n/a')
                        {
                            if(max == 'N/A' || max == 'n/a')
                            {
                                where = "WHERE s.symptomId =" + symptom + " AND dis.diseaseId = " + disease + " AND d.name = " + name + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                            else
                            {
                                where = "WHERE d.price <= " + max + " AND s.symptomId =" + symptom + " AND dis.diseaseId = " + disease + " AND d.name = " + name + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                            }
                        }
                        else if(max == 'N/A' || max == 'n/a')
                        {
                            where = "WHERE d.price >= " + max + " AND s.symptomId =" + symptom + " AND dis.diseaseId = " + disease + " AND d.name = " + name + " AND se.sideEffectId = " + sideEffect;
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                        else{
                            where = "WHERE d.price BETWEEN " + max + " AND " + min + " AND s.symptomId =" + symptom + " AND dis.diseaseId = " + disease + " AND d.name = " + name + " AND se.sideEffectId = " + sideEffect; 
                            return new Promise((resolve, reject) => {
                                axios.get(`${this.url}/getDrugs`, {params: {where: where}})
                                .then(resp => resolve(resp.data))
                                .catch(resp => alert(resp));
                            });
                        }
                    }
                }
            }
        }
    }
}
