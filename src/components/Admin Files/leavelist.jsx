import React from "react";
import paginate from "../Common/paginate";
import _ from "lodash";
import { connect } from "react-redux";
import LeaveTable from "./leavetable";
import Sidebar from "../Sidebar/Sidebar";
import get_leavelist, { get_moreleavelist } from "../../reduxstore/actions/leaveAction";
import Paginations from "./../Common/pagination";
import ReactLoading from "react-loading";
import  {leavestatus}  from "../../services/leaveService";
import { toast } from "react-toastify";
import Popup from "./popUp";
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
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "Leave", order: "asc" },
    isLoading: true,
   showPopup: false
  };

  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  onReject = async () => {
    try {
      var leave = { ...this.state.leave };
      leave.status = "Rejected";
      await this.setState({ leave });
      console.log(leave);
      await leavestatus({ _id: leave._id, status: leave.status });
      // window.location = "/leavelist";
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
      }
    }
  };
  onApprove = async () => {
    try {
      var leave = { ...this.state.leave };
      leave.status = "Approved";
      await this.setState({ leave });
      // console.log(leave._id);
      await leavestatus({ _id: leave._id, status: leave.status });
      // window.location = "/leavelist";
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
      }
    }
  };


  async componentDidMount() {
    try {

      if (!this.props.getleavelist) {
        await get_leavelist();
      }
      // const {data:movies} = await getMovies();
      const leavelist = await this.props.getleavelist;
      let leaveid = this.props.match.params.id;
      let leave = leavelist.find((obj) => obj._id === leaveid);
  
      await this.setState({ leave });
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
      var skip = i * limit
      await this.setState({ i: this.state.i + 1 })

      await get_moreleavelist(skip)
      const dd = await this.props.getleavelist;
      await this.setState({ leaves: dd })

      // if (!dd.length < limit) {
      //   this.setState({ loadstatus: true })

      // }
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.data);
      }
      if (ex.response && ex.response.status === 400) {
        this.setState({ loadstatus: true, i: this.state.i - 1 })
      }

    }
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => this.setState({ sortColumn });

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      searchQuery,
      sortColumn,
      leaves: allLeaves,
    } = this.state;

    let filtered = allLeaves;
    //   if(searchQuery)
    //       filtered =allLeaves.filter(m=>m.title.toString().toLowerCase().startsWith(searchQuery.toLowerCase()));
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const leaves = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: leaves };
  };

 

  render() {
    // const { length: count } = this.state.leaves;
    const { pageSize, currentPage, sortColumn, leaves: allLeaves } = this.state;

    // if(count === 0)return <p>No movies available in the selected list</p>;
    const { totalCount, data } = this.getPagedData();

    return (
      

      <div style = {{height: '', position: "absolute", left: '0', width: '100%', }} 
      className=" py-2 py-sm-3 "> 
      <Sidebar />
      
      <div className='app'>
          <button onClick={this.togglePopup.bind(this)}>show popup</button>
          {this.state.showPopup ? 
            <Popup
              text='Close Me'
              closePopup={this.togglePopup.bind(this)}
            />
            
            : null
          }
        </div>

      <Col lg="9" md="7" style={{ marginLeft: "4rem", paddingTop: "px", position: 'absolute', }}>

        <LeaveTable
          leaves={data}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
        {/* <Button variant="contained" disabled={this.state.loadstatus} onClick={this.onloadmore} style={{
          zIndex: '1001', marginLeft: '180px'
        }}>
          Load more
        </Button> */}
        {this.state.isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
              height: "100vh",
            }}
          >
            <ReactLoading
              type="bars"
              color="#aaaa"
              height={"10%"}
              width={"10%"}
            />
          </div>
        ) : (
          ""
        )}
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
