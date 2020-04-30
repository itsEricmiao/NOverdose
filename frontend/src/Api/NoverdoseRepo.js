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

    getPrescription(userID){
        console.log(userID);
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/usersprescriptions`, {params: {userId: userID}}, this.config)
                .then(x => resolve(x.data))
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
    getDrugById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getDrugId/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    updateDrugById(id, name, pharmacy, disease, symptom, sideEffect, price, description) {
        console.log(disease);
        new Promise((resolve, reject) => {
            axios.put(`${this.url}/updateDrug`,
                {
                            id: id,
                            name: name,
                            pharmacyId:pharmacy,
                            diseaseId:disease,
                            symptomId: symptom,
                            sideEffectId: sideEffect,
                            price:price,
                            description:description
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

    updatePrescriptionByID(id) {
        var oldVal = 1;
        new Promise((resolve, reject) => {
            axios.put(`${this.url}/updatePrescription`,
                {
                    id: id,
                    pastPrescription: oldVal
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

    addPrescription(drugId,userId) {
        var checkIfInDb = 0;
        var returnValue = 0;
        console.log('here');
        new Promise((resolve, reject) => {
            axios.get(`${this.url}/searchPrescription`, {params: {drugId: drugId, userId: userId}}, this.config)
                .then(x => {
                    console.log(x.data.data);
                    if(x.data.data == "1")
                    {
                        console.log('here');
                        checkIfInDb = 1;
                    }
                    else if(x.data.data == "2")
                    {
                        console.log(x.data.prescription);
                        var oldVal = 0;
                        new Promise((resolve, reject) => {
                            axios.put(`${this.url}/updatePrescription`,
                                {
                                    id: x.data.prescription.prescriptionId,
                                    pastPrescription: oldVal
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
                    else
                    {
                        return new Promise((resolve, reject) => {
                            axios.post(`${this.url}/addPrescription`, {drugId: drugId, userId: userId}, this.config)
                                .then(x => {
                                    console.log("prescriptionAdded");
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
    
    sideEffects()
    {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getSideEffects`, {})
            .then(resp => resolve(resp.data))
            .catch(resp => alert(resp));
        });
    }

    diseases()
    {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getDiseases`, {})
            .then(resp => resolve(resp.data))
            .catch(resp => alert(resp));
        });
    }

    pharmacies()
    {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getPharmacies`, {})
            .then(resp => resolve(resp.data))
            .catch(resp => alert(resp));
        });
    }
    
    search(name, disease, symptom, min, max, sideEffect, pharmacy) {
        var where = "";
        if(pharmacy == 7000)
        {
            if(sideEffect == 4000 || sideEffect == undefined)
        {
            if(name == '"N/A"' || name == '"n/a"' || name == undefined)
            {
                if(disease == 6000 || disease == undefined)
                {
                    if(symptom == 5000 || symptom == undefined)
                    {
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                    if(symptom == 5000 || symptom == undefined)
                    {
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                if(disease == 6000 || disease == undefined)
                {
                    if(symptom == 5000 || symptom == undefined)
                    {
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                    if(symptom == 5000 || symptom == undefined)
                    {
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
            if(name == '"N/A"' || name == '"n/a"' || name == undefined)
            {
                if(disease == 6000 || disease == undefined)
                {
                    if(symptom == 5000 || symptom == undefined)
                    {
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                    if(symptom == 5000 || symptom == undefined)
                    {
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                if(disease == 6000 || disease == undefined)
                {
                    if(symptom == 5000 || symptom == undefined)
                    {
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                    if(symptom == 5000|| symptom == undefined)
                    {
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
        else
        {
            if(sideEffect == 4000 || sideEffect == undefined)
        {
            if(name == '"N/A"' || name == '"n/a"' || name == undefined)
            {
                if(disease == 6000 || disease == undefined)
                {
                    if(symptom == 5000 || symptom == undefined)
                    {
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                    if(symptom == 5000 || symptom == undefined)
                    {
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                if(disease == 6000 || disease == undefined)
                {
                    if(symptom == 5000 || symptom == undefined)
                    {
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                    if(symptom == 5000 || symptom == undefined)
                    {
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
            if(name == '"N/A"' || name == '"n/a"' || name == undefined)
            {
                if(disease == 6000 || disease == undefined)
                {
                    if(symptom == 5000 || symptom == undefined)
                    {
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                    if(symptom == 5000 || symptom == undefined)
                    {
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                if(disease == 6000 || disease == undefined)
                {
                    if(symptom == 5000 || symptom == undefined)
                    {
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                    if(symptom == 5000|| symptom == undefined)
                    {
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        if(min == 'N/A' || min == 'n/a' || min == undefined)
                        {
                            if(max == 'N/A' || max == 'n/a' || max == undefined)
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
                        else if(max == 'N/A' || max == 'n/a' || max == undefined)
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
}
