export default class homePageSelector {
  // ======================
  // SECTION 1 - HERO
  // ======================
  HeroSection = "section:nth-of-type(1)";
  section1textHero = "h1";

  // ======================
  // SECTION 2
  // ======================
  Section2 = "section:nth-of-type(2)";
  section2textHeading = "section:nth-of-type(2) h2.text-primary";
  section2textlist = "li.col-span-1.grid.grid-flow-row.place-content-start.justify-center";

  // ======================
  // SECTION 3
  // ======================
  section3 = "section:nth-of-type(3)";
  section3textHeading = "section:nth-of-type(3) h2.text-primary";
  section3carousel = 'section:nth-of-type(3) [role="region"][aria-roledescription="carousel"]';
  section3imagelist = 'section:nth-of-type(3) img';
  section3slider = 'section:nth-of-type(3) [role="group"][aria-roledescription="slide"]';
  section3Texth6 = 'section:nth-of-type(3) [role="group"][aria-roledescription="slide"] h6';
  section3Button = 'section:nth-of-type(3) [role="group"][aria-roledescription="slide"] button';

  // ======================
  // SECTION 4 - TESTIMONIAL
  // ======================
  section4 = "section:nth-of-type(4)";
  section4textHeading = "section:nth-of-type(4) h2.text-primary";
  section4carousel = 'section:nth-of-type(4) [role="region"][aria-roledescription="carousel"]';
  section4slides = (index) => `section:nth-of-type(4) [role="group"][aria-roledescription="slide"]:nth-of-type(${index})`;
  section4TestimonialText = (index) => `section:nth-of-type(4) [role="group"][aria-roledescription="slide"]:nth-of-type(${index}) p.order-1`;
  section4AuthorName = (index) => `section:nth-of-type(4) [role="group"][aria-roledescription="slide"]:nth-of-type(${index}) div[rel="author"]`;
  section4AuthorLocation = (index) => `section:nth-of-type(4) [role="group"][aria-roledescription="slide"]:nth-of-type(${index}) div.text-sm`;
  sectionBtnPrev = 'section:nth-of-type(4) button[aria-label="Previous slide"]';
  sectionBtnNext = 'section:nth-of-type(4) button[aria-label="Next slide"]';

  // ======================
  // SECTION 5
  // ======================
  section5 = "section:nth-of-type(5)";
  section5textHeading = "section:nth-of-type(5) h2.text-primary";
  section5marquee = "section:nth-of-type(5) div.group marquee";
  section5MarqueeImages = "section:nth-of-type(5) div.group marquee div.grid.w-20.place-items-center img";

  // ======================
  // SECTION 6 - FAQ
  // ======================
  section6 = "section:nth-of-type(6)";
  section6textHeading = "section:nth-of-type(6) h3.inline-block.font-anek-malayalam.text-2xl.font-bold.text-primary";
  section6FAQQuestion = (index) => `section:nth-of-type(6) h3 button:nth-of-type(${index + 1})`;
  section6FAQAnswer = (index) => `section:nth-of-type(6) [role="region"]:nth-of-type(${index + 1})`;
  section6FAQCount = "section:nth-of-type(6) h3 button";

  // ======================
  // FOOTER
  // ======================
  footersection = "footer.grid.bg-primary.py-14.relative.grid-container";
  footerAllLinks = `${this.footersection} a`;
  footerColumnLinks = (colIndex) => `${this.footersection} > div > ul:nth-of-type(${colIndex + 1}) a`;
}
