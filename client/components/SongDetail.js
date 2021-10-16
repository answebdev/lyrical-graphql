import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';

class SongDetail extends Component {
  render() {
    // console.log(this.props);

    // Destructure
    const { song } = this.props.data;

    // If there is no song yet (i.e., the query is still pending), show "Loading..." (could also show a spinner here - or you can choose to not show anything =>
    // it might be more annoying for a user to see "Loading..." flash for a split second):
    if (!song) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>{song.title}</h3>
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: (props) => {
    return { variables: { id: props.params.id } };
  },
})(SongDetail);
