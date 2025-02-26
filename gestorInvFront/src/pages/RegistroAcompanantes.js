import React, { useState } from 'react';
import { Text, Button, Alert, StyleSheet, TextInput, ScrollView } from 'react-native';
import { registrarAcompanante } from '../services/api';

const RegistroAcompanantes = ({ route, navigation }) => {
  const { idPrincipal } = route.params; // Obtenemos el ID del invitado principal
  const [acompanantes, setAcompanantes] = useState(['', '', '']); // Campos para 3 acompañantes
  const [loading, setLoading] = useState(false);

  const handleRegistro = async () => {
    // Validar que al menos un acompañante tenga nombre
    if (acompanantes.every((nombre) => !nombre.trim())) {
      Alert.alert('Error', 'Por favor, ingresa al menos un acompañante.');
      return;
    }

    setLoading(true);
    try {
      // Registrar cada acompañante
      for (const nombre of acompanantes) {
        if (nombre.trim()) {
          await registrarAcompanante({ nombre, idPrincipal });
        }
      }
      navigation.navigate('ConfirmacionPage');
    } catch (error) {
      Alert.alert('Error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Acompañantes</Text>
      {acompanantes.map((nombre, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Nombre del acompañante ${index + 1}`}
          value={nombre}
          onChangeText={(text) => {
            const nuevosAcompanantes = [...acompanantes];
            nuevosAcompanantes[index] = text;
            setAcompanantes(nuevosAcompanantes);
          }}
        />
      ))}
      <Button
        title={loading ? 'Registrando...' : 'Registrar Acompañantes'}
        onPress={handleRegistro}
        disabled={loading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default RegistroAcompanantes;