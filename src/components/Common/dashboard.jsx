import NoOfEmp from 'components/Admin Files/noofemp';
import Footer from 'components/Footers/AdminFooter';
import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react'
import NavBar from './navbar';
import ProductionHours from './productionHours';
import ECCard from 'components/Admin Files/empCount';
import get_employeelist from "../../reduxstore/actions/employeeAction";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import ECard from './../Admin Files/empCount';


class Dashboard extends React.Component {

    state = {
        employees: [],


    }

    async componentDidMount() {
        if (!this.props.getemployeelist) {
            await get_employeelist();
        }

        const dd = await this.props.getemployeelist;

        await this.setState({ employees: dd });
    }

    render() {
        return <div>
            <Sidebar />
            <NavBar />
            <h1 style={{ textAlign: 'center', color: 'black' }}>Welcome Admin!!!</h1>
            {/* <ProductionHours /> */}
            {/* <ECard /> */}

            <ECard
                count={this.state.employees.length}
            />
            {/* <NoOfEmp/> */}
        </div>;
    }
}


const mapStateToProps = (state) => {
    return {
        getemployeelist: state.getemployeelist,
    };
};

export default connect(mapStateToProps)(Dashboard);
