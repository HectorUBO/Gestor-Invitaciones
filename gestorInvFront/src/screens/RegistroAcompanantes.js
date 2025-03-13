import React, { useState } from 'react';
import { Text, Button, Alert, StyleSheet, ScrollView, View } from 'react-native';
import { registrarAcompanante } from '../services/api';
import Input from '../components/Input';

const RegistroAcompanantes = ({ route, navigation }) => {
    const { idPrincipal, cantidadInv } = route.params;

    // Inicializa el estado con un arreglo de objetos que tengan la propiedad "nombre"
    const [acompanantes, setAcompanantes] = useState(
        Array.from({ length: cantidadInv }, () => ({ nombre: '' }))
    );

    const [loading, setLoading] = useState(false);

    const handleChangeNombre = (index, value) => {
        const newAcompanantes = [...acompanantes];
        newAcompanantes[index].nombre = value; // Actualiza el nombre del acompañante en la posición index
        setAcompanantes(newAcompanantes);
    };

    const handleRegistrar = async () => {
        // Verifica que todos los nombres estén completos
        if (acompanantes.some(a => !a.nombre.trim())) {
            Alert.alert('Error', 'Por favor ingresa el nombre de todos los acompañantes.');
            return;
        }

        setLoading(true);
        try {
            // Registra cada acompañante
            for (const acompanante of acompanantes) {
                await registrarAcompanante({ nombre: acompanante.nombre, idPrincipal });
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
            <Text style={styles.subtitle}>
                Puedes registrar hasta {cantidadInv} acompañantes.
            </Text>
            {acompanantes.map((acompanante, index) => (
                <View key={index} style={styles.inputContainer}>
                    <Input
                        placeholder={`Nombre del acompañante ${index + 1}`}
                        value={acompanante.nombre}
                        onChangeText={(value) => handleChangeNombre(index, value)}
                    />
                </View>
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
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#555',
    },
    inputContainer: {
        marginBottom: 15,
    },
});

export default RegistroAcompanantes;