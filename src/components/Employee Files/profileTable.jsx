import React from "react";
import Table from "../Common/table";

import ESidebar from './../Sidebar/eSidebar';

class ProfileTable extends React.Component {
  columns = [
    { path: "FirstName", label: "First name" },
    { path: "MiddleName", label: "Middle name" },
    { path: "LastName", label: "Last name" },
    { path: "Address", label: "Address" },
    { path: "City", label: "City" },
    { path: "Country", label: "Country" },
    { path: "Pincode", label: "Pincode" },
    { path: "AboutMe", label: "About me" },
    { path: "EducationDetails", label: "Education details" },
  ];

  state = {
    isLoading: null,
  };
  componentDidMount() {
    this.setState({ isLoading: false });
  }

  constructor() {
    super();
    this.state = { isLoading: true };
  }

  render() {
    const { leaves, sortColumn, onSort } = this.props;
    return (
      <div>
        <ESidebar />
        <Table
          columns={this.columns}
          data={leaves}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default ProfileTable;
