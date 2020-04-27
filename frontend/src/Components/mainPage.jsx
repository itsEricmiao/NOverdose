import React from 'react';
import ProfileCard from "./profileCard";
import DrugCard from "./drugCard";
import NavBar from './navBar';
import drugs from './TempData/drug';
import { NoverdoseRepo } from '../Api/NoverdoseRepo';
import { Redirect} from 'react-router-dom';
import User from '../models/user';

export default class MainPage extends React.Component {
    repo = new NoverdoseRepo();
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            name: '',
            email: '',
            password: '',
            birthday: '1995-01-01',
            medications: [ "MEDICATIONS1", "MEDICATIONS2", "MEDICATIONS3"],
            profilePicUrl: 'https://quindry.com/wp-content/gallery/people/Philadelphia-business-headshot-36-Square.jpg',
            addPrescription: false,
            allDrugs: drugs
        };
    }


    getUser(id) {
        console.log("GETTING USER")
        let t = this.repo.getUserById(id);
        console.log(t);
        console.log(JSON.stringify(t))
    }

    onDrugAdded(newDrugs) {
        this.setState(previousState => {
            let index = previousState.product.medications.indexOf(newDrugs)
            if (index !== -1) {
                return previousState;
            }
            previousState.product.medications.push(newDrugs);
            return previousState;
        });
    }

    componentWillMount() {
        let id = +this.props.match.params.id;
        if (id) {
            this.repo.getUserById(id)
                .then(curuser => {
                        this.setState({
                            id: curuser.user[0].id,
                            name: curuser.user[0].name,
                            email: curuser.user[0].email,
                            password: curuser.user[0].password,
                        })
                    }
                );
        }
    }


    delete=(name)=> {
        console.log("deleting["+name+"]");
        let newDrugList = this.state.allDrugs.filter(function( obj ) {
            return obj.name !== name;
        });
        this.setState({allDrugs:newDrugList});
    }

    renderUserPrescriptions=()=>{
       return(
           this.state.allDrugs.map((x, y) =>
               <div className="row">
                <DrugCard key={y} {...x} />

                    <button className="btn btn-secondary btn-lg disabled "
                            style={{ margin: "auto" }}
                            onClick={()=>this.delete(x.name)}>
                        Delete Prescription
                    </button>

            </div>
        )
        );
    }


    setPrescriptionRedirect = () => {
        this.setState({
            addPrescription: true
        })
    }


    renderPrescriptionRedirect = () => {
        if (this.state.addPrescription) {
            return <Redirect
                to={{
                    pathname:'/prescription',
                    state: {
                    id: this.state.id
                }
                }}
            />
        }
    }

    render() {
        var sampleUser = new User
                                (
                                    this.state.id,
                                    this.state.name,
                                    this.state.email,
                                    this.state.password,
                                    this.state.birthday,
                                    this.state.medications,
                                    this.state.profilePicUrl
                                );

        return (
            <>
                <NavBar id={this.props.match.params.id}/>
                <div className="DrugCard" style={{
                    fontFamily: "sans-serif",
                    textAlign: "center",
                    background: "whitesmoke",
                    marginBottom: "20px"
                }}>
                    <ProfileCard user={sampleUser}
                                 cardColor={"#9EC0FE"} />
                    {/*<h2 style={{ textAlign: "center"}}>*/}
                    {/*    {this.state.name}'s Prescription*/}
                    {/*</h2>*/}
                </div>
                <div className={"container"}>
                    <div className="text-center">
                        {this.renderPrescriptionRedirect()}
                        <h1 className={"display-6"}>Past Prescription</h1>
                        <p>Past Prescription goes here</p>

                        <ul className="list-group list-group-horizontal">
                            <li className="list-group-item">Past Prescription 1</li>
                            <li className="list-group-item">Past Prescription 2</li>
                            <li className="list-group-item">Past Prescription 3</li>
                        </ul>
                    </div>

                    <div className={"container text-center"}>
                        <h1 className={"display-6"}>Current Prescription</h1>
                        <br></br>
                        <button className="btn btn-primary btn-lg " onClick={() => this.setPrescriptionRedirect()}>Add New Prescription</button>
                    </div>
                    <div className="col"
                         style={{ columns: "1" }}>
                        {this.renderUserPrescriptions()}
                    </div>
                </div>

            </>
        );
    }
}
