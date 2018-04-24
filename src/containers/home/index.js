import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {PieChartComponent} from './PieChartComponent'
import {BarChartComponent} from './BarChartComponent'
import { Col, Row } from 'react-bootstrap';

import {
    updateShiftsAsync,
  } from '../../modules/counter'  


class Home extends React.Component {
    componentWillMount() {
        const {updateShiftsAsync} = this.props;
        updateShiftsAsync();
    }
    render() {
        const {props} = this;
        return (
        <div>
            <h5>Messly - coding challenge</h5>
            <p>by Liban Abdulle</p>
            <Row style={{marginBottom: 30}}>
                <Col md={3} sm={6}>
                    <h1>{props.totalUnfilled}</h1>
                    <small>Total number of  unfilled shifts</small>
                </Col>
                <Col md={3} sm={6}>
                    <h1>{props.totalConfirmed}</h1>
                    <small>Total number of  confirmed shifts</small>
                </Col>
                <Col md={3} sm={6}>
                    <h1>{props.totalCancelled}</h1>
                    <small>Total number of  cancelled shifts</small>
                </Col>
                <Col md={3} sm={6}>
                    <h1>{props.totalConfirmedOrUnfilled}</h1>
                    <small>Total number of  confirmed or unfilled shifts</small>
                </Col>
            </Row>
            <Row>
                <Col md={6} xs={12}>
                    <PieChartComponent data={this.props.pieChartData} redraw />
                </Col>
                <Col md={6} xs={12}>
                    <BarChartComponent data={this.props.barChartData} redraw />
                </Col>
            </Row>
        </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateShiftsAsync,
  changePage: () => push('/about-us')
}, dispatch)

const mapStateToProps = state => ({
    shifts: state.counter.shifts,
    pieChartData: state.counter.pieChartData,
    barChartData: state.counter.barChartData,
    totalUnfilled: state.counter.totalUnfilled,
    totalConfirmed: state.counter.totalConfirmed,
    totalCancelled: state.counter.totalCancelled,
    totalConfirmedOrUnfilled: state.counter.totalConfirmedOrUnfilled
})
  
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
