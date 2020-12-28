import React, {Component} from 'react';

import './post-add-form.css';

export default class PostAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onValueChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.text);
        this.setState({
            text: '' // Очищаем input
        })
    }

    render() {
        return (
            <form
            className="bottom-panel d-flex"
            onSubmit={this.onSubmit}>
                <input
                    type="text"
                    placeholder="О чем вы думаете сейчас?"
                    className="form-control new-post-label"
                    onChange={this.onValueChange}
                    value={this.state.text} /* Делаем input контролируемым, для обратной связи между state и input */
                />
                <button
                    type="submit"
                    className="btn btn-outline-secondary"
                    /* onClick={() => onAdd('hello')} */> {/* Onclick уже не нужен, отслеживаем саму отправку формы */}
                        Добавить
                </button>
            </form>
        )
    }
}

// const PostAddForm = ({onAdd}) => {
//     return (
//         <form className="bottom-panel d-flex">
//             <input
//                 type="text"
//                 placeholder="О чем вы думаете сейчас?"
//                 className="form-control new-post-label"
//             />
//             <button
//                 type="submit"
//                 className="btn btn-outline-secondary"
//                 onClick={() => onAdd('hello')}>
//                     Добавить
//             </button>
//         </form>
//     )
// }