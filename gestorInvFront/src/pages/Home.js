import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestor de Invitados</Text>
            <Button
                title='Registrar Nueva Invitación'
                onPress={() => navigation.navigate('RegistroInvitacionPrincipal')}
            />
            <Button
                title='Ver Listado de Invitados'
                onPress={() => navigation.navigate('ListaInvitados')}
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
    }
});

export default Home;