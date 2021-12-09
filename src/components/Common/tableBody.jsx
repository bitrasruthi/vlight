import React from "react";
import _ from "lodash";
// import ReactLoading from "react-loading";
import { Button } from 'reactstrap';


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

  renderLoadButton(label) {
    // const notify = () => toast("Login Successful");
    return (
      <Button variant="contained" disabled={this.state.loadstatus} onClick={this.handleload} style={{
        zIndex: '1001', marginLeft: '180px'
      }}>
        {label}
      </Button>
    );
  }

  render() {
    const { data, columns, onload, disabled } = this.props;
    return (
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
        <Button variant="contained" disabled={disabled} onClick={onload} style={{
          zIndex: '1001', marginLeft: '0px'
        }}>
          More
        </Button>

      </tbody>
    );
  }
}

export default TableBody;
