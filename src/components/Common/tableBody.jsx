import React from "react";
import _ from "lodash";
// import ReactLoading from "react-loading";

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

  render() {
    const { data, columns } = this.props;
    return (
      <tbody style={{zIndex: "1001"}}>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td  style={{textAlign: 'center', fontSize: '15px'}} key={this.createkey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
