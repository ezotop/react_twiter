import React, { Component } from 'react';

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

// Создаем новый блок на основе AppBlock
// const StyledAppBlock = styled(AppBlock)`
//     background-color: grey;
// `;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {label: 'Going to learn react', important: true, id: 1}, /* id обьекта это набор символов создаваемый на сервере */
                {label: 'That is so good', important: false, id: 2},
                {label: 'I need a break...', important: false, id: 3}
            ]
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);

        this.maxId = 4;
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            
            // State напрямую никогда не изменяем!!! Можем полностью подставить другую внутрянку
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)]; // Обрезали массив до удаляемого элемента и обрезали от удаляемого элемента, спред оператором соединили в новом массиве

            return {
                data: newArr
            }
        });
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    render() {
        return (
            <AppBlock>
                <AppHeader/>
                <div className="search-panel d-flex">
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                    <Postlist
                    posts={this.state.data}
                    onDelete={this.deleteItem}/>
                    <PostAddForm
                    onAdd={this.addItem}/>
            </AppBlock>
        )
    }
}

// const App = () => {

//     const data = [
//         {label: 'Going to learn react', important: true, id: 'qwerty'}, /* id обьекта это набор символов создаваемый на сервере */
//         {label: 'That is so good', important: false, id: 'wasd'},
//         {label: 'I need a break...', important: false, id: 'zxcv'}
//     ];

//     return (
//         <AppBlock>
//             <AppHeader/>
//             <div className="search-panel d-flex">
//                 <SearchPanel/>
//                 <PostStatusFilter/>
//             </div>
//                 <Postlist
//                 posts={data}
//                 onDelete={id => console.log(id)}/>
//                 <PostAddForm/>
//         </AppBlock>
//         // <div className="app">
//         //     <AppHeader/>
//         //     <div className="search-panel d-flex">
//         //         <SearchPanel/>
//         //         <PostStatusFilter/>
//         //     </div>
//         //         <Postlist posts={data} />
//         //         <PostAddForm/>
//         // </div>
//     )
// }