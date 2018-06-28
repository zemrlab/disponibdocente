import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class DatePickerCustom extends Component {
    constructor (props) {
        super(props)
        this.state = {
            startDate: moment(),
            dateFormat:"DD-MM-YYYY"
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        const valueOfInput = date.format("DD-MM-YYYY");
        this.setState({
            startDate: date
        });
        console.log(date.format("DD-MM-YYYY"));
        this.props.handleChange(valueOfInput);
    }

    render() {
        return <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            dateFormat={this.state.dateFormat}
        />;
    }
}
export default DatePickerCustom

