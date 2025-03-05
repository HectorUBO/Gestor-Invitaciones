import { useEffect, useState } from "react";
import { actualizarInvitadoPrincipal, obtenerInvitadoPrincipal } from "../services/api";
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import Input from '../components/Input';

const EditarInvitado = ({ route, navigation }) => {
    const { id } = route.params;
    const [nombre, setNombre] = useState('');
    const [numero, setNumero] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const cargarInvitado = async () => {
            setLoading(true);
            try {
                const Invitado = await obtenerInvitadoPrincipal(id);
                setNombre(invitado.nombre);
                setNumero(invitado.numero);
            } catch (error) {
                Alert.alert('Error', error.message || 'Error al cargar los datos.');
            } finally {
                setLoading(false);
            }
        };

        cargarInvitado();
    }, [id]);

    const handleGuardar = async () => {
        if (!nombre || !numero) {
            Alert.alert('Error', 'Por favor ingresa los datos.');
            return;
        }

        setLoading(true);
        try {
            await actualizarInvitadoPrincipal(id, { nombre, numero });
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
            />
            <Input
                placeholder="Número de teléfono"
                value={numero}
                onChangeText={setNumero}
                keyboardType="phone-pad"
            />
            <Button
                title={loading ? 'Guardando...' : 'Guardar Cambios'}
                onPress={handleGuardar}
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

export default EditarInvitado;