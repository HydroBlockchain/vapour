import React, { Component } from 'react';
import { Snackbar } from 'react-native-paper';
class SnackBar extends Component {
    state = {
        isVisible: false,
        msg: "",
        BG: ""
    }
    componentDidMount() {
        (global as any).showSnackbar = this.showSnackbar
    }
    onDismissSnackBar = () => {
        this.setState({ isVisible: false })
    }
    showSnackbar = (msg, BG) => {
        
        this.setState({ isVisible: true, msg, BG })
    }
    render() {
        return (
            <Snackbar
                visible={this.state.isVisible}
                duration={3000}
                onDismiss={this.onDismissSnackBar}
                style={{ backgroundColor: this.state.BG || 'black', paddingVertical: 5}}
            >
                {this.state.msg}
            </Snackbar>
        );
    }
}

export default SnackBar;