import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const ConfirmacionPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Registro Exitoso!</Text>
            <Text style={styles.message}>La invitación y los acompañantes se han registrado correctamente.</Text>
            <Button
                title="Volver a la Pantalla Principal"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    message: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
  });

  export default ConfirmacionPage;