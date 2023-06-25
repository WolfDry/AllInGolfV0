import { useEffect, useState } from "react";
import { View, Text, Image, Pressable, StyleSheet, ScrollView, ImageBackground } from "react-native";
import globalStyles from '../../../const/globalStyle'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { connect } from "react-redux";
import COLORS from "../../../const/colors";
import { auth, db } from "../../../../firebase";
import { doc, getDoc, setDoc, deleteDoc} from "firebase/firestore";

LocaleConfig.locales['fr'] = {
    monthNames: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ],
    monthNames: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: 'Aujourd\'hui'
};

LocaleConfig.defaultLocale = 'fr';

function ProfileScreen(props) {

    const [user, setUser] = useState(null)
    const [following, setFollowing] = useState(false)

    const getUser = async (uid) => {
        const docRef = doc(db, "users", uid)
        await getDoc(docRef)
        .then((snapshot)=>{
            if(snapshot.exists()){
                setUser(snapshot.data())
            }else{
                console.log('does not exist')
            }
        })
    }

    useEffect(()=>{
        const {currentUser, posts} = props

        if(props.route.params.uid == auth.currentUser.uid){
            setUser(currentUser)
            setUserPosts(posts)
        }else{
            getUser(props.route.params.uid)
        }

        if(props.following.indexOf(props.route.params.uid) > -1){
            setFollowing(true)
        }else{
            setFollowing(false)
        }

    }, [props.route.params.uid, props.following])

    const onFollow = async () => {
        await setDoc(doc(db,'following', auth.currentUser.uid, 'userFollowing', props.route.params.uid),{})
    }

    const onUnfollow = async () => {
        await deleteDoc(doc(db,'following', auth.currentUser.uid, 'userFollowing', props.route.params.uid))
    }

    const logout = () => {
        auth.signOut()
    }

    if(user === null){return <View></View>}
    return (
        <ScrollView style={{ backgroundColor: 'white', marginBottom: 50 }} contentContainerStyle={globalStyles.center} bounces={false}>
            <ImageBackground source={require('../../../../assets/img/backgroundProfile.png')}>
                <View style={[styles.header, globalStyles.center]}>
                    <View style={[styles.bubble, globalStyles.center]}>
                        <View style={[globalStyles.fullScreen, globalStyles.center]}>
                            <Text style={[globalStyles.white, globalStyles.hongkong, { fontSize: 18, textAlign: 'center' }]}>23</Text>
                            <Text style={[globalStyles.white, globalStyles.hongkong, { fontSize: 11, textAlign: 'center' }]}>Parties</Text>
                        </View>
                        <View style={[globalStyles.fullScreen, globalStyles.center]}>
                            <View backgroundColor={'white'} style={{ padding: 1, width: '100%' }}></View>
                        </View>
                        <View style={[globalStyles.fullScreen, globalStyles.center]}>
                            <Pressable onPress={()=>{props.navigation.navigate('PublicationsScreen', {uid: props.route.params.uid})}}>
                                <Text style={[globalStyles.white, globalStyles.hongkong, { fontSize: 18, textAlign: 'center' }]}>1</Text>
                                <Text style={[globalStyles.white, globalStyles.hongkong, { fontSize: 11, textAlign: 'center' }]}>Publication</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={[styles.bubble, globalStyles.center, styles.image]}>
                        <Image style={{ width: '100%', height: '100%', borderRadius: 9000 }} source={require('../../../../assets/img/logo-vert.jpg')} />
                    </View>
                    <View style={[styles.bubble, globalStyles.center]}>
                        <View style={[globalStyles.fullScreen, globalStyles.center]}>
                            <Text style={[globalStyles.white, globalStyles.hongkong, { fontSize: 18, textAlign: 'center' }]}>
                                {
                                    props.following ? props.following.length : '0'
                                }
                            </Text>
                            <Text style={[globalStyles.white, globalStyles.hongkong, { fontSize: 11, textAlign: 'center' }]}>
                                {
                                    props.following && props.following.length > 1 ? 'amies' : 'amie'
                                }
                            </Text>
                        </View>
                        <View style={[globalStyles.fullScreen, globalStyles.center]}>
                            <View backgroundColor={'white'} style={{ padding: 1, width: '100%' }}></View>
                        </View>
                        <View style={[globalStyles.fullScreen, globalStyles.center]}>
                            <Text style={[globalStyles.white, globalStyles.hongkong, { fontSize: 18, textAlign: 'center' }]}>21</Text>
                            <Text style={[globalStyles.white, globalStyles.hongkong, { fontSize: 11, textAlign: 'center' }]}>Abonnements</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.detailsContainer}>
                <View style={[globalStyles.fullScreen]}>
                    <Text style={[globalStyles.hongkong, { fontSize: 18, marginBottom: 15 }]}>
                        {user && user.pseudo}
                      </Text>
                </View>
                <View style={[globalStyles.fullScreen]}>
                    <Text style={[globalStyles.hongkong, { fontSize: 10 }]}>
                        Biographie de {user && user.pseudo}
                    </Text>
                </View>
                <View style={[globalStyles.fullScreen]}>
                    <Text style={[globalStyles.hongkong, { fontSize: 10 }]}>Paris</Text>
                </View>
                <View style={[globalStyles.fullScreen, styles.buttonContainer]}>
                    {props.route.params.uid !== auth.currentUser.uid ? (
                        <View>
                            {!following ? (
                                <Pressable style={[globalStyles.center, styles.button]} onPress={() => onFollow()}>
                                    <Text style={[globalStyles.hongkong, globalStyles.white, { fontSize: 10 }]}>Ajouter aux amis</Text>
                                </Pressable>
                            ): (
                                <Pressable style={[globalStyles.center, styles.button]} onPress={() => onUnfollow()}>
                                    <Text style={[globalStyles.hongkong, globalStyles.white, { fontSize: 10 }]}>Retier des amis</Text>
                                </Pressable>
                            )}
                        </View>
                    ): (
                        <Pressable style={[globalStyles.center, styles.button]}>
                            <Text style={[globalStyles.hongkong, globalStyles.white, { fontSize: 10 }]}>Modifier le profile</Text>
                        </Pressable>                        
                    )
                    }
                </View>
            </View>
            <View style={styles.badgesContainer}>
                <View style={styles.badges}>
                    <Image source={require('../../../../assets/img/badges-partie-joue.png')} />
                    <Text style={[globalStyles.hongkong, { textAlign: 'center', fontSize: 10 }]}>23/50 Parties joués</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../../../assets/img/etoile.png')} />
                        <Image source={require('../../../../assets/img/etoile.png')} />
                    </View>
                </View>
                <View style={[styles.badges, { justifyContent: 'flex-end' }]}>
                    <Image source={require('../../../../assets/img/badges-partie-joue.png')} />
                    <Text style={[globalStyles.hongkong, { textAlign: 'center', fontSize: 10 }]}>23/50 Parties joués</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../../../assets/img/etoile.png')} />
                        <Image source={require('../../../../assets/img/etoile.png')} />
                    </View>
                </View>
                <View style={styles.badges}>
                    <Image source={require('../../../../assets/img/badges-partie-joue.png')} />
                    <Text style={[globalStyles.hongkong, { textAlign: 'center', fontSize: 10 }]}>23/50 Parties joués</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../../../../assets/img/etoile.png')} />
                        <Image source={require('../../../../assets/img/etoile.png')} />
                        <Image source={require('../../../../assets/img/etoile.png')} />
                    </View>
                </View>
            </View>
            <View style={{ padding: 20, backgroundColor: '#f7f7f7' }}>
                <Calendar
                    style={{ borderWidth: 1 }}
                    onDayPress={day => {
                        setSelected(day.dateString);
                    }}
                    firstDay={1}
                />
            </View>
            <View>
                <Pressable
                    style={{ backgroundColor: '#a00404', padding: 10, borderRadius: 100, margin: 20 }}
                    onPress={() => { logout() }}
                >
                    <Text style={globalStyles.white}>Déconnexion</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following,
})

export default connect(mapStateToProps, null)(ProfileScreen)

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: '9%',
    },
    image: {
        width: 100,
        height: 100
    },
    bubble: {
        flex: 1,
        margin: 10,
        width: 80,
    },
    detailsContainer: {
        paddingVertical: '3%',
        paddingHorizontal: '15%',
        width: '100%',
    },
    badgesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: '10%',
        padding: 25,
        width: '100%',
        height: 250,
    },
    badges: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    button: {
        backgroundColor: COLORS.lightGreen,
        padding: '3%',
        borderRadius: 100,
    }
})