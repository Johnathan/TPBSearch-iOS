import React, { Component } from 'react';
import {
    SegmentedControlIOS,
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
    const self = this;

    this.props.setLoading( true );

    piratebay.top( piratebay.categories.video[category] ).then(function( results ){
      self.setState({
        list: results.length ? results : []
      });

      self.props.setLoading( false );
    });
  }

  updateCategory( event ) {
    const categories = ['tvshows', 'movies'];
    const category = categories[event.nativeEvent.selectedSegmentIndex];

    this.setState({
      category
    });

    this.getTop( category );
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
