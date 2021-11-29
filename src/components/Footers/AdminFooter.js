
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer" >
      <Row className="align-items-center justify-content-between">
    
        <Col xl="8">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem style={{fontSize: '15px', marginTop: '1.5px', color: 'grey'}}>
              
                Copyright © Codegene
              
            </NavItem>

            <NavItem>
              <NavLink
                href="https://codegene.io/#about"
                target="_blank"
              >
                About Us
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://codegene.io/"
                target="_blank"
              >
                Website
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
