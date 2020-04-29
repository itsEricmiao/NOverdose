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
            birthday: '',
            medications: [ "MEDICATIONS1", "MEDICATIONS2", "MEDICATIONS3"],
            specialist: 'Special',
            profilePicUrl: 'https://quindry.com/wp-content/gallery/people/Philadelphia-business-headshot-36-Square.jpg',
            addPrescription: false,
            allDrugs: drugs,
            pastPrescriptions: []
        };
    }


    componentWillMount() {
        let id = +this.props.match.params.id;
        if (id) {
            this.repo.getUserById(id)
                .then(curuser => {
                        let rawBday = curuser.user[0].dob;
                        if (rawBday == null){
                            rawBday = "0000-00-00";
                        }

                        let userType = curuser.user[0].specialist;
                        var job = "Normal User";
                        if(userType == 1){
                            job = "Medical Specialist"
                        }
                        let bday = rawBday.slice(0,10);
                        this.setState({
                            id: curuser.user[0].id,
                            name: curuser.user[0].name,
                            email: curuser.user[0].email,
                            birthday: bday,
                            specialist:job,
                            password: curuser.user[0].password,
                        })
                    }
                );
        }
    }


    delete=(name)=> {
        console.log("deleting["+name+"]");
        let list = this.state.pastPrescriptions.concat(name);
        this.setState({pastPrescriptions: list})
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
        let newPath = '/prescription/' + this.state.id;
        if (this.state.addPrescription) {
            return <Redirect
                to={{
                    pathname: newPath,
                    state: {
                        id: this.state.id
                    }
                }}
            />
        }
    }

    ifShowMessage = () =>{
        if (this.state.pastPrescriptions == ''){
            return (<p>You don't have any past prescription</p>)
        }else{
            let num = this.state.pastPrescriptions.length
            return (<p>Here are {num} past prescriptions you had </p>)
        }
    }


    showButtonBasedOnSpecialist=()=>{
        console.log(this.state.specialist);
        if (this.state.specialist == "Medical Specialist"){
            return (<button className="btn btn-primary btn-lg " onClick={() => this.setPrescriptionRedirect()}>Search Prescription</button>
            )
        }else{
            return (<button className="btn btn-primary btn-lg " onClick={() => this.setPrescriptionRedirect()}>Add New Prescription</button>
            )
        }
    }

    createUser = () => {
        var sampleUser = new User
        (
            this.state.id,
            this.state.name,
            this.state.email,
            this.state.password,
            this.state.birthday,
            this.state.specialist,
            this.state.profilePicUrl
        );
        return sampleUser
    }

    render() {


        return (
            <>
                <NavBar id={this.props.match.params.id}/>
                <div className="DrugCard" style={{
                    fontFamily: "sans-serif",
                    textAlign: "center",
                    background: "whitesmoke",
                    marginBottom: "20px"
                }}>
                    <ProfileCard user={this.createUser()}
                                 cardColor={"#9EC0FE"} />
                </div>
                <div className={"container"}>
                    <div className="text-center">
                        {this.renderPrescriptionRedirect()}
                        <h1 className={"display-6"}>Past Prescription</h1>
                        {this.ifShowMessage()}
                        <ul className="list-group list-group-horizontal">
                            {this.state.pastPrescriptions.map((item,i) => <li className="list-group-item list-group-item-light" key={i}>{item}</li>)}
                        </ul>
                    </div>

                    <div className={"container text-center"}>
                        <h1 className={"display-6"}>Current Prescription</h1>
                        <br></br>
                        {this.showButtonBasedOnSpecialist()}
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
