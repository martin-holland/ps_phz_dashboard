import React, { useEffect } from "react";
import "./Message.css";
const Message = ({ result }) => {
  const colorChange = (rating) => {
    if (rating > 0 && rating <= 6) {
      return "coral";
    } else if (rating > 6 && rating <= 8) {
      return "greenish-blue";
    } else {
      return "blue";
    }
  };

  useEffect(() => {}, [result]);

  return (
    <div className="messages-list-container">
      <li className="list">
        <div className="message-box" id="messageBox">
          <div className={`indicator ${colorChange(result.choice)}`}></div>
          <p className="ratings">{result.choice}</p>
          <p className="message">
            {result.message ? result.message : "No message"}
          </p>
        </div>
        <div className="date-box">
          <p>{new Date(result.createdAt).toLocaleString().slice(0, 10)}</p>
        </div>
      </li>
    </div>
  );
};

export default Message;
