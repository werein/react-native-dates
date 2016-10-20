import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import moment from 'moment';
import 'moment-range';

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: 'rgb(255, 255, 255)'
  },
  heading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  week: {
    flexDirection: 'row'
  },
  dayName: {
    flexGrow: 1,
    flexBasis: 1,
    textAlign: 'center',
  },
  day: {
    flexGrow: 1,
    flexBasis: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(248, 248, 248)',
    margin: 1,
    padding: 10
  },
  dayBlocked: {
    backgroundColor: 'rgb(255, 255, 255)'
  },
  daySelected: {
    backgroundColor: 'rgb(52,120,246)'
  },
  dayText: {
    color: 'rgb(0, 0, 0)'
  },
  dayDisabledText: {
    color: 'gray'
  },
  daySeletedText: {
    color: 'rgb(252, 252, 252)'
  }
})

export const Week = ({ startOfWeek, currentDate, focusedMonth, date, onDatesChange, isDateBlocked }) => {
  const days = [];
  const endOfWeek = startOfWeek.clone().endOf('isoweek');
  const today = currentDate.clone().startOf('day');

  moment.range(startOfWeek, endOfWeek).by('days', (day) => {
    const onPress = () => onDatesChange(day);

    const isFutureDate = day >= today;
    const isCurrentMonth = day.month() === focusedMonth.month();
    const isBlocked = isDateBlocked(day);
    const isSelected = date && moment(date).format('LL') === day.format('LL');
    const isDisabled = !isFutureDate || !isCurrentMonth || isBlocked;

    const style = [styles.day, isDisabled && styles.dayBlocked, isSelected && styles.daySelected];
    const styleText = [styles.dayText, isDisabled && styles.dayDisabledText, isSelected && styles.daySeletedText];

    days.push(
      <TouchableOpacity
        key={day.date()}
        style={style}
        onPress={onPress}
        disabled={isDisabled}
      >
        <Text style={styleText}>{day.date()}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.week}>{days}</View>
  );
};

export const Month = ({ focusedMonth, currentDate, date, onDatesChange, isDateBlocked }) => {
  const dayNames = [];
  const weeks = [];
  const startOfMonth = focusedMonth.clone().startOf('month').startOf('isoweek');
  const endOfMonth = focusedMonth.clone().endOf('month')
  const weekRange = moment.range(currentDate.clone().startOf('isoweek'), currentDate.clone().endOf('isoweek'));

  weekRange.by('days', (day) => {
    dayNames.push(
      <Text key={day.date()} style={styles.dayName}>
        {day.format('ddd')}
      </Text>
    );
  });

  moment.range(startOfMonth, endOfMonth).by('weeks', (week) => {
    weeks.push(
      <Week
        key={week}
        startOfWeek={week}
        currentDate={currentDate}
        focusedMonth={focusedMonth}
        date={date}
        onDatesChange={onDatesChange}
        isDateBlocked={isDateBlocked}
      />
    );
  });

  return (
    <View style={styles.month}>
      <View style={styles.week}>
        {dayNames}
      </View>
      {weeks}
    </View>
  );
}

export default class Dates extends Component {
  state = {
    currentDate: moment(),
    focusedMonth: moment().startOf("month")
  }

  render() {
    const previousMonth = () => {
      this.setState({ focusedMonth: this.state.focusedMonth.add(-1, 'M') });
    }

    const nextMonth = () => {
      this.setState({ focusedMonth: this.state.focusedMonth.add(1, 'M') });
    }

    return (
      <View style={styles.calendar}>
        <View style={styles.heading}>
          <TouchableOpacity onPress={previousMonth}>
            <Text>{'< Previous'}</Text>
          </TouchableOpacity>
          <Text>{this.state.focusedMonth.format('MMMM')}</Text>
          <TouchableOpacity onPress={nextMonth}>
            <Text>{'Next >'}</Text>
          </TouchableOpacity>
        </View>
        <Month
          currentDate={this.state.currentDate}
          focusedMonth={this.state.focusedMonth}
          date={this.props.date}
          onDatesChange={this.props.onDatesChange}
          isDateBlocked={this.props.isDateBlocked}
        />
      </View>
    )
  }
}
