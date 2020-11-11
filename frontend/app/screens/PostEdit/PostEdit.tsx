import React, { Component } from 'react';
import { View, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import RichTextBox from './RichTextBox';
import PostTitleView from './PostTitleView';
import RichTechBoxTell from './RichTechBoxPell';
interface IEditPostState {
    title: string
    height: number
}
interface IEditPostProps { }

class EditPost extends Component<IEditPostProps, IEditPostState> {
    constructor(props: IEditPostProps) {
        super(props);
        this.state = {
            title: "",
            height: 0,
        }
    }

    render() {
        const { height, title } = this.state
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    flexGrow: 1,
                    justifyContent: 'space-evenly',
                }}>
                    <TextInput
                        style={[{
                            color: 'black',
                            fontWeight: 'bold',

                            paddingHorizontal: 16,
                            fontSize: 24,
                            textAlignVertical: 'top',
                            paddingVertical: 10,
                            backgroundColor: 'white',

                        }, { height: Math.max(35, height) }]}
                        placeholderTextColor={'#c1c5c7'}
                        maxLength={150}
                        placeholder={"Title"}
                        multiline
                        numberOfLines={1}
                        onContentSizeChange={(event) => {
                            this.setState({ height: event.nativeEvent.contentSize.height });
                        }}
                        onChangeText={(text: string) => this.setState({ title: text })}
                        value={title}
                    />

                </View>
                <View style={{ height: Dimensions.get("window").height - 105 }}>
                    {/* <RichTextBox /> */}
                    <RichTechBoxTell/>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {}
}
const mapDispatchToProps = dispatch => ({});

export default (connect(mapStateToProps, mapDispatchToProps)(EditPost));