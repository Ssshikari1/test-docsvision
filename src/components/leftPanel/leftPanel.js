import React, {Component} from 'react';

import RightPanel from '../rightPanel/rightPanel';

import './left-panel.css';

export default class LeftPanel extends Component {

  constructor(props) {
    super(props);
  }

  placementChoiceHandler(item, event) {
    event.stopPropagation();
    this.props.capturePlacement(item);

  }

  listBuildings() {
    return this.props.building.data.map(x => {
      return (
        <li onClick={this.placementChoiceHandler.bind(this, x._id)} key={x._id}>
          {x.name}
          <ul>
            {this.listRooms(x)}
          </ul>
        </li>
      );
    });
  }

  listRooms(item) {
    
    if (item.rooms) {
      return item.rooms.map(x => {
        return(
          <li onClick={this.placementChoiceHandler.bind(this, x.id)} key={x.id}>
            {x.name}
            {x.children ?
              <ul>
                {this.listRooms(x)}
              </ul>
              : null
            }
          </li>
        );
      });
    } else {
      return item.children.map(x => {
        return(
          <li onClick={this.placementChoiceHandler.bind(this, x.id)} key={x.id}>
            {x.name}
            {x.children ?
              <ul>
                {this.listRooms(x)}
              </ul>
              : null
            }
          </li>
        );
      });
    }
  }

  // listChildrens(room) {
  //   return room.children.map(x => {
  //     return (
  //       <li onClick={this.itemChoiceHandler.bind(this, x.id)} key={x.id}>
  //         {x.name}
  //         {x.children ?
  //           <ul>
  //             {this.listChildrens(x)}
  //           </ul>
  //           : null
  //         }
  //       </li>
  //     );
  //   })
  // }

  render() {
    const { building, equipment } = this.props;
    return (
      <div className="left-panel">
        <h4>НекаяОрганизация</h4>
        <ul>
          {building.data.length ? this.listBuildings() : null}
        </ul>
      </div>
    );
  }

}