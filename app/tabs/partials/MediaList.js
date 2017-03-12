import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ListView,
    TouchableHighlight,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

var tnp = require('torrent-name-parser');

class MediaList extends Component {
  constructor(props) {

    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      list: ds.cloneWithRows( this.props.list ),
    }
  }

  componentWillReceiveProps( props ) {
    this.setState({
      list: this.state.list.cloneWithRows( props.list )
    });
  }

  renderTitle( title ) {
    const parsedTitle = tnp( title );

    // See if we can return a prettier version of the title
    // tv - season number, episode number
    // movie - year
    let prettyTitle = '';

    switch ( this.props.category ) {
      case 'tvshows':
        prettyTitle = parsedTitle.title;

        if( typeof parsedTitle.season != 'undefined' ) prettyTitle += ' Season ' + parsedTitle.season;
        if( typeof parsedTitle.episode != 'undefined' ) prettyTitle += ' Episode ' + parsedTitle.episode;
        break;
      case 'movies':
        prettyTitle = parsedTitle.title;
        if( typeof parsedTitle.year != 'undefined' ) prettyTitle += ' (' + parsedTitle.year + ')';
      break;
    }

    return prettyTitle;
  }

  downloadTorrent( magnet ) {

    // Send the magnet link to the "queue" server
    fetch('https://tpbsearch.1707.pro', {
      method: 'POST',
      body: JSON.stringify({
        magnet: magnet
      })
    });
  }

  renderRow( data ) {
    return (
      <View style={styles.row}>
        <View style={styles.titleContainer}>
          <Text style={styles.torrentTitle}>{this.renderTitle( data.title )}</Text>
          <Text style={styles.originalTorrentName}>{data.title}</Text>
        </View>
        <TouchableHighlight onPress={()=>this.downloadTorrent( data.magnetLink )}>
          <View>
            <Icon name="cloud-download" size={20}/>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
      return (
        <ListView
          dataSource={this.state.list}
          enableEmptySections={true}
          renderRow={(rowData) => this.renderRow( rowData )}
        />
      );
    }
}

const styles = StyleSheet.create({
  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#b3b3b3',
    flexDirection: 'row',
  },

  torrentTitle: {
    fontWeight: 'bold'
  },

  originalTorrentName: {
    fontSize: 10,
    color: '#c7c7c7',
    paddingTop: 5
  },

  titleContainer: {
    flex: 1,
  },

  downloadButtonIcon: {
    flex: 1,
    resizeMode: 'contain',
    width:20,
    height:20,
  }
});

export default MediaList;
