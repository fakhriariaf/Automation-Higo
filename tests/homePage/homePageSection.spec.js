import { test, expect } from "@playwright/test";
import HomePageSection from "../../utility/Pages/homePageSection.js";

test.describe("HIGO - Home Page Sections Detailed Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // ======= SECTION 1 =======
  test("TC-01 | Hero Section Visible", async ({ page }) => {
    const home = new HomePageSection(page);
    await home.verifySection1();
  });

  // ======= SECTION 2 =======
  test("TC-02 | Section 2 Heading Visible", async ({ page }) => {
    const home = new HomePageSection(page);
    await expect(home.section2.heading).toBeVisible();
  });

  test("TC-03 | Section 2 Items Count > 0", async ({ page }) => {
    const home = new HomePageSection(page);
    const count = await home.section2.items.count();
    expect(count).toBeGreaterThan(0);
  });

  test("TC-04 | Section 2 Individual Item Text Valid", async ({ page }) => {
    const home = new HomePageSection(page);
    const itemCount = await home.section2.items.count();
    for (let i = 0; i < itemCount; i++) {
      const text = await home.section2.items.nth(i).textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  // ======= SECTION 3 =======
  test("TC-05 | Section 3 Carousel Slide Count > 0", async ({ page }) => {
    const home = new HomePageSection(page);
    const count = await home.section3.slidesLocator.count();
    expect(count).toBeGreaterThan(0);
  });

  test("TC-06 | Section 3 Each Slide Text Visible", async ({ page }) => {
    const home = new HomePageSection(page);
    const count = await home.section3.slidesLocator.count();
    for (let i = 0; i < count; i++) {
      const text = await home.section3.slideText(i).textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test("TC-07 | Section 3 Each Slide Image & Button Visible", async ({ page }) => {
    const home = new HomePageSection(page);
    const count = await home.section3.slidesLocator.count();
    for (let i = 0; i < count; i++) {
      expect(await home.section3.slideImage(i).isVisible()).toBeTruthy();
      expect(await home.section3.slideButton(i).isVisible()).toBeTruthy();
    }
  });

  // ======= SECTION 4 =======
  test("TC-08 | Section 4 Testimonial Slides Count > 0", async ({ page }) => {
    const home = new HomePageSection(page);
    const count = await home.section4.slidesLocator.count();
    expect(count).toBeGreaterThan(0);
  });

  test("TC-09 | Section 4 Each Testimonial Text, Author, Location Valid", async ({ page }) => {
    const home = new HomePageSection(page);
    await home.verifySection4();
  });

  // ======= SECTION 5 =======
  test("TC-10 | Section 5 Heading Visible", async ({ page }) => {
    const home = new HomePageSection(page);
    await expect(home.section5.heading).toBeVisible();
  });

  test("TC-11 | Section 5 Marquee Images Visible", async ({ page }) => {
    const home = new HomePageSection(page);
    await home.verifySection5();
  });

  // ======= SECTION 6 =======
  test("TC-12 | Section 6 FAQ Questions & Answers", async ({ page }) => {
    const home = new HomePageSection(page);
    await home.verifySection6();
  });

  // ======= FOOTER =======
  test("TC-13 | Footer All Links Visible & Href Valid", async ({ page }) => {
    const home = new HomePageSection(page);
    await home.verifyFooter();
  });

  test("TC-14 | Footer Specific Contact Links", async ({ page }) => {
    const home = new HomePageSection(page);
    const links = home.footer.allLinks;
    const email = await links.filter({ hasText: "info@higo.id" }).first();
    const tel = await links.filter({ hasText: "(021) 5806860" }).first();
    expect(await email.isVisible()).toBeTruthy();
    expect(await tel.isVisible()).toBeTruthy();
  });

  test("TC-15 | Homepage Overall Smoke Test", async ({ page }) => {
    const home = new HomePageSection(page);
    await home.verifySection1();
    await home.verifySection2();
    await home.verifySection3();
    await home.verifySection4();
    await home.verifySection5();
    await home.verifySection6();
    await home.verifyFooter();
  });
});
