import React from 'react';

import PostlistItem from '../post-list-item';

import './post-list.css';

const Postlist = () => {
    return (
        <ul className="app-list list-group">
            <PostlistItem/>
            <PostlistItem/>
            <PostlistItem/>
        </ul>
    )
}

export default Postlist;