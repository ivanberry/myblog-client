import React, { Component } from 'react';
import Editor from '../Common/Editor';

class Article extends Component {
    //组件内包含两种状态：编辑和预览
    constructor() {
        super();
        this.state = {
            article: ''
        }
    }

    componentDidMount() {

    }
    

    render() {
        return (
            <Editor />
        )
    }

}

export default Article;