import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    Image
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import SearchBar from 'react-native-search-bar';
import MediaList from './partials/MediaList';

var piratebay = require( '../PirateBay.js' );

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      search: ''
    }
  }

  performSearch() {
    var self = this;

    this.props.setLoading( true );

    piratebay.search( piratebay.categories.video[this.props.category], this.state.search ).then(function( results ){
      self.setState({
        list: results.length ? results : []
      });

      self.props.setLoading( false );
    });


    this.refs.searchBar.unFocus();
  };

  componentDidMount() {
    // Automatically Focus Search Field
    // this.refs.searchBar.focus();
  }

  render() {
    return (
      <View style={{ flex: 1, }}>
        <NavigationBar
          title={{title: this.props.title}}/>

          <SearchBar
              ref='searchBar'
              placeholder='Search'
              onChangeText={(search) => this.setState({search})}
              onSearchButtonPress={this.performSearch.bind(this)}
              showsCancelButton={true}
              />

          <MediaList list={this.state.list} category={this.props.category}/>
      </View>

    );
  }
}
