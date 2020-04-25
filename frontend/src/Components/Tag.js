import React from "react";

export default function Tag({ style, ...restProps }) {
  return (
    <span
      style={{
        backgroundColor: "#DDD",
        borderRadius: "3px",
        padding: "3px 5px",
        fontSize: "0.8em",
        ...style
      }}
      {...restProps}
    />
  );
}