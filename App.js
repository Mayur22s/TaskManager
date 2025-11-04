
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { PersistGate } from "redux-persist/integration/react";
import { ThemeContextProvider, useTheme } from './src/services/themeManagement';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';


export default function App() {
  const { theme } = useTheme()
  const CustomLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff',
      text: '#000000',
    },
  };
  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#000000',
      text: '#ffffff',
    },
  };

  return (
    <ThemeContextProvider theme={theme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </ThemeContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
