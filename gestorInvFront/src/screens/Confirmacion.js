import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Confirmacion = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Registro Exitoso!</Text>
            <Text style={styles.message}>Tus acompañantes han sido registrados correctamente.</Text>
            <Button
                title="Volver al Inicio"
                onPress={() => navigation.navigate('Home')} // Regresa a la pantalla inicial
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#555',
    },
});

export default Confirmacion;