import Footer from 'components/Footers/AdminFooter';
import ESidebar from 'components/Sidebar/eSidebar';
import Sidebar from 'components/Sidebar/Sidebar';
import React from 'react'
import NavBar from './navbar';
import ENavBar from './enavbar';
import get_employeelist from 'reduxstore/actions/employeeAction';
import TimeCard from 'components/Employee Files/timecard';
import EProcard from 'components/Employee Files/empProHor';
import { calProdHours } from '../../services/prodService'
import emp from "../../services/empservice";
import { toast } from "react-toastify";
import WEProcard from 'components/Employee Files/weekempProd'



class EDashboard extends React.Component {
    state = {
        data: {
            EmployeeId: "",
            from_Date: '',
            to_Date: '',
        },
        wdata: {
            EmployeeId: "",
            from_Date: '',
            to_Date: '',
        },
        hrs: '',
        whrs: ''
    }

    async componentDidMount() {
        const id = emp.getCurrentUser()
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var frdate = firstDay.getDate()
        frdate = ("0" + frdate).slice(-2);
        var ladate = lastDay.getDate()
        ladate = ("0" + ladate).slice(-2);
        var month = firstDay.getMonth() + 1
        var year = lastDay.getFullYear()
        var t = year + '-' + month + '-' + frdate;
        var t2 = year + '-' + month + '-' + ladate;
        await this.setState({ data: { EmployeeId: id.EmployeeId, from_Date: t, to_Date: t2 } })

        var first = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        var firstDayofWeek = new Date(date.setDate(first));
        var lastdayOfWeek = new Date(date.setDate(last));


        var wfrdate = firstDayofWeek.getDate()
        wfrdate = ("0" + wfrdate).slice(-2);
        var wladate = lastdayOfWeek.getDate()
        wladate = ("0" + wladate).slice(-2);
        var wmonth = firstDayofWeek.getMonth() + 1
        var wyear = firstDayofWeek.getFullYear()
        var w = wyear + '-' + wmonth + '-' + wfrdate;
        var w2 = wyear + '-' + wmonth + '-' + wladate;
        await this.setState({ wdata: { EmployeeId: id.EmployeeId, from_Date: w, to_Date: w2 } })


        try {

            const pp = await calProdHours(this.state.data);
            const epp = await calProdHours(this.state.wdata);

            this.setState({ hrs: pp.data.data, whrs: epp.data.data })
        }
        catch (er) {
            toast.error('somthing worng')
        }
    }
    render() {
        return <div>
            <ESidebar />
            <ENavBar />
            <TimeCard />
            <EProcard
                hrs={this.state.hrs}
            />
            <WEProcard
                whrs={this.state.whrs}

            />
        </div>;
    }
}

export default EDashboard;