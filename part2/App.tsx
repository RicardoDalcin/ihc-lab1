import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Acceleration } from './src/pages/Acceleration';
import { Illuminance } from './src/pages/Illuminance';
import { View } from 'react-native';
import { Magnetometer } from './src/pages/Magnetometer';
import { GPS } from './src/pages/GPS';

export default function App() {
  return (
    <SafeAreaView>
      <Acceleration />
      <Illuminance />
      <Magnetometer />
      <GPS />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
