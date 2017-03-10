import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    ListView,
    TouchableHighlight,
    Image,
    View
} from 'react-native';

var tnp = require('torrent-name-parser');

const downloadBase64Icon = 'data:image/png;base64,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';
const loadingBase64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAACN1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9pu+VyAAAAvHRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRocHR4fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0lKS0xNTk9QUVJUVldYWVtcXV5fYWJjZGZnaGlrbG1vcHFzdHV3eHl7fH5/gIKDhYaIi4yOj5GSlJWXmJqbnZ6goqOlpqiqq62vsLK0tbe5ury+wMHDxcfIyszOz9HT1dfZ2tze4OLk5ujp6+3v8fP19/n7/bGiD98AAA0FSURBVHja7V35QxRHFq7umYEBHEBEJaCiKEQ0GqPxWKPrhVdE40GyWaPxgihGjctq4hGvGPBAjeIRUUE5ROKJ3Ef/cZGRAWa6X3VVdVdXGer7uesd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';
const tickBase64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAAzFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////86kuEIAAAAQ3RSTlMAAQIDBAUGBwgJCwwODxASExQVFhcaGxwdHiQmJyowOEZeYWlwc4iRmrS5vsDDxcfKzM7P1dna4uTo6e3v8fP19/n7iNWGAAAAA9hJREFUeNrt3Nd2E0EQhOGRLJIBkREmY3JOxoDBskS//ztxYYyTtNqdndDdVfUAc87330+HwHEcx3Ecx3Ecx3Ecx5ndmYsjZP7DDyLy+fEAlD98JfvbugzpH72Vg00niP53crjZBNsPWOCEH67AKT9YgQV+qAIL/UAFlvhhCiz1gxRo8EMUaPQDFFjhd19gpd95gRZ+1wVa+R0XaOl3W6C132mBDn6XBTr5HRbo6HdXoLPfWYEIv6sCUX5HBSL9bgpE+50U6OF3UaCX30GBnn7zBXr7jRdI4DddIInfcIFEfrMFkvmNFkjoN1kgqd9ggcR+cwWS+40VyOA3VSCL31CBTH4zBbL5jRTI6DdRIKtfZHYb2y+yewnbL/JtiO0XeQLul98DbL/IdXC/3AP3yw1w/+4A2y+b4P7tIbZ/Osb2z++A+zfop59++umnn3766aeffvrpp59++umnn3766aeffvobN7g6WQf2rz2disjXR6j+K9//Pfv6HKR/svf/4Z9jRP/syNM7Y2x/fAEv/tgCfvxxBTz5Ywr48ncv4M3ftYA/f7cCHv1dCvj0ty/g1d+2gF9/uwKe/W0K+PavLuDdv6qAf39zAQR/UwEM//ICKP5lBXD8iwsg+RcVwPKfLoDmP1kAz3+8AKL/aAFM/2EBVP9BAVz/fgFkv8jOGNsvsvMR219w9NNPP/30008//fTTH79b4P71X9j+8Abcfx/cH16A+8MWuD9Mwf3hE7g/PAf3h5vg/hBegvvD2hdsfwjnt7H9IVzYxvZbKJD7/7P2Avn/f+suUOL/u+YCZf7/6y1Q6v6B1gLl7j/oLFDy/oXGAmXvf+grUPr+ibYC5e+/6CpQ4/6NpgJ17v/oKVDr/pGWAvXuP+koUPP+lYYCde9/1S9Q+/5Z7QL177/VLaDh/l3NAjru/9UroOX+Ya0Ceu4/1img6f5ljQK67n+WL6Dt/mnpAvruv5YtoPH+bckCKu//Fiyg01+ugFZ/qQJ6/WUKaPaXKKDbn7+Adn/uAvr9eQtY8OcsYMOfr4AVf64Cdvx5Cljy5yhgy5++gDV/6gL2/GkLWPSnLGDTn66AVX+qAnb9aQpY9qcoYNvfv4B1f98C9v39Cnjw9yngwx9fwIs/toAff1wBT/6YAr783Qt483ct4M/frYBHf5cCPv3tC3j1ty3g19+ugGd/mwK+/asLePevKuDf31wAwd9UAMO/vACKf1kBHP/iAkj+RQWw/KcLoPlPFsDzHy+A6A/h7PsD/49rAXKDzbnIH5k/GwXUDe9uPNgYBo7jOI7jOI7jOI7jOI7TuL/OhrIas3WI7wAAAABJRU5ErkJggg==';

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
    var parsedTitle = tnp( title );

    var title = '';

    if( ['tvshows'].indexOf( this.props.category ) > -1 )
    {
      title = parsedTitle.title;

      if( typeof parsedTitle.season != 'undefined' ) title += ' Season ' + parsedTitle.season;
      if( typeof parsedTitle.episode != 'undefined' ) title += ' Episode ' + parsedTitle.episode;
    }

    if( ['movies'].indexOf( this.props.category ) > -1 )
    {
      title = parsedTitle.title;

      if( typeof parsedTitle.year != 'undefined' ) title += ' (' + parsedTitle.year + ')';
    }

    return title;
  }

  downloadTorrent( magnet ) {
    fetch('https://tpbsearch.1707.pro', {
      method: 'POST',
      body: JSON.stringify({
        magnet: magnet
      })
    }).then(function( response ){
      console.log( response );
    }).catch(function( error ){
      console.log( error );
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
            <Image style={styles.downloadButtonIcon} source={{uri: downloadBase64Icon, scale: 1}}></Image>
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
