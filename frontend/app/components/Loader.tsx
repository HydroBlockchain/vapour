import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';


interface ILoaderProps {
    isShow: boolean
}

interface ILoaderState { }

class Loader extends Component<ILoaderProps, ILoaderState> {
    render() {
        if (!this.props.isShow)
            return <View></View>
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size={50} color="#2960CA" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

export default Loader;
