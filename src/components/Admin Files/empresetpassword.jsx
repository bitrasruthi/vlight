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
    CardHeader,
    Row,
    Col,
} from "reactstrap";


class EmpRestPassword extends Forms {
    state = {
        data: {
            EmployeeId: "",
            password: "",

        },
        loadstatus: false,
        errors: [],

    };

    schema = {
        EmployeeId: Joi.string().required(),
        password: Joi.string().required(),
    };


    doSubmit = async () => {
        try {
            await this.setState({ loadstatus: true })
            console.log(this.state.data)
            await empresetpass(this.state.data)
            toast('Password Reset Success')

        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.EmployeeId = ex.response.data.data;
                await this.setState({ errors });
                await this.setState({ loadstatus: true })

            }
        }

        // this.props.history.push("/admin/addemployee");
    };

    render() {
        return <div>
            <Sidebar />
            <Col lg="4" md="7" style={{ marginLeft: "30%", paddingTop: "auto", position: 'absolute' }}>                <Card className="bg-secondary shadow border-0" >
                <CardHeader className="bg-gradient-success border-0">
                    <Col style={{ marginLeft: '80px', paddingBottom: '10px' }} xs="8">
                        <h3 className="mb--3">Reset Employee Password</h3>
                    </Col>

                </CardHeader>
                <CardBody className="px-lg-3 py-sm-5">
                    <Form role="form" onSubmit={this.handleSubmit}>

                        {this.renderInput("EmployeeId", "Employee ID")}
                        {this.renderInput("password", "Password")}

                        <div className="text-center">
                            <Button disabled={this.state.loadstatus} style={{ background: '#2DCECB', border: 'none' }} className="my-4" color="primary" type="submit">
                                Reset Password
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
            </Col>

        </div>;
    }
}

export default EmpRestPassword;