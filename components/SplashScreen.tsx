import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    withSequence,
    withDelay,
    runOnJS,
    useDerivedValue,
    withRepeat,
    Easing,
    SharedValue,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { useWindowDimensions } from 'react-native';


const FULL_TEXT = 'STEADY';

function getPointOnCurve(
  t: number,
  p0x: number, p0y: number,
  p1x: number, p1y: number,
  p2x: number, p2y: number
) {
  'worklet'; // ← obligatoire pour être utilisé dans useAnimatedStyle
  const x = (1 - t) * (1 - t) * p0x + 2 * (1 - t) * t * p1x + t * t * p2x;
  const y = (1 - t) * (1 - t) * p0y + 2 * (1 - t) * t * p1y + t * t * p2y;
  return { x, y };
}

const CURVES = [
  { p0: [-90, 180], p1: [230, -140], p2: [500, 110] },  // courbe 1
  { p0: [4, 170],   p1: [268, -45],  p2: [500, 180] },  // courbe 2
];

const CURVE_ICONS = [
  ['bulb', 'flash', 'alarm'],
  ['globe', 'logo-ionic', 'settings'],
];
const EXTERNAL_ICONS = ['heart', 'flag', 'star'];


export default function SplashScreen({ onFinish } : { onFinish: () => void }) {
    const { width } = useWindowDimensions();
    const EXTERNAL_CURVE = { p0: [-8, 180], p1: [width / 2, 10], p2: [width + 10, 180] };
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

    // Ext-circle
    const circleScale = useSharedValue(0);
    const circleOpacity = useSharedValue(0);

    // t animé pour chaque courbe
    const t1 = useSharedValue(1);
    const t2 = useSharedValue(0);
    const tExt = useSharedValue(0);

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

        // ← cercle en même temps que textContainer
        circleScale.value = withDelay(400, withSpring(1, { damping: 10, stiffness: 80 }));
        circleOpacity.value = withDelay(400, withTiming(1, { duration: 400 }));
    };

    const startTyping = () => {
        textOpacity.value = withTiming(1, { duration: 500 });
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < FULL_TEXT.length) {
                setDisplayedText(FULL_TEXT.slice(0, index + 1));
                index++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => runOnJS(startExitAnimation)(), 400);
            }
        }, 40);
    };

    useEffect(() => {
        // Animations des icônes en boucle
        t1.value = withRepeat(
            withTiming(0, { duration: 20000, easing: Easing.linear }), -1, false
        );
        t2.value = withRepeat(
            withTiming(1, { duration: 20000, easing: Easing.linear }), -1, false
        );
        tExt.value = withRepeat(
            withTiming(1, { duration: 20000, easing: Easing.linear }), -1, false
        );

        // Animation logo
        logoOpacity.value = withTiming(1, { duration: 900 });
        logoY.value = withSequence(
            withDelay(600, withTiming(0, { duration: 400 })),
            withTiming(-120, { duration: 800 }),
            withSpring(0, { damping: 15, stiffness: 200, mass: 1 }, (finished) => {
                if (finished) runOnJS(startTyping)();
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

    const circleStyle = useAnimatedStyle(() => ({
        opacity: circleOpacity.value,
        transform: [{ scale: circleScale.value }],
    }));

    const AnimatedIcon = ({
        curveDef,
        tValue,
        offset,
        iconName,
        iconSize = 18,
        iconColor = 'rgba(255,255,255,0.4)',
    }: {
        curveDef: { p0: number[], p1: number[], p2: number[] };
        tValue: SharedValue<number>;
        offset: number; // décalage entre 0 et 1 pour espacer les icônes
        iconName: string;
        iconSize?: number;
        iconColor?: string;
    }) => {
    const animatedStyle = useAnimatedStyle(() => {
        // t décalé pour espacer les icônes sur la courbe
        const t = (tValue.value + offset) % 1;
        const point = getPointOnCurve(
            t,
            curveDef.p0[0], curveDef.p0[1],
            curveDef.p1[0], curveDef.p1[1],
            curveDef.p2[0], curveDef.p2[1],
        );
        return {
            position: 'absolute' as const,
            left: point.x - 12,
            top: point.y - 12,
        };
    });
        return (
            <Animated.View style={animatedStyle}>
            <Ionicons name={iconName as any} size={iconSize} color={iconColor} />
            </Animated.View>
        );
    };

    return (
        <>
            <View style={styles.splashContainer}>
                <StatusBar barStyle="light-content" />
                <Animated.View style={[styles.cornerCircle, circleStyle]} />
                <Animated.View style={[styles.cornerCircle1, circleStyle]} />
                <Animated.View style={[styles.curves, sloganStyle]}>
                    <Svg width="100%" height="200">
                        <Path
                            d={`M -8 180 Q ${width / 2} 10 ${width + 10} 180`}
                            fill="none"
                            stroke="#061e2948"
                            strokeWidth="1"
                        />
                    </Svg>
                    {/* Icônes courbe externe */}
                        {EXTERNAL_ICONS.map((icon, i) => (
                        <AnimatedIcon
                            key={`ext-${i}`}
                            curveDef={EXTERNAL_CURVE}
                            tValue={tExt}
                            offset={i / EXTERNAL_ICONS.length}
                            iconName={icon}
                            iconSize={20}
                            iconColor="#061e2948"
                        />
                    ))}
                </Animated.View>
                <View style={styles.row}>
                    <Animated.Image
                        source={require('../assets/images/steady-logo.png')}
                        style={[styles.logo, logoStyle]}
                        resizeMode="contain"
                    />
                    <Animated.Text style={[styles.logoName, textStyle]}>{displayedText}</Animated.Text>
                </View>
                <Animated.View style={[styles.textContainer, sloganStyle]}>
                    <View style={{ flex: 1, width: '100%', left: 80, top: 40}}>
                        <Svg
                            style={StyleSheet.absoluteFill}
                            width="100%"
                            height="100%"
                        >
                            <Path
                                d="M -90 180 Q 230 -140 500 110"
                                fill="none"
                                stroke="rgba(255,255,255,0.15)"
                                strokeWidth="1"
                            />
                            <Path
                                d="M 4 170 Q 268 -45 500 180"
                                fill="none"
                                stroke="rgba(255,255,255,0.18)"
                                strokeWidth="1"
                            />
                        </Svg>
                        {/* ← Icônes animées courbe 1 */}
                        {CURVE_ICONS[0].map((icon, i) => (
                            <AnimatedIcon
                                key={`c1-${i}`}
                                curveDef={CURVES[0]}
                                tValue={t1}
                                offset={i / CURVE_ICONS[0].length}
                                iconName={icon}
                                iconSize={20}
                                iconColor="rgba(255, 255, 255, 0.18)"
                            />
                        ))}

                        {/* ← Icônes animées courbe 2 */}
                        {CURVE_ICONS[1].map((icon, i) => (
                            <AnimatedIcon
                                key={`c2-${i}`}
                                curveDef={CURVES[1]}
                                tValue={t2}
                                offset={i / CURVE_ICONS[1].length}
                                iconName={icon}
                                iconSize={20}
                                iconColor="rgba(255,255,255,0.18)"
                            />
                        ))}
                    </View>
                    <View style={{ top: -110, flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20}}>
                        <View style={styles.sloganBloc}>
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
                    </View>
                </Animated.View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        backgroundColor: '#e6e6e6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: { width: 96, height: 96 },
    textContainer: { 
        flex: 1,
        marginTop: 50,
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
    logoName: { fontSize: 24, color: '#1D546D', fontWeight: 'bold', fontFamily: 'Montserrat_500Medium' },
    slogan: { fontSize: 30, color: '#F3F4F4', fontWeight: '400', textAlign: 'center', fontFamily: 'AnnieUseYourTelescope_400Regular' },
    sloganBloc: { marginTop: 40},
    row: { flexDirection: 'row', alignItems: 'center', gap: 5},
    button: {
        marginTop: 80,
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
    curves: {
        position: 'absolute',
        bottom: '48%',
        left: 0,
        right: 0,
    },
    cornerCircle: {
        position: 'absolute',
        top: -60,
        left: -60,
        width: 170,
        height: 170,
        borderRadius: 85,
        backgroundColor: '#5f959869',
    },
    cornerCircle1: {
        position: 'absolute',
        top: -50,
        left: -50,
        width: 190,
        height: 190,
        borderRadius: 90,
        backgroundColor: '#5f959852',
    },
});