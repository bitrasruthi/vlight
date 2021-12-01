import store from "./reduxstore/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from './components/Common/settings';

class App extends React.Component {
            <ToastContainer />

            <main className="container">
            <Route path="/settings" component={Settings} /> 

                <Route path="/navbar" component={NavBar} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/edashboard" component={EDashboard} />
                <Route path="/countdown" component={Countdown} />
                <Route path="/timecard" component={TimeCard} />
                <Route path="/attlist" component={AttList} />
                <Route path="/leaveform" component={LeaveForm} />
                <Route path="/eleavelist" component={ELeaveList} />
                <Route path="/leaveapproval/:id" component={ApproveReject} />
                <Route path="/empattlist/:id" component={EmpAttList} />

                <Redirect to="/not-found" />

            </main>
}
