import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { logout } from './utils';
import routes from './routes';
import './index.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import 'react-notifications/lib/notifications.css'
import {
  faUser,
  faLock,
  faFolder,
  faFile,
  faFolderPlus,
  faFileUpload,
  faSignOutAlt,
  faChevronCircleLeft,
  faCloudUploadAlt,
  faTrashAlt,
  faWindowClose,
  faFileImage,
  faFileWord,
  faFilePdf,
  faFilePowerpoint,
  faFileExcel,
  faFileCode,
  faFileVideo,
  faFileArchive,
  faFileAudio,
<<<<<<< HEAD
  faFileAlt,
  faShareAltSquare,
=======
  faFileAlt
>>>>>>> 7956183d54df45bce15b31ba6400274422f30a71
} from '@fortawesome/free-solid-svg-icons';
library.add(
  faUser, 
  faLock, 
  faFolder, 
  faFile, 
  faFolderPlus, 
  faFileUpload, 
  faSignOutAlt, 
  faChevronCircleLeft,
  faCloudUploadAlt,
  faTrashAlt,
  faWindowClose,
  faFileImage,
  faFileWord,
  faFilePdf,
  faFilePowerpoint,
  faFileExcel,
  faFileCode,
  faFileVideo,
  faFileArchive,
  faFileAudio,
  faFileAlt,
  faShareAltSquare,
);

const httpLink = new HttpLink({ uri: process.env.REACT_APP_API + '/graphql' });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('jwt');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'X-Session-ID': token
    }
  };
});

const logoutLink = onError(({ networkError }) => {
  if (networkError.statusCode === 401) logout();
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authLink.concat(logoutLink.concat(httpLink)),
  cache
});

const App = () => (
  // <ApolloProvider client={client}>
    <Router>{renderRoutes(routes)}</Router>
  // </ApolloProvider>
);

export default App;
