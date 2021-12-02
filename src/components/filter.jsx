import React from 'react';
import  Forms from 'components/Common/form';
import Joi  from 'joi-browser';
import emp from "../services/empservice";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    UncontrolledCollapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
  } from "reactstrap";

class Filter extends Forms{
    state = {
        data: { to_Date: "", from_Date: "" },
        employess: [],
        pageSize: 4,
        errors: [],
        currentPage: 1,
        sortColumn: { path: "Date", order: "asc" },
      };
    
      schema = {
        from_Date: Joi.string().required(),
        to_Date: Joi.string().required(),
      };


      doSubmit = async () => {
        try {
          const { data, employess } = this.state;
          var ss = { ...data, EmployeeId: employess[0].EmployeeId };
          await this.setState({ data: ss });
          const atts = await emp.getAttendanceserc(this.state.data);
          await this.setState({ employess: atts.data });
          await this.setState({ data: { to_Date: "", from_Date: "" } });
        } catch (ex) {
          if (ex.response && ex.response.status === 400) {
            const errors = { ...this.state.errors };
            errors.to_Date = ex.response.data.data;
            this.setState({ errors });
          }
        }
      };

    render() { 
        return <div>
            <Col
          lg="3"
          md="3"
          // style={{
          //   marginLeft: "60%",
          //   marginTop: "-160px",
          //   position: "fixed",
          // }}
        >
          <Card 
           style={{
            marginLeft: "60%",
            marginTop: "-160px",
            position: "fixed",
          }}className="card__wrap--inner bg-secondary shadow border-0">
            {/* <h1
              style={{
                marginLeft: "60px",
                paddingTop: "28px",
              }}
            >
              Filter </h1> */}
            <CardBody className="px-lg-2 py-sm-5">
              <Form
                role="form"
                onSubmit={this.handleSubmit}
                style={{
                  padding: "0px 20px",
                  textAlign: "",
                  color: "",
                }}
              >
                {this.renderInput("from_Date", "From Date", "date")}
                {this.renderInput("to_Date", "To Date", "date")}

                <div className="text-center">
                  <div
                  // style={{ background: "#172B4D", border: "none" }}
                  // className="my-4"
                  // color="primary"
                  // type="submit"
                  >
                    {" "}
                    {this.renderButton("Search")}{" "}
                  </div>

                  {/* <Button
                    style={{ background: "#172B4D", border: "none" }}
                    className="my-4"
                    color="primary"
                    type="submit"
                  >
                    search
                  </Button> */}
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
        </div>;
    }
}
 
export default Filter;