import React from 'react';
import uniqid from 'uniqid';
import { Grid, List } from 'semantic-ui-react';

const slogan = [
  { name: 'Exceller' },
  { name: 'Partager' },
  { name: 'Avancer' },
  { name: 'Echanger' },
];

const Footer = () => (
  <footer>
    <Grid divided="vertically" style={{ marginBottom: '5px' }} textAlign="center">
      <List horizontal>
        {slogan.map(element => <List.Item key={uniqid()} href="#">{element.name}</List.Item>)}
      </List>
    </Grid>

    <Grid divided="vertically" style={{ marginBottom: '5px' }} textAlign="center">
      <List.Item disabled>
          © Dartagnan - 2019
      </List.Item>
    </Grid>
  </footer>
);

Footer.defaultProps = {};

Footer.propTypes = {};

export default Footer;
