import React from "react";
import paginate  from "../Common/paginate";
import _ from "lodash";
import { connect } from "react-redux";
import LeaveTable from "./leavetable";
import Sidebar from "../Sidebar/Sidebar";
import get_leavelist from "../../reduxstore/actions/leaveAction";
import Paginations from './../Common/pagination';

class LeaveList extends React.Component {
  constructor(props){
      super(props);
  
  this.state = {
      leaves: [],
      currentPage:1,
      pageSize: 4,
      searchQuery:"",
      sortColumn: {path: 'Leave', order: 'asc'},
      isLoading: true        
  };
}



async componentDidMount(){
  if(!this.props.getleavelist){
         const tt = await get_leavelist();
         console.log(tt);
      }        
      // const {data:movies} = await getMovies();
      const dd = await this.props.getleavelist;
      // console.log(dd);
      await this.setState({leaves:dd});
      this.setState({isLoading: false});
      
  }

  handlePageChange = page =>{
      this.setState ({currentPage: page});        
  };


  handleSort = sortColumn =>
      this.setState({sortColumn});



  getPagedData = () =>{
      const {pageSize, currentPage, searchQuery, sortColumn, leaves: allLeaves} = this.state;

      let filtered = allLeaves;
    //   if(searchQuery)
    //       filtered =allLeaves.filter(m=>m.title.toString().toLowerCase().startsWith(searchQuery.toLowerCase()));
      const sorted =_.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
      const leaves = paginate(sorted, currentPage, pageSize);
      return {totalCount: filtered.length, data:leaves};
  };    

  approveLeave = 
  {key: 'approve', content:leave =><button onClick={() => this.props.onApprove(leave)}
  className="btn btn-danger btn-sm">Approve</button>};

  handleApprove = () =>{
      this.approveLeave();
  }


  render() { 
      const {length: count} = this.state.leaves;
      const {pageSize, currentPage,  sortColumn, leaves: allLeaves} = this.state;

      // if(count === 0)return <p>No movies available in the selected list</p>;
      const {totalCount, data} = this.getPagedData();


      return(
                  
          <div className="row">
    <Sidebar/>     
      <LeaveTable                         
                   leaves={data}                     
                   sortColumn={sortColumn} 
                   onSort={this.handleSort}/>                             
      
      <Paginations itemsCount={totalCount} 
                  pageSize={pageSize} 
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}/>
      </div>
     
      );
  }
}

const mapStateToProps = state =>{
  return{
      getleavelist: state.getleavelist,
  };
};

export default connect(mapStateToProps)(LeaveList);