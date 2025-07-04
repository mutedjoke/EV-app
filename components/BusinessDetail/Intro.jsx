import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


export default function Intro({ business }) {
const router=useRouter();

  return (
    <View>
        <View style={{
            position:'absolute',
            zIndex:10,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            width:'100%',padding:20,paddingTop:28
        }}>
            <TouchableOpacity onPress={()=>router.back()}><Ionicons name="arrow-back-circle" size={45} color="white" /></TouchableOpacity>
        
        <Ionicons name="heart-outline" size={40} color="white" />
        </View>
      <Image
        source={{ uri: business?.imageUrl }}
        style={{
          width: '100%',
          height: 320
        }}
      />
    <View style={{
        padding:20,
        marginTop:-20,
        backgroundColor:'#fff',
        borderTopLeftRadius:24,
        borderTopRightRadius:24
    }}>
        <Text style={{
            fontSize:25,
            fontFamily:'outfit-bold',

        }}>{business.name}</Text>
        <Text style={{
            fontFamily:'outfit',
            fontSize:18
        }}>{business.address}</Text>
    </View>
    </View>
  );
}
