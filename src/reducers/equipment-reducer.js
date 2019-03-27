import {types} from '../actions/equipment-action';

const initState = {
  data: [],
  status: {
    loading: false,
    loaded: false,
    error: null
  }
};

export default function equipmentReducer(state = initState, action) {
  switch(action.type) {
    case types.GET_EQUIPMENTS_REQUEST: 
      return {
        ...state,
        status: {
          loading: true,
          loaded: false,
          error: null
        }
      };
    case types.GET_EQUIPMENTS_SUCCESS: 
      return {
        ...state,
        data: action.payload,
        status: {
          loading: false,
          loaded: true,
          error: null
        }
      };
    case types.GET_EQUIPMENTS_FAILURE:
      return {
        ...state,
        status: {
          loading: false,
          loaded: false,
          error: action.error
        }
      }
    default:
      return state;
  }
}