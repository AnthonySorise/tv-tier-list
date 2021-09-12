interface stateInterface {
    selectedShowID: number,
    tierOrder:number[][]
}
type ACTIONTYPES = 
{type:"updateSelectedShowID"; payload:number} |
{type:"updateTierOrder"; payload:number[][]}

const Reducer = (state: stateInterface, action:ACTIONTYPES) => {
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
        default:
            throw new Error("unrecognized reducer action")
    }
}
export default Reducer;