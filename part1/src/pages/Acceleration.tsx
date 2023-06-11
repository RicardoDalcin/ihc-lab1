import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Accelerometer } from 'expo-sensors';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const RESULT_PAGE = 'Atividade 3 - Feedback';

const AccelerationEntry = ({ route, navigation }) => {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const isAlmostValue = (value: number, target: number) => {
    const diff = Math.abs(value - target);
    return diff < 0.1;
  };

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((data) => {
        if (
          isAlmostValue(data.x, 0) &&
          isAlmostValue(data.y, 0) &&
          isAlmostValue(data.z, -1)
        ) {
          navigation.navigate(RESULT_PAGE);
          return;
        }

        setData(data);
      }),
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    // unsubscribe when leaving this screen
    return () => _unsubscribe();
  }, [route]);

  return (
    <View className="flex flex-row w-full flex-1 px-3 py-4">
      <TextInput
        className="flex-1 mr-3 h-10 border border-neutral-500 rounded-lg px-3"
        editable={false}
        value={`x: ${x.toFixed(2)}`}
      />

      <TextInput
        className="flex-1 mr-3 h-10 border border-neutral-500 rounded-lg px-3"
        editable={false}
        value={`y: ${y.toFixed(2)}`}
      />

      <TextInput
        className="flex-1 h-10 border border-neutral-500 rounded-lg px-3"
        editable={false}
        value={`z: ${z.toFixed(2)}`}
      />
    </View>
  );
};

const AccelerationFeedback = () => (
  <View className="flex flex-1 px-3 py-4">
    <Text>Posição correta!</Text>
  </View>
);

export const Acceleration = () => {
  const insets = useSafeAreaInsets();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Atividade 3"
        component={AccelerationEntry}
        options={{ headerStatusBarHeight: insets.top, freezeOnBlur: true }}
      />

      <Stack.Screen
        name={RESULT_PAGE}
        component={AccelerationFeedback}
        options={{ headerStatusBarHeight: insets.top }}
      />
    </Stack.Navigator>
  );
};
