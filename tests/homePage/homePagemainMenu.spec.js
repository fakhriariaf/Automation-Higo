import { test } from "@playwright/test";
import HomePage from "../../utility/Pages/homePageMenu";

test.describe("HIGO - Home Page Navigation", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("TC-HIGO-HOME-001 | Verify Logo HIGO", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.verifyWelcomeMessage();
  });

  test("TC-HIGO-HOME-002 | Click Tentang HIGO", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickMainMenu("tentangHigo");
  });

  test("TC-HIGO-HOME-003 | Click Studi Kasus", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickMainMenu("studiKasus");
  });

  test("TC-HIGO-HOME-004 | Click Digital Reports", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickMainMenu("digitalReports");
  });

  test("TC-HIGO-HOME-005 | Click Hubungi HIGO", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickMainMenu("hubungiHigo");
  });

  test("TC-HIGO-HOME-006 | Open Blog HIGO (New Tab)", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openBlogHigo();
  });

});
