import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

type InputFieldProps = {
    label: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    icon?: keyof typeof Ionicons.glyphMap;
    iconColor?: string;
    keyboardType?: TextInputProps['keyboardType'];
    secureTextEntry?: boolean;
    autoCapitalize?: TextInputProps['autoCapitalize'];
};

export default function InputField({
    label,
    placeholder = '',
    value,
    onChangeText,
    icon = 'at',
    iconColor = Colors.gray,
    keyboardType = 'default',
    secureTextEntry = false,
    autoCapitalize = 'none',
}: InputFieldProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Détermine si c'est un champ password
    const isPasswordField = secureTextEntry;

    // Icône dynamique pour password
    const passwordIcon = isPasswordVisible ? 'eye-outline' : 'eye-off-outline';
    const displayIcon = isPasswordField ? passwordIcon : icon;

    return (
        <View style={styles.container}>
            {/* Label */}
            <Text style={styles.label}>{label}</Text>

            {/* Input avec icône */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.gray}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    secureTextEntry={isPasswordField && !isPasswordVisible}
                    autoCapitalize={autoCapitalize}
                />
                {displayIcon && (
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => {
                            if (isPasswordField) {
                                setIsPasswordVisible(!isPasswordVisible);
                            }
                        }}
                        activeOpacity={isPasswordField ? 0.6 : 1}
                    >
                        <Ionicons name={displayIcon} size={20} color={iconColor} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 8,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
        color: '#000',
    },
    inputContainer: {
        position: 'relative',
        width: '100%',
    },
    input: {
        width: '100%',
        paddingVertical: 20,
        paddingLeft: 16,
        paddingRight: 50,
        backgroundColor: Colors.BgInputField,
        borderRadius: 20,
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
        color: '#000',
    },
    iconContainer: {
        position: 'absolute',
        right: 16,
        top: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.TransGray,
        padding: 4,
        borderRadius: 25,
    },
});