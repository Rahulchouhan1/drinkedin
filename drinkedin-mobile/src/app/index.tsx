import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the Welcome/Landing screen on app launch
  return <Redirect href="/welcome" />;
}
