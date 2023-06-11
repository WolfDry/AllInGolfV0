import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchUser} from '../redux/actions/index'
import { CustomTabBarButton } from '../navigation/CustomTabBarButton'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feed from './FeedScreen'
import { StyleSheet } from 'react-native'
import COLORS from '../../const/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import Profile from './ProfileScreen'
import { Chat } from './ChatScreen'
import { StatScreen } from './StatScreen'

const Tab = createBottomTabNavigator()

const EmptyScreen = ()=>{
    return(null)
}

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser()
    }
  render() {
    const {currentUser} = this.props
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

                    if (route.name == "Feed") {
                        iconName = "home"
                    }
                    if (route.name == "Stat") {
                        iconName = "stats-chart"
                    }
                    if (route.name == "Game") {
                        iconName = "golf"
                    }
                    if (route.name == "Chat") {
                        iconName = "md-chatbubbles"
                    }
                    if (route.name == "Profile") {
                        iconName = "person"
                    }

                    return <Icon name={iconName} size={27} color={color} />
                }
            }
        )} >
            <Tab.Screen name="Feed" component={Feed} options={{
                tabBarButton: props => <CustomTabBarButton {...props} />
            }} />
            <Tab.Screen name="Stat" component={StatScreen} options={{
                tabBarButton: props => <CustomTabBarButton {...props} />
            }} /> 
            <Tab.Screen name="Chat" component={Chat} options={{
                tabBarButton: props => <CustomTabBarButton {...props} />
            }} /> 
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarButton: props => <CustomTabBarButton {...props} />
            }} />
        </Tab.Navigator >
    )
  }
}

const mapStateToProps = (store)=>({
    currentUser: store.userState.currentUser
})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Main)

const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        backgroundColor: COLORS.white,
        borderWidth: 0,
    },
});