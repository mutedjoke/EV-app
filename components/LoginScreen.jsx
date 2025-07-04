import { View, Text,Image,StyleSheet, TouchableOpacityBase, TouchableOpacity} from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import {useWarmUpBrowser} from './../hooks/useWarmUpBrowser'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow}= useOAuth({strategy:"oauth_google"});
  const onPress = React.useCallback(async () => {
    try{
      const { createdSessionId, signIn, signUp, setActive} =
      await startOAuthFlow();

      if(createdSessionId){
        setActive({ session: createdSessionId});
      } else{

      }
    }catch(err){
      console.error("OAuth Error", err);
    }
  }, []);








  return (
    <View>
      <View style={{
        dispaly:'flex',
        alignItems:'center',
        marginTop:100
      }}>

      
      <Image source={require('./../assets/images/login2.jpg')}
      style={{
        width:250,
        height:600,
        borderRadius:20,
        borderWidth:6,
        borderColor:'#000'
      }}
      />
      </View>
      <View style={styles.subContainer}>
        <Text style={{
          fontSize:30,
          fontFamily:'outfit-bold',
          textAlign:'center'
        }}>Your ultimate 
          <Text style={{
            color:Colors.PRIMARY,
          }}> EV guide</Text></Text>
    <Text style={{
      fontSize:15,
      fontFamily:'outfit',
      textAlign:'center',
      marginVertical:15,
      color:Colors.GRAY
    }}>Find EV charging stations near you and much more</Text>

      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={{
          textAlign:'center',
          color:'#fff',
          fontFamily:'outfit'
        }}>Let's Get Started</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  subContainer:{
    backgroundColor:'#fff',
    padding:20,
    marginTop:-40,
  
  },
  btn:{
      backgroundColor:Colors.PRIMARY,
      padding:16,
      borderRadius:99,
      marginTop:20
  }
})