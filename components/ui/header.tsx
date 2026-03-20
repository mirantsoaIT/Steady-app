import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/theme';

type HeaderProps = {
    userName?: string;
    profileImage?: ImageSourcePropType;
    onBackPress?: () => void;
    showBackButton?: boolean;
};

export default function Header({
    userName = 'User',
    profileImage = require('../../assets/images/men.jpg'),
    onBackPress,
    showBackButton = true,
}: HeaderProps) {
    const handleBackPress = () => {
        if (onBackPress) {
        onBackPress();
        } else {
        router.back();
        }
    };

  return (
    <View style={styles.header as any}>
      {/* Bouton retour */}
        {showBackButton && (
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton as any}>
            <Ionicons name="arrow-back" size={24} color={Colors.dark  as any} />
            </TouchableOpacity>
        )}

        {/* Photo de profil + Nom */}
        <View style={styles.profileContainer as any}>
            <Image source={profileImage} style={styles.profileImage as any} />
            <Text style={styles.profileName as any}>Hi, {userName}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        padding: 8,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
        marginLeft: 8,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.secondary,
    },
    profileName: {
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
        color: Colors.dark as any,
    },
});