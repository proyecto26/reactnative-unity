import { useRef, useCallback } from 'react';
import { UnityModule } from '@asmadsen/react-native-unity-view';

export function useUnity () {
  const unityViewRef = useRef()

  const onMessage = useCallback((event) => {
    console.log('ON MESSAGE', event)
  }, [])

  const onUnityMessage = useCallback((event) => {
    console.log('ON UNITY MESSAGE', event)
  }, [])

  const onSendMessage = useCallback((data, callBack) => {
    if (!unityViewRef.current) return
    console.log('SEND MESSAGE TO UNITY', data)
    UnityModule.postMessageToUnityManager({
      name: 'ToggleRotate',
      data,
      callBack
    });
  }, [unityViewRef])

  const onResume = useCallback(() => {
    console.log('ON RESUME', unityViewRef.current)
    if (!unityViewRef.current) return
    UnityModule.resume()
  }, [unityViewRef])

  const onPause = useCallback(() => {
    console.log('ON PAUSE', unityViewRef.current)
    if (!unityViewRef.current) return
    UnityModule.pause()
  }, [unityViewRef])

  return {
    unityViewRef,
    onMessage,
    onUnityMessage,
    onSendMessage,
    onResume,
    onPause
  }
}