import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type CardMenuProps = {
    title: string;
    desc?: string;
    image: ImageSourcePropType;
    onPress: () => void;
    buttonText?: string;
    backgroundColor?: string;
    textColor?: string;
    isFavorite?: boolean;
    onFavoritePress?: () => void;
};

export default function CardMenu({
    title,
    desc,
    image,
    onPress,
    buttonText = 'Découvrir',
    backgroundColor = '#C8F5D4',
    textColor = '#061E29',
    isFavorite = false,
    onFavoritePress,
}: CardMenuProps) {
    return (
        <View style={[styles.card, { backgroundColor }]}>
            {/* Texte et bouton à gauche */}
            <View style={styles.leftContent}>
                <Text style={[styles.title, { color: textColor }]}>{title}</Text>
                <Text style={[styles.desc, { color: textColor }]}>{desc}</Text>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                    <Ionicons name="arrow-forward" size={16} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Image à droite */}
            <Image source={image} style={styles.image} />

            {/* Icône cœur en haut à droite */}
            {onFavoritePress && (
                <TouchableOpacity style={styles.favoriteButton} onPress={onFavoritePress}>
                <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={24}
                    color={isFavorite ? '#FF6B6B' : '#000'}
                />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderRadius: 50,
        paddingLeft: 32,
        paddingTop: 24,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'relative',
        height: 210,
        overflow: 'hidden',
    },
    leftContent: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 28,
        // fontWeight: 'bold',
        color: '#000',
        marginBottom: 12,
        fontFamily: 'Montserrat_700Bold',
    },
    desc: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        fontFamily: 'Montserrat_300Light',
        width: '50%',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignSelf: 'flex-start',
        gap: 6,
    },
    buttonText: {
        fontSize: 14,
        color: '#000',
        fontWeight: '500',
        fontFamily: 'Montserrat_500Medium',
    },
    image: {
        width: 230,
        height: 230,
        borderRadius: 115,
        position: 'absolute',
        right: -20,
        top: 35,
    },
    favoriteButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: '#FFF',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});