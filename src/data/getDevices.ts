interface LocationInterface {
  [key: string]: {
    label: string;
    value: string;
    url: string;
  };
}
export enum DcEnum {
  EU = 'EU',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  US = 'US',
}
export const LOCATION: LocationInterface = {
  EU: {
    label: 'EU-DC',
    value: 'eu',
    url: 'https://api.eu-central-1.saucelabs.com/v1/rdc-devices',
  },
  NOT_FOUND: {
    label: '404',
    value: '404',
    url: 'https://api.eu-central-1.saucelabs.com/v1/',
  },
  UNAUTHORIZED: {
    label: '401',
    value: '401',
    url: 'https://api.eu-central-1.saucelabs.com/v1/rdc-devices-2',
  },
  US: {
    label: 'US-DC',
    value: 'us',
    url: 'https://api.us-west-1.saucelabs.com/v1/rdc-devices',
  },
} as const;

export interface DevicesInterface {
  abiType: string;
  apiLevel: number;
  cpuCores: number;
  cpuFrequency: number;
  defaultOrientation: string;
  dpi: number;
  hasOnScreenButtons: true;
  id: string;
  internalOrientation: string;
  internalStorageSize: number;
  isArm: true;
  isKeyGuardDisabled: false;
  isPrivate: false;
  isRooted: false;
  isTablet: false;
  manufacturer: string[];
  modelNumber: string;
  name: string;
  os: string;
  osVersion: string;
  pixelsPerPoint: number;
  ramSize: number;
  resolutionHeight: number;
  resolutionWidth: number;
  screenSize: number;
  sdCardSize: number;
  supportsAppiumWebAppTesting: true;
  supportsGlobalProxy: false;
  supportsMinicapSocketConnection: true;
  supportsMockLocations: true;
  cpuType: string;
  deviceFamily: string;
  dpiName: string;
  isAlternativeIoEnabled: true;
  supportsManualWebTesting: true;
  supportsMultiTouch: true;
  supportsXcuiTest: true;
}

export async function getDevices(dc: DcEnum) {
  const url = LOCATION[dc].url;
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const jsonData: DevicesInterface[] = await response.json();
      const devices: any = jsonData
        // Sort alphabetical
        .sort((a, b) => {
          const deviceA = a.name.toUpperCase();
          const deviceB = b.name.toUpperCase();

          return deviceA === deviceB ? 0 : deviceA > deviceB ? 1 : -1;
        });

      return devices;
    } else if (response.status === 401) {
      throw new Error('Unauthorized');
    } else if (response.status === 404) {
      throw new Error('Not found');
    }

    throw new Error('Unknown error');
  } catch (error: any) {
    throw error;
  }
}
