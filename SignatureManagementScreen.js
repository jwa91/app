import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';


const SignatureManagementScreen = () => {
  const [signatures, setSignatures] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  // Functie om handtekeningen te laden
  const loadSignatures = async () => {
    try {
      const storedSignatures = await AsyncStorage.getItem('signatures');
      if (storedSignatures !== null) {
        setSignatures(JSON.parse(storedSignatures));
      }
    } catch (error) {
      console.error('Error loading signatures:', error);
    }
  };
  
  // Functie om handtekening te verwijderen
  const deleteSignature = async (signatureName) => {
    try {
      // Filter de handtekeningen om de te verwijderen handtekening uit te sluiten
      const updatedSignatures = signatures.filter(signature => signature.name !== signatureName);
  
      // Update de lokale opslag
      await AsyncStorage.setItem('signatures', JSON.stringify(updatedSignatures));
  
      // Update de state
      setSignatures(updatedSignatures);
    } catch (error) {
      console.error('Error deleting signature:', error);
    }
  };

  // Functie om een nieuwe handtekening op te slaan
  const saveSignature = async (newSignature) => {
    try {
      const updatedSignatures = [...signatures, newSignature];
      await AsyncStorage.setItem('signatures', JSON.stringify(updatedSignatures));
      setSignatures(updatedSignatures);
    } catch (error) {
      console.error('Error saving new signature:', error);
    }
  };

  // Effect voor het laden van handtekeningen bij het openen van het scherm
  useEffect(() => {
    loadSignatures();
  }, []);

  const renderSignature = ({ item }) => (
    <View style={styles.signatureRow}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {/* Hier zou je een afbeelding van de handtekening tonen */}
        <Text>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteSignature(item.name)}>
        {/* Prullenbak icoon (voor nu een tekst) */}
        <Text style={styles.deleteText}>Verwijder</Text>
      </TouchableOpacity>
    </View>
  );

  const handleChoosePhoto = (useCamera) => {
    const pickerMethod = useCamera ? ImagePicker.openCamera : ImagePicker.openPicker;

    pickerMethod({
      width: 300,
      height: 300,
      cropping: true,  // Stelt de gebruiker in staat om het crop-gebied te kiezen
      cropperCircleOverlay: false,  // Je kunt dit instellen op true als je een cirkelvormige cropper wilt
      compressImageQuality: 1,
      includeBase64: true,
    }).then((image) => {
      console.log(image);
      // Hier kun je de gecropte afbeelding verwerken en opslaan
      // Bijvoorbeeld, het toevoegen aan de signatures array
      const newSignature = {
        name: `Signature_${new Date().getTime()}`,
        uri: image.path,
      };
      saveSignature(newSignature);
    }).catch((error) => {
      console.log('ImagePicker Error:', error);
    });
  };

  return (
    <View style={styles.container}>
      {/* Uitleg Menu en Lijst van Handtekeningen */}
      {/* ... code ... */}

      {/* Handtekening Toevoegen Knop */}
      <Button title="Handtekening Toevoegen" onPress={() => setModalVisible(true)} />

      {/* Modal voor het toevoegen/bekijken van een handtekening */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
            <Text>Handtekening details</Text>
            <Button title="Kies Foto uit Galerij" onPress={() => handleChoosePhoto(false)} />
            <Button title="Neem Foto" onPress={() => handleChoosePhoto(true)} />
            <Button title="Sluiten" onPress={() => setModalVisible(false)} />
</View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  signatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deleteText: {
    color: 'red',
  },
  explanationText: {
    textAlign: 'center',
    margin: 20,
  },
  modalView: {
    margin: 20,
    padding: 35,
    alignItems: 'center',
  },
});

export default SignatureManagementScreen;