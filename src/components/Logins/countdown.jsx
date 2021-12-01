import ESidebar from 'components/Sidebar/eSidebar';
import React from 'react';
import { checkIn } from './../../services/inService';
import { getCheck} from 'services/inService';

class Countdown extends React.Component {
        constructor() {
          super();
          this.state = { time: {}, seconds: 1 };
          this.timer = 0;
          this.startTimer = this.startTimer.bind(this);
          this.countDown = this.countDown.bind(this);
        }
      
        secondsToTime(secs){
          let hours = Math.floor(secs / (60 * 60));
      
          let divisor_for_minutes = secs % (60 * 60);
          let minutes = Math.floor(divisor_for_minutes / 60);
      
          let divisor_for_seconds = divisor_for_minutes % 60;
          let seconds = Math.ceil(divisor_for_seconds);
      
          let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
          };
          return obj;
        }
      
        componentDidMount() {
          let timeLeftVar = this.secondsToTime(this.state.seconds);
          this.setState({ time: timeLeftVar });
        }
      
        startTimer() {
          if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
          }
        }
      
        countDown() {
          // Remove one second, set state so a re-render happens.
          let seconds = this.state.seconds + 1;
          this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
          });
          // Check if we're at zero.
          if (seconds == 0) { 
            clearInterval(this.timer);
          }
        }
        
        // async componentDidMount() {
        //     const tt = await getCheck();
        //     console.log(tt);
        
        
            
        // }

        
    
      
        render() {
          return(
            <div>
                <ESidebar/>
                <div style={{textAlign: 'center'}}>
              <br />
              h: {this.state.time.h} m: {this.state.time.m} s: {this.state.time.s}
            </div>
            </div>
          );
        }
      }
    // render() { 
    //     return <div>
    //         <ESidebar/>
    //         <h1 style={{textAlign: 'center'}}>CountDown</h1>
    //     </div>;
    // }
// }
 

export default Countdown;