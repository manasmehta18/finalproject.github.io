import React from 'react';
import { createStore, StoreProvider } from 'easy-peasy';
import model from './store';
import FeedContainer from './FeedContainer'

export default function App(props) {

    const store = createStore(model);

    const song = {title: "asdf", artist: "asdf", file: 0},
          user = {username: "XxX_420_newbRekr_69_XxX", name: "Bob"},
          options  = {height: 0, length: 0};

    return (
        <StoreProvider store={store}>
            <FeedContainer />
        </StoreProvider>
    )

}