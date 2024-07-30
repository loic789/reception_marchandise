import { CapacitorConfig } from '@capacitor/cli';
import * as LiveUpdates from '@capacitor/live-updates';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Reception Marchandise',
  bundledWebRuntime: false,
  webDir: 'www',
  android: { allowMixedContent: true },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    },
    Http: {
      enabled: true
    },
    LiveUpdates: {
      appId: '89c4932c',
      channel: 'Production',
      autoUpdateMethod: 'none',
      maxVersions: 2,
    },
  }
};


export default config;