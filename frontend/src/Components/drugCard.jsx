import React, { useReducer } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import "./drugCard.css";

function ExtraContentAccordionClosed({ onClick }) {
  return (
    <Card.Content extra>
      <Button basic circular icon size="tiny" onClick={onClick}>
        <Icon name="plus circle" />
      </Button>
      Show Side Effect
    </Card.Content>
  );
}

function ExtraContentAccordionOpened({ content, onClick }) {
  return (
    <>
      <Card.Content extra>{content}</Card.Content>
      <Card.Content extra>
        <Button basic circular icon size="tiny" onClick={onClick}>
          <Icon name="minus circle" />
        </Button>
        Show Less
      </Card.Content>
    </>
  );
}
function ExtraContentAccordion({ open, content, onToggle }) {
  return open === true ? (
    <ExtraContentAccordionOpened content={content} onClick={onToggle} />
  ) : (
    <ExtraContentAccordionClosed onClick={onToggle} />
  );
}
function cardStateReducer(state, { type, payload }) {
  if (type === "TOGGLE") {
    var index = payload.card;
    var value = state[index];
    return [
      ...state.slice(0, index),
      !value,
      ...state.slice(index + 1, Infinity)
    ];
  }
  return state;
}
export default function DrugCard(drug) {
  const [state, dispatch] = useReducer(cardStateReducer, [false]);
  function toggleCard(card) {
    return function() {
      dispatch({ type: "TOGGLE", payload: { card } });
    };
  }
    return (
        <div className="DrugCard" style={{padding: "20px",margin: "20px"}}>
        <Card fluid color="blue" style={{ height: "100%"}}>
                    <Card.Content header={drug.name} textAlign="center" />
                    <Card.Content header={drug.price} textAlign="center" />
                    <Card.Content description={drug.description} />
                    <Card.Content description={drug.pharmacy} />
          <ExtraContentAccordion
            content={drug.sideEffect}
            onToggle={toggleCard(0)}
            open={state[0]}
          />
        </Card>
        </div>
  );
}
