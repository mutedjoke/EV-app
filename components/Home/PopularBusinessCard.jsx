import { View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import { Colors } from './../../constants/Colors';


export default function PopularBusinessCard({ business }) {



  return (
    <TouchableOpacity 
    style={{
        marginLeft:20,padding:10,backgroundColor:'#F6CEFC',borderRadius:15
    }}>
      <Image source={{uri:business?.imageUrl}} 
      style={{
        width:200,
        height:130,
        borderRadius:15,
        alignContent:'center'
      }}
      />
      <View style={{
        marginTop:7,gap:5
      }}>
        <Text style={{
            fontFamily:'outfit-bold',
            textAlign:'center',
            fontSize:15
        }}>
            {business.name}
        </Text>
        {/* <Text style={{
            fontFamily:'outfit',
            textAlign:'center',
            fontSize:12

        }}>
            {business.address}
        </Text> */}
        <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between'
        }}>

        
        <View style={{
            display:'flex',
            flexDirection:'row',
            gap:10
        }}>
            <Image source={require('./../../assets/images/star.png')}
            style={{
                width:15,
                height:15
            }}
            />
            <Text style={{fontFamily:'outfit'}}>4.5</Text>
        </View>
        <Text style={{
            fontFamily:'outfit',
            padding:3,
            fontSize:12,
            borderRadius:5
        }}>
            {business.category}
        </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}