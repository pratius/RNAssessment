# react-native-ScreenShots/CaptureScreen


A ScreenShots/CaptureScreen Native Modules & React Native bridge for React Native.

Support iOS / Android.


## Supported Platforms

- iOS 10+
- Android (API 25+)

## Install

```shell
yarn install && cd ios/ && pod install
```

The library support the autolink feature.

##### Android - Update Manifest

```xml
// file: android/app/src/main/AndroidManifest.xml
...
      <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name = "android.permission.READ_EXTERNAL_STORAGE"/>
...
```

##### iOS - Update Info.plist

 You need to add the `NSPhotoLibraryUsageDescription` string key.


## Example

The easiest way to test is simple make your AppRegistry point to our example component, like this:

```javascript
import {AppRegistry} from 'react-native';
import {HomeScreen} from './src/container';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => HomeScreen);
```

**Examples**

```js
import { NativeModules, Platform} from 'react-native';
try {
      if (Platform.OS === 'ios') {
        NativeModules.screenshot.captureScreen((nativeResponse) => {
          console.log('ScreenCapture:=>', nativeResponse.ScreenCapture);
        });
      } else {
        NativeModules.screenshot.captureScreen((nativeResponse) => {
          console.log('ScreenCapture:=>', nativeResponse.ScreenShots);
        });
      }
    } catch (e) {
      console.log('Error', e);
    }
```

## Note

- It will return the Json Data including device details.
- Please allow the file read/write permession once app launch.
- If you have problem with old devices try avoid to connect/read/write to a peripheral during file saving.
- Android API >= 23 require the WRITE_EXTERNAL_STORAGE & READ_EXTERNAL_STORAGE permission to file read and write for peripherals. React Native >= 0.33 natively support PermissionsAndroid like in the example.


