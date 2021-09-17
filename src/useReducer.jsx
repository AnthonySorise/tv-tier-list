
export const reducerActions = {
    updateSelectedShowID: "updateSelectedShowID",
    updateTierOrder: "updateTierOrder",
    updateItemBeingDragged:"updateItemBeingDragged"
};

export const reducer = (state, action) => {
    switch(action.type) {
        case"updateSelectedShowID":
            return{
                ...state, 
                selectedShowID: action.payload
            }
        case"updateTierOrder":
            return{
                ...state, 
                tierOrder: action.payload
            }
        case"updateItemBeingDragged":
            return{
                ...state, 
                itemBeingDragged: action.payload
            }
        default:
            throw new Error("unrecognized reducer action")
    }
}