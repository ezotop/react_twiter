import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import Postlist from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';
import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`;

const StyledAppBlock = styled(AppBlock)` /* Создаем новый блок на основе AppBlock */
    background-color: grey;
`;

const App = () => {

    const data = [
        {label: 'Going to learn react', important: true, id: 'qwerty'}, /* id обьекта это набор символов создаваемый на сервере */
        {label: 'That is so good', important: false, id: 'wasd'},
        {label: 'I need a break...', important: false, id: 'zxcv'}
    ];

    return (
        <AppBlock>
            <AppHeader/>
            <div className="search-panel d-flex">
                <SearchPanel/>
                <PostStatusFilter/>
            </div>
                <Postlist posts={data} />
                <PostAddForm/>
        </AppBlock>
        // <div className="app">
        //     <AppHeader/>
        //     <div className="search-panel d-flex">
        //         <SearchPanel/>
        //         <PostStatusFilter/>
        //     </div>
        //         <Postlist posts={data} />
        //         <PostAddForm/>
        // </div>
    )
}

export default App;