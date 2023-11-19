import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'prescription-helper',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
