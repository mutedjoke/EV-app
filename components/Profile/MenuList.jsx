import { View, Text, FlatList, Image, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import {Colors} from './../../constants/Colors'
import {useRouter} from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function MenuList() {
    const {signOut}=useAuth();

    const menuList=[
        {
            id:1,
            name:'Add Vehicle',
            icon:require('./../../assets/images/add.png'),
            path:'/business/add-business'

        },
        {
            id:2,
            name:'My Vehicle',
            icon:require('./../../assets/images/myev.png'),
            path:'/business/my-business'

        },
        {
            id:3,
            name:'Share App',
            icon:require('./../../assets/images/share_1.png'),
            path:'share'

        },
        {
            id:4,
            name:'Logout',
            icon:require('./../../assets/images/logout.png'),
            path:'logout'

        }
    ]

    const router=useRouter();
    const onMenuClick = (item) => {
        if (item.path === 'logout') {
            signOut();
            return;
        }
        if (item.path === 'share') {
            Share.share({
                message: 'Download Evolve and take a step towards a greener future!! Download URL: https://expo.dev/artifacts/eas/eqJJCCHNQYZYoE5UpRxfDM.apk'
            });
            return;
        }
        router.push(item.path);
    }
    

  return (
    <View style={{
        marginTop:55
    }}>
      <FlatList  
       data={menuList}
       numColumns={2}
       renderItem={({item,index})=>(
        <TouchableOpacity 
        onPress={()=>onMenuClick(item)}
        
        style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:10,flex:1,padding:10,borderRadius:15,borderWidth:1,margin:10,backgroundColor:'#fff',
            borderColor:Colors.PRIMARY
        }}>
            <Image  source={item.icon}
            style={{
                width:65,
                height:70
            }}
            
            
            />
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:17,flex:1
            }}>{item.name}</Text>
            </TouchableOpacity>
       )}
       
       />

       <Text style={{
        fontFamily:'outfit',
        marginTop:220,
        textAlign:'center',
        color:Colors.GRAY
       }}>
        All Rights Reserved @2024
       </Text>
    </View>
  )
}