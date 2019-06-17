import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header as HeaderUI } from 'semantic-ui-react';

const Header = (props) => {
  const { search, authentication } = props;

  return (
    <header>
      <Grid divided="vertically" style={{ marginTop: '5px' }}>
        <Grid.Row columns={3}>
          <Grid.Column textAlign="center" verticalAlign="middle">
            <HeaderUI as="h1">
Dartagnan's
              <br />
Twitter App
            </HeaderUI>
          </Grid.Column>

          <Grid.Column textAlign="center" verticalAlign="middle">
            {search}
          </Grid.Column>

          <Grid.Column textAlign="center" verticalAlign="middle">
            {authentication}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </header>
  );
};

Header.defaultProps = {};

Header.propTypes = {
  search: PropTypes.node,
  authentication: PropTypes.node,
};

export default Header;
