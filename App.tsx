import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Sum } from './src/pages/Sum';
import { Message } from './src/pages/Message';
import { Acceleration } from './src/pages/Acceleration';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Atividade 1" component={Sum} />
        <Tab.Screen
          name="Atividade 2 - wrapper"
          component={Message}
          options={{ header: () => null, tabBarLabel: 'Atividade 2' }}
        />
        <Tab.Screen
          name="Atividade 3 - wrapper"
          component={Acceleration}
          options={{
            header: () => null,
            tabBarLabel: 'Atividade 3',
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
