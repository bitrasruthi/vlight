import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';
import Joi from 'joi-browser';
import { toast } from "react-toastify";
import Forms from 'components/Common/form';
import { connect } from "react-redux";
import { Col } from 'reactstrap'
import get_termlist, { get_moretermlist, saveskip } from '../../reduxstore/actions/terminateAction'


import TerminateEmpTable from './terminateEmpTable';


class TerminateEmp extends Forms {
  state = {
    data: {
      EmployeeId: "",
      Reason: '',
      AgreementDone: '',
    },
    errors: [],
    limit: 2,
    skip: 0,
    i: 0,
    loadstatus: false,

    employees: [],
    sortColumn: { path: "", order: "" },

  };

  schema = {
    EmployeeId: Joi.string().required(),
    Reason: Joi.string().required(),
    AgreementDone: Joi.string().required(),
  };

  async componentDidMount() {
    try {

      if (!this.props.getterminatedlist) {
        await get_termlist(this.state.skip);
        await this.setState({ i: this.state.i + 1 })
      }

      // const {data:movies} = await getMovies();
      const dd = await this.props.getterminatedlist;
      console.log(dd)
      await this.setState({ employees: dd.data, i: dd.skip || 1 });
      await this.setState({ isLoading: false });
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ isLoading: false });
        toast("no data")
      }
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };


  onloadmore = async () => {
    const { i, limit, employees } = this.state

    try {
      await this.setState({ loadstatus: true });
      var skip = i * limit
      await this.setState({ i: this.state.i + 1 })
      console.log(i)
      await get_moretermlist(skip, i)
      const dd = await this.props.getterminatedlist.data;
      if (dd.length === employees.length) {

      }
      await this.setState({ employess: dd })
      await this.setState({ loadstatus: false });

    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        await saveskip(this.state.i)
        toast.error(ex.response.data.data);
        await this.setState({ loadstatus: true })
      }
      if (ex.response && ex.response.status === 400) {
        await saveskip(this.state.i)
        await this.setState({ loadstatus: true })
      }
    }
  };
  render() {
    const { sortColumn, employees: data } = this.state;


    return <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
      className=" py-5 py-sm-1 ">
      <Sidebar />
      <Col lg="6" md="7" style={{ width: '565px', marginLeft: "rem", paddingTop: "px", position: 'absolute', }}>

        <TerminateEmpTable
          employees={data}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onload={this.onloadmore}
          disabled={this.state.loadstatus}
        />
      </Col>

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
