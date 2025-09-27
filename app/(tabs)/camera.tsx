import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

enum CameraFacing {
  BACK = "back",
  FRONT = "front"
}

const Camera = () => {
  const ref = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>(CameraFacing.BACK);
  const [permission, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState<string | null>(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View style={{ flex: 1 }} />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const toggleFacing = () => {
    setFacing(current => (current === CameraFacing.BACK ? CameraFacing.FRONT : CameraFacing.BACK));
    console.log('Switch');
  }

  const takePicture = async () => {
    console.log('Shutter button pressed');
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) {
      console.log('Photo URI', photo);
      setImageUri(photo.uri);
    }
  }

  const renderPicture = (uri: string) => {
    return (
      <View style={{ flex: 1, width: '100%' }}>
        <Image source={{ uri }} contentFit="contain" style={{ width: '100%', aspectRatio: 1 }} />
        <View style={{ flexDirection: 'row' }}>
          <Pressable style={styles.button} onPress={() => setImageUri(null)} >
            <Text style={styles.text}>Close</Text>
          </Pressable>
          <Link href={{
            pathname: '/processing',
            params: { imageUri: uri }
          }} asChild>
            <Pressable style={styles.button}><Text>Process</Text></Pressable>
          </Link>
        </View>
      </View>
    )
  }

  const renderCamera = () => {
    return (
      <>
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            facing={facing}
            ref={ref}
          />
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={takePicture} >
              <Text style={styles.text}>Shutter</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={toggleFacing} >
              <Text style={styles.text}>Flip Camera</Text>
            </Pressable>
          </View>
        </View>
      </>
    )
  }

  return (
    <View style={styles.container}>
      {imageUri ? renderPicture(imageUri) : renderCamera()}
    </View>
  );
}

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  camera: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff88',
  },
}
)
