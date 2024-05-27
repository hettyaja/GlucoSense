import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const Calendar = ({ onConfirm }) => {
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleStartDateConfirm = (date) => {
    setStartDate(date);
    hideStartDatePicker();
    showEndDatePicker();
  };

  const handleEndDateConfirm = (date) => {
    setEndDate(date);
    hideEndDatePicker();
    onConfirm({ startDate, endDate: date });
  };

  const handleDateRangePress = () => {
    setStartDate(null);
    setEndDate(null);
    showStartDatePicker();
  };

  const formatDateRange = () => {
    if (startDate && endDate) {
      return `${moment(startDate).format('DD/MM/YYYY')} - ${moment(endDate).format('DD/MM/YYYY')}`;
    }
    return 'Select date range';
  };

  return (
    <View>
      <TouchableOpacity style={styles.dateRangeContainer} onPress={handleDateRangePress}>
        <Text style={styles.dateRange}>{formatDateRange()}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleStartDateConfirm}
        onCancel={hideStartDatePicker}
        display={Platform.OS === 'ios' ? 'inline' : 'default'}
      />
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleEndDateConfirm}
        onCancel={hideEndDatePicker}
        display={Platform.OS === 'ios' ? 'inline' : 'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateRangeContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  dateRange: { fontSize: 16 },
});

export default Calendar;
