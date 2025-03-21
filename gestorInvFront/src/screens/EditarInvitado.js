import { useEffect, useState } from "react";
import { actualizarInvitadoPrincipal, obtenerAcompanantes, obtenerInvitadoPrincipal } from "../services/api";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Input from '../components/Input';

const EditarInvitado = ({ route, navigation }) => {
    const { id } = route.params;
    const [nombre, setNombre] = useState('');
    const [numero, setNumero] = useState('');
    const [asistentes, setAsistentes] = useState('');
    const [cantidadRegistrados, setCantidadRegistrados] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const cargarInvitado = async () => {
            setLoading(true);
            try {
                const invitado = await obtenerInvitadoPrincipal(id);
                setNombre(invitado.nombre);
                setNumero(invitado.numero);
                setAsistentes(invitado.cantidadInv.toString());

                const acompanantes = await obtenerAcompanantes(id);
                setCantidadRegistrados(acompanantes.length);
            } catch (error) {
                Alert.alert('Error', error.message || 'Error al cargar los datos.');
            } finally {
                setLoading(false);
            }
        };

        cargarInvitado();
    }, [id]);

    const handleGuardar = async () => {
        if (!nombre || !numero || !asistentes) {
            Alert.alert('Error', 'Por favor ingresa los datos.');
            return;
        }

        const cantidadInv = parseInt(asistentes, 10);
        if (isNaN(cantidadInv)) {
            Alert.alert('Error', 'La cantidad de acompañantes debe ser un número válido.');
            return;
        }

        if (cantidadInv < cantidadRegistrados) {
            Alert.alert('Error', `La cantidad de acompañantes no puede ser menor a ${cantidadRegistrados}`);
            return;
        }

        setLoading(true);
        try {
            await actualizarInvitadoPrincipal(id, { nombre, numero, cantidadInv });
            Alert.alert('Éxito', 'Invitado actualizado correctamente.');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', error.message || 'Error al actualizar el invitado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Invitado</Text>
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
            <Input
                placeholder="Cantidad de acompañantes"
                value={asistentes}
                onChangeText={setAsistentes}
                keyboardType="numeric"
                style={styles.input}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleGuardar}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
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

export default EditarInvitado;