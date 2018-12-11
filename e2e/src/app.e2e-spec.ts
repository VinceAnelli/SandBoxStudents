import { AppPage } from './app.po';
import { by, browser, element } from 'protractor';

describe('testing correct displaying', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('test1', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Ajouter un étudiants');
  });

  it('test2', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('SandBox');
  });

  it('test3', () => {
    browser.get('/students');
    expect(page.getField()).toEqual([
      '',
      '1',
      'Miguel',
      'Dupont',
      '',
      '',
      '2',
      'Jean',
      'Renard',
      '',
      '',
      '3',
      'Arnaud',
      'Dupond',
      '',
  ]);
  });
});

describe('Testing deleting student', () => {
  let page: AppPage;
  beforeEach(() => {
    page = new AppPage();
  });

  it('test4', () => {
    browser.get('/students');
    element(by.css('app-root td mat-checkbox')).click();
    element(by.id('buttonDelete')).click();
    browser.switchTo().alert().accept();
    expect(page.getField()).toEqual([
      '',
      '2',
      'Jean',
      'Renard',
      '',
      '',
      '3',
      'Arnaud',
      'Dupond',
      '',
  ]);
  });

});
