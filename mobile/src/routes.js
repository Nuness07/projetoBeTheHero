import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const appStack = createStackNavigator();

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

export default function routes() {
    return (
        <NavigationContainer>
            {/* Screen Options serve para sumir o cabeçalho que a rota cria */}
            <appStack.Navigator screenOptions={{ headerShown: false }}>
                <appStack.Screen name="Incidents" component={Incidents} />
                <appStack.Screen name="Detail" component={Detail} />
            </appStack.Navigator>
        </NavigationContainer>
    );
}