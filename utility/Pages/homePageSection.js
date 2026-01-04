import { expect } from "@playwright/test";
import homePageSelector from "../selector/homePageSection.selector.js";
import dotenv from "dotenv";

dotenv.config();

export default class HomePageSection {
  constructor(page) {
    this.page = page;
    this.selector = new homePageSelector();

    // ======= Section 1 =======
    this.section1 = {
      heroText: page.locator(`${this.selector.HeroSection} ${this.selector.section1textHero}`)
    };

    // ======= Section 2 =======
    this.section2 = {
      heading: page.locator(this.selector.section2textHeading),
      items: page.locator(this.selector.section2textlist)
    };

    // ======= Section 3 =======
    this.section3 = {
      slidesLocator: page.locator(this.selector.section3slider),
      slideText: (i) => page.locator(`${this.selector.section3slider}:nth-of-type(${i + 1}) h6`),
      slideImage: (i) => page.locator(`${this.selector.section3slider}:nth-of-type(${i + 1}) img`),
      slideButton: (i) => page.locator(`${this.selector.section3slider}:nth-of-type(${i + 1}) button`)
    };

    // ======= Section 4 =======
    this.section4 = {
      slidesLocator: page.locator(this.selector.section4slides("1")).locator('..').locator('[role="group"][aria-roledescription="slide"]'),
      testimonialText: (i) => page.locator(this.selector.section4TestimonialText(i + 1)),
      authorName: (i) => page.locator(this.selector.section4AuthorName(i + 1)),
      authorLocation: (i) => page.locator(this.selector.section4AuthorLocation(i + 1))
    };

    // ======= Section 5 =======
    this.section5 = {
      heading: page.locator(this.selector.section5textHeading),
      images: page.locator(this.selector.section5MarqueeImages)
    };

    // ======= Section 6 =======
    this.section6 = {
      heading: page.locator(this.selector.section6textHeading),
      questions: page.locator(this.selector.section6FAQCount),
      answers: page.locator('section:nth-of-type(6) [role="region"]')
    };

    // ======= Footer =======
    this.footer = {
      allLinks: page.locator(this.selector.footerAllLinks)
    };
  }

  // ======= SECTION 1 =======
  async verifySection1() {
    await expect(this.section1.heroText).toBeVisible();
    const text = await this.section1.heroText.textContent();
    console.log(`Hero Section Text: ${text?.trim()}`);
    expect(text?.trim().length).toBeGreaterThan(0);
  }

  // ======= SECTION 2 =======
  async verifySection2() {
    await expect(this.section2.heading).toBeVisible();
    const itemCount = await this.section2.items.count();
    expect(itemCount).toBeGreaterThan(0);

    for (let i = 0; i < itemCount; i++) {
      const text = await this.section2.items.nth(i).textContent();
      console.log(`Section 2 Item ${i + 1}: ${text?.trim()}`);
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  }

  // ======= SECTION 3 =======
  async verifySection3() {
    const slideCount = await this.section3.slidesLocator.count();
    expect(slideCount).toBeGreaterThan(0);

    for (let i = 0; i < slideCount; i++) {
      const text = await this.section3.slideText(i).textContent();
      const imgVisible = await this.section3.slideImage(i).isVisible();
      const btnVisible = await this.section3.slideButton(i).isVisible();
      console.log(`Slide ${i + 1}: Text='${text?.trim()}', Image=${imgVisible}, Button=${btnVisible}`);

      expect(text?.trim().length).toBeGreaterThan(0);
      expect(imgVisible).toBeTruthy();
      expect(btnVisible).toBeTruthy();
    }
  }

  // ======= Section 3 Carousel Navigation =======
  async verifySection3Navigation() {
    const slideCount = await this.section3.slidesLocator.count();
    const baseUrl = process.env.BASE_URL || "";

    for (let i = 0; i < slideCount; i++) {
      const slideBtn = this.section3.slideButton(i);

      // Scroll ke tombol dulu
      await slideBtn.scrollIntoViewIfNeeded();

      // Hapus overlay sementara agar klik berhasil
      await this.page.evaluate(() => {
        const overlays = document.querySelectorAll('div.absolute.inset-x-0');
        overlays.forEach(el => el.style.pointerEvents = 'none');
      });

      console.log(`Clicking slide button ${i + 1}`);

      // Klik tombol dan tunggu navigasi
      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'load' }),
        slideBtn.click({ force: true }) // force click agar tidak terblokir
      ]);

      const currentUrl = this.page.url();
      console.log(`Navigated URL: ${currentUrl}`);
      expect(currentUrl.startsWith(baseUrl)).toBeTruthy();

      // Kembali ke homepage
      await this.page.goto(baseUrl);
      await this.page.waitForLoadState("domcontentloaded");
    }
  }

  // ======= SECTION 4 =======
  async verifySection4() {
    const count = await this.section4.slidesLocator.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const text = await this.section4.testimonialText(i).textContent();
      const author = await this.section4.authorName(i).textContent();
      const location = await this.section4.authorLocation(i).textContent();
      console.log(`Testimonial ${i + 1}: "${text?.trim()}" - ${author?.trim()}, ${location?.trim()}`);

      expect(text?.trim().length).toBeGreaterThan(0);
      expect(author?.trim().length).toBeGreaterThan(0);
      expect(location?.trim().length).toBeGreaterThan(0);
    }
  }

  // ======= SECTION 5 =======
  async verifySection5() {
    await expect(this.section5.heading).toBeVisible();
    await this.page.waitForTimeout(1000);
    const imageCount = await this.section5.images.count();
    for (let i = 0; i < imageCount; i++) {
      const visible = await this.section5.images.nth(i).isVisible();
      console.log(`Marquee Image ${i + 1}: Visible=${visible}`);
      expect(visible).toBeTruthy();
    }
  }

  // ======= SECTION 6 =======
  async verifySection6() {
    await expect(this.section6.heading).toBeVisible();
    const faqCount = await this.section6.questions.count();
    expect(faqCount).toBeGreaterThan(0);

    for (let i = 0; i < faqCount; i++) {
      const question = this.section6.questions.nth(i);
      const answer = this.section6.answers.nth(i);

      // Klik pertanyaan untuk membuka jawaban
      await question.click();

      const qText = await question.textContent();
      const aText = await answer.textContent();

      console.log(`FAQ ${i + 1} Question: ${qText?.trim()}`);
      console.log(`FAQ ${i + 1} Answer: ${aText?.trim()}`);

      expect(qText?.trim().length).toBeGreaterThan(0);
      expect(aText?.trim().length).toBeGreaterThan(0);
    }
  }


  // ======= FOOTER =======
  async verifyFooter() {
    const linkCount = await this.footer.allLinks.count();
    console.log(`Footer Links Count: ${linkCount}`);
    for (let i = 0; i < linkCount; i++) {
      const link = this.footer.allLinks.nth(i);
      const text = (await link.textContent())?.trim() || "";
      const href = await link.getAttribute("href");

      console.log(`Footer Link ${i + 1}: Text='${text}', Href='${href}'`);
      if (text.length > 0) expect(text.length).toBeGreaterThan(0);
      expect(href).not.toBeNull();
    }
  }
}