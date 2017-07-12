//editor component with preview
import React, { Component } from 'react';
import './Editor.css';

import axios from 'axios';

class Editor extends Component {

    constructor(props) {
        super(props);

        //双屏编辑
        this.state = {
            body: '',
            title: 'Test',
            message: ''
        }
    }

    componentDidMount() {

    }

    handlerUserSubmit() {
        axios.post(`${process.env.REACT_APP_USERS_SERVICE}/articles`, {
            body: 'title',
            title: 'title',
            user_id: 1
        })
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
                // this.setState({
                //     message: err.data.message
                // })
            });
    }

    renderMarked(event) {
        let _marked = require('marked');
        let target = event.target;
        let _content = _marked(target.value);
        this.setState({
            content: _content
        });
    }

    render() {
        return (
            <main className="editor-container">
                <section className="editor-wrap">
                    <textarea className="editor_edit" name="" id="" cols="100" rows="30" placeholder="Want to leave something?" onChange={this.renderMarked.bind(this)}></textarea>
                    <div className="marked-container_preview" dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
                </section>
                <button className="button" type="sumnit" onClick={this.handlerUserSubmit.bind(this)}>保存</button>

                <pre>
                    {this.state.message}
                </pre>
            </main>
        )
    }
};

export default Editor;