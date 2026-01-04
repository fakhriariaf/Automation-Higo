import { test, expect } from "@playwright/test";
import HomePage from "../../utility/Pages/homePageMenu";

test.describe("HIGO Homepage - Layanan Sub Menu Tests", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("TC-HIGO-TEST-006 | Open Wifi Advertising page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickLayananSubMenu("wifiAdvertising");
  });

  test("TC-HIGO-TEST-007 | Open HIGO Spot page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickLayananSubMenu("higoSpot");
  });

  test("TC-HIGO-TEST-008 | Open Integrated Digital page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickLayananSubMenu("integratedDigital");
  });

  test("TC-HIGO-TEST-009 | Open Specio AI external website (New Tab)", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openSpecioAI();
  });

});
