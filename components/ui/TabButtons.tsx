import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, LayoutChangeEvent } from 'react-native';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

type TabButtonsProps = {
    onButton1Press: () => void;
    onButton2Press: () => void;
    button1Label?: string;
    button2Label?: string;
    button1Icon?: keyof typeof Ionicons.glyphMap;
    button2Icon?: keyof typeof Ionicons.glyphMap;
};

export default function TabButtons({
    onButton1Press,
    onButton2Press,
    button1Label = 'Button 1',
    button2Label = 'Button 2',
    button1Icon = 'home',
    button2Icon = 'grid-outline',
}: TabButtonsProps) {
    const [activeTab, setActiveTab] = useState(0);
    const translateX = useSharedValue(0);
    const glassWidth = useSharedValue(0);

    const [button1Layout, setButton1Layout] = useState({ x: 0, width: 0 });
    const [button2Layout, setButton2Layout] = useState({ x: 0, width: 0 });

    const handleButton1Layout = (event: LayoutChangeEvent) => {
        const { x, width } = event.nativeEvent.layout;
        setButton1Layout({ x, width });
        if (activeTab === 0) {
        translateX.value = x;
        glassWidth.value = width;
        }
    };

    const handleButton2Layout = (event: LayoutChangeEvent) => {
        const { x, width } = event.nativeEvent.layout;
        setButton2Layout({ x, width });
    };

    const handleButton1Press = () => {
        setActiveTab(0);
        translateX.value = withSpring(button1Layout.x, { damping: 100, stiffness: 450 });
        glassWidth.value = withSpring(button1Layout.width, { damping: 100, stiffness: 450 });
        onButton1Press();
    };

    const handleButton2Press = () => {
        setActiveTab(1);
        translateX.value = withSpring(button2Layout.x, { damping: 100, stiffness: 450 });
        glassWidth.value = withSpring(button2Layout.width, { damping: 100, stiffness: 450 });
        onButton2Press();
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
        width: glassWidth.value,
    }));

    return (
        <View style={styles.footer}>
            <View style={styles.tabContainer}>
                {/* Liquid Glass animé */}
                <Animated.View style={[styles.glassWrapper, animatedStyle]}>
                <LiquidGlassView
                    style={[
                    styles.liquidGlass,
                    !isLiquidGlassSupported && { backgroundColor: 'rgba(255, 255, 255, 0.39)' },
                    ]}
                    interactive
                    effect="clear"
                />
                </Animated.View>

                {/* Bouton 1 */}
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={handleButton1Press}
                        onLayout={handleButton1Layout}
                    >
                        <Ionicons 
                            name={button1Icon} 
                            size={18} 
                            color={activeTab === 0 ? Colors.smoothWhite : Colors.WhiteGray} 
                        />
                        <Text style={[styles.buttonText, activeTab === 0 && styles.activeText]}>
                            {button1Label}
                        </Text>
                    </TouchableOpacity>

                    {/* Bouton 2 */}
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={handleButton2Press}
                        onLayout={handleButton2Layout}
                    >
                    <Ionicons 
                            name={button2Icon} 
                            size={18} 
                            color={activeTab === 1 ? Colors.smoothWhite : Colors.WhiteGray} 
                        />
                        <Text style={[styles.buttonText, activeTab === 1 && styles.activeText]}>
                            {button2Label}
                        </Text>
                    </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        paddingHorizontal: 24,
        // position: 'absolute',
        // bottom: 35,
        // left: 95,
    },
    tabContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 4,
        backgroundColor: Colors.darkSmooth,
        borderRadius: 100,
        alignSelf: 'center',
    },
    glassWrapper: {
        position: 'absolute',
        top: 4,
        bottom: 4,
        left: 0,
    },
    liquidGlass: {
        flex: 1,
        borderRadius: 100,
        borderWidth: 1.3,
        borderTopColor: 'rgba(255, 255, 255, 0.34)', 
        borderLeftColor: 'rgba(255, 255, 255, 0.34)',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    button: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
        color: Colors.WhiteGray,
    },
    activeText: {
        color: Colors.smoothWhite,
    },
});