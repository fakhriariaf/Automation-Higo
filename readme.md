# 🧪 QA Automation Assessment - HIGO.ID/BLOG.HIGO.ID

Welcome to the **QA Automation Project** repository using [Playwright](https://playwright.dev/)!  
This project contains automated test cases for **Web UI** flows.

---

## 📦 Clone & Setup

```bash
git clone https://github.com/fakhriariaf/Automation-Higo.git
or
git clone git@github.com:fakhriariaf/Automation-Higo.git
```

### ⚙️ Install Dependencies

> Make sure you have [Node.js](https://nodejs.org/) installed.

```bash
npm install
npx playwright install
npm install dotenv
```

📖 For more information, visit the official Playwright docs:  
👉 [https://playwright.dev/docs/intro](https://playwright.dev/docs/intro)

---

## 🚀 How to Run Tests

You can execute tests with the following command:

```bash
specified test : npm run test ../tests/[fileName] or fileName
all testcase   : npm run test
```

### 🧾 Examples:

```bash
npm run test tests/homePage/homePageSection.spec.js
npm run test tests/homePage/homePagemainMenu.spec.js
npm run test tests/homePage/homePagesubMenu.spec.js
```

---

## 📁 Folder Structure

```
## 📁 Project Structure

AUTOMATION-HIGO/
├── node_modules/
├── tests/
│   └── homePage/
│       ├── homePageMainMenu.spec.js >> File Execute
│       ├── homePageSection.spec.js >> File Execute
│       └── homePageSubMenu.spec.js >> File Execute
├── utility/
│   ├── Pages/
│   │   ├── homePageMenu.js
│   │   └── homePageSection.js
│   └── selector/
│       ├── homePageMenu.selector.js
│       └── homePageSection.selector.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md

```

---

## ✨ Author

👨‍💻 [Fakhri Aria F](https://github.com/fakhriariaf)

---

