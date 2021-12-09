import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';
import Joi from 'joi-browser';
import { toast } from "react-toastify";
import Forms from 'components/Common/form';
import { empresetpass } from '../../services/empservice'
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Form,
    Row,
    Col,
} from "reactstrap";


class EmpRestPassword extends Forms {
    state = {
        data: {
            EmployeeId: "",

        },
        errors: [],

    };

    schema = {
        EmployeeId: Joi.string().required(),
    };


    doSubmit = async () => {
        try {
            console.log(this.state.data)
            await empresetpass(this.state.data)
            toast('password Reset')
            console.log(this.state)
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.EmployeeId = ex.response.data.data;
                this.setState({ errors });
            }
        }

        // this.props.history.push("/admin/addemployee");
    };

    render() {
        return <div style={{ height: '', position: "absolute", left: '0', width: '100%', }}
            className="header bg-gradient-success py-5 py-sm-1 ">
            <Sidebar />
            <Col lg="5" md="7" style={{ marginLeft: "35%", paddingTop: "180px", position: 'absolute' }}>
                <Card className="bg-secondary shadow border-0" >
                    <CardBody className="px-lg-3 py-sm-5">
                        <Form role="form" onSubmit={this.handleSubmit}>

                            {this.renderInput("EmployeeId", "Employee ID")}

                            <div className="text-center">
                                <Button style={{ background: '#2DCECB', border: 'none' }} className="my-4" color="primary" type="submit">
                                    Reset Password
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
            <Col style={{ marginLeft: '530px', marginTop: '30px' }} lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                        <Row>
                            <div style={{ textAlign: 'center' }} className="col">
                                <CardTitle
                                    style={{ textAlign: 'center' }}
                                    tag="h5"
                                    className="text-uppercase text-muted mb-0"
                                >
                                    Employee Reset PAssword
                                </CardTitle>
                                <div>
                                    <span className="h2 font-weight-bold mb-0">{this.state.pHours}</span>
                                </div>
                            </div>

                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </div>;
    }
}

export default EmpRestPassword;