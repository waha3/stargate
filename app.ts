import { Builder, By, WebDriver, until } from "selenium-webdriver";
import robot from "robotjs";
import { keys, password } from "./privatekeys/mnemonic";

const elementLocatedDelay = 2 * 1000;

// 模拟人类的行为 区间在 页面加载好的 [5 - 10]s内
function getRandomInt(min: number = 2, max: number = 2): number {
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

  // metamask download button
  await driver.findElement(By.xpath('//a[contains(@class, "iFIkyk")]')).click();

  // 等待15s 让metamask插件下载完成 （可能会超过这个时间根据自己网络手动调节）
  await driver.sleep(20000);

  // 确认安装 metamask （浏览器原生的元素）
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
async function importWallet(driver: WebDriver) {
  // 点击浏览器应用商店的入口
  await driver.sleep(500);
  robot.moveMouseSmooth(1225, 90);
  robot.mouseClick();

  // 选择metamask
  await driver.sleep(500);
  robot.moveMouseSmooth(1030, 180);
  robot.mouseClick();
  await driver.sleep(getRandomInt());

  // 切换tab 默认认为只有两个tab
  let windows = await driver.getAllWindowHandles();
  await driver.switchTo().window(windows[windows.length - 1]);

  // import wallet button
  await driver.sleep(getRandomInt());
  await driver.findElement(By.css('button[data-testid="onboarding-import-wallet"]')).click();
  // agree button
  await driver.findElement(By.css('button[data-testid="metametrics-i-agree"]')).click();

  // 通过input的id来定位对应的助记词位置（可能网页后面id名字会变）
  for (let [index, key] of keys.entries()) {
    await driver.findElement(By.id(`import-srp__srp-word-${index}`)).sendKeys(key);
  }

  // confirm import wallet button
  await driver.findElement(By.css('button[data-testid="import-srp-confirm"]')).click();

  // 创建密码
  await driver.findElement(By.css('input[data-testid="create-password-new"]')).sendKeys(password);
  await driver
    .findElement(By.css('input[data-testid="create-password-confirm"]'))
    .sendKeys(password);
  await driver.findElement(By.css('input[data-testid="create-password-terms"]')).click();
  await driver.findElement(By.css('button[data-testid="create-password-import"]')).click();

  // windows = await driver.getAllWindowHandles();
  // await driver.switchTo().window(windows[windows.length - 1]);

  // got it button
  await driver.sleep(2000);
  await driver.findElement(By.css('button[data-testid="onboarding-complete-done"]')).click();

  // next button
  await driver.findElement(By.css('button[data-testid="pin-extension-next"]')).click();
  // done button
  await driver.findElement(By.css('button[data-testid="pin-extension-done"]')).click();
  // // 输入密码
  // await driver.findElement(By.id("password")).sendKeys(password);
  // // unlock button
  // await driver.findElement(By.css('button[data-testid="unlock-submit"]')).click();
}

async function stargate(driver: WebDriver) {
  await driver.get("https://stargate.finance/transfer");

  // connect wallet button
  await driver
    .findElement(
      By.xpath('//*[contains(@class, "MuiButton-label") and contains(text(), "Connect Wallet")]')
    )
    .click();

  await driver.sleep(getRandomInt());

  // select metamask
  await driver
    .findElement(
      By.xpath('//p[contains(@class, "MuiTypography-body1") and contains(text(), "Metamask")]')
    )
    .click();
  await driver.sleep(getRandomInt());
}

async function run() {
  let driver = await inital();
  await installMetaMask(driver);
  await importWallet(driver);
  await stargate(driver);
}

run();
