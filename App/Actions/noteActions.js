import {
    CREATE_NOTE,
    CREATE_NOTE_SUCCESS,
    UPDATE_NOTE,
    DELETE_NOTE,
    DELETE_NOTE_SUCCESS,
    FETCH_NOTES_REQUEST,
    RECEIVE_NOTES, UPDATE_NOTE_SUCCESS, UPDATE_NOTE_IN_STORE
} from '../Constants/actionTypes';

import _ from "lodash";
import {AsyncStorage} from "react-native";

function requestNotes() {
    return {
        type: FETCH_NOTES_REQUEST
    }
}


function receiveNotes({notes}) {
    return {
        type: RECEIVE_NOTES,
        notes: notes,
        receivedAt: Date.now()
    }
}

// https://redux.js.org/advanced/asyncactions#actions-js-asynchronous
export function fetchNotes() {
    return function(dispatch) {

        dispatch(requestNotes());

        return AsyncStorage.getItem("@ReactNotes:notes")
            .then(
                result => {
                    return JSON.parse(result);
                },
                error => console.log('An error occurred.', error)
            )
            .then(
                result => {
                    dispatch(receiveNotes(result))
                }
            )
    };
}

export function createNoteSuccess(id) {
    return {
        type: CREATE_NOTE_SUCCESS,
        payload:{
            id: id
        }
    };
}

export function updateNote(id, title, body) {
    return function(dispatch, getState) {

        const { notes } = getState();

        let newNotes = Object.assign({}, notes);
        let newNote = {
            id : id,
            isSaved : true,
            title : title,
            body : body,
        };

        newNotes[id] = newNote;

        return AsyncStorage.setItem("@ReactNotes:notes", JSON.stringify({notes: newNotes}))
            .then(
                result => dispatch(updateNoteSuccess(newNote)),
                error => console.log('An error occurred.', error)
            )
    }
}

export function updateNoteSuccess(note) {
    return {
        type: UPDATE_NOTE_SUCCESS,
        payload:{
            note
        }
    };
}

export function updateNoteInStore(id, title, body) {
    return {
        type: UPDATE_NOTE_IN_STORE,
        payload:{
            id,
            title,
            body
        }
    };
}

export function deleteNote(id) {
    return function(dispatch, getState) {

        const { notes } = getState();

        let newNotes = Object.assign({}, notes);
        delete newNotes[id];

        return AsyncStorage.setItem("@ReactNotes:notes", JSON.stringify({notes: newNotes}))
            .then(
                result => dispatch(deleteNoteSuccess(id)),
                error => console.log('An error occurred.', error)
            )
    }
}

export function deleteNoteSuccess(id) {
    return {
        type: DELETE_NOTE_SUCCESS,
        payload:{
            id
        }
    };
}