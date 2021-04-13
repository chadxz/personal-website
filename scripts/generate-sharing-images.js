const puppeteer = require("puppeteer")
const fetch = require("node-fetch")

const PAGES_JSON = "http://localhost:8080/sharing-pages.json"
const FRAME_URL = "http://localhost:8080/sharing-frame.html?title="

async function main() {
  const response = await fetch(PAGES_JSON)
  const pages = await response.json()

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]

    const browser = await puppeteer.launch()
    const tab = await browser.newPage()
    await tab.goto(FRAME_URL + page.title)
    await tab.setViewport({ width: 600, height: 315, deviceScaleFactor: 2 })
    await tab.screenshot({ path: `./src/images/og/${page.image}.jpg` })
    await browser.close()
    console.log(`📸 ${page.title}`)
  }
}

main()
