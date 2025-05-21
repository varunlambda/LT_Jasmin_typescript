import { Builder, By, until, WebDriver } from 'selenium-webdriver';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 180000;

describe('LambdaTest Example', () => {
  let driver: WebDriver;

  beforeAll(async () => {
    const capabilities = {
      // browserName: 'Chrome',
      browserName: 'Safari',
      'LT:Options': {
        w3c: true,
        // automationName: 'UiAutomator2',  
        // platformName: "android",
	// deviceName: "Pixel 8 Pro",
	// appiumVersion: "2.6.0",
	// platformVersion: "14",
        automationName: 'XCUITest',
        platformName: "ios",
	deviceName: "iPhone 16",
	appiumVersion: "2.11.3",
	platformVersion: "18.1", 
        user: "LT_USERNAME",
        accessKey: "LT_ACCESS_KEY",
        build: 'Jasmine TS sample build',
        name: 'LambdaTest Jasmine Sample',
        selenium_version: "4.0.0"
      }
    };

    driver = await new Builder()
      .usingServer('https://hub.lambdatest.com/wd/hub')
      .withCapabilities(capabilities)
      .build();
  });

  it('can find search results', async () => {
    await driver.get('https://www.google.co.in/');

    try {
      const consentBtn = await driver.wait(
        until.elementLocated(By.id('L2AGLb')),
        5000
      );
      await consentBtn.click();
    } catch (err) {
      console.log('Consent popup not found — skipping.');
    }

    const input = await driver.findElement(By.name('q'));
    await input.sendKeys('test123');

    const title = await driver.getTitle();
    await driver.sleep(10000);

    expect(title).toBe('Google');
  });

  // it('Check browser', async () => {
  //   driver.get("https://www.whatismybrowser.com/");  
  //   const title = await driver.getTitle();
  //   await driver.sleep(10000);
  //   expect(title).toContain('What browser?');
  // });

  afterAll(async () => {
  if (driver) {
    await driver.quit();
  }
});
});
