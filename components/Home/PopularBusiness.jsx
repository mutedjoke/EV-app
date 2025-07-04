import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from './../../constants/Colors';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig'; // Don't forget to import db
import PopularBusinessCard from './PopularBusinessCard';

export default function PopularBusiness() {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    const q = query(collection(db, 'BusinessList'), limit(10));
    const querySnapShot = await getDocs(q);

    const businesses = [];
    querySnapShot.forEach((doc) => {
      console.log(doc.data());
      businesses.push(doc.data());
    });
    setBusinessList(businesses);
  };

  return (
    <View>
      <View style={{
        padding: 20,
        display: 'flex',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Text style={{
          fontSize: 20,
          fontFamily: 'outfit-bold',
          marginTop:45
        }}>App Highlights</Text>
        <Text style={{
          color: Colors.PRIMARY,
          fontFamily: 'outfit-medium',
          marginTop:45
        }}>View All</Text>
      </View>
      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <PopularBusinessCard business={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}