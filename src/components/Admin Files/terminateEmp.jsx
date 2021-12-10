import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';
import Joi from 'joi-browser';
import { toast } from "react-toastify";
import Forms from 'components/Common/form';
import { connect } from "react-redux";
import get_termlist from '../../reduxstore/actions/terminateAction'


import TerminateEmpTable from './terminateEmpTable';


class TerminateEmp extends Forms {
  state = {
    data: {
      EmployeeId: "",
      Reason: '',
      AgreementDone: '',
    },
    errors: [],
    employees: [],
    sortColumn: { path: "", order: "" },

  };

  schema = {
    EmployeeId: Joi.string().required(),
    Reason: Joi.string().required(),
    AgreementDone: Joi.string().required(),
  };

  async componentDidMount() {
    if (!this.props.getterminatedlist) {
      await get_termlist();
      await this.setState({ i: this.state.i + 1 })
    }

    // const {data:movies} = await getMovies();
    const dd = await this.props.getterminatedlist.data;
    console.log(dd)
    await this.setState({ employees: dd, i: dd.skip || 1 });
    await this.setState({ isLoading: false });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  render() {
    const { sortColumn, employees: data } = this.state;


    return <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
      className=" py-5 py-sm-1 ">
      <Sidebar />
      <TerminateEmpTable
        employees={data}
        sortColumn={sortColumn}
        onSort={this.handleSort}

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
