import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { obtenerIdPorNumero, obtenerInvitadoPrincipal } from '../services/api';
import Input from '../components/Input';

const VerificacionUsuario = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [numero, setNumero] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerificar = async () => {
        if (!nombre || !numero) {
            Alert.alert('Error', 'Por favor completa los campos.');
            return;
        }

        setLoading(true);
        try {
            console.log('Número de teléfono enviado:', numero);
            const id = await obtenerIdPorNumero(numero);
            console.log('ID recibido:', id);

            const invitado = await obtenerInvitadoPrincipal(id);
            console.log('Invitado recibido:', invitado);

            if (invitado && invitado.nombre === nombre) {
                navigation.navigate('RegistroAcompanantes', { idPrincipal: id });
            } else {
                Alert.alert('Error', 'No estás registrado como invitado principal.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', error.message || 'Ocurrió un error al verificar.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verificación de Invitado</Text>
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
                title={loading ? 'Verificando...' : 'Verificar'}
                onPress={handleVerificar}
                disabled={loading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default VerificacionUsuario;