import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
  NativeModules,
  Platform,
  Alert,
} from 'react-native';
import BaseScreen from '../Components';
import {axiosResponse} from './../../utils';
import styles from './style';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActivate: true,
      isWaiting: false,
      isActivated: false,
    };
  }

  onActivatePressed = () => {
    this.setState({isActivated: false, isActivate: false, isWaiting: true});
    try {
      if (Platform.OS === 'ios') {
        NativeModules.screenshot.captureScreen((nativeResponse) => {
          console.log('ScreenCapture:=>', nativeResponse.ScreenCapture);
          this.apiRequest(nativeResponse);
        });
      } else {
        NativeModules.screenshot.captureScreen((nativeResponse) => {
          console.log('ScreenCapture:=>', nativeResponse.ScreenShots);
          this.apiRequest(nativeResponse);
        });
      }
    } catch (e) {
      console.log('Error', e);
    }
  };

  apiRequest = async (requestData) => {
    const responseData = await axiosResponse(
      'yourApiURL',
      requestData,
      'youraAthToken',
    );

    if (responseData) {
      Alert.alert('Success', 'API Request Completed!');
    } else {
      //Alert.alert('Error', 'Something Went Wrong!');
    }

    //This is for testing need to remove once API is working.
    setTimeout(() => {
      this.setState({isActivate: false, isWaiting: false, isActivated: true});
    }, 5000);
  };

  renderActivate = () => {
    if (this.state.isActivate) {
      return (
        <TouchableOpacity onPress={this.onActivatePressed}>
          <View style={styles.containerView}>
            <Image
              source={require('../../assests/upload.png')}
              resizeMode="contain"
              style={styles.buttonImage}
            />
            <Text style={styles.text}>Activate</Text>
          </View>
        </TouchableOpacity>
      );
    }
    if (this.state.isWaiting) {
      return (
        <TouchableOpacity onPress={this.onActivatePressed}>
          <View style={styles.containerView}>
            <ActivityIndicator
              size="small"
              color="white"
              style={styles.indicator}
            />
            <Text style={styles.text}>Waiting</Text>
          </View>
        </TouchableOpacity>
      );
    }
    if (this.state.isActivated) {
      return (
        <TouchableOpacity onPress={this.onActivatePressed}>
          <View style={styles.activatedView}>
            <Image
              source={require('../../assests/check.png')}
              resizeMode="contain"
              style={styles.buttonImage}
            />
            <Text style={styles.text}>Activated</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };

  render() {
    return (
      <BaseScreen>
        <View style={styles.screen}>
          <Image
            source={require('../../assests/logo.png')}
            resizeMode="contain"
            style={styles.logo}
          />

          {this.renderActivate()}
        </View>
      </BaseScreen>
    );
  }
}
