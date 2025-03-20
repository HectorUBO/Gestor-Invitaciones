import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Confirmacion = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Registro Exitoso!</Text>
            <Text style={styles.message}>Tus acompañantes han sido registrados correctamente.</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.buttonText}>Volver al Inicio</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF', // Fondo blanco
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#000000', // Texto negro
    },
    message: {
        fontSize: 16,
        marginBottom: 40, // Más espacio antes del botón
        textAlign: 'center',
        color: '#555', // Texto gris
    },
    button: {
        width: '80%',
        paddingVertical: 15,
        backgroundColor: '#4CAF50', // Fondo verde
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000', // Sombra para un efecto elevado
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5, // Sombra en Android
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF', // Texto blanco
        fontWeight: 'bold',
    },
});

export default Confirmacion;