import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { Colors } from '@/constants/theme';

type LogoProps = {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  textColor?: string;
  logoSource?: ImageSourcePropType;
};

export default function Logo({
  size = 'medium',
  showText = true,
  textColor = Colors.darkSmooth,
  logoSource = require('../../assets/images/steady-logo.png'),
}: LogoProps) {
  const sizes = {
    small: { width: 36, height: 36, fontSize: 16 },
    medium: { width: 54, height: 54, fontSize: 20 },
    large: { width: 72, height: 72, fontSize: 24 },
  };

  return (
    <View style={styles.container}>
      <Image 
        source={logoSource} 
        style={{
          width: sizes[size].width,
          height: sizes[size].height,
        }} 
        resizeMode="contain"
      />
      {showText && (
        <Text 
          style={[
            styles.text, 
            { 
              fontSize: sizes[size].fontSize, 
              color: textColor 
            }
          ]}
        >
          STEADY
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontFamily: 'Montserrat_600SemiBold',
  },
});