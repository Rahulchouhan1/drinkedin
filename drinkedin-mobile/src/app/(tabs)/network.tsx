import { View, Text, StyleSheet } from 'react-native';

export default function NetworkScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Network</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
