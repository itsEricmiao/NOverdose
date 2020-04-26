import React, { Component } from 'react';
import ProfileCard from "./profileCard";
import DrugCard from "./drugCard";
import NavBar from './navBar';
import user from './TempData/user';
import drugs from './TempData/drug';
import {NoverdoseRepo} from '../Api/NoverdoseRepo';
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
        profilePicUrl: 'https://quindry.com/wp-content/gallery/people/Philadelphia-business-headshot-36-Square.jpg'
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
                    console.log("MAINPAGE componentWillMount");
                    console.log(JSON.stringify(curuser));
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

    //     componentWillMount(){
    //     let id = +this.props.match.params.id;
    //         if (id) {
    //             this.repo.getUserById(id)
    //                 .then(curuser => {
    //                     this.setState({
    //                         id: curuser.user[0].id,
    //                     })
    //                 }
    //                 );
    //         }
            
    // }

        // if (id) {
        //     this.repo.getPrescriptionByUserID(id)
        //         .then(t => {
        //             console.log("GETTING Prescriptions");
        //             console.log(JSON.stringify(t));
        //         })
        //         .catch(
        //             console.error("Cannot get user prescription")
        //         );
        // }
    
    render() {
        var sampleUser = new User(this.state.id, this.state.name, this.state.email, this.state.password, this.state.birthday, this.state.medications, this.state.profilePicUrl);
        // console.log(JSON.stringify(sampleUser));
        var allDrugs = drugs;
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
                    <h2 style={{ textAlign: "center"}}>
                        {this.state.name}'s Prescription
                    </h2>
                </div>

                <div className="row text-align-center"
                    style={{
                        margin: "auto",
                        marginBottom: "20px"
                }}>
                    <button className="btn btn-primary" style={{"margin":"auto"}}>Add New Prescription</button>
                    <button className="btn btn-primary" style={{ "margin": "auto" }}>Delete Prescription</button>
                </div>
                
                    <div className="allCards container col"
                        style={{ columns: "2" }}>
                        {
                            allDrugs.map((x, y) => <DrugCard key={y}  {...x} />)
                        }
                </div>
               </>
        );
    }
}
