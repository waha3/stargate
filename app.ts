import { Builder, By, WebDriver } from "selenium-webdriver";
import robot from "robotjs";

// 模拟人类的行为 区间在 页面加载好的 [5 - 15]s内
function getRandomInt(min: number = 5, max: number = 15): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
}

async function inital(): Promise<WebDriver> {
  const driver = new Builder().forBrowser("firefox").build();
  await driver.manage().setTimeouts({ implicit: 10000 });
  return driver;
}

async function installMetaMask(driver: WebDriver) {
  await driver.get("https://metamask.io/");

  let meta_mask_download_btn = await driver.findElement(
    By.xpath('//a[contains(@class, "iFIkyk")]')
  );
  await driver.sleep(getRandomInt());
  await meta_mask_download_btn.click();

  // 等待
  await driver.sleep(15000);

  // 
  robot.moveMouseSmooth(1120, 220);
  robot.mouseClick();

  await driver.sleep(500);
  robot.moveMouseSmooth(1200, 240);
  robot.mouseClick();

  await driver.sleep(500);
  robot.moveMouseSmooth(896, 197);
  robot.mouseClick();

  await driver.sleep(500);
  robot.moveMouseSmooth(1228, 242);
  robot.mouseClick();
}

async function stargate(driver: WebDriver) {
  await driver.get("https://stargate.finance/transfer");
  let connectWalletButton = await driver.findElement(
    By.xpath('//*[contains(@class, "MuiButton-label") and contains(text(), "Connect Wallet")]')
  );
  await driver.sleep(getRandomInt());
  await connectWalletButton.click();

  let metaMaskButton = await driver.findElement(
    By.xpath('//p[contains(@class, "MuiTypography-body1") and contains(text(), "Metamask")]')
  );
  await driver.sleep(getRandomInt());
  await metaMaskButton.click();
}

async function run() {
  let driver = await inital();
  await installMetaMask(driver);
  await stargate(driver);
}

run();
