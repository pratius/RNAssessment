import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import Styles from './style';
import PropTypes from 'prop-types';

export default class BaseScreen extends Component {
  static propsType = {
    children: PropTypes.children,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {children} = this.props;
    return <SafeAreaView style={Styles.screen}>{children}</SafeAreaView>;
  }
}
