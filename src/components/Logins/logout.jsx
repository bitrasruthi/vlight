import React from "react";
import auth from "../../services/authService";
import { toast } from "react-toastify";

class Logout extends React.Component {
  async componentDidMount() {
    const dd = auth.logout();
    if (!dd) toast("Logout successfull");
    setTimeout(() => {
      window.location = "/";
    }, 1000);
  }
  render() {

    return <div> 

    </div>;
  }
}

export default Logout;
