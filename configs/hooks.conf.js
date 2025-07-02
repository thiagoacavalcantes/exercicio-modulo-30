const ANDROID_APP_ID = 'br.com.lojaebac';     
const IOS_BUNDLE_ID = 'br.com.lojaebac';      

let hooksConf = {
  afterStep: function (test, scenario, { error }) {
    if (error) {
      driver.takeScreenshot();
    }
  },

  beforeSuite: async function () {
    const caps = driver.capabilities;
    const isIOS = caps.platformName.toLowerCase() === 'ios';
    const appIdKey = isIOS ? 'bundleId' : 'appId';
    const appIdentifier = isIOS ? IOS_BUNDLE_ID : ANDROID_APP_ID;

    const state = await driver.queryAppState(appIdentifier);
    if (state !== 4) {
      await driver.execute('mobile: activateApp', {
        [appIdKey]: appIdentifier
      });
    }
  },

  afterSuite: async function () {
    const caps = driver.capabilities;
    const isIOS = caps.platformName.toLowerCase() === 'ios';
    const appIdKey = isIOS ? 'bundleId' : 'appId';
    const appIdentifier = isIOS ? IOS_BUNDLE_ID : ANDROID_APP_ID;

    await driver.execute('mobile: terminateApp', {
      [appIdKey]: appIdentifier
    });
  }
};

module.exports = { hooksConf };
