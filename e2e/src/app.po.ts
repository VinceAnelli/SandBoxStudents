import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root a')).getText();
  }

  getTitle() {
    return browser.getTitle();
  }

  getH2() {
    return element(by.css('app-root h2')).getText();
  }
  getField() {
    return element.all(by.css('app-root td')).map(e => e.getText());
  }
}
