import React from 'react';

import PostlistItem from '../post-list-item';
import { ListGroup } from 'reactstrap';

import './post-list.css';

const Postlist = ({posts, onDelete, onToggleImportant, onToggleLike}) => {
    
    const elements = posts.map((item) => {

        if (typeof item === 'object' && isEmpty(item) && item.label) {
            const {id, ...itemProps} = item;

            return (
                <li key={id} className="list-group-item"> {/* Передаем id чтобы реакт запомнил какие элементы были на странице, чтобы не рендерить их заново. А новый обьект из сервера с новым id зарендерить */}
                    <PostlistItem 
                        {...itemProps} /* Поскольку свойство и значение совпадают,то можно использовать spred оператор */
                        onDelete={() => onDelete(id)}
                        onToggleImportant={() => onToggleImportant(id)}
                        onToggleLike={() => onToggleLike(id)}/>
                </li>
            )
        }
        return false;
    });

    function isEmpty(obj) {
        for (let key in obj) {
            return true;
        }
        return false;
    }

    return (
        <ListGroup className="app-list">
            {elements}
        </ListGroup>
        // <ul className="app-list list-group">
        //     {elements}
        // </ul>
    )
}

export default Postlist;