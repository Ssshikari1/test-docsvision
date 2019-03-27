import { combineReducers } from 'redux';
import buildingReducer from './building-reducer';
import equipmentReducer from './equipment-reducer';

export const rootReducer = combineReducers({
  building: buildingReducer,
  equipment: equipmentReducer
});