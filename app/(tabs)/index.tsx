import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity } from 'react-native';
import CardMenu from '@/components/ui/cardMenu';
import { Power } from 'lucide-react-native';

export default function App() {

  return (
    <View style={styles.mainContainer}>
        <View style={styles.header}>
          <View  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Image source={require('../../assets/images/steady-logo.png')} style={styles.steadyLogo} resizeMode="contain"/>
            <Text style={{ fontSize: 20, fontFamily: 'Montserrat_600SemiBold', color: '#061E29' }}>STEADY</Text>
          </View>
          <TouchableOpacity style={{ padding: 8, borderRadius: 100 }}>
            <Power size={22} color="#414141"/>
          </TouchableOpacity>
        </View>
      <View style={styles.questionContainer}>
        <Text style={{ fontSize: 32, fontFamily: 'Montserrat_700Bold', color: '#F3F4F4' }}>Que désirez-vous faire</Text>
        <Text style={{ fontSize: 32, fontFamily: 'Montserrat_700Bold', color: '#FFD400' }}>aujourd'hui ?</Text>
      </View>
      <Text style={{ fontSize: 16, fontFamily: 'Montserrat_300Light', color: '#333', marginTop: 8 }}>Steady, votre compagnon de bien-être pour une vie équilibrée.</Text>
      <View style={{ width: '100%', gap: 16 }}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    width: '100%',
  },
  questionContainer: {
    backgroundColor: '#061E29',
    padding: 32,
    width: '100%',
    height: 180,
    borderRadius: 50,
  },
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
  steadyLogo: {
    width: 54,
    height: 54,
  },
  textContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 24,
    gap: 16,
  },
});