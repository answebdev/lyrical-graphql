import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {
  render() {
    console.log(this.props);
    return <div>SongList</div>;
  }
}

// Define the query
const query = gql`
  {
    songs {
      title
    }
  }
`;

// Bond the query and the component together:
// This is what actually executes the query when our SongList component gets rendered to the screen.
export default graphql(query)(SongList);
