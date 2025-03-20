import React, { useState } from 'react';
import { Text, Alert, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
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
                        style={styles.input}
                    />
                </View>
            ))}
            <TouchableOpacity
                style={styles.button}
                onPress={handleRegistrar}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Registrando...' : 'Registrar Acompañantes'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#FFFFFF', // Fondo blanco
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#000000', // Texto negro
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#555', // Texto gris
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
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

export default RegistroAcompanantes;