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
        loading ? <Row>
          <div style={{ marginLeft: '200px' }}>
            <h1 variant="contained" style={{
              zIndex: '1001', marginLeft: '0px',
            }}>
              loading..
            </h1>
          </div>
        </Row> :
          <Button className="bg-gradient-pink" variant="contained" onClick={onload} style={{
            zIndex: '', marginLeft: '0px', border: 'none'
          }}>
            more
          </Button>


      );
    }

    return (
      loading ?
        <div style={{ marginLeft: '200px' }}>
          <h1 variant="contained" style={{
            zIndex: '1001', marginLeft: '0px',
          }}>
            No Data
          </h1>
        </div>
      :
          <div style={{ marginLeft: '200px' }}>
            <h1 variant="contained" style={{
              zIndex: '1001', marginLeft: '0px',
            }}>
              Loading..
            </h1>
          </div>
    );
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
