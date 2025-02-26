import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import Input from '../components/Input';
import { registrarInvitacionPrincipal } from '../services/api';

const RegistroInvitacionPrincipal = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [numero, setNumero] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegistro = async () => {
        if (!nombre || !numero) {
            Alert.alert('Error', 'Por favor, completa todos los campos.');
            return;
        }

        setLoading(true);
        try {
            const response = await registrarInvitacionPrincipal(nombre, numero);
            Alert.alert('Éxito', 'Invitación principal registrada correctamente.');
            setNombre('');
            setNumero('');

            // Redirigir a la pantalla de registro de acompañantes
            console.log('ID del invitado principal:', response.id);
            navigation.navigate('RegistroAcompanantes', { idPrincipal: response.id });
        } catch (error) {
            Alert.alert('Error', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro de Invitación Principal</Text>
            <Input
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <Input
                placeholder="Número de teléfono"
                value={numero}
                onChangeText={setNumero}
                keyboardType="phone-pad"
            />
            <Button
                title={loading ? 'Registrando...' : 'Registrar'}
                onPress={handleRegistro}
                disabled={loading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default RegistroInvitacionPrincipal;