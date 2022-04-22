interface LocationInterface {
  [key: string]: {
    label: string;
    value: string;
    endpoint: string;
  };
}
export enum DcEnum {
  ERROR = 'ERROR',
  EU = 'EU',
  US = 'US',
}
export const LOCATION: LocationInterface = {
  ERROR: {
    label: 'ERROR-DC',
    value: 'error',
    endpoint: 'error-1',
  },
  EU: {
    label: 'EU',
    value: 'eu',
    endpoint: 'eu-central-1',
  },
  US: {
    label: 'US',
    value: 'us',
    endpoint: 'us-west-1',
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
  const dcEndpoint = LOCATION[dc].endpoint;
  const getDeviceUrl = `https://api.${dcEndpoint}.saucelabs.com/v1/rdc-devices`;
  try {
    const response: DevicesInterface[] = await (
      await fetch(getDeviceUrl)
    ).json();

    const devices: any = response
      // Sort alphabetical
      .sort((a, b) => {
        const deviceA = a.name.toUpperCase();
        const deviceB = b.name.toUpperCase();

        return deviceA === deviceB ? 0 : deviceA > deviceB ? 1 : -1;
      });

    return devices;
  } catch (error: any) {
    throw error;
  }
}
