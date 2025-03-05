import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { obtenerInvitadoPrincipal, obtenerAcompanantes } from '../services/api';

const DetalleInvitado = ({ route }) => {
    const { id } = route.params;
    const [invitado, setInvitado] = useState(null);
    const [acompanantes, setAcompanantes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            setLoading(true);
            try {
                const invitadoPrincipal = await obtenerInvitadoPrincipal(id);
                setInvitado(invitadoPrincipal);

                const listaAcompanantes = await obtenerAcompanantes(id);
                console.log('Acompañantes:', listaAcompanantes);
                setAcompanantes(listaAcompanantes);
            } catch (error) {
                Alert.alert('Error', error.message || 'Error al cargar los detalles del invitado.');
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const renderAcompanante = ({ item }) => (
        <View style={styles.acompananteItem}>
            <Text style={styles.acompananteNombre}>{item.nombre}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalles del Invitado</Text>
            <View style={styles.detalleContainer}>
                <Text style={styles.label}>Nombre:</Text>
                <Text style={styles.valor}>{invitado.nombre}</Text>
            </View>
            <View style={styles.detalleContainer}>
                <Text style={styles.label}>Teléfono:</Text>
                <Text style={styles.valor}>{invitado.numero}</Text>
            </View>
            <View style={styles.detalleContainer}>
                <Text style={styles.label}>Total de Acompañantes:</Text>
                <Text style={styles.valor}>{acompanantes.length}</Text>
            </View>

            <Text style={styles.subtitle}>Lista de Acompañantes</Text>
            {acompanantes.length > 0 ? (
                <FlatList
                    data={acompanantes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderAcompanante}
                />
            ) : (
                <Text style={styles.sinAcompanantes}>No hay acompañantes registrados.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    detalleContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    valor: {
        flex: 1,
    },
    acompananteItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    acompananteNombre: {
        fontSize: 16,
    },
    sinAcompanantes: {
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#888',
    },
});

export default DetalleInvitado;