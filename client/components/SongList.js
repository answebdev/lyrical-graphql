import React, { Component } from 'react';
import { Link } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    // Call mutation and pass along the ID as a query variable to that mutation -
    // define the query variables that we want to pass along
    this.props
      .mutate({ variables: { id: id } })
      // Refetch query after mutation runs (see notes in 'SongCreate' regarding 'refetchQueries').
      // Refetch list of songs from the backend - a different method than the 'refetchQueries' way of doing it => using the 'refetch' function.
      // The 'refetch' function will automatically re-execute any queries that are associated with the SongList component.
      // In this case, this component has exactly one query associated with it (the 'fetchSongs' query).
      // So we want to make sure that whenever we delete a song, it refetches the data that is associated with this 'fetchSongs' query.

      // 'refetch' vs' 'refetchQueries' (as in 'SongCreate.js').
      // It really depends on how you are trying to update your query associated with which component in your hierarchy.
      // In the SongCreate component, we want to update a query that is NOT associated with the SongCreate component -
      // it's associated with a totally different component in our application.
      // So we can not use 'this.props.data.refetch()' because the query that we want to refetch is not associated with the SongCreate component -
      // SongCreate has no idea that the query (the 'fetchSong' query) exists, as being tied with the SongCreate component.

      // However, the SongList component does receive that query inside the props ('this.props.data') object.
      // So since it came in as a prop, GraphQL knows that that query exists, and knows that it is associated with SongList,
      // and so it's going to modify the 'refetch' function (see below) to make sure that whenever we call it,
      // it will refetch the query that is associated with the component.

      // Using 'refetch' is the most simple, most straightforward way of rerunning a query.
      // It forces the query to rerun on the server, and so it's going to blow away any existing fetch data we have to rerender our component.
      // IN GENERAL: If you want to update the data associated with a particular component, just use 'refetch'.
      .then(() => this.props.data.refetch());
  }
  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className='collection-item'>
          <Link to={`/songs/${id}`}>{title}</Link>
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
