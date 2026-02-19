import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ButtonProps = {
  text: string;
  onPress: () => void;
  variant?: 'filled' | 'outline';
  icon?: keyof typeof Ionicons.glyphMap;
  size?: 'small' | 'medium' | 'large';
};

export default function Button({ text, onPress, variant = 'filled', icon, size = 'medium' }: ButtonProps) {
    const sizes = {
        small: { paddingVertical: 10, paddingHorizontal: 30, fontSize: 14, iconSize: 16 },
        medium: { paddingVertical: 14, paddingHorizontal: 40, fontSize: 16, iconSize: 18 },
        large: { paddingVertical: 18, paddingHorizontal: 50, fontSize: 18, iconSize: 20 },
    };

    const buttonStyle = [
        styles.button,
        {
        paddingVertical: sizes[size].paddingVertical,
        paddingHorizontal: sizes[size].paddingHorizontal,
        backgroundColor: variant === 'filled' ? '#5F9598' : 'transparent',
        borderColor: '#5F9598',
        },
    ];

    const textColor = variant === 'filled' ? '#061E29' : '#F3F4F4';

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
        <View style={styles.buttonContent}>
            <Text style={[styles.buttonText, { fontSize: sizes[size].fontSize, color: textColor }]}>
                {text}
            </Text>
            <Ionicons name={icon} size={sizes[size].iconSize} color={textColor} />
        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        borderWidth: 1.5,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    buttonText: {
        fontFamily: 'Montserrat_500Medium',
        letterSpacing: 1,
    },
});