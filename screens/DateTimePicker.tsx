import React, { useState } from "react";
import { Button, View } from "../components/Themed";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateTimePicker = ({ setter, btStyle }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setter(date);
    hideDatePicker();
  };

  return (
    <>
      <Button
        title="Pick Protest Date"
        onPress={showDatePicker}
        style={{
          // ...btStyle,
          backgroundColor: "#f07430",
          fontWeight: "bold",
          fontSize: 20,
        }}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        minimumDate={new Date(Date.now())}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default DateTimePicker;
