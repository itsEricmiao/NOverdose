import React from "react";
import Tag from "./Tag";
import "./profileCard.css";
export class profileCard extends React.Component{
  render() {
    var cardColor = "#9EC0FE";
    return (
      <>
        <div
          style={{
            borderRadius: "5px",
            boxSizing: "border-box",
            boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0)",
            display: "flex",
            flexDirection: "column",
            height: "200px"
          }}
        >
          <div
            style={{
              backgroundColor: "#9EC0FE",
              borderTopLeftRadius: "inherit",
              borderTopRightRadius: "inherit",
              flex: "100 0 0"
            }}
          />

          <div
            style={{
              flex: "6 1 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative"
            }}
          >
            <img
              src={this.props.user.profilePicUrl}
              alt="Profile Pic"
              style={{
                border: "4px solid #FFF",
                borderRadius: "50%",
                boxShadow: `0px 0px 10px 1px ${cardColor}`,
                position: "absolute",
                top: "-40px",
                Button: "50px",
                width: "100px"
              }}
            />

            <h1 style={{ fontSize: "0.8em", margin: "40px 0 10px 0" }}>
              {this.props.user.name}
            </h1>
            <h3 style={{ fontSize: "0.5em", margin: "0px 0 10px 0" }}>
              {this.props.user.birthday}
            </h3>

            <div
              style={{
                flexGrow: 1,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              {this.props.user.medications.map(s => (
                <Tag
                  style={{
                    backgroundColor: "#9EC0FE",
                    marginRight: "5px"
                  }}
                >
                  {s}
                </Tag>
              ))}
            </div>
          </div>

          <div
            style={{
              flex: "1 1 0",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "20px"
            }}
          />
        </div>
      </>
    );
  }
}
