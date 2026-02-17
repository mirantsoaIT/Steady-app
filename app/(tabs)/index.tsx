import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';

export default function App() {

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.welcomeText}>Bienvenue sur STEADY</Text>
      <Text>Le menu modulaire arrive...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#87CEEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 220,
    height: 220,
  },
  textContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  slogan: {
    fontSize: 18,
    color: '#061E29',
    fontWeight: '400',
  },
  sloganHighlight: {
    fontSize: 20,
    color: '#061E29',
    fontWeight: 'bold',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#061E29',
  },
});