import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CopyrightScreen = () => {
  const navigation = useNavigation();

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Copyright Information</Text>
      <Text style={styles.content}>
        © 2024 Cao Pham Tien Anh 20520380. All rights reserved.
      </Text>
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default CopyrightScreen;
