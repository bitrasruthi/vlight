import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react'
import NavBar from './navbar';
import { toast } from "react-toastify";
import { connect } from "react-redux";
import ECard from './../Admin Files/empCount';
import PCard from 'components/Admin Files/prodHoursCard';
import { getProHrs } from '../../services/userService'
import get_hrslist from '../../reduxstore/actions/hrsAction'
import { Col } from 'reactstrap';

class Dashboard extends React.Component {

    state = {
        employees: [],
        lastMonthHours: '',
        lastWeekHours: '',
        count: ''
    }

    async componentDidMount() {
        try {
            if (!this.props.getthrslist) {
                await get_hrslist();

            }

            const tt = await this.props.getthrslist;
            console.log(tt);
            await this.setState({
                lastMonthHours: tt.total.totalLastMonthHours, lastWeekHours: tt.total.totalLastWeekHours, count: tt.count,
            });
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.to_Date = ex.response.data.data;
                this.setState({ errors });
                toast('somthing wrong please refresh the page')
            }
        }
    }

    render() {
        const { employees, lastWeekHours, lastMonthHours } = this.state
        return <div >
            {/* <Sidebar /> */}
            <NavBar />
            <h1 style={{ textAlign: 'center', color: 'black' }}>Welcome Admin!!!</h1>
            {/* <ProductionHours /> */}
            {/* <ECard /> */}
            {/* <Col style={{paddingTop: '80px'}}> */}
            <div style={{paddingTop: '80px'}}>
            <ECard
                title={'Total Employees '}
                count={this.state.count || 'loading...'}
                totalmonthhours={this.state.lastMonthHours || 'loading...'}
                totalweekhours={this.state.lastWeekHours || 'loading...'}
            />
            </div>
            {/* </Col> */}
            {/* <PCard
                title={'Monthly Hrs '}
                hrs={lastMonthHours}
            />
            <PCard
                title={'Week Hrs '}
                hrs={lastWeekHours}
            /> */}


            {/* <NoOfEmp/> */}
        </div>;
    }
}


const mapStateToProps = (state) => {
    return {
        getthrslist: state.getthrslist,
    };
};

export default connect(mapStateToProps)(Dashboard);
