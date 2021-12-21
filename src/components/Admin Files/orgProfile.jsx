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
    async populateDetail(data) {
        if (!data.companyMailId) return;
        this.setState({ data: this.mapToViewModel(data) });

    }
    async componentDidMount() {
        try {
            const { data } = await getcomdet()
            const res = data[0]
            await this.populateDetail(res);
        }
        catch (ex) {
            toast('error')
        }
    }
    mapToViewModel(data) {
        return {
            established: data.established,
            type: data.type,
            companyIdCode: data.companyIdCode,
            companyMailId: data.companyMailId,
            companyContactNumber: data.companyContactNumber,
        };
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

            <Col lg="6" md="7" style={{ marginLeft: "20%", paddingTop: "auto", position: 'absolute' }}>
        <Card className="bg-secondary shadow border-0" >
          <CardHeader className="bg-gradient-success border-0">
            <Col style={{ marginLeft: '200px', paddingBottom: '10px' }} xs="8">
              <h3 className="mb--3">Update Company Details</h3>
            </Col>

          </CardHeader>
          <CardBody  className="px-lg-3 py-sm-5">
                        <Form role="form" onSubmit={this.handleSubmit}>
                        <Col sm={{ size: 6 }} style={{marginLeft: '3px',  marginTop: '-0px'}}>
                            {this.renderInput("established", "Established", 'date')}
                            </Col>
                            <Col sm={{ size: 6 }} style={{marginLeft: '300px', marginTop: '-100px'}}className='mr-sm-2'>
                            {this.renderInput("type", "Type")}
                            </Col>
                            <Col sm={{ size: 6 }} style={{marginLeft: '3px',  marginTop: '-0px'}}>
                            {this.renderInput("companyIdCode", "Company Id ")}
                            </Col>
                            <Col sm={{ size: 6 }} style={{marginLeft: '300px', marginTop: '-100px'}}className='mr-sm-2'>
                            {this.renderInput("companyMailId", "Mail id")}
                            </Col>
                            <Col sm={{ size: 6 }} style={{marginLeft: '3px',  marginTop: '-0px'}}>
                            {this.renderInput("companyContactNumber", "Contact number")}
                            </Col>


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