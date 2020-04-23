import React, { Component } from 'react';
import './App.css';
import { ProfileCard } from "./Componets/profileCard";
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { ROUTES } from './routes';
import DrugCard from './Componets/DrugCard';
import './Componets/semantic-ui-css/semantic.min.css';
import { User } from './Models/User';
import { Drug } from './Models/Drug';
class App extends Component {
  render() {
    var user = {
      name: "Sample User",
      birthday: "01-01-2001",
      medications: ["Vitamin D", "Vitamin C", "Vitamin B"],
      profilePicUrl: "https://image.shutterstock.com/image-photo/closeup-face-headshot-pug-dog-260nw-250466800.jpg"
    };

    var sampleUser = new User(
      "John Smith",
      "01-05-1995",
      ["Vitamin D", "Vitamin C", "Vitamin B"],
      "https://quindry.com/wp-content/gallery/people/Philadelphia-business-headshot-36-Square.jpg"
    );
    
    var allDrugs = [
      new Drug(
        "001",
        "Vitamin D",
        "$100",
        "Vitamin D helps your body absorb calcium. Calcium is one of the main building blocks of bone. A lack of vitamin D can lead to bone diseases such as osteoporosis or rickets. Vitamin D also has a role in your nerve, muscle, and immune systems. You can get vitamin D in three ways: through your skin (from sunlight), from your diet, and from supplements. Your body forms vitamin D naturally after exposure to sunlight. However, too much sun exposure can lead to skin aging and skin cancer.",
        "Side effect goes here",
        "phamarcy goes here"
      ),
      new Drug(
        "002",
        "Vitamin C",
        "$110",
        "Vitamin C helps your body absorb calcium. Calcium is one of the main building blocks of bone. A lack of vitamin D can lead to bone diseases such as osteoporosis or rickets. Vitamin D also has a role in your nerve, muscle, and immune systems. You can get vitamin D in three ways: through your skin (from sunlight), from your diet, and from supplements. Your body forms vitamin D naturally after exposure to sunlight. However, too much sun exposure can lead to skin aging and skin cancer.",
        "Side effect goes here",
        "phamarcy goes here"
      )
    ];
    
    var drugs = [{
      id: "001",
      name: "Vitamin D",
      price: "$100",
      description:"Vitamin D helps your body absorb calcium. Calcium is one of the main building blocks of bone. A lack of vitamin D can lead to bone diseases such as osteoporosis or rickets. Vitamin D also has a role in your nerve, muscle, and immune systems. You can get vitamin D in three ways: through your skin (from sunlight), from your diet, and from supplements. Your body forms vitamin D naturally after exposure to sunlight. However, too much sun exposure can lead to skin aging and skin cancer.",
      sideEffect: "Side effect goes here",
      pharmacy: "phamarcy goes here"
    },
    {
      id: "002",
      name: "Vitamin C",
      price: "$120",
      description:"Vitamin A helps your body absorb calcium. Calcium is one of the main building blocks of bone. A lack of vitamin D can lead to bone diseases such as osteoporosis or rickets. Vitamin D also has a role in your nerve, muscle, and immune systems. You can get vitamin D in three ways: through your skin (from sunlight), from your diet, and from supplements. Your body forms vitamin D naturally after exposure to sunlight. However, too much sun exposure can lead to skin aging and skin cancer.",
      sideEffect: "Side effect goes here",
      pharmacy: "phamarcy goes here"
      },
      {
        id: "003",
        name: "Vitamin B",
        price: "$120",
        description:"Vitamin A helps your body absorb calcium. Calcium is one of the main building blocks of bone. A lack of vitamin D can lead to bone diseases such as osteoporosis or rickets. Vitamin D also has a role in your nerve, muscle, and immune systems. You can get vitamin D in three ways: through your skin (from sunlight), from your diet, and from supplements. Your body forms vitamin D naturally after exposure to sunlight. However, too much sun exposure can lead to skin aging and skin cancer.",
        sideEffect: "Side effect goes here",
        pharmacy: "phamarcy goes here"
      },
      {
        id: "005",
        name: "Vitamin X",
        price: "$120",
        description:"Vitamin A helps your body absorb calcium. Calcium is one of the main building blocks of bone. A lack of vitamin D can lead to bone diseases such as osteoporosis or rickets. Vitamin D also has a role in your nerve, muscle, and immune systems. You can get vitamin D in three ways: through your skin (from sunlight), from your diet, and from supplements. Your body forms vitamin D naturally after exposure to sunlight. However, too much sun exposure can lead to skin aging and skin cancer.",
        sideEffect: "Side effect goes here",
        pharmacy: "Phamarcy goes here"
      }
      ];
    return (
      <>
        {/* <Router>
          <Switch>
            { ROUTES.map((route, index) => <Route key={index} { ...route } />) }
          </Switch>
        </Router> */}
        
        
        <div className="DrugCard" style={{"font-family": "sans-serif", "text-align": "center", "background": "whitesmoke"}}>
          <ProfileCard user={sampleUser} cardColor={"#9EC0FE"} />
          <h1 style={{"textAlign":"center"}}>{sampleUser.name}'s Prescription</h1>
          <div className="allCards" style={{ "columns": "2" }}>
            {allDrugs.map((x, y) => <DrugCard key={y}  {...x} />)}
          </div>
        </div>
      </>
    );
  }
}

export default App;