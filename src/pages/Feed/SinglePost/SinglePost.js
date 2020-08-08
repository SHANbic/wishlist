import React, { Component } from 'react';

import Image from '../../../components/Image/Image';
import './SinglePost.css';

class SinglePost extends Component {
  state = {
    title: '',
    price: '',
    purse: '',
    author: '',
    date: '',
    imageUrl: '',
    content: ''
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    fetch('/feed/post/' + postId, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch status');
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          title: resData.post.title,
          price: resData.post.price,
          purse: resData.post.purse,
          author: resData.post.creator.name,
          imageUrl: resData.post.imageUrl,
          projectUrl: resData.post.projectUrl,
          date: new Date(resData.post.createdAt).toLocaleDateString('fr-FR'),
          content: resData.post.content
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-post">
        <h1><a href={this.state.projectUrl} target='_blank'>{this.state.title}</a></h1>
        <h2>
          Proposé par {this.state.author} le {this.state.date}
        </h2>
        {this.state.imageUrl && <div className="single-post__image">
          <Image contain imageUrl={this.state.imageUrl} />
        </div>}
        <p>{this.state.content}</p>
        {this.state.price && <p>Montant à collecter: {this.state.price}€</p>}
        {this.state.purse && <p>Tirelire: {this.state.purse}€</p>}
      </section>
    );
  }
}

export default SinglePost;
