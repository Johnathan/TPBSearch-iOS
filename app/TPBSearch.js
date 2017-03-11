import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'


// Tabs
import Search from './tabs/Search';
import Top from './tabs/Top';

class TPBSearch extends Component{

  constructor( props ) {
    super( props );

    this.state = {
      selectedTab: 'topTab'
    };
  }

  render(){
    return (
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
          <Top/>
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
          <Search category="tvshows" title="TV Shows"></Search>
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
          <Search category="movies" title="Movies"></Search>
        </Icon.TabBarItemIOS>
      </TabBarIOS>
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
