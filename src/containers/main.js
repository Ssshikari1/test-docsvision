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
      lastChilds: []
    };
    this.handleItem = this.handleItem.bind(this);
    let equipments;
    let isLastChild = false;
  }

  componentDidMount() {
    this.props.getBuildings();
    this.props.getEquipments();
  }

  handleItem(item, lastChilds) {
    this.setState({
      currentPlacement: item,
      lastChilds: lastChilds
    });
  }

  searchEquipmentsInPlacement(nextProps, nextState) {
    if (!nextProps.equipment.data) {
      return;
    }
    const equipments = nextProps.equipment.data;
    const eq = equipments.filter(x => { 
      if (x.room) {
        if (nextState.currentPlacement === "FG7pRodZNF") {
          return x.room.indexOf("b1") !== -1;
        }
        if (nextState.currentPlacement === "CacR5AWhfr") {
          return x.room.indexOf("b2") !== -1;
        }
        if (nextState.currentPlacement !== "") {
          return x.room.indexOf(nextState.currentPlacement) !== -1;
        }
      }
     });
    this.isLastChild = nextState.lastChilds.indexOf(nextState.currentPlacement) !== -1 ? true : false;
    this.equipments = eq;
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.currentPlacement !== this.state.currentPlacement
      || nextProps.equipment !== this.props.equipment) {
      this.searchEquipmentsInPlacement(nextProps, nextState);
    }
  }

  render() {
    return (
      <div className="wrap">
        <Row>
          <Col md={3}>
            <LeftPanel building={this.props.building}
             capturePlacement={this.handleItem} fillLastChilds={this.fillLastChilds}/>
          </Col>
          <Col md={9}>
              <RightPanel equipments={this.equipments} createEquipment={this.props.createEquipment} 
              room={this.state.currentPlacement} isLastChild={this.isLastChild}
              updateEquipment={this.props.updateEquipment} deleteEquipment={this.props.deleteEquipment} />
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
    updateEquipment: (data) => dispatch(equipmentAction.update(data)),
    deleteEquipment: (id) => dispatch(equipmentAction.delete(id)),
    createEquipment: (data) => dispatch(equipmentAction.create(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);