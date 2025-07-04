import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { query, where, collection, getDocs } from 'firebase/firestore'
import { db } from './../../configs/FirebaseConfig'
import BusinessListCard from '../../components/BusinessList/BusinessListCard'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors'

export default function MyBusiness() {
  const { user } = useUser();
  const [businessList, setBusinessList] = useState([]);
  const [loading,setLoading]=useState(false);
  const navigation=useNavigation();

  useEffect(() => {
    navigation.setOptions({
        headerShown:true,
        headerTitle:'My Vehicles',
        headerStyle:{
            backgroundColor:Colors.PRIMARY
        }
    })



    if (user) {
      GetUserBusiness();
    }
  }, [user]);

  const GetUserBusiness = async () => {
    setLoading(true);
    const q = query(collection(db, 'Added Category Vehicle'), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
    const querySnapShot = await getDocs(q);

    const businesses = [];
    querySnapShot.forEach((doc) => {
      const data = doc.data();
      console.log(data); // Log data to check imageUrl
      businesses.push({
        id: doc.id,
        ...data
      });
      setLoading(false);
    });

    setBusinessList(businesses); // Update state with fetched businesses
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 30,marginTop:1,textAlign:'center' }}>My Vehicle(s)</Text>
      <FlatList
      onRefresh={GetUserBusiness}
      refreshing={loading}
      style={{
        marginTop:20
      }}
        data={businessList}
        renderItem={({ item, index }) => (
          <BusinessListCard business={item} key={index} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}
