import { Builder, By } from "selenium-webdriver";
import { ServiceBuilder } from "selenium-webdriver/chrome.js";

const service = new ServiceBuilder("/Users/hanxin/chromedriver");
const driver = new Builder().forBrowser("chrome").setChromeService(service).build();

// 模拟人类的行为 区间在 页面加载好的 [5 - 10]s内
function getRandomInt(min: number = 5, max: number = 15): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
}

async function run() {
  await driver.get("https://stargate.finance/transfer");
  await driver.manage().setTimeouts({ implicit: 5000 });
  let title = await driver.getTitle();
  console.log("title is", title);

  // "//*[contains(@class, 'your-css-class') and contains(text(), 'Element Text')]"

  let connectWalletButton = await driver.findElement(
    By.xpath('//*[contains(@class, "MuiButton-label") and contains(text(), "Connect Wallet")]')
  );

  console.log("connectWalletButton is ", connectWalletButton);

  await driver.sleep(getRandomInt());

  connectWalletButton.click();

  console.log("connectWalletButton is ", connectWalletButton);

  let metaMaskButton = await driver.findElement(By.css(".MuiBox-root.jss1842 > :first-child"));

  await driver.sleep(getRandomInt());

  await metaMaskButton.click();

  // metamask 站点 下载 钱包
  let metaMaskDownloadBtn = driver.findElement(By.css(".Button__ButtonWrapper-sc-5os99m-1"));

  await driver.sleep(getRandomInt());

  await metaMaskDownloadBtn.click();

  // let submitButton = await driver.findElement(By.css("button"));

  // await textBox.sendKeys("Selenium");
  // await submitButton.click();

  // let message = await driver.findElement(By.id("message"));

  // let value = await message.getText();

  console.log("title is ", title);
  // console.log("value is ", value);

  // await driver.quit();
}

run();
