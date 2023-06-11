import { StyleSheet, ScrollView, ImageBackground, View, Text, Pressable } from 'react-native';
import globalStyles from '../../const/globalStyle';
import COLORS from '../../const/colors';
import { Defs, G, Path, Rect, Svg, ClipPath } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather'

export function StatScreen({ navigation }) {

    return (
        <ScrollView style={{ width: '100%', marginBottom: 60 }} contentContainerStyle={globalStyles.center} bounces={false}>
            <ImageBackground source={require('../../../assets/img/backgroundStat.png')} resizeMode='cover' style={{ width: '100%' }}>
                <View style={[styles.header, globalStyles.center,]}>
                    <Pressable style={[globalStyles.center, globalStyles.fullScreen, { borderBottomWidth: 1, borderColor: COLORS.white, borderRightWidth: 0.5 }]}
                        onPress={() => navigation.navigate('badgeScreen')}
                    >
                        <Text style={[globalStyles.hongkong, { color: COLORS.white, fontSize: 18, paddingBottom: 10 }]}>Badges</Text>
                    </Pressable>
                    <Pressable style={[globalStyles.center, globalStyles.fullScreen, { borderBottomWidth: 1, borderColor: COLORS.white, borderLeftWidth: 0.5 }]}
                        onPress={() => navigation.navigate('badge')}
                    >
                        <View style={{ position: "absolute", top: -30, left: 10, zIndex: -1, }}>
                            <Svg xmlns="http://www.w3.org/2000/svg" width="152.525" height="79.066" viewBox="0 0 152.525 79.066">
                                <Path id="Tracé_157" data-name="Tracé 157" d="M42.4,19.644c11.341-.846,15.45.451,23.711,15.828C74.733,51.516,82.44,71.729,81.582,94.654c-.861,22.988-8.22,24.143-16.738,39.98-8.167,15.183-12.143,30.758-23.473,32.725-11.434,1.986-21.715-13.369-29.261-30.432-6.77-15.308,3.317-28.869,3.959-48.839C16.686,68.9,5.3,49,11.747,34.569,19.09,18.132,31.129,20.485,42.4,19.644" transform="translate(-15.608 88.478) rotate(-92)" fill="none" stroke="#fff" stroke-width="2" />
                            </Svg>
                        </View>
                        <Text style={[globalStyles.hongkong, { color: COLORS.white, fontSize: 18, paddingBottom: 10 }]}>Statistiques</Text>
                    </Pressable>
                </View>
            </ImageBackground>
            <View style={[globalStyles.center, globalStyles.fullScreen]}>
                <LinearGradient style={[globalStyles.center, { flex: 1, padding: 30, width: '75%', borderRadius: 15, marginVertical: 15 }]} colors={[COLORS.white, '#7FC2C1']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
                    <Text style={[globalStyles.hongkong, { marginBottom: 25 }]}>Moyenne de putts par trou</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                        <Svg width="51.35" height="71.422" viewBox="0 0 51.35 71.422">
                            <Defs>
                                <ClipPath id="clip-path">
                                    <Rect width="51.35" height="71.422" fill="none" stroke="#346867" stroke-width="1" />
                                </ClipPath>
                            </Defs>
                            <G clip-path="url(#clip-path)">
                                <Path d="M20.943,70.874A18.966,18.966,0,0,1,2,51.931a9.43,9.43,0,0,1,9.419-9.42H37.471V31.328h3.3V2H50.8V51.931A18.964,18.964,0,0,1,31.86,70.874Zm-12.657-7.2A17.327,17.327,0,0,0,20.943,69.2H31.86A17.292,17.292,0,0,0,49.132,51.931V44.183H11.419a7.755,7.755,0,0,0-7.492,5.773l-.416,1.575H23.8V53.2H3.655l.231,1.451a17.147,17.147,0,0,0,1.374,4.51l.337.728h9.786v1.671H6.329Zm30.856-21.16h9.99V33h-9.99Zm3.3-11.184h6.69V24.942h-6.69Zm0-8.057h6.69V3.671h-6.69Z" transform="translate(-0.726 -0.726)" fill="none" stroke="#346867" stroke-width="1" />
                                <Path d="M20.943,70.874A18.966,18.966,0,0,1,2,51.931a9.43,9.43,0,0,1,9.419-9.42H37.471V31.328h3.3V2H50.8V51.931A18.964,18.964,0,0,1,31.86,70.874Zm-12.657-7.2A17.327,17.327,0,0,0,20.943,69.2H31.86A17.292,17.292,0,0,0,49.132,51.931V44.183H11.419a7.755,7.755,0,0,0-7.492,5.773l-.416,1.575H23.8V53.2H3.655l.231,1.451a17.147,17.147,0,0,0,1.374,4.51l.337.728h9.786v1.671H6.329Zm30.856-21.16h9.99V33h-9.99Zm3.3-11.184h6.69V24.942h-6.69Zm0-8.057h6.69V3.671h-6.69Z" transform="translate(-0.726 -0.726)" fill="none" stroke="#346867" stroke-miterlimit="10" stroke-width="4" />
                            </G>
                        </Svg>

                        <Text style={[globalStyles.hongkong, { fontSize: 45 }]}>2.4</Text>
                    </View>
                </LinearGradient>
                <LinearGradient style={[globalStyles.center, { flex: 1, padding: 30, width: '75%', borderRadius: 15, marginVertical: 15 }]} colors={['#CBF5DD', '#36A971']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
                    <Text style={[globalStyles.hongkong, { marginBottom: 25 }]}>Fairways</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                        <View style={[globalStyles.fullScreen, globalStyles.center]}>
                            <View style={[globalStyles.fullScreen, globalStyles.center, { backgroundColor: COLORS.white, borderRadius: 100, width: 50, height: 50 }]}>
                                <Icon style={{ fontSize: 35, color: COLORS.green }} name='arrow-up-left' />
                            </View>
                            <Text style={globalStyles.hongkong}>26%</Text>
                        </View>
                        <View style={[globalStyles.fullScreen, globalStyles.center]}>
                            <View style={[globalStyles.fullScreen, globalStyles.center, { backgroundColor: COLORS.white, borderRadius: 100, width: 50, height: 50 }]}>
                                <Icon style={{ fontSize: 35, color: COLORS.green }} name='arrow-up-right' />
                            </View>
                            <Text style={globalStyles.hongkong}>24%</Text>
                        </View>
                        <View style={[globalStyles.fullScreen, globalStyles.center]}>
                            <View style={[globalStyles.fullScreen, globalStyles.center, { backgroundColor: COLORS.white, borderRadius: 100, width: 50, height: 50 }]}>
                                <Icon style={{ fontSize: 35, color: COLORS.green }} name='arrow-down' />
                            </View>
                            <Text style={globalStyles.hongkong}>24%</Text>
                        </View>
                        <View style={[globalStyles.fullScreen, globalStyles.center]}>
                            <View style={[globalStyles.fullScreen, globalStyles.center, { backgroundColor: COLORS.white, borderRadius: 100, width: 50, height: 50 }]}>
                                <View style={{ borderWidth: 3, borderRadius: 50, borderColor: COLORS.green, width: 25, height: 25 }}></View>
                            </View>
                            <Text style={globalStyles.hongkong}>26%</Text>
                        </View>
                    </View>
                </LinearGradient>
                <LinearGradient style={[globalStyles.center, { flex: 1, padding: 30, width: '75%', borderRadius: 15, marginVertical: 15 }]} colors={['#FFFCF8', '#FFD388']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
                    <Text style={[globalStyles.hongkong, { marginBottom: 25 }]}>Moyenne de score brut</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>

                        <Svg xmlns="http://www.w3.org/2000/svg" width="54.052" height="70.762" viewBox="0 0 54.052 70.762">
                            <Path id="Tracé_177" data-name="Tracé 177" d="M19.528,51.5H42.017v7.215H19.528Zm0-8.36H42.017v6.686H19.528Zm-9.493-8.36h7.818V58.718H10.035Zm9.493,0H42.017v6.686H19.528Zm-9.493-8.36h7.818v6.686H10.035Zm9.493,0H42.017v6.686H19.528Zm15.278-8.7V10.055h7.21V24.747H10.035V10.055h7.211V17.72ZM18.921,1.674H33.132V16.046H18.921Zm15.886,0H50.377V67.086H1.675V1.674H17.246V8.38H8.36V60.392H43.691V8.38H34.806ZM0,68.761H52.052V0H0Z" transform="translate(1 1.001)" fill="#1e1f21" stroke="#1e1f21" stroke-width="2" />
                        </Svg>

                        <Text style={[globalStyles.hongkong, { fontSize: 45 }]}>61</Text>
                    </View>
                </LinearGradient>
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: '16%',
        paddingHorizontal: '7%'
    },
})