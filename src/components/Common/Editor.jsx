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
            message: '',
            q_token: '',
            q_file: null,
            Q_UPLOAD_URL: 'http://up-z2.qiniu.com/',
            default_upload_domain: 'http://ot0199r6d.bkt.clouddn.com/',
            q_back_src: ''
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

        let formData = new FormData();
        let that = this;

        formData.append('key', new Date().getTime() + '_' + this.state.q_file[0].name);
        formData.append('file', this.state.q_file[0]);
        formData.append('token', this.state.q_token);

        //post to qiniu, formData, key, token, file
        const url = this.state.Q_UPLOAD_URL;

        axios.post(url, formData)
            .then((res) => {
                that.setState({
                    q_back_src: that.state.default_upload_domain + res.data.key
                });
            });
    }

    handlerFilesChange(event) {
        let files = event.target.files;
        this.setState({
            q_file: files
        });
    }

    getUploadToken() {
        var that = this;
        //get upload token from application server
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/auth/qiniu`)
            .then((res) => {
                that.setState({
                    q_token: res.data.q_token
                });
            })
            .catch((err) => {
                console.log(err);
            })
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
                <input type="file" onChange={(event) => this.handlerFilesChange(event)} />
                <button className="button" type="sumnit" onClick={this.handlerUserSubmit.bind(this)}>保存</button>
                <button onClick={this.handlerUserUpload.bind(this)} >上传</button>
                {this.props.isAuthenticated &&
                    <button onClick={this.getUploadToken.bind(this)}>获取上传token</button>
                }
                <div>
                    <img src={this.state.q_back_src} alt="image from QINIU" />
                </div>
            </main>
        )
    }
};

export default Editor;