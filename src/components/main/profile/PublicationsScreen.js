import React, { useEffect } from 'react'
import { View, Text, Image, ImageBackground, StyleSheet, ScrollView, FlatList } from "react-native";
import globalStyles from '../../../const/globalStyle';
import { Path, Svg } from 'react-native-svg'
import { connect } from "react-redux";

function PublicationsScreen(props) {

    const {posts} = props

  return (
    <View>
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
                        <View style={{ position: "absolute", top: -25, left: 5, zIndex: -1, }}>
                            <Svg xmlns="http://www.w3.org/2000/svg" width="95" height="90" viewBox="0 0 130.017 91.719">
                                <Path id="Tracé_158" data-name="Tracé 158" d="M44.046,19.606c11.912-.683,16.227.364,24.9,12.774C78,45.329,86.1,61.642,85.2,80.145c-.9,18.553-8.634,19.485-17.581,32.267-8.578,12.254-12.754,24.824-24.654,26.412-12.009,1.6-22.808-10.789-30.733-24.561-7.11-12.354,3.484-23.3,4.159-39.416.648-15.488-11.31-31.548-4.54-43.194,7.713-13.266,20.358-11.367,32.2-12.046" transform="translate(-19.424 83.367) rotate(-83)" fill="none" stroke="#fff" stroke-width="2"/>
                            </Svg>
                        </View>

                        <Text style={[globalStyles.white, globalStyles.hongkong, { fontSize: 18, textAlign: 'center' }]}>1</Text>
                        <Text style={[globalStyles.white, globalStyles.hongkong, { fontSize: 11, textAlign: 'center' }]}>Publication</Text>
                    </View>
                </View>
                <View style={[styles.bubble, globalStyles.center, styles.image]}>
                    <Image style={{ width: '100%', height: '100%', borderRadius: 9000 }} source={require('../../../../assets/img/logo-vert.jpg')} />
                </View>
                <View style={[styles.bubble, globalStyles.center]}>
                    <View style={[globalStyles.fullScreen, globalStyles.center]}>
                        <Text style={[globalStyles.white, globalStyles.hongkong, { fontSize: 18, textAlign: 'center' }]}>
                            {
                                // userData && userData.friends ? userData.friends.length : '0'
                            }
                        </Text>
                        <Text style={[globalStyles.white, globalStyles.hongkong, { fontSize: 11, textAlign: 'center' }]}>
                            {
                                // userData && userData.friends && userData.friends.length > 1 ? 'amies' : 'amie'
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
        <View style={globalStyles.center}>
            <Text style={[globalStyles.hongkongLight, {fontSize: 18, padding: '5%'}]}>
                Mes publications
            </Text>
        </View>
        <View>
            <FlatList
            numColumns={3}
            horizontal={false}
            data={posts}
            renderItem={({item})=>(
                <View style={styles.containerImage}>
                    <Image
                    source={{ uri: item.downloadURL }}
                    style={{ aspectRatio: 1/1,  width: 120, height: 120 }}
                    />
                </View>
            )}
            />
        </View>
    </View>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts
})

export default connect(mapStateToProps, null)(PublicationsScreen)

const styles = StyleSheet.create({
    containerImage:{
        flex: 1/3
    },
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
        backgroundColor: '#3E7B7A',
        padding: '3%',
        borderRadius: 100,
    }
})