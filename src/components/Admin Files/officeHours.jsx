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
        inTime: '',
        outTime: '',
        errors: []
    }
    schema = {
        established: Joi.string().required(),
        type: Joi.string().required(),
        inTime: Joi.string().required(),
        outTime: Joi.string().required(),
    };

    async componentDidMount() {
        const time = await gettime()
        const present = { ...time.data[0] }

        await this.setState({ inTime: present.inTime, outTime: present.outTime })
    }


    doSubmit = async () => {
        const { data } = this.state
        try {
            const sett = await save(data)
            const dd = sett.data.data

            await this.setState({ data: { established: '', type: '', inTime: '', outTime: '' } });
            this.setState({ inTime: dd.inTime, outTime: dd.outTime })


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