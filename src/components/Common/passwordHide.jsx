// import React, { Component, PropTypes } from 'react';
// import {FormControl} from 'react-bootstrap';
// import styles from './PasswordField.less';

// class PasswordHide extends Component {
    
//     state = {
//           type: 'password'
//     };
    
//     showHide = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         this.setState({
//             type: this.state.type === 'text' ? 'password' : 'text'
//         });
//         this.input.focus();
//     }
//     render(){
//     return(
//         <div className={styles.password} >
//             <FormControl type={this.state.type} {...this.props} inputRef={ref => { this.input = ref; }} />
//             <span className={[styles.visibility, 'flaticon-eye', this.state.type === 'text' ? styles.is_visible : styles.is_hidden].join(' ')} onClick={this.showHide}></span>
//         </div>
//     );
//   }
// }

