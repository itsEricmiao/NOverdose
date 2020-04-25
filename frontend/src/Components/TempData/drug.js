import {Drug} from '../../models/drug';
var drugs = [
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
    ),
    {
      id: "003",
      name: "Vitamin B",
      price: "$120",
      description: "Vitamin A helps your body absorb calcium. Calcium is one of the main building blocks of bone. A lack of vitamin D can lead to bone diseases such as osteoporosis or rickets. Vitamin D also has a role in your nerve, muscle, and immune systems. You can get vitamin D in three ways: through your skin (from sunlight), from your diet, and from supplements. Your body forms vitamin D naturally after exposure to sunlight. However, too much sun exposure can lead to skin aging and skin cancer.",
      sideEffect: "Side effect goes here",
      pharmacy: "phamarcy goes here"
    },
    {
      id: "005",
      name: "Vitamin X",
      price: "$120",
      description: "Vitamin A helps your body absorb calcium. Calcium is one of the main building blocks of bone. A lack of vitamin D can lead to bone diseases such as osteoporosis or rickets. Vitamin D also has a role in your nerve, muscle, and immune systems. You can get vitamin D in three ways: through your skin (from sunlight), from your diet, and from supplements. Your body forms vitamin D naturally after exposure to sunlight. However, too much sun exposure can lead to skin aging and skin cancer.",
      sideEffect: "Side effect goes here",
      pharmacy: "Phamarcy goes here"
    }
];
  
export default drugs;