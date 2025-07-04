import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from './../../configs/FirebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';

const Slider = () => {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    GetSliderList();
  }, []);

  const GetSliderList = async () => {
    setSliderList([]);
    const q = query(collection(db, 'Slider'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log('Fetched document:', doc.data());
      setSliderList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View>
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 20,
          paddingLeft: 20,
          paddingTop:20,
          marginBottom:5
        }}
      >
        Silent Streets, Zero Emissions.
      </Text>

      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{paddingLeft:20}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          console.log('Rendering item:', item);
          return (
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                width: 300,
                height: 150,
                borderRadius:15,
                marginRight:15
              }}
              onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
            />
          );
        }}
      />
    </View>
  );
};

export default Slider;
