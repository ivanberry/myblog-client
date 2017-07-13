import React, { Component } from 'react';
import Editor from '../Common/Editor';

import axios from 'axios';

class Article extends Component {
    //get user's all articles or create new one
    constructor(props) {
        super(props);
        this.state = {
            status: true,
            articles: []
        }
    }

    componentDidMount() {
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
    }

    handlerUserClick() {
        this.setState({
            status: !this.state.status
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handlerUserClick.bind(this)}>Create New Article</button>
                {this.state.status &&
                    <main>
                        {
                            this.state.articles.map((article) => {
                                return (
                                    <section>
                                        <h1>{article.titcle}</h1>
                                        <div>{article.body}</div>
                                        <br/>
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
                    />
                }
            </div>
        )
    }

}

export default Article;