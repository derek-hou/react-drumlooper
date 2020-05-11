// this is like a router file in Angular
export default (state, action) => {
    
    switch(action.type) { 
        case 'TOGGLE_BEAT':
            const copyState = { ...state };
            copyState.tracks[action.payload.id-1].beats[action.payload.index].selected = !state.tracks[action.payload.id-1].beats[action.payload.index].selected;
            //console.log(copyState)
            return copyState;

            // return {
            //     ...state,
            //     tracks: state.tracks[action.payload.id].beats[action.payload.index].selected = !state.tracks[action.payload.id].beats[action.payload.index].selected
            // }
        default:
            return state;
    }
}