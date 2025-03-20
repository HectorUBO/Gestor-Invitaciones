import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
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
                navigation.navigate('RegistroAcompanantes', { 
                    idPrincipal: invitado.id,
                    cantidadInv: invitado.cantidadInv,
                });
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
                style={styles.input}
            />
            <Input
                placeholder="Número de teléfono"
                value={numero}
                onChangeText={setNumero}
                keyboardType="phone-pad"
                style={styles.input}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleVerificar}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Verificando...' : 'Verificar'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF', // Fondo blanco
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#000000', // Texto negro
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#f9f9f9', // Fondo gris claro
    },
    button: {
        width: '100%',
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

export default VerificacionUsuario;