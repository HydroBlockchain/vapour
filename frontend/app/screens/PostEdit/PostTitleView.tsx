import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import RichTextBox from './RichTextBox';

interface IPostTitleViewState {
    height: number,
    text: string
}
interface IPostTitleViewProps {
    value: string
    onChange: (text: string) => void
}

class PostTitleView extends Component<IPostTitleViewProps, IPostTitleViewState> {
    constructor(props: IPostTitleViewProps) {
        super(props);
        this.state = {
            height: 0,
            text: props.value || "",
        }
    }

    render() {
        const isPreviewActive = undefined;
        const { height, text } = this.state;
        return (
            <TextInput
                style={[{
                    color: 'black',
                    fontWeight: 'bold',
                    paddingHorizontal: 16,
                    fontSize: 24,
                    textAlignVertical: 'top',
                    paddingVertical: 0,
                }, { height: Math.max(35, height) }]}
                placeholderTextColor={'#c1c5c7'}
                maxLength={250}
                placeholder={"Title"}
                multiline
                numberOfLines={2}
                onContentSizeChange={(event) => {
                    this.setState({ height: event.nativeEvent.contentSize.height });
                }}
                onChangeText={this.props.onChange}
                value={text}
            />
        );
    }
}

const mapStateToProps = state => {
    return {}
}
const mapDispatchToProps = dispatch => ({});

export default (connect(mapStateToProps, mapDispatchToProps)(PostTitleView));