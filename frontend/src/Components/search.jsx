import React from "react";
import { SYMPTOMS } from "../constants";
import { DISEASE } from "../constants";
import { NoverdoseRepo } from '../Api/NoverdoseRepo';

export class Search extends React.Component{

    noverdoseRepo = new NoverdoseRepo();

    state = {
        name: '',
        disease: '',
        symptom: '',
        minPrice: '',
        maxPrice: '',
        drugs: []
    }

    search(name, disease, symptom, min, max){
            this.noverdoseRepo.search(name, disease, symptom, min, max).then(returnDrugs => {
                console.log(returnDrugs.Data);
                this.setState({drugs: returnDrugs.Data});
            });
    }

  render() {
    return (
      <>
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
                    <button type="button" className="btn btn-primary" onClick={() => this.search(this.state.name, this.state.disease, this.state.symptom, this.state.minPrice, this.state.maxPrice)}>
                        Search
                    </button>
                </div>
            </div>
        </div>

        <br></br>
            <table className="table table-striped table-condensed">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Pharmacy</th>
                        <th className = "text-right">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.drugs.map((p, i) =>
                                <tr key = {i}>
                                    <td key = {i}>{ p.name }</td>
                                    <td key = {i}>{ p.description }</td>
                                    <td key = {i}>{ p.pharmacy }</td>
                                    <td key = {i} className = "text-right">${ p.price }</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
      </>
    );
  }
}

export default Search;