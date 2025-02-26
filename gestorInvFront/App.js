import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/pages/Home";
import RegistroInvitacionPrincipal from "./src/pages/RegistroPrincipal";
import RegistroAcompanantes from './src/pages/RegistroAcompanantes';
import ConfirmacionPage from "./src/pages/ConfirmacionPage";
import ListaInvitados from "./src/pages/ListaInvitados";
import DetallesAcompanantes from "./src/pages/DetallesAcompanantes";
import EditarInvitadoPrincipal from "./src/pages/EditarPrincipal";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Gestor de Invitados' }}
        />
        <Stack.Screen
          name="RegistroInvitacionPrincipal"
          component={RegistroInvitacionPrincipal}
          options={{ title: 'Registro de Invitación Principal' }}
        />
        <Stack.Screen
          name="RegistroAcompanantes"
          component={RegistroAcompanantes}
          options={{ title: 'Registro de Acompañantes' }}
        />
        <Stack.Screen
          name="ConfirmacionPage"
          component={ConfirmacionPage}
          options={{ title: 'Confirmación' }}
        />
        <Stack.Screen
          name="ListaInvitados"
          component={ListaInvitados}
          options={{ title: 'Lista de Invitados' }}
        />
        <Stack.Screen
          name="DetallesAcompanantes"
          component={DetallesAcompanantes}
          options={{ title: 'Detalles de Acompañantes'}}
        />
        <Stack.Screen
          name="EditarInvitadoPrincipal"
          component={EditarInvitadoPrincipal}
          options={{ title: 'Editar Invitado Principal'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;