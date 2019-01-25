import { combineReducers } from 'redux';
import display from './display';
import text from './text';
import set from './set';
import volume from './volume';
import keys from './keys';

const rootReducer = combineReducers({
  display,
  text,
  set,
  volume,
  keys
});

export default rootReducer;
