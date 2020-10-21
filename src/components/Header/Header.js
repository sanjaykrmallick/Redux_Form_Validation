import React, { Fragment } from "react";
import { Navbar,Nav} from 'react-bootstrap';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Fragment>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Brand ><Link style={{margin:"0px 20px",color:"#fff"}} to="/doctor-list">DOCTOR INFO</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto '>
            <Link style={{margin:"0px 20px",color:"#fff"}} to="/doctor-list">Doctor List</Link>
            {/* <Link style={{margin:"0px 20px",color:"#fff"}} to="/add-doctor">Doctor Detail</Link>
            <Link style={{margin:"0px 20px",color:"#fff"}} to="/add-doctorTiming">Doctor Timing</Link> */}
            <Link style={{margin:"0px 20px",color:"#fff"}} to="/add-doctor">Add Doctor</Link>
            <Link style={{margin:"0px 20px",color:"#fff"}} to="/newly-added-doctors">New Added Doctors</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default Header;
