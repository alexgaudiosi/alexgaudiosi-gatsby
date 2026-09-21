const { default: favicons } = require('favicons');
const path = require('path');
const fs = require('fs');

const {
  siteTitleShort,
  themeColor,
  backgroundColor,
} = require('../site-config');

const dir = path.resolve(__dirname, '../public/icons/');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const source = 'src/images/poro-logo.png';
const configuration = {
  path: '/icons/',
  appName: siteTitleShort,
  appDescription: siteTitleShort,
  developerName: siteTitleShort,
  developerURL: siteTitleShort,
  dir: 'auto',
  lang: 'en-US',
  background: backgroundColor,
  theme_color: themeColor,
  display: 'standalone',
  orientation: 'any',
  start_url: '/',
  version: '1.0',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: false,
    windows: true,
    yandex: false,
  },
};

favicons(source, configuration)
  .then(res => {
  res.images.forEach(image => {
    fs.writeFile(
      path.resolve(__dirname, '../public/icons/', image.name),
      image.contents,
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  });

  res.files.forEach(file => {
    fs.writeFile(
      path.resolve(__dirname, '../public/', file.name),
      file.contents,
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
  })
  .catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
