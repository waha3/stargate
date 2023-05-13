import { Builder, By, until } from "selenium-webdriver";
import { ServiceBuilder } from "selenium-webdriver/chrome.js";

const service = new ServiceBuilder("/Users/hanxin/chromedriver");
const driver = new Builder().forBrowser("chrome").setChromeService(service).build();

// 模拟人类的行为 区间在 页面加载好的 [5 - 15]s内
function getRandomInt(min: number = 5, max: number = 15): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  // return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
  return 1000;
}

async function inital() {
  await driver.manage().setTimeouts({ implicit: 10000 });
  // await driver.manage().window().setSize(1000, 800);
}
async function installMetaMask() {
  await driver.get("https://metamask.io/");

  let meta_mask_download_btn = await driver.findElement(
    By.xpath('//a[contains(@class, "iFIkyk")]')
  );
  await driver.sleep(getRandomInt());
  await meta_mask_download_btn.click();

  let add_to_chrome_btn = await driver.wait(until.elementLocated(By.css(".PNF6le")));

  // let add_to_chrome_btn = await driver.findElement(By.css("PNF6le"));
  // await driver.sleep(getRandomInt());
  // await add_to_chrome_btn.click();
  console.log("add to chrome", add_to_chrome_btn);
}

async function stargate() {
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
  await inital();
  await installMetaMask();
}

run();
