import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { save, gettime } from '../../services/settings'
import Forms from 'components/Common/form';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Form,
    Row,
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

            <Col lg="6" md="7" style={{ marginLeft: "30%", paddingTop: "28px" }}>
                <Card className="bg-secondary shadow border-0" >
                    <CardHeader className="bg-gradient-success">
                        <Row>

                            <h3 style={{ marginLeft: '80px' }}>In Time: {this.state.inTime} </h3>
                            <h3 style={{ marginLeft: '100px' }}>Out Time: {this.state.outTime} </h3>
                        </Row>
                    </CardHeader>
                    <CardBody className="px-lg-3 py-sm-5">
                        <Form role="form" onSubmit={this.handleSubmit}>


                            {this.renderInput("inTime", "InTime", 'time')}
                            {this.renderInput("outTime", "outTime", 'time')}

                            <div className="text-center">
                                {/* {this.renderButton("Save")} */}
                                <Button style={{ marginLeft: '0px', marginTop: '0px', background: '#2DCEC8', color: 'white', border: 'none' }} variant="contained" onClick={this.onApprove}>
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </div>;
    }
}

export default OfficeHours;