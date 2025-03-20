import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Administrador')}
            >
                <Text style={styles.buttonText}>Administrador</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('VerificacionUsuario')}
            >
                <Text style={styles.buttonText}>Usuario</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF', // Fondo blanco
    },
    title: {
        fontSize: 28,
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#000000', // Texto negro
    },
    button: {
        width: '80%',
        paddingVertical: 15,
        backgroundColor: '#4CAF50', // Fondo verde
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
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

export default HomeScreen;