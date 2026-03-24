/**
 * Author
 * Mohit Kumar
 */

import { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { foregroundNotificationListener, getFCMToken, requestUserPermission, tokenRefreshListener } from './src/services/notificationService';
import { getMessaging } from '@react-native-firebase/messaging';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    requestUserPermission()
      .then(result => {
        if (result) {
          getFCMToken();
        }
      })
      .catch(console.error);

    getMessaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Opened from quit state');
        }
      });

    const unsubscribeOpenedApp =
      getMessaging().onNotificationOpenedApp(remoteMessage => {
        if (remoteMessage?.data?.screen === 'OrderDetails') {
          // do whatever you want i.e navigate user to OrderDetails screen
        }
      });

    const unsubscribeForeground =
      foregroundNotificationListener();

    const unsubscribeTokenRefresh =
      tokenRefreshListener();

    return () => {
      unsubscribeOpenedApp();
      unsubscribeForeground();
      unsubscribeTokenRefresh();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Text style={styles.txt}>{'Firebase Push Notifications + Notifee'}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: 'white'
  }
})
