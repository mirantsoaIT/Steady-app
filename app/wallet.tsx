import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router, Stack } from 'expo-router';
import { Colors } from '@/constants/theme';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import FooterButtons from '@/components/ui/FooterButtons';
import LottieView from 'lottie-react-native';
import Header from '@/components/ui/header';


export default function WalletScreen() {
    const variableExpenses = [
        { id: 1, category: 'Quotidien', percentage: '30%', amount: '60.000 AR', icon: 'wallet-outline', Background: 'rgba(180, 178, 178, 0.2)' },
        { id: 2, category: 'Exceptionnel', percentage: '20%', amount: '40.000 AR', icon: 'game-controller-outline', Background: 'rgba(180, 178, 178, 0.2)' },
        { id: 3, category: 'Invest.', percentage: '15%', amount: '30.000 AR', icon: 'car-outline', Background: 'rgba(180, 178, 178, 0.2)' },
    ];
    return (
        <>
            <Stack.Screen 
                options={{ 
                    headerShown: false,
                }} 
            />
            <View style={styles.container  as any}>
                <View style= {{width: 500, height: 500, backgroundColor: Colors.yellow, position: 'absolute', top: -30, left: -300, borderRadius: 800, filter: 'blur(150px)', opacity: 0.2 }}/>
                <View style= {{width: 500, height: 500, backgroundColor: Colors.tertiary, position: 'absolute', top: 930, left: 100, borderRadius: 800, filter: 'blur(100px)'}}/>
                {/* Header */}
                <View style={styles.header}>
                    {/* Header */}
                    <Header 
                        userName="Mirantsoa" 
                        profileImage={require('../assets/images/men.jpg')} 
                    />
                    {/* Bouton notification */}
                    <TouchableOpacity 
                        onPress={() => console.log('Notifications')} 
                        style={styles.notificationButton  as any}
                    >
                        <Ionicons name="notifications-outline" size={24} color={Colors.dark  as any} />
                        {/* Badge de notification (optionnel) */}
                        <View style={styles.badge  as any} />
                    </TouchableOpacity>
                </View>

                {/* Contenu de la page */}
                <View style={{ flex: 1, paddingHorizontal: 20, gap: 10 }}>
                    <View style={styles.card}>
                        <View style={{ overflow: 'hidden', backgroundColor: Colors.smoothWhite, paddingVertical: 16, borderRadius: 40, flexDirection: 'column', gap: 10, paddingHorizontal: 30 }}>
                            <View style={styles.div}/>
                            {/* <View style={styles.div1}/> */}
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 4}}>
                                <Text style={{ fontSize: 16, fontFamily: 'Montserrat_400Regular', color: Colors.gray }}>Budget</Text>
                                <Text style={{ fontSize: 14, fontFamily: 'Montserrat_400Regular', color: Colors.white, backgroundColor: Colors.primary, paddingLeft: 8, paddingRight: 8, paddingTop: 4, paddingBottom: 4, borderRadius: 20 }}>Mensuel</Text>
                            </View> 
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 4}}>
                                <View style={{flexDirection: 'row', alignItems: 'baseline', gap: 4}}>
                                    <Text style={{ fontSize: 50, fontFamily: 'Montserrat_600SemiBold', color: Colors.darkSmooth }}>200.000</Text>
                                    <Text style={{ fontSize: 18, fontFamily: 'Montserrat_600SemiBold', color: Colors.gray}}>AR</Text>
                                </View>
                                <LottieView 
                                    source={require('../assets/lotties/Coins.json')} 
                                    autoPlay
                                    loop
                                    style={{ width: 80, height: 80 }}
                                />
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'baseline', gap: 4}}>
                                <Text style={{ fontSize: 16, fontFamily: 'Montserrat_400Regular', color: Colors.gray}}>04/2026</Text>
                            </View>
                        </View>
                        <View style={{ 
                            padding: 16, 
                            borderRadius: 40, 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            flexDirection: 'row', 
                            gap: 40 
                        }}>
                            {/* Bouton Ajouter */}
                            <TouchableOpacity style={{ alignItems: 'center', gap: 8 }}>
                                <Ionicons name="add-circle-outline" size={18} color={Colors.TransGray} />
                                <Text style={{ fontSize: 16, fontFamily: 'Montserrat_300Light', color: Colors.white }}> Ajouter</Text>
                            </TouchableOpacity>

                            {/* Bouton Modifier */}
                            <TouchableOpacity style={{ alignItems: 'center', gap: 8 }}>
                                <Ionicons name="create-outline" size={18} color={Colors.TransGray} />
                                <Text style={{ fontSize: 16, fontFamily: 'Montserrat_300Light', color: Colors.white }}> Modifier </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', gap: 10 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Montserrat_600SemiBold', color: Colors.primary, marginTop: 20, marginLeft: 20 }}>Dépenses fixe</Text>
                        <TouchableOpacity 
                            style={{ 
                                flexDirection: 'row', 
                                alignItems: 'center', 
                                justifyContent: 'space-between', 
                                backgroundColor: Colors.smoothWhite, 
                                padding: 24, 
                                borderRadius: 40 
                            }}
                            onPress={() => console.log('Budget cliqué')}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Image 
                                    source={require('../assets/images/wallet.jpg')} 
                                    style={{ width: 40, height: 40, borderRadius: 20 }} 
                                />
                                <Text style={{ fontSize: 20, fontFamily: 'Montserrat_600SemiBold', color: Colors.darkSmooth }}>50%</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                                <Text style={{ fontSize: 18, fontFamily: 'Montserrat_400Regular', color: Colors.primary }}>100.000 AR</Text>
                                <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', gap: 10 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Montserrat_600SemiBold', color: Colors.primary, marginTop: 20, marginLeft: 20 }}>Dépenses Variable</Text>
                        {/* Cards en ligne fixe */}
                        <View style={{ 
                            flexDirection: 'row',
                            gap: 12,
                            justifyContent: 'space-between',
                        }}>
                            {variableExpenses.map((item) => (
                                <TouchableOpacity 
                                    key={item.id}
                                    style={{
                                        backgroundColor: item.Background,
                                        borderRadius: 30,
                                        padding: 16,
                                        flex: 1,
                                        height: 160,
                                    }}
                                    onPress={() => console.log(`${item.category} cliqué`)}
                                >
                                    <View style={{ 
                                        flexDirection: 'row', 
                                        alignItems: 'center', 
                                        justifyContent: 'space-between',
                                        marginBottom: 12,
                                    }}>
                                        <View style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 16,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <Ionicons name={item.icon as any} size={20} color={Colors.purple} />
                                        </View>
                                        <Ionicons name="chevron-forward" size={20} color={Colors.darkSmooth} />
                                    </View>

                                    <Text style={{ 
                                        fontSize: 16, 
                                        fontFamily: 'Montserrat_400Regular', 
                                        color: Colors.gray as any, 
                                        marginBottom: 6 
                                    }}>
                                        {item.category}
                                    </Text>
                                    <Text style={{ 
                                        fontSize: 20, 
                                        fontFamily: 'Montserrat_700Bold', 
                                        color: Colors.dark as any,
                                        marginBottom: 6 
                                    }}>
                                        {item.percentage}
                                    </Text>
                                    <Text style={{ 
                                        fontSize: 16, 
                                        fontFamily: 'Montserrat_600SemiBold', 
                                        color: Colors.primary as any, 
                                    }}>
                                        {item.amount}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', gap: 10 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Montserrat_600SemiBold', color: Colors.primary, marginTop: 20, marginLeft: 20 }}>Reste fin période</Text>
                        <TouchableOpacity 
                            style={{ 
                                flexDirection: 'row', 
                                alignItems: 'center', 
                                justifyContent: 'space-between', 
                                padding: 24, 
                                borderRadius: 40 
                            }}
                            onPress={() => console.log('Budget cliqué')}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Image 
                                    source={require('../assets/images/reste.jpg')} 
                                    style={{ width: 45, height: 43, borderRadius: 20 }} 
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                                <Text style={{ fontSize: 15, fontFamily: 'Montserrat_600SemiBold', color: Colors.Reste, backgroundColor: Colors.ResteLight, paddingLeft: 10, paddingRight: 10, paddingTop: 5, borderRadius: 10 }}>10.000 AR</Text>
                                <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* Footer */}
                </View>
                <FooterButtons
                    onButton1Press={() => console.log('Dashboard Pressed')}
                    onButton2Press={() => console.log('Home Pressed')}
                    button1Label="Accueil"
                    button1Icon="home"
                    button2Label="Dashboard"
                    button2Icon="grid"
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingVertical: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    notificationButton: {
        padding: 8,
        position: 'relative',
        right: 40,
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF4444',
    },

    //content
    div: {
        backgroundColor: Colors.tertiary,
        width: 180,
        height: 180,
        borderRadius: 200,
        position: 'absolute',
        filter: 'blur(110px)',
    },
    div1: {
        backgroundColor: Colors.WhiteGray,
        width: 180,
        height: 180,
        borderRadius: 200,
        position: 'absolute',
        filter: 'blur(95px)',
        right: -50,
    },
    card: {
        backgroundColor: Colors.primary,
        borderRadius: 45,
        padding: 7,
        justifyContent: 'center',
    }
});