import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { obtenerInvitados, eliminarInvitado } from '../services/api';

const ListaInvitados = ({ navigation }) => {
    const [invitados, setInvitados] = useState([]);
    const [loading, setLoading] = useState(false);

    const cargarInvitados = async () => {
        setLoading(true);
        try {
            const data = await obtenerInvitados();
            setInvitados(data);
        } catch (error) {
            Alert.alert('Error', error.message || 'Error al cargar los invitados.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarInvitados();
    }, []);

    const handleEliminar = async (id) => {
        try {
            await eliminarInvitado(id);
            Alert.alert('Éxito', 'Invitado eliminado correctamente.');
            cargarInvitados();
        } catch (error) {
            Alert.alert('Error', error.message || 'Error al eliminar el invitado.');
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('DetalleInvitado', { id: item.id })}
        >
            <Text style={styles.cell}>{item.nombre}</Text>
            <Text style={styles.cell}>{item.numero}</Text>
            <Text style={styles.cell}>{item.totalInvitados}</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('EditarInvitado', { id: item.id })}
            >
                <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleEliminar(item.id)}
            >
                <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Invitados</Text>
            <View style={styles.header}>
                <Text style={styles.headerCell}>Nombre</Text>
                <Text style={styles.headerCell}>Teléfono</Text>
                <Text style={styles.headerCell}>Asistentes</Text>
                <Text style={styles.headerCell}>Acciones</Text>
            </View>
            <FlatList
                data={invitados}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                refreshing={loading}
                onRefresh={cargarInvitados}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
        marginBottom: 10,
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 10,
        alignItems: 'center',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },
    button: {
        padding: 8,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginHorizontal: 2,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default ListaInvitados;
