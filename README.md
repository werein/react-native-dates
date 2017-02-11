# React Native Dates
[![Build Status](https://travis-ci.org/werein/react-native-dates.svg)](https://travis-ci.org/werein/react-native-dates)[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/werein/react-native-dates?branch=master&svg=true)](https://ci.appveyor.com/project/jirikolarik/react-native-dates) [![Code Climate](https://codeclimate.com/github/werein/react-native-dates/badges/gpa.svg)](https://codeclimate.com/github/werein/react-native-dates) [![Issue Count](https://codeclimate.com/github/werein/react-native-dates/badges/issue_count.svg)](https://codeclimate.com/github/werein/react-native-dates)

__React Native Date and date range picker / calendar for iOS and Android__

## API

```javascript
type DatesType = {
  range: boolean,
  date: ?moment,
  startDate: ?moment,
  endDate: ?moment,
  focusedInput: 'startDate' | 'endDate',
  onDatesChange: (date: { date?: ?moment, startDate?: ?moment, endDate?: ?moment }) => void,
  isDateBlocked: (date: moment) => boolean
}
```

## Demo

<img src="http://i.giphy.com/YUqyKQoeNs2v6.gif">
<img src="http://i.giphy.com/130cHgOE0K5TCU.gif">


## Example

In this example we disabled dates back in history and we shows selected dates bellow

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
import moment from 'moment';

export default class ReactNativeDatesDemo extends Component {
  state = {
    date: null,
    focus: 'startDate',
    startDate: null,
    endDate: null
  }


  render() {
    const isDateBlocked = (date) =>
      date.isBefore(moment(), 'day');

    const onDatesChange = ({ startDate, endDate, focusedInput }) =>
      this.setState({ ...this.state, focus: focusedInput }, () =>
        this.setState({ ...this.state, startDate, endDate })
      );

    const onDateChange = ({ date }) =>
      this.setState({ ...this.state, date });


    return (
      <View style={styles.container}>
        <Dates
          onDatesChange={onDatesChange}
          isDateBlocked={isDateBlocked}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          focusedInput={this.state.focus}
          range
        />

        <Dates
          date={this.state.date}
          onDatesChange={onDateChange}
          isDateBlocked={isDateBlocked}
        />

      {this.state.date && <Text style={styles.date}>{this.state.date && this.state.date.format('LL')}</Text>}
      <Text style={[styles.date, this.state.focus === 'startDate' && styles.focused]}>{this.state.startDate && this.state.startDate.format('LL')}</Text>
      <Text style={[styles.date, this.state.focus === 'endDate' && styles.focused]}>{this.state.endDate && this.state.endDate.format('LL')}</Text>
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
  },
  focused: {
    color: 'blue'
  }
});

AppRegistry.registerComponent('ReactNativeDatesDemo', () => ReactNativeDatesDemo);
```
