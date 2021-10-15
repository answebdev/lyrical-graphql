import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit(event) {
    event.preventDefault();
    // Reach out to backend server and add a new song to collection of songs:
    this.props.mutate({
      variables: {
        // Insert all of the query variables that we want to have sent to the mutation
        // (note: 'this.state.title' is the value of the text input -
        // so what we're doing is taking the value out of the input, assign it to a 'title' query variable,
        // and then pass that into the mutation):
        title: this.state.title,
      },
    });
  }

  render() {
    return (
      <div>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={(event) => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
