import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { eliminarInvitadoPrincipal, obtenerInvitados } from '../services/api';

const ListaInvitados = ({ navigation }) => {
    const [invitados, setInvitados] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvitados = async () => {
            try {
                const data = await obtenerInvitados();
                setInvitados(data);
            } catch (error) {
                console.error('Error al obtener invitados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvitados();
    }, []);

    const handleEliminar = async (id) => {
        Alert.alert(
            'Eliminar invitado',
            '¿Estás seguro?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        try {
                            await eliminarInvitadoPrincipal(id);
                            setInvitados(invitados.filter((invitado) => invitado.id !== id));
                            Alert.alert('Éxito', 'Invitado eliminado correctamente.');
                        } catch (error) {
                            Alert.alert('Error', error);
                        }
                    },
                },
            ],
        );
    };

    if (loading) {
        return <Text>Cargando...</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={invitados}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.nombre}>{item.nombre}</Text>
                        <Text style={styles.numero}>{item.numero}</Text>
                        <Text style={styles.total}>Total invitados: {item.totalInvitados}</Text>
                        <View style={styles.actions}>
                            <Button
                                title="Editar"
                                onPress={() => navigation.navigate('EditarInvitadoPrincipal', { id: item.id })}
                            />
                            <Button
                                title="Eliminar"
                                onPress={() => handleEliminar(item.id)}
                                color="red"
                            />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    numero: {
        fontSize: 16,
        color: '#666',
    },
    total: {
        fontSize: 14,
        color: '#888',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
});

export default ListaInvitados;