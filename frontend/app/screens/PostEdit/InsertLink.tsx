import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Text } from '../../components';
import Modal from 'react-native-modal';

interface IInsertLinkState {
    isModalVisible: boolean
}
interface IInsertLinkProps {
    isOpen: boolean
    toggleModal: () => void
    onDone: (data: any) => void
    ref: any
}

class InsertLink extends Component<IInsertLinkProps, IInsertLinkState> {
    title: string = "";
    url: string = "";
    constructor(props: IInsertLinkProps) {
        super(props);
        this.state = {
            isModalVisible: false,
        }
        this.onDone = this.onDone.bind(this);
    }

    setModalVisible(visible) {
        this.setState({ isModalVisible: visible });
    }

    setTitle(title) {
        this.title = title;
    }

    setURL(url) {
        this.url = url;
    }

    onDone() {
        const title = this.title;
        const url = this.url;
        this.setModalVisible(false);
        this.props?.onDone({ title, url });
        this.props.toggleModal()
    }


    render() {
        const { isModalVisible } = this.state;

        const color = "#000033";
        const placeholderColor = "#a9a9a9";
        const backgroundColor = "#fff";

        return (
            <Modal
                isVisible={this.props.isOpen}
                backdropColor={color}
                backdropOpacity={0.3}
                
                onBackdropPress={this.props.toggleModal}>
                <View style={[styles.dialog, { backgroundColor }]}>
                    <View style={styles.linkTitle}>
                        <Text.H1 style={{ color }}>Insert Link</Text.H1>
                    </View>
                    <View style={styles.item}>
                        <TextInput
                            style={[styles.input, { color }]}
                            placeholderTextColor={placeholderColor}
                            placeholder={'title'}
                            onChangeText={(text) => this.setTitle(text)}
                        />
                    </View>
                    <View style={styles.item}>
                        <TextInput
                            style={[styles.input, { color }]}
                            placeholderTextColor={placeholderColor}
                            placeholder="http(s)://"
                            onChangeText={(text) => this.setURL(text)}
                        />
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.btn} onPress={this.props.toggleModal}>
                            <Text.Secondary style={styles.text}>Cancel</Text.Secondary>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={this.onDone}>
                            <Text.Secondary style={styles.text}>OK</Text.Secondary>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {}
}
const mapDispatchToProps = dispatch => ({});

export default (connect(mapStateToProps, mapDispatchToProps)(InsertLink));


const styles = StyleSheet.create({
    item: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e8e8e8',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        height: 40,
    },
    linkTitle: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#b3b3b3',
    },
    dialog: {
        borderRadius: 8,
        marginHorizontal: 40,
        paddingHorizontal: 10,
        paddingVertical:10
    },

    buttonView: {
        flexDirection: 'row',
        height: 36,
        paddingVertical: 4,
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#286ab2',
    },
});
