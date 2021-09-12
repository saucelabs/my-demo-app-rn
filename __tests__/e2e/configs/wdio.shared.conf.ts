export interface MobileConfig extends WebdriverIO.Config {
  firstAppStart: boolean;
}

export const config: MobileConfig = {
  // ==================
  // Specify Test Files
  // ==================
  //
  specs: ['./__tests__/e2e/specs/default/*.spec.ts'],

  // ============
  // Capabilities
  // ============
  //
  capabilities: [],

  // ===================
  // Test Configurations
  // ===================
  //
  logLevel: 'silent',
  bail: 0,
  baseUrl: 'http://localhost',
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [],
  // Framework you want to run your specs with.
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  // =====
  // Session flags
  // =====
  //
  /**
   * Custom property that is used to determine if the app is already launched for the first time
   * This property is needed because the first time the app is automatically started, so a double
   * restart is not needed.
   */
  firstAppStart: true,

  // =====
  // Hooks
  // =====
  //
};
