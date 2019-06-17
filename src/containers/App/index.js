import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import uniqid from 'uniqid';
import { Feed, Divider, Loader } from 'semantic-ui-react';

import { makeSelectSearchResults, makeSelectSearchFetching } from '../Search/selectors';
import Header from '../../components/Header';
import ResultItem from '../../components/Item';
import Footer from '../../components/Footer';
import SearchContainer from '../Search';
import AuthenticationContainer from '../Authentication';

const styles = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    width: '75vw',
    margin: '0 auto',
    marginBottom: '5vh',
    marginTop: '5vh',
    textAlign: 'center',
  },
  noContent: {
    margin: '0 auto',
    width: '100%',
  },
};

class AppContainer extends React.PureComponent {
  render() {
    const { results, isSearchFetching } = this.props;

    return (
      <div style={styles.main}>
        <Header
          authentication={<AuthenticationContainer />}
          search={<SearchContainer />}
        />

        <div style={styles.content}>
          {!results.length && !isSearchFetching && (
          <div style={styles.noContent}>
              Aucun tweet à afficher
            <br />
              Veuillez lancer une recherche pour voir les résultats
          </div>
          )}

          {isSearchFetching && (
          <Loader
            inline="centered"
            size="medium"
            content="Recherche des derniers tweets.."
            active
          />
          )}

          {!isSearchFetching && (
          <Feed style={{ margin: '0 auto' }}>
            {results.map(result => (
              <React.Fragment key={uniqid()}>
                <ResultItem {...result} />
                <Divider fitted />
              </React.Fragment>
            ))}
          </Feed>
          )}
        </div>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = () => createStructuredSelector({
  results: makeSelectSearchResults(),
  isSearchFetching: makeSelectSearchFetching(),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
