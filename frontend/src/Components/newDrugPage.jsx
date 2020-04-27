import React, { Component } from 'react';
import { button } from 'bootstrap';

export default class DrugForm extends React.Component {

    state = {
        name: "",
        price: "",
        description: "",
        pharmacy: "",
        sideEffect:""
    }


    render() {
        return (
            <div className="card mt-4">
                <div className="card-header bg-secondary text-white">
                    <h3>Add Prescription </h3>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-8">
                            <label htmlFor="prescriptionName">Prescription Name</label>
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

                    <div className="row">
                        <div className="col">
                            <label htmlFor="userComment">Side Effect:</label>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col">
                        <textarea
                            type="text"
                            className="form-control"
                            id="userComment"
                            onChange={e => this.setState({ sideEffect: e.target.value })}
                        />
                            <br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="userComment">Symptom:</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                        <textarea
                            type="text"
                            className="form-control"
                            id="userComment"
                            onChange={e => this.setState({ symptom: e.target.value })}
                        />
                            <br />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <button className="btn-primary">Back</button>{" "}
                        </div>
                        <div className="col">
                            <button className="btn-primary">Submit</button>{" "}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
