import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { Colors } from '../../constants/Colors';

export default function BusinessByList() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();

  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    getBusinessList();
  }, [category]);

  const getBusinessList = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'BusinessList'), where('category', '==', category));
      const querySnapshot = await getDocs(q);

      const businesses = [];
      querySnapshot.forEach((doc) => {
        businesses.push({ id: doc.id, ...doc.data() });
      });

      setBusinessList(businesses);
    } catch (error) {
      console.error('Error fetching business list:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          size="large"
          color={Colors.PRIMARY}
        />
      ) : businessList.length > 0 ? (
        <FlatList
          data={businessList}
          renderItem={({ item }) => <BusinessListCard business={item} />}
          keyExtractor={(item) => item.id}
          onRefresh={getBusinessList}
          refreshing={loading}
        />
      ) : (
        <Text style={styles.comingSoonText}>Coming Soon!!!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  comingSoonText: {
    fontSize: 50,
    fontFamily: 'outfit-bold',
    color: Colors.GRAY,
    textAlign: 'center',
    marginTop: '50%',
  },
});
