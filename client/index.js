import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const client = new ApolloClient({
  // 'o' is short for 'object'.
  // This line (i.e., piece of configuration) takes every single piece of data that is fetched by our Apollo client from the backend
  // and runs it through this function: o => o.id
  // Whatever is returned from this function is used to identify that piece of data inside of the Apollo client.
  // So what we're really saying here is 'go and fetch every piece of data you need, look at every single piece of data,
  // and use the 'id' field off of that record to identify that piece of data.
  // This means that whenever we make a query, WE HAVE TO MAKE SURE that we ask for the ID of every record and every query that we put together (i.e., use the 'id' in every query we create).
  // So if we do NOT provide an ID inside of a query, then Apollo will not be able to identify that piece of data, which we do NOT want to have happen.

  // We need to add this configuration because Apollo does not want to automatically assume that you want to use the 'id' property off of every record to identify it
  // (e.g., there may be cases where you do not serve out the 'id' with every piece of data, or maybe your IDs are not unique -
  // using this 'id' as an identifier only works when the IDs inside of our application are unique).
  dataIdFromObject: (o) => o.id,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={SongList} />
          <Route path='songs/new' component={SongCreate} />
          <Route path='songs/:id' component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
