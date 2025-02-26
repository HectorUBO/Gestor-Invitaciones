import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, TextInput } from 'react-native';
import { obtenerInvitadoPrincipal, actualizarInvitadoPrincipal } from '../services/api';

const EditarPrincipal = ({ route, navigation }) => {
    const { id } = route.params;
    const [nombre, setNombre] = useState('');
    const [numero, setNumero] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchInvitado = async () => {
            try {
                const invitado = await obtenerInvitadoPrincipal(id);
                setNombre(invitado.nombre);
                setNumero(invitado.numero);
            } catch (error) {
                Alert.alert('Error', 'No se pudieron cargar los datos.');
            }
        };

        fetchInvitado();
    }, [id]);

    const handleActualizar = async () => {
        if (!nombre || !numero) {
            Alert.alert('Eror', 'Completa los campos.');
            return;
        }

        setLoading(true);
        try {
            await actualizarInvitadoPrincipal(id, { nombre, numero });
            Alert.alert('Exito', 'Datos actualizados correctamente.');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Invitado Principal</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Número de teléfono"
                value={numero}
                onChangeText={setNumero}
                keyboardType="phone-pad"
            />
            <Button
                title={loading ? 'Actualizando...' : 'Actualizar'}
                onPress={handleActualizar}
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default EditarPrincipal;