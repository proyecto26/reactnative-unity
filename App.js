import React, { useCallback } from 'react';
import { StyleSheet, Image, View, Dimensions, Text, Button } from 'react-native';
import UnityView, { UnityModule } from '@asmadsen/react-native-unity-view';

import { useUnity } from './hook'

const App = () => {
  const { unityViewRef, onMessage, onUnityMessage, onSendMessage, onResume, onPause } = useUnity()
  const onClick = useCallback(() => {
    const data = {
      current: new Date(),
      message: 'Hello World from RN!'
    }
    onSendMessage(data, (response) => {
      console.log('ON SEND MESSAGE RESPONSE', response)
      Alert.alert('Unity Response', JSON.stringify(response))
    })
  }, [onSendMessage])

  return (
    <View style={styles.container}>
      <UnityView
        ref={unityViewRef}
        onMessage={onMessage}
        onUnityMessage={onUnityMessage}
        style={styles.unityView}
      />
      <View style={styles.footer}>
        <Text style={styles.welcome}>
          Welcome to React Native & Unity!
        </Text>
        <Button style={{ width: '100%' }} title="Send Message" onPress={onClick}/>
        <Button style={{ width: '100%' }} title="Play" onPress={onResume}/>
        <Button style={{ width: '100%' }} title="Pause" onPress={onPause}/>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  unityView: {
    width,
    flex: 1
  },
  footer: {
    flex: 0
  },
  welcome: {
    width,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
  },
});

export default App;