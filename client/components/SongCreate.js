import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit(event) {
    event.preventDefault();
    // Mutation -
    // Reach out to backend server and add a new song to collection of songs:
    this.props
      .mutate({
        // Insert all of the query variables that we want to have sent to the mutation
        // (note: 'this.state.title' is the value of the text input -
        // so what we're doing is taking the value out of the input, assign it to a 'title' query variable,
        // and then pass that into the mutation):
        variables: { title: this.state.title },

        // Refetch query after running mutation so that when user goes back to root,
        // they will salways ee an updated list of songs including the one that was just added.
        // The 'refetchQueries' property takes in an array of queries that we want to automatically rerun
        // after the mutation is successfully executed.
        // In this case, we want the 'fetchSongs' query to rerun fter the mutation is successfully executed.
        // Note that we imported our 'fetchSongs' query up above and named it 'query', which is the name we use here
        // (if our 'fetchSongs' query had variables associated with it, we pass them in as a second argument => refetchQuerises: [{ query: query, variables:  }] ):
        refetchQueries: [{ query: query }],

        // Have user navigate to index page ONLY AFTER a mutation has been successfully submitted to the server
        // The mutation above actually returns a promise, so we can chain a '.then' onto it,
        // and then, any code that we place inside the arrow function will ONLY BE EXECUTED AFTER the mutation has resolved successfully -
        // after the song has been successfully created.
        // And since there will be a little bit of a delay between the user hitting ENTER and actually getting navigated somewhere else,
        // we could also add a 'setState' in here to maybe show a spinner to the user if we wanted to.
        // To forcibly naviagate the user around, we can make direct access of the 'hashHistory' object ('hashHistory' comes from React Router),
        // and this will kick the user back to the root ('/') of our application:
      })
      .then(() => hashHistory.push('/'));
  }

  render() {
    return (
      <div>
        <Link to='/'>Back</Link>
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
