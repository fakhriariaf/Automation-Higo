export default class HomePageMenuSelector {
  // LOGO
  welcomeMessage = "a[aria-label='HIGO']";

  // MAIN MENU
  menuTentangHigo = "nav a[href='/about-us']";
  menuLayananHigo = "label[class='peer-checked:hidden'] div[class='grid grid-cols-l-fill items-center py-3 cursor-pointer'] span";
  menuStudiKasus = "nav a[href='/case-study']";
  menuBlog = "nav a:has-text('Blog')";
  menuDigitalReports = "nav a[href='/digital-reports']";
  menuHubungiHigo = "nav a[href='/contact-us']";

  // SUB MENU
  subMenuWifiAdvertising = "nav a:has-text('WiFi Advertising')";
  subMenuHigoSpot = "nav a:has-text('HIGOspot')";
  subMenuIntegratedDigital = "nav a:has-text('Integrated Digital')";
  subMenuSpecioAI = "nav a:has-text('Specio AI')";
}
