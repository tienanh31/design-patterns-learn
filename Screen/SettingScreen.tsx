import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

// Initialize the notification service
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const SettingsScreen = () => {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showHourPicker, setShowHourPicker] = useState(false);
  const [showMinutePicker, setShowMinutePicker] = useState(false);
  const navigation = useNavigation();

  const handleHourChange = (event, selectedDate) => {
    setShowHourPicker(false);
    if (selectedDate) {
      const newTime = new Date(selectedTime);
      newTime.setHours(selectedDate.getHours());
      setSelectedTime(newTime);
    }
  };

  const handleMinuteChange = (event, selectedDate) => {
    setShowMinutePicker(false);
    if (selectedDate) {
      const newTime = new Date(selectedTime);
      newTime.setMinutes(selectedDate.getMinutes());
      setSelectedTime(newTime);
    }
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert("Failed to get push token for push notification!");
        return;
      }

      if (Constants.expoConfig?.extra?.eas?.projectId) {
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
          })
        ).data;
        console.log(token);
      }
    } else {
      Alert.alert("Must use physical device for Push Notifications");
    }

    return token;
  };

  const schedulePushNotification = async (time) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got a notification! 🔔",
        body: "Study plz Stupid Boy",
        data: { data: "goes here" },
      },
      trigger: {
        hour: time.getHours(),
        minute: time.getMinutes(),
        repeats: true,
      },
    });
  };

  const handleSetTimeAlarm = async () => {
    await registerForPushNotificationsAsync();
    await schedulePushNotification(selectedTime);
    Alert.alert(`Notification set for ${formatTime(selectedTime)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Text style={styles.label}>Messages come in</Text>

      <View style={styles.pickerContainer}>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setShowHourPicker(true)}
        >
          <Text style={styles.pickerText}>{selectedTime.getHours()} h</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setShowMinutePicker(true)}
        >
          <Text style={styles.pickerText}>{selectedTime.getMinutes()} m</Text>
        </TouchableOpacity>
      </View>

      {showHourPicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={handleHourChange}
          style={styles.dateTimePicker}
        />
      )}

      {showMinutePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={handleMinuteChange}
          style={styles.dateTimePicker}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSetTimeAlarm}>
        <Text style={styles.buttonText}>Set Time Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Copyright')}>
        <Text style={styles.buttonText}>Copyright</Text>
      </TouchableOpacity>

      <Image
        source={require('../assets/images/rainy.gif')}
        style={styles.image}
      />

      {/* Additional Image */}
      <Image
        source={{ uri: 'https://path-to-second-image.png' }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  pickerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  pickerText: {
    fontSize: 16,
  },
  dateTimePicker: {
    width: '100%',
  },
  button: {
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    backgroundColor: '#1e90ff',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
  },
  footerButton: {
    alignItems: 'center',
    flex: 1,
  },
  footerText: {
    fontSize: 16,
    color: '#666',
  },
});

export default SettingsScreen;
