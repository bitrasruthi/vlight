import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react';
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { addcompdet, getcomdet } from '../../services/settings'
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

class Orgprofile extends Forms {
    state = {
        data: {},
        inTime: '',
        outTime: '',
        errors: []
    }
    schema = {
        established: Joi.string().required(),
        type: Joi.string().required(),
        companyIdCode: Joi.string().required(),
        companyMailId: Joi.string().required(),
        companyContactNumber: Joi.string().required(),
    };

    async componentDidMount() {
        try {
            const { data } = await getcomdet()
            const res = data[0]
            if (res) {
                this.setState({ data: res })
            }
        }
        catch (ex) {
            toast('error')
        }
    }


    doSubmit = async () => {
        const { data } = this.state
        try {
            const sett = await addcompdet(data)
            toast('sucess')

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
                        </Row>
                    </CardHeader>
                    <CardBody className="px-lg-3 py-sm-5">
                        <Form role="form" onSubmit={this.handleSubmit}>

                            {this.renderInput("established", "Established", 'date')}
                            {this.renderInput("type", "Type")}
                            {this.renderInput("companyIdCode", "Company Id ")}
                            {this.renderInput("companyMailId", "Mail id")}
                            {this.renderInput("companyContactNumber", "Contact number")}


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

export default Orgprofile;