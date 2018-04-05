import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'

import Navbar from './Navbar'
import * as actions from '../actions'

class Reservation extends React.Component {
  state = { seatId: null }

  componentDidMount = () => {
    this.setState({ seatId: this.props.reservedSeat })
  }

  cancelReservation = () => {
    this.props.onCancelReservation(this.state.seatId)
  }

  render() {
    return (
      <Container>
        <Navbar />
        <h1>Reservation</h1>
        {!this.props.madeReservation ? (
          <h2>You have not made any reservations.</h2>
        ) : (
          <div>
            <div>Your seat: {this.props.reservedSeat}</div>
            <Button onClick={this.cancelReservation} color="danger">
              Cancel Reservation
            </Button>
          </div>
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  madeReservation: state.seatsReducer.madeReservation,
  reservedSeat: state.seatsReducer.reservedSeat
})

const mapDispatchToProps = dispatch => ({
  onCancelReservation: seatId =>
    dispatch({
      type: actions.CANCEL_RESERVATION,
      payload: { id: seatId }
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(Reservation)
