import React from "react";
import { SYMPTOMS } from "../constants";
import { DISEASE } from "../constants";
import { SIDEEFFECT } from "../constants";
import { NoverdoseRepo } from '../Api/NoverdoseRepo';
import NavBar from './navBar';
import './search.css';

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
        drugs: [],
        drugName: ''
    }

    search(name, disease, symptom, min, max, sideEffect)
    {
            name = '"' + name + '"';
            this.noverdoseRepo.search(name, disease, symptom, min, max, sideEffect).then(returnDrugs => {
                console.log(returnDrugs);
                this.setState({drugs: returnDrugs});
            });
    }

    addPerscription(drugId, name)
    {
        console.log(drugId);
        var returnValue = this.noverdoseRepo.addPerscription(drugId, this.props.match.params.id);
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
                    <label htmlFor="search_name">Name<span className="text-danger">*</span></label>
                        <input type="text"
                            id="search_name"
                            name="search_name"
                            className="form-control"
                            value={ this.state.name }
                            onChange={ e => this.setState( { name: e.target.value } ) } />
                </div>
                <div className="form-group">
                <label htmlFor="search_departmentId">Disease<span className="text-danger">*</span></label>
                <select id="search_departmentId"
                        name="search_departmentId"
                        className="form-control"
                        value={ this.state.disease }
                        onChange={ e => this.setState( { disease: e.target.value } ) }>
                    <option></option>
                    {
                        DISEASE.map((d, i) => <option key={ i } value={ d.id }>{ d.name }</option>)
                    }
                </select>
                </div>
                <div className="form-group">
                <label htmlFor="search_departmentId">Symptoms<span className="text-danger">*</span></label>
                <select id="search_departmentId"
                        name="search_departmentId"
                        className="form-control"
                        value={ this.state.symptom }
                        onChange={ e => this.setState( { symptom: e.target.value } ) }>
                    <option></option>
                    {
                        SYMPTOMS.map((d, i) => <option key={ i } value={ d.id }>{ d.name }</option>)
                    }
                </select>
                </div>
                <div className="form-group">
                <label htmlFor="search_departmentId">Side Effects<span className="text-danger">*</span></label>
                <select id="search_departmentId"
                        name="search_departmentId"
                        className="form-control"
                        value={ this.state.sideEffect }
                        onChange={ e => this.setState( { sideEffect: e.target.value } ) }>
                    <option></option>
                    {
                        SIDEEFFECT.map((d, i) =><option key={ i } value={ d.id }>{ d.name }</option>)
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
                        <th className = "text-right">Price</th>
                        <th className = "text-right">Add Perscription</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.drugs.map((p, i) =>
                                <tr key = {i}>
                                    <td key = {i}>{ p.name }</td>
                                    <td key = {i}>{ p.symptomDesc }</td>
                                    <td key = {i}>{ p.diseaseDesc }</td>
                                    <td key = {i}>{ p.sideEffectDesc }</td>
                                    <td key = {i} className = "text-right">${ p.price }</td>
                                    <td key = {i}>
                                        <button className = "btn btn-success float-right" onClick = {() => this.addPerscription(p.drugId, p.name)}>+</button>
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
      this.noverdoseRepo.symptoms().then(symptom => {
        console.log(symptom);
    });
  }
}

export default Search;