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
        if (!this.props.isAuthenticated) {
            console.log('not allowed');
            return false;
        }
        axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/articles`, {
            body: JSON.stringify(this.state.body),
            title: 'title',
            user_id: 1
        })
            .then((res) => {
                this.setState({
                    message: res.data.message
                })
            }).catch((err) => {
                console.log(err);
            });
    }

    handlerUserUpload() {

    }

    renderMarked(event) {
        let _marked = require('marked');
        let target = event.target;
        let _content = _marked(target.value);
        this.setState({
            body: _content
        });
    }

    render() {
        return (
            <main className="editor-container">
                <section className="editor-wrap">
                    <textarea className="editor_edit" name="" id="" cols="100" rows="30" placeholder="Want to leave something?" onChange={this.renderMarked.bind(this)}></textarea>
                    <div className="marked-container_preview" dangerouslySetInnerHTML={{ __html: this.state.body }}></div>
                </section>
                <button className="button" type="sumnit" onClick={this.handlerUserSubmit.bind(this)}>保存</button>
            </main>
        )
    }
};

export default Editor;