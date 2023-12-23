import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DocumentUploadScreen = () => {
    return (
      <View style={styles.screenContainer}>
        <Text>Document Uploaden</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  export default DocumentUploadScreen;