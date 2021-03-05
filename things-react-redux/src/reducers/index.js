import { SET_ITEMS, ERROR } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_ITEMS:
      return { data: action.payload, isLoaded: true };
    case ERROR:
      return { error: action.payload };
    default:
      return state;
  }
}
