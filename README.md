# React Native Dates

__React Native Calender for iOS and Android__

## Example

In this example we disabled dates back in history and on Sundays and showed selected date bellow 

```javascript
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Dates from 'react-native-dates';

export default class ReactNativeDatesDemo extends Component {
  state = {
    date: null
  }

  render() {
    const isDateBlocked = (date) =>
      date.format('dddd') === 'Sunday';

    const onDatesChange = (date) =>
      this.setState({ date });

    return (
      <View style={styles.container}>
        <Dates
          date={this.state.date}
          onDatesChange={onDatesChange}
          isDateBlocked={isDateBlocked}
        />

      {this.state.date && <Text style={styles.date}>{this.state.date.format('LL')}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    marginTop: 20
  },
  date: {
    marginTop: 50
  }
});

AppRegistry.registerComponent('ReactNativeDatesDemo', () => ReactNativeDatesDemo);
```

## Demo

<img src="http://i.giphy.com/YUqyKQoeNs2v6.gif">

