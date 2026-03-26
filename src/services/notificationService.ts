import { AuthorizationStatus, getMessaging, requestPermission } from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';

const messagingInstance = getMessaging();

export async function requestUserPermission() {
    const authStatus = await requestPermission(messagingInstance);
    const isEnabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;

    if (isEnabled) {
        if (Platform.OS === 'android') {
            const isPermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );
            if (isPermission === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Notification permission granted');
                return true;
            } else {
                console.log('Notification permission not granted');
                return false;
            }
        }
        console.log('Notification permission granted');
        return true;
    } else {
        console.log('Notification permission not granted');
        return false;
    }
}

export async function getFCMToken() {
    const token = await getMessaging().getToken();
    console.log('FCM Token:', token);
    return token;
}

export async function createNotificationChannel() {
    if (Platform.OS !== 'ios') return;
    await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
    });
}

export function foregroundNotificationListener() {
    return getMessaging().onMessage(async remoteMessage => {
        await notifee.displayNotification({
            title: remoteMessage?.notification?.title,
            body: remoteMessage?.notification?.body,
            android: {
                channelId: 'default',
            },
        });
    });
}

export function tokenRefreshListener() {
    return getMessaging().onTokenRefresh(token => {
        console.log('New token:', token);
        // send token to backend here
    });
}

