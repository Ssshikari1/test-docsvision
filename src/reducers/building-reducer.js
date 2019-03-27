import {types} from '../actions/building-action';

const initState = {
  data: [],
  status: {
    loading: false,
    loaded: false,
    error: null
  }
};

export default function buildingReducer(state = initState, action) {
  switch(action.type) {
    case types.GET_BUILDINGS_REQUEST:
      return {
        ...state,
        status: {
          loading: true,
          loaded: false,
          error: null
        }
      };
    case types.GET_BUILDINGS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        status: {
          loading: false,
          loaded: true,
          error: null
        }
      };
    case types.GET_BUILDINGS_FAILURE:
      return {
        ...state,
        status: {
          loading: false,
          loaded: false,
          error: action.error
        }
      };
    default:
      return state;
  }
}