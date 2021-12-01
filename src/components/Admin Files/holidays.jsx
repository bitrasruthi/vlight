import Sidebar from "components/Sidebar/Sidebar";
import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";

class Holidays extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
        <div style={{ textAlign: "center" }}>Holiday List</div>
      </div>
    );
  }
}

export default Holidays;
