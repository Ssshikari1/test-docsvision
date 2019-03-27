import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {Col, Row, Container, Button} from 'reactstrap';

import {default as buildingAction} from '../actions/building-action';
import {default as equipmentAction} from '../actions/equipment-action'

import LeftPanel from '../components/leftPanel/leftPanel';
import RightPanel from '../components/rightPanel/rightPanel';
import './main.css'

class MainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPlacement: '',
    };
    this.handleItem = this.handleItem.bind(this);
    let equipments;
  }

  componentDidMount() {
    this.props.getBuildings();
    this.props.getEquipments();
  }

  handleItem(item) {
    this.setState({
      currentPlacement: item
    });
  }

  searchEquipmentsInPlacement(nextState) {
    const equipments = this.props.equipment.data;
    const eq = equipments.filter(x => { 
      if (x.room) {
        if (nextState.currentPlacement === "FG7pRodZNF") {
          return x.room.indexOf("b1") !== -1;
        }
        if (nextState.currentPlacement === "CacR5AWhfr") {
          return x.room.indexOf("b2") !== -1;
        }
        return x.room.indexOf(nextState.currentPlacement) !== -1;
      }
     });
    this.equipments = eq;
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.currentPlacement !== this.state.currentPlacement) {
      this.searchEquipmentsInPlacement(nextState);
    }
  }

  render() {
    return (
      <div className="wrap">
        <Row>
          <Col md={3}>
            <LeftPanel building={this.props.building} capturePlacement={this.handleItem} />
          </Col>
          <Col md={9}>
              <RightPanel equipments={this.equipments}  />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    building: store.building,
    equipment: store.equipment
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBuildings: () => dispatch(buildingAction.get()),
    getEquipments: () => dispatch(equipmentAction.get()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);