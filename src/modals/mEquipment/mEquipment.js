import React, {Component} from 'react';
import { Card, CardTitle, CardSubtitle,
  Button, Row, Col, CardBody,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input } from 'reactstrap';

import './m-equipment.css';

export default class MEquipment extends Component {
    
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      count: ''
    }

    this.toggle = this.toggle.bind(this); 
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.equipment.room) {
      this.setState({
        id: nextProps.equipment.id,
        name: nextProps.equipment.name,
        count: nextProps.equipment.count
      });
    }
  }

  toggle() {
    this.props.close();
  }

  onChange(event) {
    console.log(typeof event.target.value);
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  save(e) {
    if (this.props.equipment.room) {
      this.props.createEquipment({ ...this.state, room: this.props.equipment.room, count: +this.state.count });
    } else {
      this.props.updateEquipment({ ...this.state, count: +this.state.count });
    }
    this.toggle();
    e.preventDefault();
  }

  render() {
    return(
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.title} оборудование</ModalHeader>
          <ModalBody>
            <Form>
                <Label for="name">Название</Label>
                <Input id="name" value={this.state.name || ''} onChange={this.onChange} />
                <Label for="count">Количество</Label>
                <Input id="count" type="number" value={this.state.count || ''} onChange={this.onChange} />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.save}>Сохранить</Button>
            <Button color="danger" onClick={this.toggle}>Отмена</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  }