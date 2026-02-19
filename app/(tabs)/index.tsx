import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import CardMenu from '@/components/ui/cardMenu';

export default function App() {

  return (
    <View style={styles.mainContainer}>
      <CardMenu
        title="KINETIC"
        desc="Videz vos stress et divertir votre esprit avec des mini-jeux ludiques."
        image={require('../../assets/images/icon.png')}
        onPress={() => console.log('Open recipe')}
        backgroundColor="#1D546D"
        textColor="#F3F4F4"
      />
      <CardMenu
        title="WALLET"
        desc="Gérez votre budget et vos dépenses pour une vie financière équilibrée."
        image={require('../../assets/images/icon.png')}
        onPress={() => console.log('Open recipe')}
        backgroundColor="#061E29"
        textColor="#F3F4F4"
      />
      <CardMenu
        title="PLANNER"
        desc="Planifiez vos tâches et vos objectifs pour une organisation efficace."
        image={require('../../assets/images/icon.png')}
        onPress={() => console.log('Open recipe')}
        backgroundColor="#5F9598"
        textColor="#F3F4F4"
      />
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
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
});