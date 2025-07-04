import { View, Text,  Image, TouchableOpacity, StyleSheet, Dimensions, FlatList, Linking, Share } from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('window').width;

export default function ActionButton({ business }) {
  const actionButtonMenu = [
    {
      id: 1,
      name: 'Call',
      icon: require('./../../assets/images/call.png'),
      url: 'tel:' + business?.contact, // Fixed tel URL syntax
    },
    {
      id: 2,
      name: 'Location',
      icon: require('./../../assets/images/pin.png'),
      url: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(business?.address),
    },
    {
      id: 3,
      name: 'Web',
      icon: require('./../../assets/images/web.png'),
      url: business?.website,
    },
    {
      id: 4,
      name: 'Share',
      icon: require('./../../assets/images/share.png'),
      url: business?.website,
    },
  ];
const OnPressHandler=(item)=>{
    if(item.name=='Share'){
      Share.share({
        message:business?.name+"\n " +business?.address+"\n" +business?.website 
      })
        return;
    }
    Linking.openURL(item.url);
};

const filteredButtons = actionButtonMenu.filter(button => {
  if (
    (business?.category === 'Trip Planner' && button.name === 'Location') ||
    (business?.category === 'Community' && button.name === 'Location')
  ) {
    return false; // Exclude Location button for Trip Planner and Community Support categories
  }
  return true;
});
  

  return (
    <View style={{
        backgroundColor:'#fff',
        padding:20
    }}>
        <FlatList
        data={filteredButtons}
        numColumns={4}
        columnWrapperStyle={{justifyContent:'space-between'}}
        renderItem={({item,index})=>(
            <TouchableOpacity key={index}
            onPress={()=>OnPressHandler(item)}
            >
                <Image   source={item?.icon}
                style={{
                    width:50,
                    height:50
                }}
                />
                <Text style={{
                    fontFamily:'outfit-medium',
                    textAlign:'center',
                    marginTop:3
                }}>
                    {item?.name}
                </Text>

                </TouchableOpacity>
        )}
        
        />
      
    </View>
  );
}


