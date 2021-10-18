import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  onLike(id, likes) {
    // console.log(id);
    // Call the mutation
    this.props.mutate({
      variables: { id: id },
      // Tell Apollo to use an optimistic response -
      // When this mutation runs, try to use this data as soon as possible:
      optimisticResponse: {
        // We need to specifically say that we are making a Mutation:
        __type: 'Mutation',
        // Provide the response that we expect to see from our backend server:
        likeLyric: {
          id: id,
          // This information comes from the Network tab in the console.
          __typename: 'LyricType',
          // This is the optimistic part of the response -
          // we are guessing that the request is going to go through successfully,
          // and we are hoping that when the response comes back, there's going to be an increment value
          // for the number of likes:
          likes: likes + 1,
        },
      },
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className='collection-item'>
          {content}
          <div className='vote-box'>
            <i
              className='material-icons'
              onClick={() => this.onLike(id, likes)}
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  }

  render() {
    return <ul className='collection'>{this.renderLyrics()}</ul>;
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
