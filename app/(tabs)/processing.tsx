import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

const Processing = () => {
  const { imageUri } = useLocalSearchParams();

  return (
    <>
      <View>
        <Text> {imageUri} </Text>
        <Link href="/camera" asChild><Pressable><Text>Back to camera.</Text></Pressable></Link>
      </View>
    </>
  )
}


export default Processing;