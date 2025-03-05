import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeAdmin = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Panel de Administrador</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title='Registrar Invitado'
                    onPress={() => navigation.navigate('RegistroInvitado')}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title='Ver Listado de Invitados'
                    onPress={() => navigation.navigate('ListadoInvitados')}
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

export default HomeAdmin;