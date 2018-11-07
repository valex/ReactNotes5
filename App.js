import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from "./App/Components/HomeScreen";
import NoteScreen from "./App/Components/NoteScreen";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { fetchNotes } from './App/Actions/noteActions'
import reducersApp from './App/Reducers/Note';
import _ from "lodash";

const store = createStore(
    reducersApp,
    applyMiddleware(thunkMiddleware)
);

store.dispatch(fetchNotes());

export default class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        );
    }
}

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Note: {
            screen: NoteScreen,
            navigationOptions : ({ navigation }) => {
                let note = navigation.getParam('note');
                if( ! _.isNil(note) && note.title) {
                    return {
                        headerTitle: `${note.title}`,
                    }
                }
            },
        }
    },
    {
        initialRouteName: 'Home',
    }
);

