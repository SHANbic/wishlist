import React, { Component, Fragment } from 'react';
import Backdrop from '../../Backdrop/Backdrop';
import Modal from '../../Modal/Modal';
import Input from '../../Form/Input/Input';
import { required, length } from '../../../util/validators';

const POST_FORM = {
  title: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })]
  },
  imageUrl: {
    value: '',
    valid: true,
    touched: false,
    validators: [required]
  },
  content: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })]
  },
  projectUrl: {
    value: '',
    valid: true,
    touched: false,
    validators: []
  },
  price: {
    value: '',
    valid: true,
    touched: false,
    validators: []
  },
  purse: {
    value: '',
    valid: true,
    touched: false,
    validators: []
  },
};

class FeedEdit extends Component {
  state = {
    postForm: POST_FORM,
    formIsValid: false,
    imagePreview: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.editing &&
      prevProps.editing !== this.props.editing &&
      prevProps.selectedPost !== this.props.selectedPost
    ) {
      const postForm = {
        title: {
          ...prevState.postForm.title,
          value: this.props.selectedPost.title,
          valid: true
        },
        imageUrl: {
          ...prevState.postForm.imageUrl,
          value: this.props.selectedPost.imageUrl,
          valid: true
        },
        content: {
          ...prevState.postForm.content,
          value: this.props.selectedPost.content,
          valid: true
        },
        projectUrl: {
          ...prevState.postForm.projectUrl,
          value: this.props.selectedPost.projectUrl,
          valid: true
        },
        price: {
          ...prevState.postForm.price,
          value: this.props.selectedPost.price,
          valid: true
        },
        purse: {
          ...prevState.postForm.purse,
          value: this.props.selectedPost.purse,
          valid: true
        }
      };
      this.setState({ postForm: postForm, formIsValid: true });
    }
  }

  postInputChangeHandler = (input, value) => {
    this.setState(prevState => {
      let isValid = true;
      for (const validator of prevState.postForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.postForm,
        [input]: {
          ...prevState.postForm[input],
          valid: isValid,
          value: value
        }
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        postForm: updatedForm,
        formIsValid: formIsValid
      };
    });
  };

  inputBlurHandler = input => {
    this.setState(prevState => {
      return {
        postForm: {
          ...prevState.postForm,
          [input]: {
            ...prevState.postForm[input],
            touched: true
          }
        }
      };
    });
  };

  cancelPostChangeHandler = () => {
    this.setState({
      postForm: POST_FORM,
      formIsValid: false
    });
    this.props.onCancelEdit();
  };

  acceptPostChangeHandler = () => {
    const post = {
      title: this.state.postForm.title.value,
      imageUrl: this.state.postForm.imageUrl.value,
      projectUrl: this.state.postForm.projectUrl.value,
      content: this.state.postForm.content.value,
      price: this.state.postForm.price.value,
      purse: this.state.postForm.purse.value
    };
    this.props.onFinishEdit(post);
    this.setState({
      postForm: POST_FORM,
      formIsValid: false,
      imagePreview: null
    });
  };

  render() {
    return this.props.editing ? (
      <Fragment>
        <Backdrop onClick={this.cancelPostChangeHandler} />
        <Modal
          title="New Post"
          acceptEnabled={this.state.formIsValid}
          onCancelModal={this.cancelPostChangeHandler}
          onAcceptModal={this.acceptPostChangeHandler}
          isLoading={this.props.loading}
        >
          <form>
            <Input
              id="title"
              label="Title"
              control="input"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'title')}
              valid={this.state.postForm['title'].valid}
              touched={this.state.postForm['title'].touched}
              value={this.state.postForm['title'].value}
            />
            <Input
              id="imageUrl"
              label="Image"
              control="input"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'imageUrl')}
              valid={this.state.postForm['imageUrl'].valid}
              touched={this.state.postForm['imageUrl'].touched}
              value={this.state.postForm['imageUrl'].value}
            />
            {/* <div className="new-post__preview-image">
              {!this.state.imagePreview && <p>Please choose an image.</p>}
              {this.state.imagePreview && (
                <Image imageUrl={this.state.imagePreview} contain left />
              )}
            </div> */}
            <Input
              id="content"
              label="Content"
              control="textarea"
              rows="5"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'content')}
              valid={this.state.postForm['content'].valid}
              touched={this.state.postForm['content'].touched}
              value={this.state.postForm['content'].value}
            />
            <Input
              id="projectUrl"
              label="Project Url"
              control="input"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'projectUrl')}
              valid={this.state.postForm['projectUrl'].valid}
              touched={this.state.postForm['projectUrl'].touched}
              value={this.state.postForm['projectUrl'].value}
            />
            <Input
              id="price"
              label="Price"
              control="input"
              type='number'
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'price')}
              valid={this.state.postForm['price'].valid}
              touched={this.state.postForm['price'].touched}
              value={this.state.postForm['price'].value}
            />
            <Input
              id="purse"
              label="Purse"
              control="input"
              type='number'
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'purse')}
              valid={this.state.postForm['purse'].valid}
              touched={this.state.postForm['purse'].touched}
              value={this.state.postForm['purse'].value}
            />
          </form>
        </Modal>
      </Fragment>
    ) : null;
  }
}

export default FeedEdit;
