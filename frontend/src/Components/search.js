import React from "react";
import { SYMPTOMS } from "../constants";

export class Search extends React.Component{

    state = {
        name: '',
        minPrice: '',
        maxPrice: ''
    }

  render() {
    return (
      <>
        <div className="card mt-3 mb-3">
            <div className="card-body">
                <h3 className="card-title">Search NOverdose</h3>
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
                <label htmlFor="search_departmentId">Symptoms</label>
                <select id="search_departmentId"
                        name="search_departmentId"
                        className="form-control"
                        value={ this.state.departmentId }
                        onChange={ e => this.setState( { departmentId: e.target.value } ) }>
                    <option></option>
                    {
                        SYMPTOMS.map((d, i) => <option key={ i } value={ d.id }>{ d.name }</option>)
                    }
                </select>
                </div>
                <div className="row">
                                <div className="col-5">
                                    <br></br>
                                    <label>Minimum Price</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.minPrice}
                                        onChange={ e => this.setState({ minPrice: e.target.value })} />
                                </div>
                                <div className="col-5">
                                    <br></br>
                                    <label>Maximum Price</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.maxPrice}
                                        onChange={ e => this.setState({ maxPrice: e.target.value })} />
                                </div>
                            </div>
                <div className="mt-2">
                    <button type="button" className="btn btn-primary">
                        Search
                    </button>
                </div>
            </div>
        </div>
      </>
    );
  }
}

export default Search;