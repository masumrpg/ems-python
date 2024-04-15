import React from 'react';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function Maps() {
    const latitude = -7.6416025579996365
    const longitude = 109.51343150809407

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.001019159875245812,
                    longitudeDelta: 0.0005226954817771912,
                }}
            >
                <Marker
                    coordinate={{latitude: latitude, longitude: longitude}}
                />
                <Circle center={{latitude: latitude, longitude: longitude}} radius={30}/>
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
