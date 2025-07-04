import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Colors } from './../../constants/Colors';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import CategoryItem from './CategoryItem';
import { useRouter } from 'expo-router';

export default function Category({ explore = false, onCategorySelect }) {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      const q = query(collection(db, 'Category'));
      const querySnapshot = await getDocs(q);

      const categories = [];
      querySnapshot.forEach((doc) => {
        categories.push(doc.data());
      });

      setCategoryList(categories);
    } catch (error) {
      console.error('Error fetching category list:', error);
    }
  };

  const onCategoryPressHandler = (item) => {
    if (!explore) {
      router.push('/businesslist/' + item.name);
    } else {
      onCategorySelect(item.name);
    }
  };

  return (
    <View>
      {!explore && (
        <View style={{
          padding: 20,
          display: 'flex',
          marginTop: 40,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text style={{
            fontSize: 20,
            fontFamily: 'outfit-bold'
          }}>What we Offer</Text>
          <Text style={{
            color: Colors.PRIMARY,
            fontFamily: 'outfit-medium'
          }}>View All</Text>
        </View>
      )}
      <FlatList
        data={categoryList}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginLeft: 15 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CategoryItem
            category={item}
            onCategoryPress={() => onCategoryPressHandler(item)}
          />
        )}
      />
    </View>
  );
}
