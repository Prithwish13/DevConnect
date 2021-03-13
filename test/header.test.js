const puppeteer = require("puppeteer");
let browser;
let page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    //for start browser wit GUI
    headless: false,
  });
  page = await browser.newPage();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await browser.close();
});

test("the header has the correct text", async () => {
  const text = await page.$eval("a.navbar-brand", (el) => el.innerHTML);

  expect(text).toEqual("DevConnector");
});

test("test the signup button", async () => {
  await page.click("a.btn.btn-lg.btn-info.mr-2");
  const text = await page.$eval(
    "h1.display-4.text-center",
    (el) => el.innerHTML
  );
  expect(text).toEqual("Sign Up");
});
