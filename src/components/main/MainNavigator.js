import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchUser, fetchUserPosts} from '../redux/actions/index'
import { CustomTabBarButton } from '../navigation/CustomTabBarButton'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {FeedScreen} from './FeedScreen'
import { StyleSheet } from 'react-native'
import COLORS from '../../const/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import { ChatScreen } from './ChatScreen'
import { StatScreen } from './StatScreen'
import ProfileScreen from './profile/ProfileScreen'

const Tab = createBottomTabNavigator()

export class MainNavigator extends Component {

    componentDidMount(){
        this.props.fetchUser()
        this.props.fetchUserPosts()
    }
    
  render() {
    const {currentUser, posts} = this.props
    return (
        <Tab.Navigator initialRouteName='Feed' screenOptions={({ route }) => (
            {
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarInactiveTintColor: COLORS.black,
                tabBarActiveTintColor: COLORS.white,
                tabBarIcon: ({ color }) => {

                    let iconName

                    if (route.name == "FeedScreen") {
                        iconName = "home"
                    }
                    if (route.name == "StatScreen") {
                        iconName = "stats-chart"
                    }
                    if (route.name == "GameScreen") {
                        iconName = "golf"
                    }
                    if (route.name == "ChatScreen") {
                        iconName = "md-chatbubbles"
                    }
                    if (route.name == "ProfileScreen") {
                        iconName = "person"
                    }

                    return <Icon name={iconName} size={27} color={color} />
                }
            }
        )} >
            <Tab.Screen name="FeedScreen" component={FeedScreen} options={{
                tabBarButton: props => <CustomTabBarButton {...props} />
            }} />
            <Tab.Screen name="StatScreen" component={StatScreen} options={{
                tabBarButton: props => <CustomTabBarButton {...props} />
            }} /> 
            <Tab.Screen name="ChatScreen" component={ChatScreen} options={{
                tabBarButton: props => <CustomTabBarButton {...props} />
            }} /> 
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
                tabBarButton: props => <CustomTabBarButton {...props} />
            }} />
        </Tab.Navigator >
    )
  }
}

const mapStateToProps = (store)=>({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator)

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        backgroundColor: COLORS.white,
        borderWidth: 0,
    },
});