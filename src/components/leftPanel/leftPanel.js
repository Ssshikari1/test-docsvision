import React, {Component} from 'react';

import './left-panel.css';

export default class LeftPanel extends Component {

  

  constructor(props) {
    super(props);

    this.lastChilds = [];
  }

  placementChoiceHandler(item, event) {
    event.stopPropagation();
    this.props.capturePlacement(item, this.lastChilds);
    const listItems = document.querySelectorAll('.list li');
    for (let i = 0; i < listItems.length; i++) {
      alert (listItems[i].textContent);
    }
  }

  listBuildings() {
    return this.props.building.data.map(x => {
      return (
        <li key={x._id}>
          <span onClick={this.placementChoiceHandler.bind(this, x._id)} >{x.name}</span>
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
          <li key={x.id}>
            <span onClick={this.placementChoiceHandler.bind(this, x.id)} >{x.name}</span>
            {x.children ?
              <ul>
                {this.listRooms(x)}
              </ul>
              : this.noChild(x)
            }
          </li>
        );
      });
    } else {
      return item.children.map(x => {
        return(
          <li key={x.id}>
            <span onClick={this.placementChoiceHandler.bind(this, x.id)} >{x.name}</span>
            {x.children ?
              <ul>
                {this.listRooms(x)}
              </ul>
              : this.noChild(x)
            }
          </li>
        );
      });
    }
  }

  noChild(x) {
    if (this.lastChilds.indexOf(x.id) === -1) {
      this.lastChilds.push(x.id);
    }
    return null;
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
        <ul className="list-buildings">
          {building.data.length ? this.listBuildings() : null}
        </ul>
      </div>
    );
  }

}