import {
  ADD_TECH,
  GET_TECHS,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR
} from "../actions/types";

const initialState = {
  techs: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload,
        loading: false
      };
    /**
     * Write the ADD_TECH case
     */
    case ADD_TECH:
      // action.payload is the new tech being added so we add to state.techs... i think
      state.techs.push(action.payload)
      // then returns to the new updated state
      return {
        ...state,
        techs: state.techs,
        loading: false
      }
    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter(t => t.id !== action.payload),
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case TECHS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false
      };
  }
};
