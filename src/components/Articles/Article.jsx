import React, { Component } from 'react';

class Article extends Component {
    //组件内包含两种状态：编辑和预览
    constructor() {
        super();
        this.state = {
            article: '',
            preview: false
        }
    }

    componentDidMount() {
        // this.renderMark();
    }

    renderMark(value) {
        let marked = require('marked');
        let _article = marked(value);
        this.setState({
            article: _article
        });
    }

    // 输入即时展示，监听onChange事件
    handlerTextChange(event) {
        let value = event.target.value;
        this.renderMark(value);
    }

    render() {
        return (
            <main>
                <section>
                    <h1>Add New Article</h1>
                    <div>
                        <button>编辑</button>
                        <button>预览</button>
                    </div>
                    <textarea required rows='20' cols='100' placeholder='Hi, do some write?'  onChange={this.handlerTextChange.bind(this)}></textarea>
                    <button>提交</button>
                </section>
                <section dangerouslySetInnerHTML={{__html: this.state.article}}></section>
            </main>
        )
    }

}

export default Article;