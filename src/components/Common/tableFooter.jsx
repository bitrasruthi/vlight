import React from "react";
import _ from "lodash";
// import ReactLoading from "react-loading";
import { Button } from 'reactstrap';
import { Row } from 'reactstrap';
import { Col } from 'reactstrap';


class TableFooter extends React.Component {
  state = {
    isLoading: true,
  };




  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createkey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  constructor() {
    super();
    this.state = { isLoading: true };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  renderLoadButton(disabled, onload, loading) {

    // const notify = () => toast("Login Successful");
    if (!disabled) {
      return (
        <Button className="bg-gradient-pink" variant="contained" onClick={onload} style={{
          zIndex: '', marginLeft: '0px', border: 'none'
        }}>
          more
        </Button>
      );
    }

    else if (!loading) return <h2 style={{ color: '#F3A4B4' }}>Loading...</h2>;
    else return <h2 style={{ color: '#F3A4B4' }}>No More Data</h2>

  }

  render() {
    const { onload, disabled, loading } = this.props;
    return (
      <>
        <tfoot className="table-responsive" >

          {this.renderLoadButton(disabled, onload, loading)}


        </tfoot>

      </>
    );
  }
}

export default TableFooter;
