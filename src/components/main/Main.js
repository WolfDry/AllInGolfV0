import React, { Component } from 'react'
import { View, Text } from 'react-native'
import globalStyles from '../../const/globalStyle'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchUser} from '../redux/actions/index'

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser()
    }
  render() {
    const {currentUser} = this.props
    return (
        <View style={[globalStyles.center, globalStyles.fullScreen]}>
            <Text>
                {currentUser && currentUser.pseudo} is logged in
            </Text>
        </View>
    )
  }
}

const mapStateToProps = (store)=>({
    currentUser: store.userState.currentUser
})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Main)