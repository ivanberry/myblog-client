import React, { Component } from 'react';
import Editor from '../Common/Editor';
import RaisedButton from 'material-ui/RaisedButton';

import axios from 'axios';

class Article extends Component {
    //get user's all articles or create new one
    constructor(props) {
        super(props);
        this.state = {
            status: true,
            articles: [],
            isPreview: false
        }
    }

    componentDidMount() {
        this.getAllArticles();
    }

    getAllArticles() {
        if (this.props.isAuthenticated) {
            axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/articles`)
                .then((res) => {
                    console.log(res.data);
                    this.setState({
                        articles: res.data.data.articles
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {

        }
    }

    handlerUserClick() {
        this.setState({
            status: !this.state.status
        });
        !this.state.status && this.getAllArticles();
    }

    toggleEditorPreview() {
        this.setState({
            isPreview: !this.state.isPreview
        });
        console.log(this.state.isPreview);
    }

    render() {
        return (
            <div>
                <div>
                    <RaisedButton
                        label="创建新的文章"
                        onTouchTap={this.handlerUserClick.bind(this)}
                    />

                    <RaisedButton
                        label="预览"
                        onTouchTap={this.toggleEditorPreview.bind(this)}
                    />
                </div>

                {this.state.status &&
                    <main>
                        {
                            this.state.articles.map((article, index) => {
                                return (
                                    <section key={index}>
                                        <h1>{article.title}</h1>
                                        <div dangerouslySetInnerHTML={{ __html: JSON.parse(article.body) }}></div>
                                        <br />
                                        <p>{article.pub_at}</p>
                                    </section>
                                )
                            })
                        }
                    </main>
                }
                {!this.state.status &&
                    <Editor
                        isAuthenticated={this.props.isAuthenticated}
                        isPreview={this.state.isPreview}
                    />
                }
            </div>
        )
    }

}

export default Article;