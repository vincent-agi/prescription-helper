import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'android.prescription.helper',
  appName: 'prescription-helper',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
