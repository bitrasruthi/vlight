import ESidebar from 'components/Sidebar/eSidebar';
import React from 'react'
import ENavBar from './enavbar';
import TimeCard from 'components/Employee Files/timecard';
import EProcard from 'components/Employee Files/empProHor';
import { getemppro } from '../../services/prodService'
import { toast } from "react-toastify";
import WEProcard from 'components/Employee Files/weekempProd'
import get_employeelist  from 'reduxstore/actions/employeeAction';
import { getCurrentUser } from './../../services/authService';



class EDashboard extends React.Component {
    state = {
        lastMonthHours: '',
        lastWeekHours: '',
        name: ''
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
                hrs={this.state.lastMonthHours || '...'}
                whrs={this.state.lastWeekHours || '...'}
            />
            
        </div>;
    }
}

export default EDashboard;