import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map((song) => {
      return (
        <li key={song.id} className='collection-item'>
          {song.title}
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return <ul className='collection'>{this.renderSongs()}</ul>;
  }
}

// Define the query
const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

// Bond the query and the component together:
// This is what actually executes the query when our SongList component gets rendered to the screen.
export default graphql(query)(SongList);
