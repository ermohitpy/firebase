import { getAnalytics, logEvent, setUserId } from '@react-native-firebase/analytics';

const analyticsInstance = getAnalytics();
// logevents for firebase analytics
const analyticsLogEvent = (eventName: string, params: Record<string, any> = {}): void => {
    logEvent(analyticsInstance, eventName.slice(0, 40), params)
        .catch((error) => {
            console.log(`====ErrorIn${eventName}>>`, error);
        });
};

// set user id when user logged in
export const setUserIdInAnalytics = async (userId: number) => {
    try {
        await setUserId(analyticsInstance, userId.toString());
    } catch (error) {
        console.log('===errorInSetUserID>>', error);
    }
};

// we don't use async-await for analytics , so we don't need 
// to wait while events logged (optional)
export const trackApplyLoanEvent = () => {
    analyticsLogEvent('apply_loan_clicked');
};

export const trackScreenView = (screenName: string) => {
    logEvent(analyticsInstance, 'screen_view', {
        screen_name: screenName,
        screen_class: screenName,
    });
};

// log event with params
export const downloadDoc = () => {
    analyticsLogEvent('download_document_clicked', {
        document_type: 'PAN_CARD',
    });
}