import { View, Image,Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function CategoryItem({ category,onCategoryPress }) {
  return (
    <TouchableOpacity onPress={()=>onCategoryPress(category)}>
        <View style={{
            padding:15,
            backgroundColor:'#F6CEFC',
            borderRadius:99,
            marginRight:20,


        }}>
      <Image 
        source={{ uri: category.icon }} 
        style={{
          width: 45,
          height:45
        }}
      />
      </View>
      <Text style={{
        fontSize:11,
        fontFamily:'outfit-medium',
        textAlign:'center',
        marginTop:5
      }}>{category.name}</Text>
    </TouchableOpacity>
  );
}
