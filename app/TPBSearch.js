import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TabBarIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

import Spinner from 'react-native-loading-spinner-overlay';

// Tabs
import Search from './tabs/Search';
import Top from './tabs/Top';

class TPBSearch extends Component{

  constructor( props ) {
    super( props );

    this.state = {
      loading: false,
      selectedTab: 'topTab'
    };
  }

  setLoading( status ) {
    this.setState({
      loading: status
    });
  }

  render(){
    return (
      <View style={{flex: 1 }}>
        <Spinner visible={this.state.loading} />
        <TabBarIOS
          tintColor="white"
          barTintColor="black">
          <Icon.TabBarItemIOS
            title="Top"
            iconName='star-o'
            selected={this.state.selectedTab === 'topTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'topTab',
              });
            }}>
            <Top setLoading={this.setLoading.bind( this )}/>
          </Icon.TabBarItemIOS>

          <Icon.TabBarItemIOS
            title="TV Shows"
            iconName='tv'
            selected={this.state.selectedTab === 'tvTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'tvTab',
              });
            }}>
            <Search category="tvshows" title="TV Shows" setLoading={this.setLoading.bind( this )}></Search>
          </Icon.TabBarItemIOS>

          <Icon.TabBarItemIOS
            title="Movies"
            iconName='film'
            selected={this.state.selectedTab === 'moviesTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'moviesTab',
              });
            }}>
            <Search category="movies" title="Movies" setLoading={this.setLoading.bind( this )}></Search>
          </Icon.TabBarItemIOS>
        </TabBarIOS>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

module.exports = TPBSearch;
