import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/BusinessDetail/Intro';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import About from '../../components/BusinessDetail/About';
import Reviews from '../../components/BusinessDetail/Reviews';

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true); // Initial loading state set to true

  useEffect(() => {
    GetBusinessDetailById();
  }, []);

  const GetBusinessDetailById = async () => {
    try {
      const docRef = doc(db, 'BusinessList', businessid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBusiness(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error('Error fetching business detail:', error);
    } finally {
      setLoading(false); // Update loading state after fetching data
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <View>
      {business && (
        <View>
          {/* Intro */}
          <Intro business={business} />

          {/* Action Buttons */}
          {business.category !== 'Energy Efficiency' && business.category !== 'Nature Awareness' && (
            <ActionButton business={business} />
          )}
          {/* About Section */}
        <About business={business} />

        {/* Review Sction */}

        <Reviews business={business} />

        </View>
      )}
    </View>
  );
}
