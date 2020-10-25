const inputReducer = (state,action)=>{
    switch(action.type){
        case 'UPDATE_JSON_INPUT':
            return action.json ? {...state, json: action.json} : state;
        case 'UPDATE_EMV_INPUT':
            console.log(action.emv)
            return action.emv ? {...state, emv: action.emv} : state;
        default:
            return state;
    }
}

export default inputReducer;