import React from "react";
import { Redirect } from "react-router-dom";
// import 'font-awesome/css/font-awesome.min.css';
import paginate from "../Common/paginate";
import Pagination from "../Common/pagination";
import _ from "lodash";
import auth from "../../services/authService";
import { connect } from "react-redux";
import get_employeelist from "../../reduxstore/actions/employeeAction";
import EmployeeTable from "./emplisttable";
import Sidebar from "../Sidebar/Sidebar";
import NavBar from "components/Common/navbar";
import Paginations from './../Common/pagination';

class Employees extends React.Component {
  constructor(props){
      super(props);
  
  this.state = {
      employees: [],
      currentPage:1,
      pageSize: 4,
      searchQuery:"",
      sortColumn: {path: 'EmployeeName', order: 'asc'},
      isLoading: true        
  };
}

handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };


async componentDidMount(){
  if(!this.props.getemployeelist){
         const tt = await get_employeelist();
         console.log(tt);
      }        
      // const {data:movies} = await getMovies();
      const dd = await this.props.getemployeelist;
      // console.log(dd);
      await this.setState({employees:dd});
      this.setState({isLoading: false});
      
  }

  handleSort = sortColumn =>
      this.setState({sortColumn});



  getPagedData = () =>{
      const {pageSize, currentPage, searchQuery, sortColumn, employees: allEmployees} = this.state;

      let filtered = allEmployees;
      if(searchQuery)
          filtered =allEmployees.filter(m=>m.title.toString().toLowerCase().startsWith(searchQuery.toLowerCase()));
      const sorted =_.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
      const employees = paginate(sorted, currentPage, pageSize);
      return {totalCount: filtered.length, data:employees};
  };    



  render() { 
      const {length: count} = this.state.employees;
      const {pageSize, currentPage,  sortColumn, employees: allEmployees} = this.state;

      // if(count === 0)return <p>No movies available in the selected list</p>;
      const {totalCount, data} = this.getPagedData();


      return(
                  
          <div className="row">

          {/* <table >
          <TableHeader/>
                  {this.state.isLoading ? <Loader type="Bars" 
                                                  timeout={1000}  />
              : <TableBody/>}
     </table> */}
    <Sidebar/>
      <EmployeeTable                         
                   employees={data}                     
                   sortColumn={sortColumn} 
                   onSort={this.handleSort}/>
      <Paginations/>
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
      getemployeelist: state.getemployeelist,
  };
};

export default connect(mapStateToProps)(Employees);