const inputReducer = (state,action)=>{
    switch(action.type){
        case 'UPDATE_JSON_INPUT':
            return action.json ? {json: action.json} : state;
        case 'UPDATE_EMV_INPUT':
            return action.emv ? {emv: action.emv} : state;
        default:
            return state;
    }
}

export default inputReducer;