import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const RESULT_PAGE = 'Atividade 2 - Resultado';

const MessageInput = ({ navigation }) => {
  const [message, setMessage] = useState('');

  const sendMessage = useCallback(() => {
    navigation.navigate(RESULT_PAGE, { message });
  }, [message, navigation]);

  return (
    <View className="flex flex-row flex-1 justify-center py-8 px-4 w-full">
      <TextInput
        className="flex-1 h-10 border border-neutral-500 rounded-lg px-3 mr-3"
        placeholder="Escreva uma mensagem"
        onChangeText={setMessage}
      />

      <TouchableOpacity
        onPress={sendMessage}
        disabled={!message}
        className="bg-neutral-300 w-20 h-10 flex justify-center items-center rounded-lg"
      >
        <Text>Enviar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

const MessageResult = ({ route }) => {
  const { message } = route.params;

  return (
    <View className="flex flex-1 px-3 py-4">
      <Text>{message}</Text>
    </View>
  );
};

export const Message = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Atividade 2"
        component={MessageInput}
        options={{ headerStatusBarHeight: insets.top }}
      />

      <Stack.Screen
        name={RESULT_PAGE}
        component={MessageResult}
        options={{ headerStatusBarHeight: insets.top }}
      />
    </Stack.Navigator>
  );
};
