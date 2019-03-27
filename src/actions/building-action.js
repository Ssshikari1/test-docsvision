import Scorocode from 'scorocode';

export const types = {
  GET_BUILDINGS_REQUEST: 'GET_BUILDINGS_REQUEST',
  GET_BUILDINGS_SUCCESS: 'GET_BUILDINGS_SUCCESS',
  GET_BUILDINGS_FAILURE: 'GET_BUILDINGS_FAILURE',
};

export default {
  get: () => {
    return dispatch => {
      dispatch({
        type: types.GET_BUILDINGS_REQUEST
      });

      var buildings = new Scorocode.Query("buildings");
      buildings.find().then((finded) => {
        dispatch({
          type: types.GET_BUILDINGS_SUCCESS,
          payload: finded.result
        });
      }).catch(e => {
        dispatch({
          type: types.GET_BUILDINGS_FAILURE,
          error: e
        });
      });
    }
  }
}