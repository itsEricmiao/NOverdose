import React from "react";
import { SYMPTOMS } from "../constants";
import { DISEASE } from "../constants";
import { SIDEEFFECT } from "../constants";
import { NoverdoseRepo } from '../Api/NoverdoseRepo';
import NavBar from './navBar';
import './search.css';
import Symptom from "../models/symptom";
import SideEffect from "../models/sideEffect";
import { Link } from "react-router-dom";

export class Search extends React.Component{

    noverdoseRepo = new NoverdoseRepo();

    state = {
        id:'',
        added: null,
        name: '',
        disease: '',
        symptom: '',
        minPrice: '',
        maxPrice: '',
        sideEffect: '',
        pharmacy: '',
        drugs: [],
        symptoms: [],
        sideEffects:[],
        diseases:[],
        pharmacies: [],
        drugName: '',
        specialist: null,
        drugId: ''
    }

    search(name, disease, symptom, min, max, sideEffect, pharmacy)
    {
            name = '"' + name + '"';
            this.noverdoseRepo.search(name, disease, symptom, min, max, sideEffect,pharmacy).then(returnDrugs => {
                console.log(returnDrugs);
                this.setState({drugs: returnDrugs});
            });
    }
    
    setSpecial()
    {
        if(this.state.specialist == 0)
        {
            this.setState({specialist: false});
        }
        else
        {
            this.setState({specialist: true});
        }
    }

    addPrescription(drugId, name)
    {
        console.log(drugId);
        var returnValue = this.noverdoseRepo.addPrescription(drugId, this.props.match.params.id);
            console.log(returnValue);
            if(returnValue == "perscriptionAdded")
            {
                this.setState({added: true});
            }
            else
            {
                this.setState({added: true});
                this.setState({drugName: name});
            }
    }

  render() {
    return (
      <>
      <NavBar id={this.props.match.params.id}/>
        <div className = "container">
        <div className="card mt-3 mb-3">
            <div className="card-body">
                <h3 className="card-title">Search NOverdose </h3>
                <h6 className="card-title text-danger">(If not applicable, enter "N/A") </h6>
                <div className="form-group">
                    <label >Name<span className="text-danger">*</span></label>
                        <input type="text"
                            className="form-control"
                            value={ this.state.name }
                            onChange={ e => this.setState( { name: e.target.value } ) } />
                </div>
                <div className="form-group">
                <label >Pharmacy<span className="text-danger">*</span></label>
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
                <label >Disease<span className="text-danger">*</span></label>
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
                <label>Symptoms<span className="text-danger">*</span></label>
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
                <label >Side Effects<span className="text-danger">*</span></label>
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
                <div className="row">
                                <div className="col-5">
                                    <br></br>
                                    <label>Minimum Price<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.minPrice}
                                        onChange={ e => this.setState({ minPrice: e.target.value })} />
                                </div>
                                <div className="col-5">
                                    <br></br>
                                    <label>Maximum Price<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.maxPrice}
                                        onChange={ e => this.setState({ maxPrice: e.target.value })} />
                                </div>
                            </div>
                <div className="mt-2">
                    <button type="button" className="btn btn-primary" onClick={() => this.search(this.state.name, this.state.disease, this.state.symptom, this.state.minPrice, this.state.maxPrice, this.state.sideEffect)}>
                        Search
                    </button>
                </div>
            </div>
        </div>

        <br></br>
            {this.state.added == true && <h1 className = "text-center text-success">Perscription Sent to the Pharmacy!</h1>}
            {this.state.added == false && <h1 className = "text-center text-danger">Perscription Has Already Been Sent!</h1>}
            <br></br>
            <table className="table table-striped table-condensed">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Symptom</th>
                        <th>Disease</th>
                        <th>Side Effect</th>
                        <th>Pharmacy</th>
                        <th className = "text-right">Price</th>
                        <th className = "text-right">Add Perscription</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.specialist == 0 &&
                        this.state.drugs.map((p, i) =>
                                <tr key = {i}>
                                    <td key = {i}>{ p.name }</td>
                                    <td key = {i}>{ p.SymptomName }</td>
                                    <td key = {i}>{ p.DiseaseName }</td>
                                    <td key = {i}>{ p.SideEffectName }</td>
                                    <td key = {i}>{ p.PharmacyName }</td>
                                    <td key = {i} className = "text-right">{ p.price }</td>
                                    <td key = {i}>
                                        <button className = "btn btn-success float-right" onClick = {() => this.addPrescription(p.drugId, p.name)}>+</button>
                                    </td>
                                </tr>
                        )
                    }
                    {this.state.specialist == 1 &&
                        this.state.drugs.map((p, i) =>
                                <tr key = {i}>
                                    <td key = {i}><Link to = {"../update/" + this.state.id + "/" + p.drugId}>{ p.name }</Link></td>
                                    <td key = {i}>{ p.SymptomName }</td>
                                    <td key = {i}>{ p.DiseaseName }</td>
                                    <td key = {i}>{ p.SideEffectName }</td>
                                    <td key = {i}>{ p.PharmacyName }</td>
                                    <td key = {i} className = "text-right">{ p.price }</td>
                                    <td key = {i}>
                                        <button className = "btn btn-success float-right" onClick = {() => this.addPrescription(p.drugId, p.name)}>+</button>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
      </>
    );
  }
  componentDidMount()
  {
    this.setState({id: +this.props.match.params.id})
      let id = +this.props.match.params.id;
      this.noverdoseRepo.getUserById(id).then(user => {
        console.log(user.user[0].specialist);
        this.setState({specialist: user.user[0].specialist})
  });
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
  }
}

export default Search;