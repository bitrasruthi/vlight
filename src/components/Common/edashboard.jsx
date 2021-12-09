import Footer from 'components/Footers/AdminFooter';
import ESidebar from 'components/Sidebar/eSidebar';
import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react'
import NavBar from './navbar';
import ENavBar from './enavbar';
import get_employeelist from 'reduxstore/actions/employeeAction';
import TimeCard from 'components/Employee Files/timecard';
import EProcard from 'components/Employee Files/empProHor';
import { getemppro } from '../../services/prodService'
import emp from "../../services/empservice";
import { toast } from "react-toastify";
import WEProcard from 'components/Employee Files/weekempProd'



class EDashboard extends React.Component {
    state = {
        lastMonthHours: '',
        lastWeekHours: ''
    }

    async componentDidMount() {

        try {
            const dd = await getemppro();
            await this.setState({ lastMonthHours: dd.data.lastMonthHours, lastWeekHours: dd.data.lastWeekHours });
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({ isLoading: false });
                toast("something wrong ")
            }
        }
    }
    render() {
        return <div>
            <ESidebar />
            <ENavBar />
            <TimeCard />
            <EProcard
                hrs={this.state.lastMonthHours}
            />
            <WEProcard
                whrs={this.state.lastWeekHours}

            />
        </div>;
    }
}

export default EDashboard;