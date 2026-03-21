import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import InputField from '@/components/ui/InputField';
import PrimaryButton from '@/components/ui/PrimaryButton';
import TabButtons from '@/components/ui/TabButtons';
import LottieView from 'lottie-react-native';

export default function LoginScreen() {
    const [activeTab, setActiveTab] = useState<'email' | 'newEmail'>('email');
    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Login success');
            // router.push('/home');
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async () => {
        setIsLoading(true);
        try {
            if (newPassword !== confirmPassword) {
                alert('Les mots de passe ne correspondent pas');
                setIsLoading(false);
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Signup success');
            // router.push('/home');
        } catch (error) {
            console.error('Signup error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            
            <View style={styles.container}>
                {/* Bouton retour */}
                <TouchableOpacity 
                    onPress={() => router.back()} 
                    style={styles.backButton}
                >
                    <Ionicons name="chevron-back" size={24} color="#000" />
                    <Text style={styles.backText}>Retour</Text>
                </TouchableOpacity>

                {/* Titre */}
                <View style={styles.header}>
                    <Text style={styles.subtitle}>
                        {activeTab === 'email' 
                            ? 'Connectez avec votre compte' 
                            : 'Créez votre compte'}
                    </Text>
                    <Text style={styles.title}>
                        {activeTab === 'email' 
                            ? 'Heureux de vous revoir!' 
                            : 'Rejoignez-nous!'}
                    </Text>
                </View>

                {/* Tab Se connecter / Créer un compte */}
                <View style={styles.tabWrapper}>
                    <TabButtons
                        onButton1Press={() => setActiveTab('email')}
                        onButton2Press={() => setActiveTab('newEmail')}
                        button1Label="Se connecter"
                        button2Label="Créer un compte"
                        button1Icon="person"
                        button2Icon="person-add"
                    />
                </View>

                {/* Formulaire */}
                <View style={styles.form}>
                    {activeTab === 'email' ? (
                        <>
                            {/* Connexion */}
                            <InputField
                                label="Email"
                                placeholder="Entrer votre email"
                                value={email}
                                onChangeText={setEmail}
                                icon="at"
                                keyboardType="email-address"
                            />
                            
                            <InputField
                                label="Mot de passe"
                                placeholder="Entrer votre mot de passe"
                                value={password}
                                onChangeText={setPassword}
                                icon="eye-off"
                                secureTextEntry
                            />

                            {/* Forgot password */}
                            <TouchableOpacity style={styles.forgotPassword}>
                                <Text style={styles.forgotPasswordText}>Mot de passe oublié?</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            {/* Création de compte */}
                            <InputField
                                label="Email"
                                placeholder="Entrer votre email"
                                value={newEmail}
                                onChangeText={setNewEmail}
                                icon="at"
                                keyboardType="email-address"
                            />
                            
                            <InputField
                                label="Mot de passe"
                                placeholder="Créer un mot de passe"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                icon="eye-off"
                                secureTextEntry
                            />

                            <InputField
                                label="Confirmation"
                                placeholder="Confirmer le mot de passe"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                icon="eye-off"
                                secureTextEntry
                            />
                        </>
                    )}
                </View>

                {/* Spacer */}
                <View style={{ flex: 1 }} />

                {/* Bottom section */}
                <View style={styles.bottom}>
                    <PrimaryButton
                        text={activeTab === 'email' ? 'Se connecter' : 'Créer'}
                        onPress={activeTab === 'email' ? handleLogin : handleSignup}
                        loading={isLoading}
                    />
                </View>

                <LottieView
                    source={require('../assets/lotties/helloMan.json')}
                    autoPlay
                    loop
                    style={styles.lottieHello}
                />
            </View>

            <View style={{backgroundColor: Colors.tertiary, width: 300, height: 400, position: 'absolute', top: -50, right: -100, filter: 'blur(150px)'}}/>
            <View style={{backgroundColor: Colors.transparentYellow, width: 300, height: 400, position: 'absolute', bottom: -200, left: -200, filter: 'blur(150px)', opacity: 0.5}}/>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
        zIndex: 1
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 70,
    },
    backText: {
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
        color: Colors.darkSmooth,
    },
    header: {
        marginBottom: 32,
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Montserrat_400Regular',
        color: Colors.secondary,
        marginBottom: 8,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Montserrat_700Bold',
        color: Colors.darkSmooth,
    },
    tabWrapper: {
        marginBottom: 45,
        alignItems: 'center',
    },
    form: {
        gap: 20,
    },
    forgotPassword: {
        alignSelf: 'center',
        top: 35
    },
    forgotPasswordText: {
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
        color: '#B0B0B0',
    },
    bottom: {
        gap: 24,
    },
    lottieHello: {
        width: 200,
        height: 200,
        position: 'absolute',
        bottom: 130,
        right: 130,
    }
});