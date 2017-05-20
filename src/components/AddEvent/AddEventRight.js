import React from 'react'
import {Col,InputGroup,InputGroupAddon} from 'reactstrap'
import InfiniteCalendar from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css'

class AddEventRight extends React.Component{

  render(){
    var calendarTheme =  {
      accentColor: '#448AFF',
      floatingNav: {
        background: 'rgba(56, 87, 138, 0.94)',
        chevron: '#FFB62F',
        color: '#FFF',
      },
      headerColor: '#FFB62F',
      selectionColor: '#FFC456',
      textColor: {
        active: '#FFF',
        default: '#333',
      },
      todayColor: '#FFC456',
      weekdayColor: '#FFD483',
    };
    return(
      <Col xs={this.props.xs} className="add-event-right-container">
        <InfiniteCalendar
          width={400}
          height={200}
          theme={calendarTheme}
          onSelect={this.props.onPickDate}/>
      </Col>
    );
  }
}

export default AddEventRight
