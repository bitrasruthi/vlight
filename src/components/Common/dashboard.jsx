import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react'
import NavBar from './navbar';
import { toast } from "react-toastify";
import { connect } from "react-redux";
import ECard from './../Admin Files/empCount';
import PCard from 'components/Admin Files/prodHoursCard';
import { getProHrs } from '../../services/userService'


class Dashboard extends React.Component {

    state = {
        employees: [],
        lastMonthHours: '',
        lastWeekHours: '',
        count: ''
    }

    async componentDidMount() {
        try {
            const {data: dd} = this.state;
            const tt = await getProHrs(dd);
            console.log(tt.count);
            await this.setState({ 
                lastMonthHours: tt.total.totalLastMonthHours, lastWeekHours: tt.total.totalLastWeekHours, count: tt.count });
            // console.log(this.state.employees)
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
        return <div>
            <Sidebar />
            <NavBar />
            <h1 style={{ textAlign: 'center', color: 'black' }}>Welcome Admin!!!</h1>
            {/* <ProductionHours /> */}
            {/* <ECard /> */}

            <ECard
                title={'Total Employees '}
                count={this.state.count || 'loading...'}
                totalmonthhours={this.state.lastMonthHours|| 'loading...'}
                totalweekhours={this.state.lastWeekHours || 'loading...'}
            />
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
        getemployeelist: state.getemployeelist,
    };
};

export default connect(mapStateToProps)(Dashboard);
