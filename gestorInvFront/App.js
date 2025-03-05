import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import HomeAdmin from './src/screens/HomeAdmin';
import RegistroInvitado from './src/screens/RegistroInvitado';
import ListaInvitados from './src/screens/ListaInvitados';
import EditarInvitado from './src/screens/EditarInvitado';
import DetalleInvitado from './src/screens/DetalleInvitado';
import VerificacionUsuario from './src/screens/VerificacionUsuario';
import RegistroAcompanantes from './src/screens/RegistroAcompanantes';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Inicio' }}
        />
        <Stack.Screen
          name='Administrador'
          component={HomeAdmin}
          options={{ title: 'Administrador' }}
        />
        <Stack.Screen
          name='RegistroInvitado'
          component={RegistroInvitado}
          options={{ title: 'Registrar Invitado' }}
        />
        <Stack.Screen
          name='ListadoInvitados'
          component={ListaInvitados}
          options={{ title: 'Listado de Invitados' }}
        />
        <Stack.Screen
          name='EditarInvitado'
          component={EditarInvitado}
          options={{ title: 'Editar Invitado' }}
        />
        <Stack.Screen
          name='DetalleInvitado'
          component={DetalleInvitado}
          options={{ title: 'Detalles del Invitado' }}
        />
        <Stack.Screen
          name='VerificacionUsuario'
          component={VerificacionUsuario}
          options={{ title: 'Verificación' }}
        />
        <Stack.Screen
          name="RegistroAcompanantes"
          component={RegistroAcompanantes}
          options={{ title: 'Registro de Acompañantes' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;