import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { registrarInvitacionPrincipal } from '../services/api';
import Input from '../components/Input'

const RegistroInvitado = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [numero, setNumero] = useState('');
    const [cantidadInv, setCantidadInv] = useState('1');
    const [loading, setLoading] = useState(false);

    const handleRegistro = async () => {
        if (!nombre || !numero || !cantidadInv) {
            Alert.alert('Error', 'Por favor completa los campos');
            return;
        }

        setLoading(true);
        try {
            await registrarInvitacionPrincipal(nombre, numero, parseInt(cantidadInv, 10));
            Alert.alert('Exito', 'Invitado registrado correctamente.');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', error.message || 'Ocurrió un error al registrar el invitado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrar Nuevo Invitado</Text>
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
            <Input
                placeholder="Cantidad de Acompañantes"
                value={cantidadInv}
                onChangeText={setCantidadInv}
                keyboardType="numeric"
            />
            <Button
                title={loading ? 'Registrando...' : 'Registrar Invitado'}
                onPress={handleRegistro}
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

export default RegistroInvitado;