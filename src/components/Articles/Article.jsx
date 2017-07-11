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
        this.renderMark();
    }

    renderMark() {
        let marked = require('marked');
        let _article = marked('I am using __marked__.');
        this.setState({
            article: _article
        });
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
                    <textarea required rows='20' cols='100' placeholder='Hi, do some write?'></textarea>
                    <button>提交</button>
                </section>
                <section dangerouslySetInnerHTML={{__html: this.state.article}}></section>
            </main>
        )
    }

}

export default Article;