import React from "react";
import "./Message.css";
const Message = () => {
  return (
    <div className="messages-list-container">
      <li className="list">
        <div className="message-box">
          <div className="indicator"></div>
          <p className="ratings">10</p>
          <p className="message">Very fast and easy to use.</p>
        </div>
        <div className="date-box">
          <p>Created:02/23/2022</p>
        </div>
      </li>

      <li className="list">
        <div className="message-box">
          <div className="indicator"></div>
          <p className="ratings">10</p>
          <p className="message">Very fast and easy to use.</p>
        </div>
        <div className="date-box">
          <p>Created:02/23/2022</p>
        </div>
      </li>
    </div>
  );
};

export default Message;
