const initialState = {
  isLoggedIn: false,
  clickedFlight:{},
  AlertFlight:{},
  AlertUserDetail:{}
};

export default function Reducers(state = initialState, action) {
  switch (action.type) {
    case "CLICKED_FLIGHT":
      return { ...state, clickedFlight: action.payload };
    
      case "ALERT_FLIGHT":
      return {...state, AlertFlight:action.payload}

      case "ALERT_USER_DETAIL":
        return {...state, AlertUserDetail:action.payload}
    default:
      return state;
  }
}
