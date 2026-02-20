import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import CardMenu from '@/components/ui/cardMenu';
import { Power } from 'lucide-react-native';
import LottieView from 'lottie-react-native';

export default function App() {
  const menuItems = [
    { id: 1, image: require('../../assets/images/kinetic.png'), label: 'Jouer' },
    { id: 2, image: require('../../assets/images/wallet.jpg'), label: 'Gérer' },
    { id: 3, image: require('../../assets/images/planner.jpg'), label: 'Planifier' },
    { id: 5, image: require('../../assets/images/timer.png'), label: 'Pomodoro' },
    { id: 7, image: require('../../assets/images/wind.png'), label: 'Relaxer' },
  ];
  const cardMenuItems = [
    {
      id: 1,
      title: 'KINETIC',
      desc: 'Videz vos stress et divertir votre esprit avec des mini-jeux ludiques.',
      image: require('../../assets/images/kinetic-card.png'),
      backgroundColor: '#1D546D',
      textColor: '#F3F4F4',
    },
    {
      id: 2,
      title: 'WALLET',
      desc: 'Gérez votre budget et vos dépenses pour une vie financière équilibrée.',
      image: require('../../assets/images/wallet-card.png'),
      backgroundColor: '#061E29',
      textColor: '#F3F4F4',
    },
    {
      id: 3,
      title: 'PLANNER',
      desc: 'Planifiez vos tâches et vos objectifs pour une organisation efficace.',
      image: require('../../assets/images/planner-card.png'),
      backgroundColor: '#5F9598',
      textColor: '#F3F4F4',
    },
    {
      id: 4,
      title: 'FOCUS',
      desc: 'Restez concentré pendant vos sessions de travail.',
      image: require('../../assets/images/focus-card.png'),
      backgroundColor: '#1D546D',
      textColor: '#F3F4F4',
    },
    {
      id: 5,
      title: 'BREATHE',
      desc: 'Prennez vos écouteurs et détendez-vous avec nos musiques dédiées.',
      image: require('../../assets/images/music-card.png'),
      backgroundColor: '#061E29',
      textColor: '#F3F4F4',
    },
  ];
  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View  style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Image source={require('../../assets/images/steady-logo.png')} style={styles.steadyLogo} resizeMode="contain"/>
          <Text style={{ fontSize: 20, fontFamily: 'Montserrat_600SemiBold', color: '#061E29' }}>STEADY</Text>
        </View>
        <TouchableOpacity style={{ padding: 8, borderRadius: 100 }}>
          <Power size={22} color="#414141"/>
        </TouchableOpacity>
      </View>
      {/* Question card */}
      <View style={styles.questionContainer}>
        <Text style={{ fontSize: 32, fontFamily: 'Montserrat_700Bold', color: '#F3F4F4' }}>Que désirez-vous faire</Text>
        <Text style={{ fontSize: 32, fontFamily: 'Montserrat_700Bold', color: '#FFD400' }}>aujourd'hui ?</Text>
        <Text style={{ fontSize: 16, fontFamily: 'Montserrat_300Light', color: '#F3F4F4', marginTop: 8, width: 250 }}>Steady, votre compagnon de bien-être pour une vie équilibrée.</Text>
        <LottieView
          source={require('../../assets/lotties/thinking.json')}
          autoPlay
          loop
          style={styles.lottieThinking}
        />
      </View>
      {/* icon list */}
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <ScrollView
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, paddingHorizontal: 16 }}
        >
          {menuItems.map((item) => (
            <View key={item.id} style={{ alignItems: 'center' }}>
              <Image source={item.image} style={styles.listImage} resizeMode="contain" />
              <Text style={styles.textIconList}>{item.label}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      {/* Plan d'aujourd'hui */}
      <View style={{ width: '100%'}}>
        <Text style={{ fontSize: 26, fontFamily: 'Montserrat_600SemiBold', color: '#1D546D' }}>Plan du moment</Text>
        <Text style={{ fontSize: 16, fontFamily: 'Montserrat_400Regular', color: '#061E29', marginTop: 4 }}>Laisse tes doigts choisir pour toi.</Text>
      </View>
      {/* card menu */}
      <View style={{ width: '100%', flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 16}}
        >
          {cardMenuItems.map((item) => (
            <CardMenu
              key={item.id}
              title={item.title}
              desc={item.desc}
              image={item.image}
              onPress={() => console.log(`Open ${item.title}`)}
              backgroundColor={item.backgroundColor}
              textColor={item.textColor}
            />
          ))}
        </ScrollView>
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
    paddingLeft: 32,
    paddingTop: 25,
    width: '100%',
    height: 180,
    borderRadius: 50,
    overflow: 'hidden',
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
    paddingTop: 24,
    paddingHorizontal: 24,
    gap: 16,
  },
  lottieThinking: {
    width: 160,
    height: 160,
    position: 'absolute',
    bottom: -30,
    right: -5,
  },
  listImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    flexDirection: 'row',
  },
  textIconList: {
    fontSize: 15, 
    fontFamily: 'Montserrat_400Regular', 
    color: '#061E29', 
    marginTop: 8, 
    textAlign: 'center'
  }
});