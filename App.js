import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignatureManagementScreen from './SignatureManagementScreen';
import DocumentUploadScreen from './DocumentUploadScreen'; // Toegevoegd
import HelpScreen from './HelpScreen'; // Toegevoegd

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Beheer Handtekeningen" component={SignatureManagementScreen} />
        <Tab.Screen name="Document Uploaden" component={DocumentUploadScreen} />
        <Tab.Screen name="Help" component={HelpScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Je bestaande stijlen
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
