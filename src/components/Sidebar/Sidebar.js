
import { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "../Logins/Login";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import AddNew from './../Admin Files/addNewEmp';
import Logout from './../Logins/logout';
import EmpList from './../Admin Files/emplist';
import LeaveList from './../Admin Files/leavelist';
import Settings from './../Common/settings';
import EmpWorkingStas from './../Admin Files/empWorkingStats';



var ps;

const Sidebar = (props) => {
  var routes = [
    {
      path: "/index",
      name: "Dashboard",
      icon: "ni ni-tv-2 text-primary",
      component: Index,
      layout: "/dashboard",
    },  
    
    {
      path: "/addnewep",
      name: "Add New Employee",
      icon: "ni ni-circle-08 text-success",
      component: AddNew,
      layout: "/addnewemp",
    },
    {
      path: "/emplist",
      name: "Employee List",
      icon: "ni ni-bullet-list-67 text-warning",
      component:EmpList,
      layout: "/emplist",
    },
    {
      path: "/leavelist",
      name: "Leave List",
      icon: "ni ni-bullet-list-67 text-info",
      component:LeaveList,
      layout: "/leavelist",
    },
    {
      path: "/empstats",
      name: "Employee Working Stats",
      icon: "ni ni-chart-bar-32 text-green",
      component:EmpWorkingStas,
      layout: "/empstats",
    },
  ];
  const [collapseOpen, setCollapseOpen] = useState();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data); 
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout }
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };

  const { bgColor,  logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar style={{zIndex: "1001"}}
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        {/* <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button> */}
        {/* Brand */}
        
          <NavbarBrand to="/dashboard" tag={Link}>
          <img 
            alt="..."
            src={
              require("../../assets/img/brand/codegenefull.png").default
            }
          />
        </NavbarBrand>
        
        {/* User */}
        
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
          <hr style={{paddingTop: '50px'}} className="my"/>
          <Nav className="mb" navbar>
            <NavItem>
              <NavLink href="#">
                <i className="ni ni-settings-gear-65 text-yellow" />
                <Settings/>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/logout">
                <i className="fas fa-sign-out-alt text-danger" />
                Logout
              </NavLink>
            </NavItem>
            </Nav>
          {/* Heading */}
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
