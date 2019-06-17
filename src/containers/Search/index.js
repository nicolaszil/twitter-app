import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Input, Icon } from 'semantic-ui-react'

import { searchResults } from './actions'

class SearchContainer extends React.PureComponent {
  state = {
    inputValue: ''
  }

  componentDidMount() {
    const query = sessionStorage.getItem('search-query')
    
    if (query) {
      const { searchResults } = this.props
      this.setState({ inputValue: query }, () => searchResults(this.state.inputValue))
    }
  }

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  }

  handleSearch = event => {
    if (!event) return
    
    if (event.type === 'click' || event.key === 'Enter') {
      const { searchResults } = this.props
      const { inputValue } = this.state
      
      const value = event.type === 'click' ? inputValue : event.target.value
      if (value.length > 2) searchResults(value)
    }
	}
  
  render() {
    const { inputValue } = this.state

    return (
      <React.Fragment>
        <Input
          icon={<Icon name='search' inverted circular link onClick={this.handleSearch} />}
          type="text"
          placeholder="C'est à quel sujet ?"
          value={inputValue}
          onKeyPress={this.handleSearch}
          onChange={this.handleChange}
          fluid
          focus
        />
      </React.Fragment>
    );
  };
};

const mapStateToProps = () => createStructuredSelector({})

const mapDispatchToProps = dispatch => ({
  searchResults: query => dispatch(searchResults(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
