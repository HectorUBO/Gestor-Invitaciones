import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title='Administrador'
                    onPress={() => navigation.navigate('Administrador')}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title='Usuario'
                    onPress={() => navigation.navigate('VerificacionUsuario')}
                />
            </View>
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
      marginBottom: 20,
    },
    buttonContainer: {
      width: '100%',
      marginVertical: 10,
    },
  });

  export default HomeScreen;