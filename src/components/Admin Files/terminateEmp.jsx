import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';
import Joi from 'joi-browser';
import { toast } from "react-toastify";
import Forms from 'components/Common/form';
import { connect } from "react-redux";
import { Col } from 'reactstrap'
import get_termlist, { get_moretermlist } from '../../reduxstore/actions/terminateAction'


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
      const dd = await this.props.getterminatedlist.data;
      console.log(dd)
      await this.setState({ employees: dd, i: dd.skip || 1 });
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
    const { i } = this.state

    try {
      var skip = i * 2
      await this.setState({ i: this.state.i + 1 })

      await get_moretermlist(skip)
      const dd = await this.props.getterminatedlist.data;
      console.log(dd.data)
      this.setState({ employess: dd })
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
      }
      if (ex.response && ex.response.status === 400) {
        this.setState({ loadstatus: true, i: this.state.i - 1 })
      }
    }
  };
  render() {
    const { sortColumn, employees: data } = this.state;


    return <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
      className=" py-5 py-sm-1 ">
      <Sidebar />
      <Col lg="9" md="7" style={{ marginLeft: "16rem", paddingTop: "px", position: 'absolute', }}>

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
