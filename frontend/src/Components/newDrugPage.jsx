import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { button } from 'bootstrap';
import NavBar from "./navBar";
import { NoverdoseRepo } from '../Api/NoverdoseRepo';

export default class DrugForm extends React.Component {

    noverdoseRepo = new NoverdoseRepo();

    state = {
        id: "",
        name: "",
        price: "",
        description: "",
        pharmacies: [],
        pharmacy: '',
        symptoms: [],
        sideEffects:[],
        diseases:[],
        sideEffect:"",
        drugs: [],
        pharmacy: '',
        disease: '',
        sideEffect: '',
        symptom: '',
        description: '',
        update: false
    }

    goHome = e => {
        this.setState({homePage: true});
    }
    update()
    {
        console.log(this.state.disease);
        this.noverdoseRepo.updateDrugById(this.state.drugs.drugId,this.state.name,this.state.pharmacy,this.state.disease,this.state.symptom,this.state.sideEffect,this.state.price,this.state.description);
        this.setState({update: true})
    }
    componentWillMount() {
        this.noverdoseRepo.symptoms().then(symptom => {
            this.setState({symptoms: symptom.data})
      });
      this.noverdoseRepo.sideEffects().then(sideEffect => {
          this.setState({sideEffects: sideEffect.data})
      });
      this.noverdoseRepo.diseases().then(disease => {
          this.setState({diseases: disease.data})
      });
      this.noverdoseRepo.pharmacies().then(pharmacy => {
        this.setState({pharmacies: pharmacy.data})
    });
      this.noverdoseRepo.getDrugById(+this.props.match.params.drugId).then(drug => {
        console.log(drug.drug);
        this.setState({drugs: drug.drug[0]});
        this.setState({name: drug.drug[0].name});
        this.setState({name: drug.drug[0].name});
        this.setState({disease: drug.drug[0].diseaseId});
        this.setState({symptom: drug.drug[0].symptomId});
        this.setState({sideEffect: drug.drug[0].sideEffectId});
        this.setState({pharmacy: drug.drug[0].pharmacyId});
        this.setState({description: drug.drug[0].description});
        this.setState({price: drug.drug[0].price});
        console.log(this.state.drugs);

  });
        console.log(JSON.stringify(this.props.location.state))
        let newID = +this.props.match.params.id;
        this.setState({id: newID});
        console.log("componentWillMount")
        console.log("id = "+newID);
    }


    render() {
        return (
            <>
                <NavBar id={this.props.match.params.id}/>
                <div className="container">
                <div className="mt-4">
                <div className="card-header bg-secondary text-white">
                    {this.state.update == false && <h3>Update Drug</h3>}
                    {this.state.update == true && <h3>Update Drug <span className = "text-success float-right">Drug Has Been Updated!</span></h3>}
                    
                </div>

                <div className="card-body">
                <div className="form-group">
                    <label htmlFor="search_name">Name</label>
                        <input type="text"
                            id="search_name"
                            name="search_name"
                            className="form-control"
                            value={ this.state.name }
                            onChange={ e => this.setState( { name: e.target.value } ) } />
                </div>
                <div className="form-group">
                <label>Pharmacy</label>
                <select
                        className="form-control"
                        value={ this.state.pharmacy }
                        onChange={ e => this.setState( { pharmacy: e.target.value } ) }>
                    <option></option>
                    {
                        this.state.pharmacies.map((d, i) => <option key={ i } value={ d.pharmacyId }>{ d.name }</option>)
                    }
                </select>
                </div>
                <div className="form-group">
                <label>Disease</label>
                <select 
                        className="form-control"
                        value={ this.state.disease }
                        onChange={ e => this.setState( { disease: e.target.value } ) }>
                    <option></option>
                    {
                        this.state.diseases.map((d, i) => <option key={ i } value={ d.diseaseId }>{ d.name }</option>)
                    }
                </select>
                </div>
                <div className="form-group">
                <label >Symptoms</label>
                <select 
                        className="form-control"
                        value={ this.state.symptom }
                        onChange={ e => this.setState( { symptom: e.target.value } ) }>
                    <option></option>
                    {
                        this.state.symptoms.map((d, i) => <option key={ i } value={ d.symptomId }>{ d.name }</option>)
                    }
                </select>
                </div>
                <div className="form-group">
                <label >Side Effects</label>
                <select 
                        className="form-control"
                        value={ this.state.sideEffect }
                        onChange={ e => this.setState( { sideEffect: e.target.value } ) }>
                    <option></option>
                    {
                        this.state.sideEffects.map((d, i) =><option key={ i } value={ d.sideEffectId }>{ d.name }</option>)
                    }
                </select>
                </div>
                <div className="form-group">
                </div>
                <div className="row">
                                <div className="col-5">
                                    <label>Price</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.price }
                                        onChange={ e => this.setState({ price: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <br></br>
                    <label htmlFor="search_name">Description</label>
                        <textarea
                            className="form-control"
                            rows = "10"
                            value={ this.state.description }
                            onChange={ e => this.setState( { description: e.target.value } ) } />
                </div>
                <div className="mt-2">
                    <button type="button" className="btn btn-primary" onClick={() => this.update()}>
                        Update
                    </button>
                </div>
                </div>
                </div>
                </div>
            </>
        );
    }
}