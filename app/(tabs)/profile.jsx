import { View, Text } from 'react-native'
import React from 'react'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'

export default function profile() {
  return (
    <View style={{
      padding:20,
      paddingTop:25
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:28
      }}>Profile</Text>

      {/* User intro */}
      <UserIntro/>
      {/* Menu */}
      <MenuList/>

    </View>
  )
}