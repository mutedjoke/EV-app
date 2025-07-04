import { View, Text, ScrollView } from 'react-native';
import React from 'react';

export default function About({ business }) {
  return (
    <ScrollView style={{
      padding: 20,
      backgroundColor: '#fff',
      minHeight: '100%' // Use minHeight to ensure content stretches if needed
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25,
        marginBottom: 7
      }}>About</Text>
      <Text style={{
        fontFamily: 'outfit',
        lineHeight: 25
      }}>{business?.about}</Text>
    </ScrollView>
  );
}
