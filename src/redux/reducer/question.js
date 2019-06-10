export default function question (state = [], action) {

    switch (action.type) {
        case 'CLICK':
            const state_1 =  state.map(v => {
                if (v.id === action.id) {
                    v.isClick = true
                }
                return v
            })
            return [...state_1]
        case "SELECT":
            const state_2 =  state.map(v => {
                if (v.id === action.id) {
                    v.value = action.value
                }
                return v
            })
            return [...state_2]
        case "ADDDATA":
            return action.data
        default:
            return state
    }
}