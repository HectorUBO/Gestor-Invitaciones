import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { obtenerAcompanantes } from '../services/api';

const DetallesAcompanantes = ({ route }) => {
    const { idPrincipal } = route.params;
    const [acompanantes, setAcompanantes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAcompanantes = async () => {
            try {
                const data = await obtenerAcompanantes(idPrincipal);
                setAcompanantes(data);
            } catch (error) {
                console.error('Error al obtener asistentes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAcompanantes();
    }, [idPrincipal]);

    if (loading) {
        return <Text>Cargando...</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={acompanantes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.nombre}>{item.nombre}</Text>
                    </View>
                )}
            />
        </View>
    );
}

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
    },
});

export default DetallesAcompanantes;