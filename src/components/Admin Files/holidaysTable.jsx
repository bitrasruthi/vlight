import Table from "../Common/table";
import React from "react";
import DeleteHoil from "./deleteholi";
import { Link } from "react-router-dom";
import { Modal } from 'react-responsive-modal';


class HoliTable extends React.Component {

  state = {
    openModal: false,
    hoilidex: '',
  }
  onClickButton = e => {
    // e.preventDefault()
    this.setState({ openModal: true })
    console.log(e.SERIAL_NO - 1)
    this.setState({ hoilidex: e.SERIAL_NO - 1 })
    // const dd = this.props.match.params.id 
    // console.log(this);
  }
  onCloseModal = () => {
    this.setState({ openModal: false })
  }
  columns = [
    { path: "SERIAL_NO", label: "S.NO" },
    { path: "date", label: "Date" },
    { path: "festival", label: "Festival" },
    {
      key: " Delete",
      label: 'Actions',
      content: (hoil) => (
        <button className="btn bg-pink btn-sm" onClick={() => this.onClickButton(hoil)} >
          <Link style={{ color: 'white' }} to={`/holidays/${hoil.SERIAL_NO}`}>
            Delete</Link></button>
      ),
    }
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
    const { holidays, sortColumn, onSort, disabled, loading } = this.props;
    return (
      <div>
        <Table
          columns={this.columns}
          data={holidays}
          sortColumn={sortColumn}
          onSort={onSort}
          disabled={disabled}
          loading={loading}
        />
        <Modal open={this.state.openModal} onClose={this.onCloseModal}>
          <DeleteHoil
            hoilidex={this.state.hoilidex}
          />

        </Modal>
      </div>
    );
  }
}

export default HoliTable;
