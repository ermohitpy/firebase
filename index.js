/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { getMessaging } from '@react-native-firebase/messaging';
import { createNotificationChannel } from './src/services/notificationService';

if (Platform.OS === 'android') {
    createNotificationChannel();
}

getMessaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in background:', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
