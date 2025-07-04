import { View, Text, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import {Colors} from './../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import Category from '../../components/Home/Category';
import { collection, getDocs, query,where } from 'firebase/firestore';
import {db} from './../../configs/FirebaseConfig'
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';


export default function explore() {

const [businessList,setBusinessList]=useState([]);

const GetBusinessByCategory=async(category)=>{
  setBusinessList([]);
    const q=query(collection(db,'BusinessList'),where('category','==',category));
  const querySnapShot=await getDocs(q);
  querySnapShot.forEach((doc)=>{
      console.log(doc.data())
      setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])
  },[])

}

  return (
    <View style={{
      padding:20,
      paddingTop:30
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30
      }}>Explore more!! </Text>
      {/* Search Bar */}
      <View style={{
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        backgroundColor:"#fff",
        padding:10,marginVertical:10,marginTop:15,
        borderRadius:8,borderColor:Colors.PRIMARY,borderWidth:1
      }}>
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder='Search...' style={{
            fontFamily:'outfit',
            fontsize:16
        }}/>  
      </View>
      {/* Category */}
        <Category
        explore={true}
        onCategorySelect={(category)=>GetBusinessByCategory(category)}
        
        
        />
      {/* Business List */}
        <ExploreBusinessList  businessList={businessList}/>
      
    </View>
  )
}