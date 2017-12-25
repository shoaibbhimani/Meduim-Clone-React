import React from 'react';
import ReactMde, { ReactMdeCommands } from 'react-mde';
import styled from 'styled-components';
import { connect } from 'react-redux';

import 'normalize.css/normalize.css';
import 'react-mde/lib/styles/css/react-mde-all.css';
import 'font-awesome/css/font-awesome.css';

import * as actions from '../action-creators';

const CreatePostContainer = styled.section``;

const ButtonContainer = styled.section`
 text-align: center;
`;

const initialState = {
    reactMdeValue: { text: '', selection: null },
    title: '',
    thumbnail: '',
};

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState
  }

  onSubmit = event => {
    event.preventDefault();
    const { title, thumbnail, reactMdeValue } = this.state;
    const { createPost, history } = this.props;
    createPost({
      title,
      thumbnail,
      body: reactMdeValue.text,
    }, () => {
        history.push("/myblogs")
    });

    this.setState(initialState)
  };

  handleValueChange = value => {
    this.setState({ reactMdeValue: value });
  };

  changeThumbnail = event => {
    this.setState({
      thumbnail: event.target.value,
    });
  };

  changeTitle = event => {
    this.setState({
      title: event.target.value,
    });
  };

  render() {
    const { title, thumbnail } = this.state;
    return (
      <CreatePostContainer>
        <section className="row">
          <div className="col l3" />
          <form className="col l6" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder="Enter your Title"
                  id="first_name"
                  value={title}
                  onChange={this.changeTitle}
                  type="text"
                  className="validate"
                />
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.changeThumbnail}
                  value={thumbnail}
                  placeholder="Enter your Thumbnail link"
                  id="last_name"
                  type="text"
                  className="validate"
                />
              </div>
            </div>
              <section className="row">
                  <div className="col l12">
                      <ReactMde
                          textAreaProps={{
                              id: 'ta1',
                              name: 'ta1',
                          }}
                          value={this.state.reactMdeValue}
                          onChange={this.handleValueChange}
                          commands={ReactMdeCommands.getDefaultCommands()}
                      />
                  </div>
              </section>

              <ButtonContainer>
                  <button className="btn btn-large" type="submit">Create Post</button>
              </ButtonContainer>
          </form>
          <div className="col l3" />
        </section>
      </CreatePostContainer>
    );
  }
}

export default connect(null, actions)(CreatePost);