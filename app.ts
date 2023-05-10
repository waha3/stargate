import { Builder, By } from "selenium-webdriver";
import { ServiceBuilder, Options } from "selenium-webdriver/chrome.js";

const service = new ServiceBuilder("/Users/hanxin/chromedriver");
const driver = new Builder().forBrowser("chrome").setChromeService(service).build();

async function run() {
  await driver.get("https://stargate.finance/transfer");

  let title = await driver.getTitle();

  const sleep = async (delay = 1000) => {
    return new Promise((resolve) => {
      global.setTimeout(() => {
        resolve(0);
      }, delay);
    });
  };

  await driver.manage().setTimeouts({ implicit: 100000 });

  await sleep();
  let connectWalletButton = await driver.findElement(By.css(".jss18"));

  await sleep();
  connectWalletButton.click();

  console.log("connectWalletButton is ", connectWalletButton);

  let metaMaskButton = await driver.findElement(By.css(".jss928 > :first-child"));

  await sleep();
  metaMaskButton.click();

  // metamask 站点 下载 钱包
  let metaMaskDownloadBtn = driver.findElement(By.css(".Button__ButtonWrapper-sc-5os99m-1"));

  await sleep();
  metaMaskDownloadBtn.click();

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
