import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';

// Icons
const settingsBase64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAACPVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9qcjBRAAAAvnRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT9AQUJDREVGR0lKS0xNTk9QUVJUVVZXWFlbXF1eX2FiY2RmZ2hpa2xtb3Bxc3R1d3h5e3x+f4CCg4WGiImLjI6PkZKUlZeYmpudnqCio6WmqKqrra+wsrS1t7m6vL7AwcPFx8jKzM7P0dPV19na3N7g4uTm6Onr7e/x8/X3+fv9BV29BwAAEeNJREFUGBndwYlDFGXjB/DvzOxyeiCHoCKilJXZi0ep5VseP01L80rzrOx4Te3wrdQUM++rUhMx9NU0UQwxQUXYXdj9/m0/bJ9nnll2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';
const tvBase64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAABKVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+x42oeAAAAYnRSTlMAAQIDBAUGBwgJCwwNDxAUFSkqLC4vMzQ2Nzg5Oj0/QEJDRUdJS0xNUlZXYmNkZmttb3Bxc3R1eX6Ag4iLjJ2jpaaoqq2wsrW5usXHzM7T1dfZ3ODi5Obo6evt7/Hz9/n7/QXv6BQAAALlSURBVHja7dtbVxJRGIfx/8Bw0krLIg/ZwYpOdIIyK8uorDRMzCBDwtjf/0N0YRnOqGt1w8za7/Nc7ivf34Jhz7uWEhERERERERERERERkdHGpmtvNn84L+u23j2ZO3XS9GGl6bzvy+38MeNnqn1nol+PwqPmP9d2Ztopx8YP6s5US0Hk47/ijLWaPTT/R2eu9SGBYMUZ7MO/b0HdmezFwfPfGW32zwOgbRVgNydJqjqzPZOksG8XYFCUVHGGuydpwzLAN2ncmW5CM7YBrqsWO+tdKwRelr+0Ext2WY3Y/Gf83XeVOrE3ArWiRws+b/zK0Wn31I0eFX0GyMa+A4qdZLxe+gIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGkE6EZPij7Pn40DtKInCz4DlKPT7qkRPeqd9nf+Uic67brqsQ9F72oh8LL83PfYsMuacaa7oXHbAJPShuX525JuWQaoSgr7hgFKkvTA7vxL+7ejjtX5e7n968GUVYD5vxekRZvzvzq4IQZvLc6/NvTem1mzN38zHH5LyJj7DHwKD78nBcaeAy/je58pQ7+Gu7NHbkvuG7kTDp7mjtkXhJWm/+Nv3S2ctDMZm641NrueXvy23i/Op2XfNRH9617LVgAAAAAAAAAAAAAAAAAAAAAAYBBg0jOAs6uj3iduPw5TNP/NJDZcrfQI5AeJ7PgepgbgfEL73dQAXE5ozZsagCsAAAAAAAAAYBfA/D3gQjLzf00NQCEZgFp63gbvJDH/di5F78MXP496/J/P8ynbiYz4H4BERERERERERERERERE/9dvNELaLdzmwzEAAAAASUVORK5CYII=';
const movieBase64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAA1VBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////CNNypAAAARnRSTlMAAQIDBAUMDRMUFR8gIScrLS4wMTM2Nz4/QExOUFRWV1xiZIWGiIyOkaCipaaqq7m6vL7Aw9HT2tze4OLk6Onr7/Hz9ff9LNMCJQAAAtVJREFUeNrt3WtTUmEUxfHFAUxJKkvNyuimqSUVXTBAQS7u7/+RepGmELea0YFn/ddr9h6eHweGs88z50ijyd9/+a72sxczogXLrPfbb3w/eP2gOKtN7vGHmC/LBnCZz08LU5pkz88i0gaI6L+ZeBg8bEakDxDR3Rn/8b+P8ACIqI45CFZ+hA9AnJZG69fa4QQQg/WR9ffDCyAuhgRWOuEGEP3VG79/9fADiOb1P4LDcASIo6vajfAEiO3LL0DLFeAsL0naDVeAqEhS1vYFOM8kbYYvQGxJOnYGqEr5cAaIgsreAGVVvAEq2p9jccsKMMdr9vTVG6CmhjfAiXreAN3/LUwFIAAAAAAAAAAAAAAAAAAAABwnQgAAAAAAAAAAAAAAAADAP6a1YLlzgFQCAAAAAAAAAAAAAAAAU050lnZxt3llCAAAAAAAAAAAAAAAAAAAAIDUABiIAAAAAAAAAAAAAAAAAACTkluw3DkAO0UBAAAAAAAAAAAAAEgQgBsoAAAAAAAAAAAAAAAAAAAAAAAAAHYAjMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAjZJcGQIAAAAAAAAAAAAAAAAAAAAgYQAGIgAAAAAAAAAAAAAAAADApPDY3UQCAAAAAAAAAAAAAAAAU050lnZxt3llCAAAAAAAAAAAAAAAAAAAAAAAAEgLwH4iBAAAAAAAAAAAAAAAAABMDA9eZq8wAAAAAAAAAAAAAADpAXALDQAAAAAAAAAAAAAAAEgfoOcN0FXDG+BE37wBatr3BthTxXsgUlHZG6CsvDdAQTp2BqhK2nQG2JKUdXwBzjNJ2vUFeCVJylquAO3879oNV4Dtq+JDT4CjP8VZ3RGgWbiuvtfxA+iv3iwv9d0ALtaH69c6XgCD8miDlboTwGnp7w7ZgQ/Ap+LYHo+aHgDdZ5OaZC/a6QMM3hantMk9+Zg2wJedwnDdL2a/EdDGKt0bAAAAAElFTkSuQmCC';
const topBase64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAACK1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9U+LSLAAAAuHRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLzAxMjM0NTY3ODk6Ozw+P0BBQkNERUZHSUpLTE1OT1BSVFVWWFlbXF1eX2FiY2RmZ2hpa2xtb3Bxc3R1d3h5e3x+f4KDhYaIiYuMjo+RkpSVmJqbnZ6goqOmqKqrra+wsrS1t7m6vL7AwcPFx8jKzM7P0dPV19na3N7g4uTm6Onr7e/x8/X3+fv9ElRBcQAAB+dJREFUGBntwYlfVOUCBuD3zMIOspmEihqGG6JmSrkreN2VMs0i1xt6Ly5ImmHuVw1Nc71eUkxRVER2Zph5/7x+1rUQh5lzZs75zne+M8+DpKSkpKQkm5TVnftumQ9ulXOfrwU+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';

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
        <TabBarIOS.Item
          title="Top"
          icon={{uri: topBase64Icon, scale: 10}}
          selected={this.state.selectedTab === 'topTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'topTab',
            });
          }}>
          <Top/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="TV Shows"
          icon={{uri: tvBase64Icon, scale: 10}}
          selected={this.state.selectedTab === 'tvTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'tvTab',
            });
          }}>
          <Search category="tvshows" title="TV Shows"></Search>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Movies"
          icon={{uri: movieBase64Icon, scale: 10}}
          selected={this.state.selectedTab === 'moviesTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'moviesTab',
            });
          }}>
          <Search category="movies" title="Movies"></Search>
        </TabBarIOS.Item>
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
