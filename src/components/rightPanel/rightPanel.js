import React, {Component} from 'react';
import { Card, CardTitle, CardSubtitle,
  Button, Row, Col, CardBody,
  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import MEquipment from '../../modals/mEquipment/mEquipment';

import './right-panel.css';

export default class RightPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalDisplay: false,
      equipment: {
        id: '',
        name: '',
        count: ''
      }
    }

    this.closeModal = this.closeModal.bind(this);
  }

  editModal(item) {
    this.setState(prev => ({
      modalDisplay: !prev.modalDisplay,
      equipment: {
        id: item._id,
        name: item.name,
        count: item.count
      }
    }));
  }

  createModal() {
    this.setState(prev => ({
      modalDisplay: !prev.modalDisplay,
      equipment: {
        room: this.props.room
      }
    }));
  }

  closeModal() {
    this.setState(prev => ({
      modalDisplay: !prev.modalDisplay,
      equipment: {
        room: ''
      }
    }));
  }

  deleteEquipment(item, e) {
    console.log(item);
    this.props.deleteEquipment(item._id);
    e.preventDefault();
  }

  listEquipments() {
    return this.props.equipments.map(x => {
      return (
        <li key={x._id}>
            <Card>
            <CardBody className="equipment">
                <div>
                  <CardTitle>{x.name}</CardTitle>
                  <CardSubtitle>Количество: {x.count}</CardSubtitle>
                </div>
                <div>
                  <Button disabled={!this.props.isLastChild} onClick={this.editModal.bind(this, x)} style={{'marginRight': '10px'}} color="info"><i className="far fa-edit"></i></Button>
                  <Button disabled={!this.props.isLastChild} onClick={this.deleteEquipment.bind(this, x)} color="danger"><i className="far fa-trash-alt"></i></Button>
                </div>
              </CardBody>
            </Card>
        </li>
      );
    })
  }

  render() {
    
    return(
      <div className="right-panel">
        <div className="toolbar">
          <h5>Оборудование</h5>
          <Button disabled={!this.props.isLastChild} onClick={this.createModal.bind(this)} color="success">Добавить</Button>
        </div>
        <ul className="list-equipments">
          {this.props.equipments ? this.listEquipments() : null}
        </ul>
        <MEquipment title="Редактировать" 
        close={this.closeModal} createEquipment={this.props.createEquipment} updateEquipment={this.props.updateEquipment}
        isOpen={this.state.modalDisplay} equipment={this.state.equipment}/>
      </div>
    );
  }

}