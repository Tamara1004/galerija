import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gallery',
  appName: 'Galerija',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
