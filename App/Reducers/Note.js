import {
    UPDATE_NOTE_SUCCESS,
    RECEIVE_NOTES,
    DELETE_NOTE_SUCCESS, CREATE_NOTE_SUCCESS, UPDATE_NOTE_IN_STORE
} from '../Constants/actionTypes';

const initialState = {notes:{
        1:{title:"Note 1", body:"Body 1", id:1},
        2:{title:"Note 2", body:"Body 2", id:2}
    }};

export default function appReducers(state = initialState, action = {}) {

    // if (typeof state === 'undefined') {
    //
    // }

    let newNotes, tmpNote;
    switch (action.type) {
        case CREATE_NOTE_SUCCESS:
            newNotes = Object.assign({}, state.notes);
            newNotes[action.payload.id] = {
                id : action.payload.id,
                title: '',
                body: '',
            };

            return {notes:newNotes};

        case UPDATE_NOTE_IN_STORE:
            newNotes = Object.assign({}, state.notes);

            tmpNote = Object.assign({}, newNotes[action.payload.id], {
                    title: action.payload.title,
                    body:action.payload.body
            });

            newNotes[action.payload.id] = tmpNote;

            return {notes:newNotes};

        case UPDATE_NOTE_SUCCESS:
            newNotes = Object.assign({}, state.notes);
            newNotes[action.payload.note.id] = action.payload.note;

            return {notes:newNotes};

        case DELETE_NOTE_SUCCESS:
            newNotes = Object.assign({}, state.notes);
            delete newNotes[action.payload.id];

            return {notes:newNotes};

        case RECEIVE_NOTES:
            newNotes = Object.assign({}, action.notes);

            return {notes:newNotes};
        default:
            return state
    }
}