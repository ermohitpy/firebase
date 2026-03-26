import { Button, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { downloadDoc, trackApplyLoanEvent } from '../analyticsServices';

const Analytics = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.txt}>Analytics</Text>
            <View style={styles.main}>
                <Button title='Apply Loan' onPress={trackApplyLoanEvent} />
                <View style={{height:30}}></View>
                <Button title='Log Event with Params' onPress={downloadDoc}/>
            </View>
        </View>
    )
}

export default Analytics;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight ?? 40 : 5
    },
    txt: { color: 'black', fontSize: 20 },
    main: { flex: 1, justifyContent: 'center' }
});
