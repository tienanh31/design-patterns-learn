import React from 'react';
import { StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity } from 'react-native';

const StartScreen = ({navigation}: {navigation: any}) => {
    return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/start.jpeg')} style={styles.backgroundImage}>
        <View style={styles.overlay}>
        <Image source={require('../assets/images/favicon.png')} style={styles.logo} />
          <Text style={styles.title}>Design Patterns</Text>
          <Text style={styles.subtitle}>    Kết nối với tương lai</Text>
          <Text style={styles.description}>
            Ứng dụng giúp tìm hiểu về Design Patterns cơ bản!
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logo: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginBottom: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional, for a darker overlay
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StartScreen;
