
export const reducerActions = {
    updateSelectedShowID: "updateSelectedShowID",
    updateTierOrder: "updateTierOrder",
    updateItemBeingDragged:"updateItemBeingDragged",
    updateRowBeingAddedTo:"updateRowBeingAddedTo",
    updateMinFilter:"updateMinFilter",
    updateMaxFilter:"updateMaxFilter"
};

export const reducer = (state, action) => {
    switch(action.type) {
        case reducerActions.updateSelectedShowID:
            return{
                ...state, 
                tierOrder: {},
                selectedShowID: action.payload
            }
        case reducerActions.updateTierOrder:
            return{
                ...state, 
                tierOrder: action.payload
            }
        case reducerActions.updateItemBeingDragged:
            return{
                ...state, 
                itemBeingDragged: action.payload
            }
        case reducerActions.updateRowBeingAddedTo:
            return{
                ...state, 
                rowBeingAddedTo: action.payload
            }
        case reducerActions.updateMinFilter:
            return{
                ...state, 
                minFilter: action.payload
            }
        case reducerActions.updateMaxFilter:
            return{
                ...state, 
                maxFilter: action.payload
            }
        default:
            throw new Error("unrecognized reducer action")
    }
}