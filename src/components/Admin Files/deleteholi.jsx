import React from "react";
import { connect } from "react-redux";
import Forms from "../Common/form";
import { deletehoil } from '../../services/settings'
import { toast } from "react-toastify";
import { deleteEmp } from "services/authService";
import Joi from 'joi-browser';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Form,
    Col,
} from "reactstrap";

class DeleteHoil extends Forms {
    state = {
        data: {
            Reason: '',
            AgreementDone: '',
        },
        leaveid: {},
        errors: [],
        employees: [],
        disabled: false,
        showPopup: true
    };



    // handleDelete = async (emp) => {
    //   console.log(this.props.match.params.id)
    //   const originalemployees = this.state.employees;
    //   const empl = originalemployees.filter((m) => m._id !== emp._id);
    //   try {
    //     await deleteEmp(this.props.match.params.id);

    //     // setTimeout(async () => {}, 1000);
    //     this.setState({ employees: empl });
    //   } catch (ex) {
    //     if (ex.response && ex.response.status === 400)
    //       toast("This Employee already been deleted");
    //     this.setState({ employees: originalemployees });
    //   }
    // };

    doSubmit = async (emp) => {
        this.setState({ disabled: true })
        try {
            const id = this.props.hoilidex
            console.log(id)
            await deletehoil({ index: id })

        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                toast('somthing worng')
                errors.EmployeeId = ex.response.data.data;
                this.setState({ errors });
            }
        }
    };



    async componentDidMount() {

    }


    render() {
        const { leave } = this.state;
        return (


            <div style={{ marginTop: '0px', height: '430px', width: '350px', marginRight: "-0px" }}  >
                <Col lg="9" md="9" style={{
                    marginLeft: '25px',
                    height: '400px', width: '650px', marginRight: "-0px", paddingTop: "auto", position: 'absolute', marginTop: '20px',
                }}>
                    <Card className="bg-secondary shadow border-0" >
                        <CardHeader className="bg-gradient-success border-0">
                            <Col style={{ marginLeft: '30px', paddingBottom: '10px' }} xs="9">
                                <h3 className="mb--3">Holiday Delete</h3>
                            </Col>
                        </CardHeader>
                        <CardBody style={{ textAlign: 'center' }} className="px-lg-3 py-sm-5">
                            <Form role="form" style={{ textAlign: 'left' }} onSubmit={this.handleSubmit}>
                                <h1> Ae you sure to Delete</h1>
                                <div style={{ marginTop: '20px', marginLeft: '30px' }}  >
                                    <Button disabled={this.state.disabled} style={{ marginLeft: '0px', marginTop: '0px', background: '#2DCE8A', border: 'none' }} variant="contained" onClick={this.doSubmit}>
                                        Yes
                                    </Button>
                                    <Button disabled={this.state.disabled} style={{ marginLeft: '0px', marginTop: '0px', background: '#2DCE8A', border: 'none' }} variant="contained" onClick={this.doSubmit}>
                                        No
                                    </Button>

                                </div>

                            </Form>
                        </CardBody>

                    </Card>
                </Col>
                <div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        getemployeelist: state.getemployeelist,
    };
};

export default connect(mapStateToProps)(DeleteHoil);

