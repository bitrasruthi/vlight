import React from "react";
import Table from "../Common/table";
import { Link } from "react-router-dom";
// import { Spinner } from '../spinner';
import DeleteEmp from './deleteEmp';
import { Modal } from 'react-responsive-modal';


class EmployeeTable extends React.Component {
  state = { showPopup: false,
    leave:{},
    data:{},
    openModal : false,
    leaveid: '',
   }

   onClickButton = e =>{
    // e.preventDefault()
    this.setState({openModal : true})
    console.log(e.EmployeeId);
    this.setState({data:e})
    this.setState({leaveid: e.EmployeeId})
    // const dd = this.props.match.params.id 
    // console.log(this);
}
  onCloseModal = ()=>{
    this.setState({openModal : false})
}



  columns = [
    
    {
      path: "EmployeeId",
      label: "Employee Id",

      // content: (emp) => (
      //   <Link to={`/empattlist/${emp.EmployeeId}`}> {emp.EmployeeId}</Link>
      // ),
    },
    
    { path: "EmployeeName", label: "Name" },
    { path: "Email", label: "Email" },
    { path: "Phone", label: "Phone" },
    { path: "Role", label: "Role" },
    { path: "NetSalary", label: "NetSalary" },
    {
      key: " Delete",
      label: 'Actions',
      content: (emp) => (
        <button className="btn bg-pink btn-sm" onClick={()=> this.onClickButton (emp)} >
          <Link style={{ color: 'white' }} to={`/emplist/${emp.EmployeeId}`}>
             Terminate</Link></button>
      ),
    }
  ];

  render() {
    const { employees, onSort, sortColumn, onload, disabled } = this.props;

    return (
      <div>
      <Table
        columns={this.columns}
        data={employees}
        sortColumn={sortColumn}
        onSort={onSort}
        onload={onload}
        disabled={disabled}
      // LoadingComponent={Spinner}
      />
      <Modal open={this.state.openModal} onClose={this.onCloseModal}>
      <DeleteEmp
      leaveid={this.state.leaveid}
      data={this.state.data}/>
     
  </Modal>
  </div>
    );
  }
}

export default EmployeeTable;
