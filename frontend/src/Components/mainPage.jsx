import React from 'react';
import ProfileCard from "./profileCard";
import DrugCard from "./drugCard";
import NavBar from './navBar';
import drugs from './TempData/drug';
import { NoverdoseRepo } from '../Api/NoverdoseRepo';
import { Redirect, Link} from 'react-router-dom';
import User from '../models/user';
import Drug from '../models/drug';
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
            specialist: 'Special',
            profilePicUrl: 'https://quindry.com/wp-content/gallery/people/Philadelphia-business-headshot-36-Square.jpg',
            addPrescription: false,
            allDrugs: drugs,
            pastPrescriptions: [],
            currentPrescriptions: [],
            goHome: false
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
                    let bday = rawBday.slice(0, 10);
                    console.log(JSON.stringify(curuser))
                        this.setState({
                            id: curuser.user[0].id,
                            name: curuser.user[0].name,
                            email: curuser.user[0].email,
                            birthday: bday,
                            specialist:job,
                            password: curuser.user[0].password,
                        })
                        this.updatePrescriptions();
                }
            );
        }
    }
    updatePrescriptions = () => {
        let id = this.state.id;
        console.log("userid = " + id);
        this.repo.getPrescription(id)
            .then(x => {
                console.log(JSON.stringify(x.data));
                let len = x.data.length;
                let cPrescriptions = [];
                let pPrescriptions = [];
                for(let i = 0; i < len; i++)
                {
                    console.log(JSON.stringify(x.data[i]));
                    if (x.data[i].oldPrescription == 0) {
                        let curPrescription = new Drug(
                            x.data[i].prescriptionID,
                            x.data[i].name,
                            x.data[i].price,
                            x.data[i].DrugDescription,
                            x.data[i].SideEffectDescription,
                            x.data[i].pharmacy)
                        cPrescriptions.push(curPrescription);
                    } else if (x.data[i].oldPrescription == 1) {
                        let curPrescription = new Drug(
                            x.data[i].prescriptionID,
                            x.data[i].name,
                            x.data[i].price,
                            x.data[i].DrugDescription,
                            x.data[i].SideEffectDescription,
                            x.data[i].pharmacy)
                        pPrescriptions.push(curPrescription);
                    }
                }
                this.setState({pastPrescriptions: pPrescriptions});
                this.setState({ currentPrescriptions: cPrescriptions });
                console.log(this.state.pastPrescriptions);
            }).catch(x=>{
            alert(x);
        })
    }
    delete=(name, id)=> {
        console.log("deleting[" + name + "]");
        console.log("deleting[" + id + "]");
        // let list = this.state.pastPrescriptions.concat(name);
        // this.setState({pastPrescriptions: list})
        // let newDrugList = this.state.currentPrescriptions.filter(function( obj ){
        //     return obj.name !== name;
        // });
        // this.setState({ currentPrescriptions: newDrugList });
        this.repo.updatePrescriptionByID(id);
        this.setState({goHome: true});
        //this.setGoHomeRedirect();
        //this.renderHome();
    }
    renderUserPrescriptions=()=>{
        return(
            this.state.currentPrescriptions.map((x, y) =>
                <div className="row">
                    <DrugCard key={y} {...x} />
                    <button className="btn btn-secondary btn-lg disabled "
                        style={{ margin: "auto" }}
                        onClick={
                            () => this.delete(x.name, x.drugId)
                        }>
                        Delete Prescription
                    </button>
                    {this.state.goHome == true && window.location.reload()}
                </div>
            )
        );
    }
    setPrescriptionRedirect = () => {
        this.setState({
            addPrescription: true
        })
    }
    setGoHomeRedirect = () => {
        console.log("Inside setGoHomeRedirect")
        this.setState({
            goHome: true
        })
    }
    renderPrescriptionRedirect = () => {
        let newPath = '/search/' + this.state.id;
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
    renderHome = () => {
        console.log(this.state.id)
        let newPath = '/dashboard/' + this.state.id;
        if (this.state.goHome) {
            return <Link
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
                            {this.state.pastPrescriptions.map((item, i) =><li className="list-group-item list-group-item-light" key={i}>{item.name}</li>)}
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