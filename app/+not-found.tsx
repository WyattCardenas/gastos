import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";


export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <View style={styles.container}>
        <Text style={styles.text}>This screen does not exist.</Text>
        <Link href="/" style={styles.button}>Go back to Home</Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cfe1ffff',
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: '#000000ff'
  },
  button: {
    fontSize: 20,
    marginTop: 20,
    color: '#1c7ed6ff',
    textDecorationLine: 'underline'
  }
}
)

