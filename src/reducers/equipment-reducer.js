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
    case types.CREATE_EQUIPMENT_REQUEST:
      return {
        ...state,
        status: {
          loading: true,
          loaded: false,
          error: null
        }
      };
    case types.CREATE_EQUIPMENT_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
        status: {
          loading: false,
          loaded: true,
          error: null
        }
      };
    case types.CREATE_EQUIPMENT_FAILURE:
      return {
        ...state,
        status: {
          loading: false,
          loaded: false,
          error: action.error
        }
      }
    case types.UPDATE_EQUIPMENT_REQUEST:
      return {
        ...state,
        status: {
          loading: true,
          loaded: false,
          error: null
        }
      };
    case types.UPDATE_EQUIPMENT_SUCCESS:
      return {
        ...state,
        data: state.data.map(x => {
          if (x._id === action.payload._id) {
            return action.payload;
          }
          return x
        }),
        status: {
          loading: false,
          loaded: true,
          error: null
        }
      };
    case types.UPDATE_EQUIPMENT_FAILURE:
      return {
        ...state,
        status: {
          loading: false,
          loaded: false,
          error: action.error
        }
      }
    case types.DELETE_EQUIPMENT_REQUEST:
      return {
        ...state,
        status: {
          loading: true,
          loaded: false,
          error: null
        }
      };
    case types.DELETE_EQUIPMENT_SUCCESS:
      return {
        ...state,
        data: state.data.filter(x => { return x._id !== action.payload }),
        status: {
          loading: false,
          loaded: true,
          error: null
        }
      };
    case types.DELETE_EQUIPMENT_FAILURE:
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