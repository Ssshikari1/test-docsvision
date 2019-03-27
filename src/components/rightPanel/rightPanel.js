import React, {Component} from 'react';
import { Card, CardTitle, CardSubtitle, Button, Row, Col, CardBody } from 'reactstrap';

import './right-panel.css';

export default class RightPanel extends Component {

  constructor(props) {
    super(props);
  }

  listEquipments() {
    console.log(this.props.equipments);
    return this.props.equipments.map(x => {
      return (
        <li key={x._id}>
            <Card>
            <CardBody>
              <Row>
                <Col md={10}>
                  <CardTitle>{x.name}</CardTitle>
                  <CardSubtitle>Количество: {x.count}</CardSubtitle>
                </Col>
                <Col md={2} style={{'margin': 'auto 0'}}>
                  <Button style={{'margin-right': '10px'}} color="info"><i class="far fa-edit"></i></Button>
                  <Button color="danger"><i class="far fa-trash-alt"></i></Button>
                </Col>
              </Row>
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
          <Button color="success">Добавить</Button>
        </div>
        <ul className="list-equipments">
          {this.props.equipments ? this.listEquipments() : null}
        </ul>
      </div>
    );
  }

}