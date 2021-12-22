import React from "react";
import _ from "lodash";
// import ReactLoading from "react-loading";
import { Button } from 'reactstrap';
import { Row } from 'reactstrap';
import { Col } from 'reactstrap';


class TableBody extends React.Component {
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

  // renderLoadButton(disabled, onload) {

  //   // const notify = () => toast("Login Successful");
  //   if (!disabled) {
  //     return (
  //       <Row>
  //         <div style={{ marginLeft: '200px' }}>
  //           <Button variant="contained" onClick={onload} style={{
  //             zIndex: '1001', marginLeft: '0px',
  //           }}>
  //             more
  //           </Button>
  //         </div>
  //       </Row>

  //     );
  //   }

  //   return (
  //     <Row>
  //       <div style={{ marginLeft: '200px' }}>
  //         <h1 variant="contained" style={{
  //           zIndex: '1001', marginLeft: '0px',
  //         }}>
  //           No Data
  //         </h1>
  //       </div>
  //     </Row>
  //   );
  // }

  render() {
    const { data, columns, onload, disabled } = this.props;
    return (
      <>
        <tbody style={{ zIndex: "1001" }}>

          {data.map((item) => (
            <tr key={item._id}>
              {columns.map((column) => (
                <td style={{ textAlign: 'center', fontSize: '15px' }} key={this.createkey(item, column)}>
                  {this.renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
          {/* <Button variant="contained" disabled={disabled} onClick={onload} style={{
          zIndex: '1001', marginLeft: 'auto',
        }}>
        More
      </Button> */}

        </tbody>

      </>
    );
  }
}

export default TableBody;
