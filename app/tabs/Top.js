import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    SegmentedControlIOS,
    Image,
    View
} from 'react-native';

import NavigationBar from 'react-native-navbar';

import MediaList from './partials/MediaList';

var piratebay = require( '../PirateBay.js' );

export default class Top extends Component {
  constructor(props) {
    super(props);


    this.state = {
      list: [],
      category: 'tvshows'
    }
  }

  componentDidMount() {
    this.getTop( 'tvshows' );
  }

  getTop( category ) {
    var self = this;

    piratebay.top( piratebay.categories.video[category] ).then(function( results ){
      self.setState({
        list: results.length ? results : []
      });
    });
  }

  updateCategory( event ) {
    var categories = ['tvshows', 'movies'];

    this.setState({
      category: categories[event.nativeEvent.selectedSegmentIndex]
    });

    this.getTop( categories[event.nativeEvent.selectedSegmentIndex] );

  }

  render() {
      return (
        <View style={{ flex: 1, }}>
          <NavigationBar
            title={{title: 'Top 100'}}/>

            <View style={{margin: 10}}>
              <SegmentedControlIOS values={['TV Shows', 'Movies']} selectedIndex={0} onChange={this.updateCategory.bind(this)} />
            </View>

            <MediaList list={this.state.list} category={this.state.category}/>
        </View>
      );
    }
}
