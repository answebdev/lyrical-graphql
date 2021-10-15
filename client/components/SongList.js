import React, { Component } from 'react';
import { Link } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    // Call mutation and pass along the ID as a query variable to that mutation -
    // define the query variables that we want to pass along
    this.props.mutate({ variables: { id: id } });

    // Refetch query after mutation runs (see notes in 'SongCreate' regarding 'refetchQueries'):
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className='collection-item'>
          {title}
          <i className='material-icons' onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ul className='collection'>{this.renderSongs()}</ul>
        <Link to='/songs/new' className='btn-floating btn-large red right'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    );
  }
}

// Define the query - now in a separate file in the 'queries' folder,
// which we can import and use in this file (see 'export' statement => we've name it 'query' when we imported it above)
// const query = gql`
//   {
//     songs {
//       id
//       title
//     }
//   }
// `;

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

// Bond the query and the component together:
// This is what actually executes the query when our SongList component gets rendered to the screen.
export default graphql(mutation)(graphql(query)(SongList));
