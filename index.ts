import { AppRegistry } from 'react-native';
import App from './App'; // Adjust if your App.tsx is in a different folder
import appConfig from './app.json'; // This imports the "name" field from app.json

AppRegistry.registerComponent(appConfig.expo.name, () => App);
