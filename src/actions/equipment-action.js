import Scorocode from 'scorocode';

export const types = {
  GET_EQUIPMENTS_REQUEST: 'GET_EQUIPMENTS_REQUEST',
  GET_EQUIPMENTS_SUCCESS: 'GET_EQUIPMENTS_SUCCESS',
  GET_EQUIPMENTS_FAILURE: 'GET_EQUIPMENTS_SUCCESS',

  CREATE_EQUIPMENT_REQUEST: 'CREATE_EQUIPMENT_REQUEST',
  CREATE_EQUIPMENT_SUCCESS: 'CREATE_EQUIPMENT_SUCCESS',
  CREATE_EQUIPMENT_FAILURE: 'CREATE_EQUIPMENT_FAILURE',

  UPDATE_EQUIPMENT_REQUEST: 'UPDATE_EQUIPMENT_REQUEST',
  UPDATE_EQUIPMENT_SUCCESS: 'UPDATE_EQUIPMENT_SUCCESS',
  UPDATE_EQUIPMENT_FAILURE: 'UPDATE_EQUIPMENT_FAILURE',

  DELETE_EQUIPMENT_REQUEST: 'DELETE_EQUIPMENT_REQUEST',
  DELETE_EQUIPMENT_SUCCESS: 'DELETE_EQUIPMENT_SUCCESS',
  DELETE_EQUIPMENT_FAILURE: 'DELETE_EQUIPMENT_FAILURE',
};

export default {
  get: () => {
    return dispatch => {
      dispatch({
        type: types.GET_EQUIPMENTS_REQUEST
      });
    
      let eq = new Scorocode.Query("equipment");
      eq.find().then((found) => {
        dispatch({
          type: types.GET_EQUIPMENTS_SUCCESS,
          payload: found.result
        });
      }).catch(e => {
        dispatch({
          type: types.GET_EQUIPMENTS_FAILURE,
          error: e
        });
      })
    }
  },

  create: (name, room, count) => {
    return dispatch => {
      dispatch({
        type: types.CREATE_EQUIPMENT_REQUEST
      });

      let comp = new Scorocode.Object("equipment");
      comp.set("name", name);
      comp.set("room", room); // значение поля id комнаты
      comp.set("count", count);
      comp.save().then(x => {
        dispatch({
          type: types.CREATE_EQUIPMENT_SUCCESS,
          payload: x.result
        });
      }).catch(e => {
        dispatch({
          type: types.CREATE_EQUIPMENT_FAILURE,
          error: e
        });
      });
    }
  },

  update: (id, name, count) => {
    return dispatch => {
      dispatch({
        type: types.UPDATE_EQUIPMENT_REQUEST,
      });

      let equip = new Scorocode.Object("equipment");
      // Вместо nklHmg6naO значение поля _id 
      equip.set("_id", id).set("name", name). set("count", count);
      equip.save().then((x) => {
        dispatch({
          type: types.UPDATE_EQUIPMENT_SUCCESS,
          payload: x.result
        });
      }).catch(e => {
        dispatch({
          type: types.UPDATE_EQUIPMENT_FAILURE,
          error: e
        });
      });
    }
  },

  delete: (id) => {
    return dispatch => {
      dispatch({
        type: types.DELETE_EQUIPMENT_REQUEST
      });

      let equip = new Scorocode.Object("equipment");
      // Вместо ZfPnb0TKwq значение поля _id
      equip.getById(id).then((item) => {
        equip.remove(item).then((x) => {
          dispatch({
            type: types.DELETE_EQUIPMENT_SUCCESS,
            payload: x.result
          });
        }).catch(e => {
          dispatch({
            type: types.DELETE_EQUIPMENT_FAILURE,
            error: e
          });
        });
      });
    }
  }
}