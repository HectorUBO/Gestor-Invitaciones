import React, { useState } from 'react';
import { Text, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { registrarAcompanante } from '../services/api';
import Input from '../components/Input';

const RegistroAcompanantes = ({ route, navigation }) => {
    const { idPrincipal } = route.params;
    const [acompanantes, setAcompanantes] = useState(Array(3).fill({ nombre: '' }));
    const [loading, setLoading] = useState(false);

    const handleChangeNombre = (index, value) => {
        const newAcompanantes = [...acompanantes];
        newAcompanantes[index] = { ...newAcompanantes[index], nombre: value };
        setAcompanantes(newAcompanantes);
    };

    const handleRegistrar = async () => {
        if (acompanantes.some(a => !a.nombre)) {
            Alert.alert('Error', 'Por favor ingresa el nombre de todos los acompañantes.');
            return;
        }

        setLoading(true);
        try {
            for (const acompanante of acompanantes) {
                if (acompanante.nombre) {
                    await registrarAcompanante({ nombre: acompanante.nombre, idPrincipal });
                }
            }
            Alert.alert('Éxito', 'Acompañantes registrados correctamente.');
            navigation.navigate('Confirmacion');
        } catch (error) {
            Alert.alert('Error', error.message || 'Ocurrió un error al registrar los acompañantes.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registro de Acompañantes</Text>
            {acompanantes.map((_, index) => (
                <Input
                    key={index}
                    placeholder={`Nombre del acompañante ${index + 1}`}
                    value={acompanantes[index].nombre}
                    onChangeText={(value) => handleChangeNombre(index, value)}
                />
            ))}
            <Button
                title={loading ? 'Registrando...' : 'Registrar Acompañantes'}
                onPress={handleRegistrar}
                disabled={loading}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default RegistroAcompanantes;