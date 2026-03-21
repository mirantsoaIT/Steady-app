import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/theme';

type PrimaryButtonProps = {
    text: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    backgroundColor?: string;
    textColor?: string;
    fullWidth?: boolean;
};

export default function PrimaryButton({
    text,
    onPress,
    loading = false,
    disabled = false,
    backgroundColor = Colors.primary,
    textColor = '#FFFFFF',
    fullWidth = true,
}: PrimaryButtonProps) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: disabled ? '#C0C0C0' : backgroundColor },
                fullWidth && { width: '100%' },
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
            >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <Text style={[styles.text, { color: textColor }]}>{text}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    text: {
        fontSize: 18,
        fontFamily: 'Montserrat_600SemiBold',
    },
});