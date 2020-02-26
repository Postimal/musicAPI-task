const fetchReducer = (state,action) => {
    console.log(action)
    if(action.type === "SET_PARAM"){
      return{...state,
        param: action.payload,
      }
    }
    if(action.type === "LOADING"){
      return{
        ...state,
        loading: true,
        error: null,
        data: [],
      }
    }
    if(action.type === "RESPONSE_COMPLETED"){
      return{
        param: '',
        loading: false,
        error: null,
        data: action.payload,
        queryErrors: null
      }
    }
    if(action.type === "RESPONSE_FAILED"){
      return{
        param: '',
        loading: false,
        error: action.payload,
        data: [],
      }
    }
    if(action.type === "SET_QUERY_ERROR"){
      return{...state,
        queryErrors: action.payload
      }
    }
    return state
  };

  export default fetchReducer