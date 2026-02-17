import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  runOnJS
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const FULL_TEXT = 'STEADY';

export default function SplashScreen({ onFinish } : { onFinish: () => void }) {

    // Logo
    const logoY = useSharedValue(0);
    const logoX = useSharedValue(0);
    const logoOpacity = useSharedValue(0);
    const logoScale = useSharedValue(1);

    // Texte STEADY
    const textX = useSharedValue(0);
    const textOpacity = useSharedValue(1);

    // Slogan
    const sloganY = useSharedValue(50);
    const sloganOpacity = useSharedValue(0);

    const [displayedText, setDisplayedText] = useState('');

    const startExitAnimation = () => {
        // Logo glisse vers le centre-haut et grossit
        logoX.value = withSpring(40, { duration: 500 });
        logoY.value = withSpring(-270, { duration: 800 });
        logoScale.value = withSpring(3, { duration: 500 });

        // Texte disparaît en fondu
        textOpacity.value = withTiming(0, { duration: 400 });

        // ← slogan monte depuis le bas avec fondu
        sloganOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
        sloganY.value = withDelay(300, withSpring(-50, { duration: 500 }));
    };

    const startTyping = () => {
        textOpacity.value = withTiming(1, { duration: 300 });
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < FULL_TEXT.length) {
                setDisplayedText(FULL_TEXT.slice(0, index + 1));
                index++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => runOnJS(startExitAnimation)(), 500);
            }
        }, 40);
    };
    
    
    useEffect(() => {
        // 1. Logo apparaît depuis le bas avec fondu
        logoOpacity.value = withTiming(1, { duration: 900 });
        logoY.value = withSequence(
            withDelay(600, withTiming(0, { duration: 400 })),
            withTiming(-120, { duration: 800 }),
            withSpring(0, { damping: 15, stiffness: 200, mass: 1 }, (finished) => {
                if (finished) {
                    runOnJS(startTyping)();
                }
            })
        );
    }, []);

    const logoStyle = useAnimatedStyle(() => ({
        opacity: logoOpacity.value,
        transform: [
            { translateY: logoY.value },
            { translateX: logoX.value },
            { scale: logoScale.value },
        ],
    }));

    const sloganStyle = useAnimatedStyle(() => ({
        opacity: sloganOpacity.value,
        transform: [{ translateY: sloganY.value }],
    }));

    const textStyle = useAnimatedStyle(() => ({
        opacity: textOpacity.value,
        transform: [{ translateX: textX.value }],
    }));

    return (
        <>
            <View style={styles.splashContainer}>
                <StatusBar barStyle="light-content" />
                <View style={styles.row}>
                    <Animated.Image
                        source={require('../assets/images/react-logo.png')}
                        style={[styles.logo, logoStyle]}
                        resizeMode="contain"
                    />
                    <Animated.Text style={[styles.logoName, textStyle]}>{displayedText}</Animated.Text>
                </View>
                <Animated.View style={[styles.textContainer, sloganStyle]}>
                    <View>
                        <Text style={styles.slogan}>"L'ordre dans tes tâches,</Text>
                        <Text style={styles.slogan}>le calme dans tes doigts"</Text>
                    </View>
                    {/* ← bouton commencer */}
                    <TouchableOpacity style={styles.button} onPress={() => onFinish()}>
                        <View style={styles.buttonContent}>
                            <Text style={styles.buttonText}>Commencer</Text>
                            <Ionicons name="arrow-forward" size={18} color="#061E29" />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        backgroundColor: '#F3F4F4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: { width: 64, height: 64 },
    textContainer: { 
        flex:1,
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#061E29',
        width: '150%',
        height: '56%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderTopLeftRadius: 350,
        borderTopRightRadius: 350,
        position: 'absolute',
        bottom: -50,
        gap: 50
    },
    logoName: { fontSize: 24, color: '#1D546D', fontWeight: 'bold' },
    slogan: { fontSize: 35, color: '#F3F4F4', fontWeight: '400', textAlign: 'center', fontFamily: 'AnnieUseYourTelescope_400Regular' },
    row: { flexDirection: 'row', alignItems: 'center', gap: 5},
    button: {
        marginTop: 30,
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 30,
        borderWidth: 1.5,
        borderColor: '#5F9598',
        backgroundColor: '#5F9598',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    buttonText: {
        color: '#061E29',
        fontSize: 16,
        fontFamily: 'Montserrat_500Medium',
        letterSpacing: 1,
    },
});