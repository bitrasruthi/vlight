import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { save, gettime } from '../../services/settings'
import Forms from 'components/Common/form';
import {

    Card,

    CardBody,
    Form,
    Col,
} from "reactstrap";

class OfficeHours extends Forms {
    state = {
        data: {},
        inTime: '', outTime: '',
        errors: {}
    }
    schema = {
        established: Joi.required(),
        type: Joi.string().required(),
        inTime: Joi.string().required(),
        outTime: Joi.string().required(),
    };

    doSubmit = async () => {
        const { data } = this.state


        try {
            await save(data)
            const time = await gettime()
            console.log(time)
            await this.setState({ data: {} });
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.established = ex.response.data.data;
                this.setState({ errors });
            }
        }
    };

    render() {
        return <div>
            <Sidebar />
            <h1 style={{ textAlign: 'center' }}>In Time: {this.state.inTime} </h1>
            <h1 style={{ textAlign: 'center' }}>Out Time: {this.state.outTime} </h1>

            <Col lg="5" md="7" style={{ marginLeft: "30%", paddingTop: "28px" }}>
                <Card className="bg-secondary shadow border-0" >
                    <CardBody className="px-lg-3 py-sm-5">
                        <Form role="form" onSubmit={this.handleSubmit}>

                            {this.renderInput("established", "Established", 'date')}
                            {this.renderInput("type", "Type")}
                            {this.renderInput("inTime", "InTime", 'time')}
                            {this.renderInput("outTime", "outTime", 'time')}

                            <div className="text-center">
                                {this.renderButton("Save")}
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </div>;
    }
}

export default OfficeHours;