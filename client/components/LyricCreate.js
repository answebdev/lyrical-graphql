import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { content: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    // Call mutation associated with LyricCreate component
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          // We need to pass down the ID of the particular song as a prop from the SongDetail component to this LyricCreate component.
          // Once we pass it down as a prop, we have access to it here in 'songId'.
          // To do this, we go to the SongDetail component and make sure we pass down 'songId' as a prop.
          // We pass it into the LyricCreate component like this: <LyricCreate songId={this.props.params.id} />
          songId: this.props.songId,
        },
      })
      .then(() => this.setState({ content: '' }));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={(event) => this.setState({ content: event.target.value })}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        content
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
