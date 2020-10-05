# Rectifier Screenshots

Rectifier screenshots is a script that can be used to automatically generate screenshots of webpages in resolution that is applicable to the play store and the appstore.

This can be used in case you have web app that is wrapped in a mobile app via something like a webview.

## Configuration

To configure the screenshots, you need to add a directory under "/projects" that contains a config.js file.

The config.js file *MUST* export a devices property (even if null), a pages array, a sessionInfo object and a beforeAll function. See /sample/config.js for an example on how to configure the screenshots.

### Hooks

3 hooks are provided: A beforeAll hook that  and runs before the process starts, a b with access to the [browser](https://pptr.dev/#?product=Puppeteer&version=v5.3.1&show=api-class-browser), the [page](https://pptr.dev/#?product=Puppeteer&version=v5.3.1&show=api-class-page) variable and the sessionInfo object

* beforeAll hook:
  * Runs before the process starts
  * has access to the [browser](https://pptr.dev/#?product=Puppeteer&version=v5.3.1&show=api-class-browser) variable
* beforePageNavigation hook
  * Runs before the page navigates to the url to be screenshotted
  * Has access to the [browser](https://pptr.dev/#?product=Puppeteer&version=v5.3.1&show=api-class-browser), the [page](https://pptr.dev/#?product=Puppeteer&version=v5.3.1&show=api-class-page) variable and the sessionInfo object
* beforePageScreengrab hook
  * Runs before the page navigates to the url to be screenshotted
  * Has access to the [browser](https://pptr.dev/#?product=Puppeteer&version=v5.3.1&show=api-class-browser), the [page](https://pptr.dev/#?product=Puppeteer&version=v5.3.1&show=api-class-page) variable and the sessionInfo object

## Implementation notes

The screenshots are generated via Puppeteer. 3 different resolutions are provided in both ios and android:

* Ios
  * 5.5 Inch (1242x2208)
  * 6.5 Inch (1242x2688)
  * iPad (Second gen and third gen) (2048x2732)
* android
  * 7 Inch Tablet (1536x2048)
  * 10 Inch Tablet (2048x2732)
  * Smartphone (1439x2881)

These devices are configured in the config.js file via the "devices" property. Checkout defaultDevices in the index.js file for an example.