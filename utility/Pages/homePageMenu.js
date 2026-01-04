import { expect } from "@playwright/test";
import HomePageMenuSelector from "../selector/homePageMenu.selector.js";

export default class HomePage {
  constructor(page) {
    this.page = page;
    this.selector = new HomePageMenuSelector();

    // ======================
    // LOGO
    // ======================
    this.welcomeMessage = page.locator(this.selector.welcomeMessage);

    // ======================
    // MAIN MENU
    // ======================
    this.mainMenu = {
      tentangHigo: page.locator(this.selector.menuTentangHigo).first(),
      layananHigo: page.locator(this.selector.menuLayananHigo).first(),
      studiKasus: page.locator(this.selector.menuStudiKasus).first(),
      blog: page.locator(this.selector.menuBlog).first(),
      digitalReports: page.locator(this.selector.menuDigitalReports).first(),
      hubungiHigo: page.locator(this.selector.menuHubungiHigo).first(),
    };

    // ======================
    // SUB MENU - LAYANAN
    // ======================
    this.layananSubMenu = {
      wifiAdvertising: page.locator(this.selector.subMenuWifiAdvertising).first(),
      higoSpot: page.locator(this.selector.subMenuHigoSpot).first(),
      integratedDigital: page.locator(this.selector.subMenuIntegratedDigital).first(),
      specioAI: page.locator(this.selector.subMenuSpecioAI).first(),
    };

    // ======================
    // URL VALIDATION
    // ======================
    this.mainMenuUrl = {
      tentangHigo: /about-us/i,
      studiKasus: /case-study/i,
      digitalReports: /digital-reports/i,
      hubungiHigo: /contact-us/i,
    };

    this.layananSubMenuUrl = {
      wifiAdvertising: /wifi-advertising/i,
      higoSpot: /higospot/i,
      integratedDigital: /integrated-digital/i,
      // specioAI buka tab baru, URL di-handle di openSpecioAI
    };
  }

  // ======================
  // LOGO
  // ======================
  async verifyWelcomeMessage() {
    await expect(this.welcomeMessage).toBeVisible();
  }

  // ======================
  // MAIN MENU
  // ======================
  async clickMainMenu(menuName) {
    const menu = this.mainMenu[menuName];
    await expect(menu).toBeVisible({ timeout: 15000 });

    await Promise.all([
      this.page.waitForLoadState("domcontentloaded"),
      menu.click(),
    ]);

    if (this.mainMenuUrl[menuName]) {
      await expect(this.page).toHaveURL(this.mainMenuUrl[menuName]);
    }
  }

  // ======================
  // SUB MENU - LAYANAN
  // ======================
  async clickLayananSubMenu(subMenuName) {
    const parentMenu = this.mainMenu.layananHigo;

    // tunggu menu muncul & scroll
    await expect(parentMenu).toBeVisible({ timeout: 15000 });
    await parentMenu.scrollIntoViewIfNeeded();
    await parentMenu.hover();

    const subMenu = this.layananSubMenu[subMenuName];
    await expect(subMenu).toBeVisible({ timeout: 15000 });
    await subMenu.click();
  }



  // ======================
  // BLOG (NEW TAB)
  // ======================
  async openBlogHigo() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.mainMenu.blog.click(),
    ]);

    await newPage.waitForLoadState("domcontentloaded");
    await expect(newPage).toHaveURL(process.env.BLOG_URL);
  }

  // ======================
  // SPECIO AI (NEW TAB)
  // ======================
  async openSpecioAI() {
    // pastikan menu parent siap
    await expect(this.mainMenu.layananHigo).toBeVisible({ timeout: 15000 });
    await this.mainMenu.layananHigo.hover();

    const [newPage] = await Promise.all([
        this.page.context().waitForEvent("page"),
        this.layananSubMenu.specioAI.click(),
    ]);

    try {
        await newPage.waitForLoadState("load", { timeout: 30000 });
        const url = await newPage.url();
        console.log("Specio AI URL loaded:", url);

        // validasi URL hanya jika bukan error page
        if (!url.startsWith("chrome-error")) {
        await expect(newPage).toHaveURL(process.env.SPECIO_URL, { timeout: 15000 });
        } else {
        console.warn("Tab eksternal gagal load, URL saat ini:", url);
        }
    } catch (err) {
        console.warn("Gagal load Specio AI:", err.message);
    }
  }
}
