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

    const secciones = [
        {
            title: 'Asisten',
            data: invitados.filter((invitado) => invitado.asistira),
        },
        {
            title: 'No Asisten',
            data: invitados.filter((invitado) => !invitado.asistira),
        },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('DetalleInvitado', { id: item.id })}
        >
            <Text style={styles.cell}>{item.nombre}</Text>
            <Text style={styles.cell}>{item.numero}</Text>
            <Text style={styles.cell}>{item.totalInvitados}</Text>
            <Text style={styles.cell}>{item.asistira ? 'Sí' : 'No'}</Text>

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
                <Text style={styles.headerCell}>Asistirá</Text>
                <Text style={styles.headerCell}>Acciones</Text>
            </View>
            <FlatList
                sections={secciones}
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
        backgroundColor: '#FFFFFF', // Fondo blanco
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#000000', // Texto negro
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
        color: '#000000', // Texto negro
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#f9f9f9', // Fondo gris claro
        borderRadius: 10,
        marginVertical: 5,
        paddingHorizontal: 10,
        shadowColor: '#000', // Sombra para un efecto elevado
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3, // Sombra en Android
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        color: '#000000', // Texto negro
    },
    button: {
        padding: 8,
        backgroundColor: '#4CAF50', // Fondo verde
        borderRadius: 5,
        marginHorizontal: 2,
    },
    deleteButton: {
        backgroundColor: '#dc3545', // Fondo rojo
    },
    buttonText: {
        color: '#FFFFFF', // Texto blanco
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ListaInvitados;