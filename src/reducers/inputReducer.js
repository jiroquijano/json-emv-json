const inputReducer = (state,action)=>{
    switch(action.type){
        case 'UPDATE_JSON_INPUT':
            if(action.json){
                return {
                    ...state,
                    json: action.json
                }
            }else{
                return state;
            }
        default:
            return state;
    }
}

export default inputReducer;