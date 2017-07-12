//editor component with preview
import React, { Component } from 'react';
import './Editor.css';

class Editor extends Component {

    constructor(props) {
        super(props);

        //双屏编辑
        this.state = {
            content: ''
        }
    }

    componentDidMount() {

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
                <button className="button" type="sumnit">保存</button>
            </main>
        )
    }
};

export default Editor;