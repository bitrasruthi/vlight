import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';
import  Joi from 'joi-browser';
import { toast } from "react-toastify";
import Forms from 'components/Common/form';
import { connect } from "react-redux";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    FormGroup,
    Form,
    UncontrolledCollapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
  } from "reactstrap";
import { terminateEmp } from 'services/terminateService';
import TerminateEmpTable from './terminateEmpTable';
import {getTerminateEmpDetails} from 'services/terminateService';


class TerminateEmp extends Forms {
    state = {
        // data: {
        //   EmployeeId: "",
        //  Reason: '',
        //  AgreementDone: '',
        // },
        errors: [],
        employees: []
      };
    
    //   schema = {
    //     EmployeeId: Joi.string().required(),
    //     Reason: Joi.string().required(),
    //     AgreementDone: Joi.string().required(),
    //   };

    // async componentDidMount() {
    //     if (!this.props.getemployeelist) {
    //       await get_employeelist(this.state.skip);
    //       await this.setState({ i: this.state.i + 1 })
    //     }
      
    //     // const {data:movies} = await getMovies();
    //     const dd = await this.props.getemployeelist.data;
    //     await this.setState({ employees: dd, i: dd.skip || 1 });
    //     await this.setState({ isLoading: false });
    //   }

    render() { 
        const {sortColumn, employees: data} = this.state;


        return <div  style = {{height: '', position: "absolute", left: '0', width: '100%',}} 
        className=" py-5 py-sm-1 ">
            <Sidebar/>
            <TerminateEmpTable
          employees={data}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        // onDelete={this.handleDelete}
        />
          
                   </div>;
    }
}
 
// export default TerminateEmp;
const mapStateToProps = (state) => {
    return {
      getterminatedlist: state.getterminatedlist,
    };
  };
  
  export default connect(mapStateToProps)(TerminateEmp);
  