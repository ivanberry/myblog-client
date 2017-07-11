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

    render() {
        return (
            <section>
                <h1>Add New Article</h1>
                <div>
                    <button>编辑</button>
                    <button>预览</button>
                </div>
                <textarea required rows='20' cols='100' placeholder='Hi, do some write?'></textarea>
            </section>

        )
    }

}

export default Article;