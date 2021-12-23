import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import LeaveTable from "./leavetable";
import Sidebar from "../Sidebar/Sidebar";
import get_leavelist, { get_moreleavelist } from "../../reduxstore/actions/leaveAction";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import {
  Button, Col

} from "reactstrap";
class LeaveList extends React.Component {
  state = {
    leaves: [],
    limit: 2,
    loadstatus: false,
    i: 0,
    skip: 0,
    searchQuery: "",
    sortColumn: { path: "", order: "" },
    isLoading: true,
    openModal: false,
    loading: false,

  };



  async componentDidMount() {
    try {

      if (!this.props.getleavelist) {
        await get_leavelist(this.state.skip);
        await this.setState({ i: this.state.i + 1 })
      }
      // const {data:movies} = await getMovies();
      // console.log(this.props.match.params.id);
      const dd = await this.props.getleavelist;
      // console.log(dd)
      await this.setState({ leaves: dd, i: dd.skip || 1 })

      this.setState({ isLoading: false });
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ isLoading: false });
        toast("no data")
      }
    }
  }

  onloadmore = async () => {
    const { i, limit } = this.state
    try {
      this.setState({ loadstatus: true })
      var skip = i * limit
      await this.setState({ i: this.state.i + 1 })

      await get_moreleavelist(skip)
      const dd = await this.props.getleavelist;
      await this.setState({ leaves: dd })
      await this.setState({ loadstatus: false });

    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
        await this.setState({ loadstatus: true, loading: true });


      }
      if (ex.response && ex.response.status === 400) {
        this.setState({ loadstatus: true, i: this.state.i - 1 })
        this.setState({ loadstatus: true })

      }
    }
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => this.setState({ sortColumn });



  approveLeave = {
    key: "approve",
    content: (leave) => (
      <button
        onClick={() => this.props.onApprove(leave)}
        className="btn btn-danger btn-sm"
      >
        Approve
      </button>
    ),
  };

  handleApprove = () => {
    this.approveLeave();
  };

  render() {
    const { sortColumn, leaves: data } = this.state;

    // if(count === 0)return <p>No movies available in the selected list</p>;

    return (

      <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
        className=" py-2 py-sm-3 ">
        <Sidebar />
        <h2 style={{ textAlign: 'center', marginLeft: '150px' }}>Employee Leave List</h2>

        <Col lg="9" md="9" style={{ marginLeft: "-2rem", paddingTop: "px", position: 'absolute' }}>

          <LeaveTable
            leaves={data}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onload={this.onloadmore}
            disabled={this.state.loadstatus}
            loading={this.state.loading}

          />
          {/* {this.renderLoadButton('More')} */}
          {/* <Button variant="contained" disabled={this.state.loadstatus} onClick={this.onloadmore} style={{
          zIndex: '1001', marginLeft: '180px'
        }}>
        Load more
      </Button> */}

        </Col>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getleavelist: state.getleavelist,
  };
};

export default connect(mapStateToProps)(LeaveList);
