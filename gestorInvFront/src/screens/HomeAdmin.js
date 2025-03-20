import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeAdmin = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Panel de Administrador</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('RegistroInvitado')}
            >
                <Text style={styles.buttonText}>Registrar Invitado</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ListadoInvitados')}
            >
                <Text style={styles.buttonText}>Ver Listado de Invitados</Text>
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
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 28,
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#000000',
    },
    button: {
        width: '80%',
        paddingVertical: 15,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default HomeAdmin;