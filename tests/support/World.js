const { setWorldConstructor, setDefaultTimeout } = require("@cucumber/cucumber");
const path = require('path');
const fs = require('fs');
const playwright = require('playwright');

class World {
    constructor({ attach }) {
        this.attach = attach;
    }
    async launchBrowser() {
        const browserType = process.env.BROWSER || 'chromium';
        this.browser = await playwright[browserType].launch({ headless: false });
        this.context = await this.browser.newContext({
            viewport: { width: 1500, height: 700 },
            recordVideo: {
                dir: "test-result/videos/",
                size: { width: 1500, height: 700 },
            }
        })

        this.page = await this.context.newPage();

        await this.context.tracing.start({
            screenshots: true,
            snapshots: true,
            sources: true,
        })
    }

    async handleAttachments(scenario) {

        if (scenario.result?.status === 'FAILED') {

            await this.context.tracing.stop({ path: 'traces/trace.zip' });

            const video = this.page.video();  // Get video from the page
            await this.page.close();  // Required to finalize video
            const tempPath = await video.path();
            const videoPath = "test-result/videos/video" + Date.now() + ".webm";
            await video.saveAs(videoPath);
            fs.unlinkSync(tempPath);
            const videoBuffer = fs.readFileSync(videoPath);
            this.attach(videoBuffer, "video/webm");
        }

    }


    async closeBrowser() {
        await this.browser.close();
    }

}

setWorldConstructor(World);
setDefaultTimeout(60 * 1000);


/*
| Status             | Description                          |
| ------------------ | ------------------------------------ |
| `Status.PASSED`    | The scenario step passed             |
| `Status.FAILED`    | The scenario step failed             |
| `Status.SKIPPED`   | Skipped (e.g., due to a failed hook) |
| `Status.PENDING`   | Step not yet implemented             |
| `Status.UNDEFINED` | Step definition is missing           |
| `Status.AMBIGUOUS` | Multiple matching step definitions   |
*/