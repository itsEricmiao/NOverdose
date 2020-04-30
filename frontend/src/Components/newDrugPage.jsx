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
        pharmacy: "",
        symptoms: [],
        sideEffects:[],
        diseases:[],
        sideEffect:"",
    }

    goHome = e => {
        this.setState({homePage: true});
    }

    updateDrug()
    {
        
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
                    <h3>Update Drug</h3>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-8">
                            <label htmlFor="prescriptionName">Drug Name</label>
                        </div>


                        <div className="col-sm-2 align-text-left">
                            <label htmlFor="userRate">Pharmacy</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-8">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    id="userName"
                                    className="form-control"
                                    onChange={e => this.setState({ userName: e.target.value })}
                                />
                            </div>
                        </div>


                        <form>
                            <select
                                className="form-control"
                                onChange={e => this.setState({ rating: e.target.value })}
                            >
                                <option defaultValue="" />
                                <option value="1">Pharmacy 1</option>
                                <option value="2">Pharmacy 2</option>
                                <option value="3">Pharmacy 3</option>
                                <option value="4">Pharmacy 4</option>
                                <option value="5">Pharmacy 5</option>
                            </select>
                        </form>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="cost">Cost:</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                        <textarea
                            type="text"
                            className="form-control-sm"
                            id="cost"
                            onChange={e => this.setState({ sideEffect: e.target.value })}
                        />
                        </div>
                    </div>
                    <br/>

                    <div className="form-group">
                <label htmlFor="search_departmentId">Disease<span className="text-danger">*</span></label>
                <select id="search_departmentId"
                        name="search_departmentId"
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
                <label htmlFor="search_departmentId">Symptoms<span className="text-danger">*</span></label>
                <select id="search_departmentId"
                        name="search_departmentId"
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
                <label htmlFor="search_departmentId">Side Effects<span className="text-danger">*</span></label>
                <select id="search_departmentId"
                        name="search_departmentId"
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
                        <div className="col">
                            <button className="btn btn-secondary btn-lg disabled" onClick={this.goHome}>Back</button>
                            {this.state.homePage && <Redirect to={"/dashboard/"+ this.state.id}/>}
                        </div>
                        <div className="col">
                            <button className="btn btn-primary btn-lg" >Submit</button>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </>
        );
    }
}