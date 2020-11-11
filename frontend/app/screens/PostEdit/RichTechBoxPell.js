
import React from 'react';
import {
    Appearance,
    Button,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { actions, defaultActions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import InsertLinkModal from './InsertLink';
import { EmojiView } from './Emoji';
import ActionSheet from 'react-native-actionsheet'
import * as  Permissions from 'expo-permissions';
import * as  ImagePicker from 'expo-image-picker';
import { Colors } from '../../style';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const initHTML = ``;

const phizIcon = require('../../../assets/images/stickers/phiz.png');
const htmlIcon = require('../../../assets/images/stickers/h5.png');
const videoIcon = require('../../../assets/images/stickers/video.png');
const strikethrough = require('../../../assets/images/stickers/strikethrough.png');

class RichTechBoxPell extends React.Component {
    richText = React.createRef();
    linkModal = React.createRef();
    ActionSheet = "";
    constructor(props) {
        super(props);
        const that = this;
        const theme = props.theme || Appearance.getColorScheme();
        const contentStyle = that.createContentStyle(theme);
        that.state = { theme: theme, contentStyle, emojiVisible: false, disabled: false, title: "", height: 0 };

        that.save = that.save.bind(this);
        that.onPressAddImage = that.onPressAddImage.bind(this);
        that.onInsertLink = that.onInsertLink.bind(this);
        that.onLinkDone = that.onLinkDone.bind(this);

        // that.handleChange = that.handleChange.bind(this);
        // that.handleHeightChange = that.handleHeightChange.bind(this);
        that.insertEmoji = that.insertEmoji.bind(this);
        that.insertHTML = that.insertHTML.bind(this);

        that.handleEmoji = that.handleEmoji.bind(this);

        that.editorInitializedCallback = that.editorInitializedCallback.bind(this);
    }

    componentDidMount() {

        Keyboard.addListener('keyboardDidShow', this.onKeyBoard);
    }

    componentWillUnmount() {

        Keyboard.removeListener('keyboardDidShow', this.onKeyBoard);
    }
    onKeyBoard = () => {
        console.log("I M Here", TextInput)
        TextInput.State.currentlyFocusedField() && this.setState({ emojiVisible: false });
    };

    editorInitializedCallback() {
        this.richText.current?.registerToolbar(function (items) {
            console.log('Toolbar click, selected items (insert end callback):', items);
        });
    }


    async save() {
        // Get the data here and call the interface to save the data
        let html = await this.richText.current?.getContentHtml();
        // console.log(html);
        alert(html);
    }

    useLibraryHandler = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 4],
            base64: false,
        });

        this.onPressAddImage(result.uri);
    };

    useCameraHandler = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 4],
            base64: false,
        });
        console.log(result);

        this.onPressAddImage(result.uri);
    };

    onImageSelectorClicked = (value) => {
        if (value == 0) {
            this.useCameraHandler();
        }
        else if (value == 1) {
            this.useLibraryHandler();
        }

    }
    askPermissionsAsync = async () => {
        try {

            const camera = await Permissions.askAsync(Permissions.CAMERA);
            const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            this.setState({
                hasCameraPermission: camera.status === 'granted',
                hasCameraRollPermission: cameraRoll.status === 'granted'
            });
        }
        catch (ex) {
            console.log(ex, "Error")
        }
    };

    insertEmoji(emoji) {
        this.richText.current?.insertText(emoji);
        this.richText.current?.blurContentEditor();
    }

    handleEmoji() {
        const { emojiVisible } = this.state;
        Keyboard.dismiss();
        this.richText.current?.blurContentEditor();
        this.setState({ emojiVisible: !emojiVisible });
    }

    insertHTML() {
        this.richText.current?.insertHTML(`<span style="color: blue; padding:0 10px;">HTML</span>`);
    }

    onPressAddImage(url) {
        // insert URL
        console.log(url)
        this.richText.current?.insertImage(url);
        // insert base64
        // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
        // this.richText.current?.blurContentEditor();
    }

    openImageActionSheet = () => {
        this.ActionSheet.show()
    }

    onInsertLink() {
        // this.richText.current?.insertLink('Google', 'http://google.com');
        console.log("On Insert Link", this.linkModal)
        this.linkModal.current?.setModalVisible(true);
    }

    onLinkDone({ title, url }) {
        this.richText.current?.insertLink(title, url);
    }


    createContentStyle(theme) {
        // Can be selected for more situations (cssText or contentCSSText).
        const contentStyle = {
            backgroundColor: '#000033',
            color: '#fff',
            placeholderColor: 'gray',
            // cssText: '#editor {background-color: #f3f3f3}', // initial valid
            contentCSSText: 'font-size: 16px; min-height: 200px; height: 100%;', // initial valid
        };
        if (theme === 'light') {
            contentStyle.backgroundColor = '#fff';
            contentStyle.color = '#000033';
            contentStyle.placeholderColor = '#a9a9a9';
        }
        return contentStyle;
    }


    toggleLinkModal = () => {
        this.setState({ isLinkModalOpen: !this.state.isLinkModalOpen })
    }
    render() {
        let that = this;
        const { contentStyle, theme, emojiVisible, disabled, title, height } = that.state;
        const { backgroundColor, color, placeholderColor } = contentStyle;
        const themeBg = { backgroundColor };
        return (
            <SafeAreaView style={[styles.container, themeBg]}>
                {this.state.isLinkModalOpen &&
                    <InsertLinkModal
                        placeholderColor={placeholderColor}
                        color={color}
                        backgroundColor={backgroundColor}
                        onDone={that.onLinkDone}
                        isOpen={this.state.isLinkModalOpen}
                        toggleModal={this.toggleLinkModal}
                    />
                }
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Choose Option'}
                    options={['Take Photo', 'Photo Library', 'cancel']}
                    cancelButtonIndex={2}
                    onPress={(index) => {
                        console.log("INdex", index)
                        this.onImageSelectorClicked(index)
                    }}
                />
                <ScrollView style={[styles.scroll, themeBg]} keyboardDismissMode={'none'}>
                    <View>

                        <View style={styles.item}>
                            <TextInput
                                style={[styles.input, { color }]}
                                placeholderTextColor={placeholderColor}
                                placeholder="Post Tag..."
                            />
                        </View>

                    </View>
                    <RichEditor
                        // initialFocus={true}
                        disabled={disabled}
                        editorStyle={contentStyle} // default light style
                        containerStyle={themeBg}
                        ref={that.richText}
                        style={[styles.rich, themeBg]}
                        placeholder={'Please input content'}
                        initialContentHTML={initHTML}
                        editorInitializedCallback={that.editorInitializedCallback}
                    // onChange={that.handleChange}
                    // onHeightChange={that.handleHeightChange}
                    />
                </ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <RichToolbar
                        style={[styles.richBar, { backgroundColor: Colors.grey10 }]}
                        editor={that.richText}
                        disabled={disabled}
                        iconTint={color}
                        selectedIconTint={'#2095F2'}
                        disabledIconTint={'#8b8b8b'}
                        onPressAddImage={that.openImageActionSheet}
                        onInsertLink={this.toggleLinkModal}
                        iconSize={40} // default 50
                        actions={[
                            'save',
                            ...defaultActions,
                            actions.setStrikethrough,
                            actions.heading1,
                            actions.heading4,
                            actions.removeFormat,
                            'insertEmoji',
                        ]} // default defaultActions
                        iconMap={{
                            insertEmoji: phizIcon,
                            [actions.removeFormat]: ({ tintColor }) => (
                                <Text style={[styles.tib, { color: tintColor }]}>C</Text>
                            ),
                            [actions.setStrikethrough]: strikethrough,
                            [actions.heading1]: ({ tintColor }) => (
                                <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
                            ),
                            [actions.heading4]: ({ tintColor }) => (
                                <Text style={[styles.tib, { color: tintColor }]}>H3</Text>
                            ),
                            insertHTML: htmlIcon,
                            save: ({ tintColor }) => (
                                <TouchableOpacity onPress={() => { console.log("Save") }}>
                                    <MaterialCommunityIcons style={[styles.tib, { color: tintColor }]} size={25} name="content-save" />
                                </TouchableOpacity>
                            ),
                        }}
                        insertEmoji={that.handleEmoji}
                        save={() => { console.log("I Don't Know") }}

                    />
                    {emojiVisible && <EmojiView onSelect={that.insertEmoji} />}
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },
    rich: {
        minHeight: 300,
        flex: 1,
    },
    richBar: {
        height: 50,
        backgroundColor: '#F5FCFF',
    },
    scroll: {
        backgroundColor: '#ffffff',
    },
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
    },

    tib: {
        textAlign: 'center',
        color: '#515156',
    },
});

export default RichTechBoxPell;
