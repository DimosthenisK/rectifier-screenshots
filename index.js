const puppeteer = require("puppeteer");
const fs = require("fs");

const project = process.argv[2];

if (!project) throw "Project not specified!";

const {
  devices,
  sessionInfo,
  beforeAll,
  pages,
} = require(`./projects/${project}/config.js`);

const defaultDevices = {
  android: {
    phone: "Pixel 2 XL",
    "10InchTablet": "iPad Pro",
    "7InchTablet": "iPad",
  },
  ios: {
    "65Inch": "iPhone XR",
    "55Inch": "iPhone 6 Plus",
    ipad: "iPad Pro",
  },
};

let determinedDevices = devices || defaultDevices;

(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--headless", "--disable-gpu"],
  });
  const generateScreenshotsForSize = async (saveTo, device, pageInfo) => {
    console.log("\tGenerating screenshot for " + pageInfo.url);
    const page = await browser.newPage();
    await page.emulate(puppeteer.devices[device]);

    if (pageInfo.hooks && pageInfo.hooks.beforePageNavigation)
      await pageInfo.hooks.beforePageNavigation(browser, page, sessionInfo);

    await page
      .goto(pageInfo.url, { waitUntil: "networkidle2" })
      .catch((err) => console.log(err));

    if (pageInfo.hooks && pageInfo.hooks.beforePageScreengrab)
      await pageInfo.hooks.beforePageScreengrab(browser, page, sessionInfo);

    await page.screenshot({ path: saveTo });
    page.close();
  };

  if (fs.existsSync(`./projects/${project}/screenshots`))
    fs.rmdirSync(`./projects/${project}/screenshots`, { recursive: true });
  fs.mkdirSync(`./projects/${project}/screenshots`);
  fs.mkdirSync(`./projects/${project}/screenshots/android`);
  fs.mkdirSync(`./projects/${project}/screenshots/ios`);
  for (const deviceKey of Object.keys(determinedDevices.ios)) {
    fs.mkdirSync(`./projects/${project}/screenshots/ios/${deviceKey}`);
  }
  for (const deviceKey of Object.keys(determinedDevices.android)) {
    fs.mkdirSync(`./projects/${project}/screenshots/android/${deviceKey}`);
  }

  await beforeAll(browser);
  const screenshots = [];

  for (const [index, pageInfo] of Object.entries(pages)) {
    await new Promise((resolve) => setTimeout(resolve, index * 2000));
    for (const [deviceKey, device] of Object.entries(
      determinedDevices.android
    )) {
      await new Promise((resolve) =>
        setTimeout(resolve, (1 + index * 2000) / 4)
      );
      screenshots.push(
        generateScreenshotsForSize(
          `./projects/${project}/screenshots/android/${deviceKey}/${index}.png`,
          device,
          pageInfo
        )
      );
    }
    for (const [deviceKey, device] of Object.entries(determinedDevices.ios)) {
      await new Promise((resolve) =>
        setTimeout(resolve, (1 + index * 2000) / 4)
      );
      screenshots.push(
        generateScreenshotsForSize(
          `./projects/${project}/screenshots/ios/${deviceKey}/${index}.png`,
          device,
          pageInfo
        )
      );
    }
  }

  await Promise.all(screenshots);
  console.log("Done!");
  await browser.close();
})();
