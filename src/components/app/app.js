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
                {label: 'Going to learn React', important: false, like: false, id: 1}, /* id обьекта это набор символов создаваемый на сервере */
                {label: 'That is so good', important: false, like: false, id: 2},
                {label: 'I need a break...', important: false, like: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        //this.maxId = 4;
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
        }

        let keys = [];
        this.state.data.forEach(obj => {
            keys.push(obj.id);
        });

        const getId = (n = 7) => {
            const symbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            let newId;
            for (let i = 0; i < n; i++) {
                newId += symbols[Math.round(Math.random() * (symbols.length))] + '';
            }
            return newId;
        }
        getId();
        

        keys.forEach(key => {
            if (key === getId) {
                getId();
            } else {
                newItem.id = getId().replace(/^undefined/gi, '');
            }
        });

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, important: !old.important}; //То что идет за обьектом, перезапишет свойство старого обьекта
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        });
    }

    onToggleLike(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, like: !old.like}; //То что идет за обьектом, перезапишет свойство старого обьекта
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        });
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        });
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like);
        } else {
            return items
        }
    }

    onUpdateSearch(term) {
        this.setState({term});
    }

    onFilterSelect(filter) {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;

        const liked = data.filter(item => item.like).length; //Получаем к-во элементов в массиве у которых like стоит в true
        const allPosts = data.length; //К-во всех постов

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <AppBlock>
                <AppHeader
                liked={liked}
                allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
                    <Postlist
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLike={this.onToggleLike}/>
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