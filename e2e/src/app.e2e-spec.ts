import {AppPage} from './app.po';
import {browser, by, element} from 'protractor';

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

describe('Testing modification', () => {
  let page: AppPage;
  beforeEach(() => {
    page = new AppPage();
  });

  it('test4', () => {
    browser.get('/students');
    element(by.css('app-root td mat-checkbox')).click(); // clique sur le premier checkbox dans td
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

  it('test5', () => {
    browser.get('/students');
    element(by.className('etudiant')).click(); // clique sur le premier étudiant
    element(by.id('Prénom')).sendKeys('2');
    element(by.id('Nom')).sendKeys('22');
    element(by.id('Age')).sendKeys('2');
    element(by.id('Secteur')).sendKeys('2');
    element(by.css('button')).click(); // clique sur le premier bouton, soit sauvegarder
    expect(page.getField()).toEqual([
      '',
      '1',
      'Miguel2',
      'Dupont22',
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

  fit('test6', () => {
    browser.get('/studentForm');
    element(by.id('Prénom')).sendKeys('Yves');
    element(by.id('Nom')).sendKeys('Damien');
    element(by.id('Age')).sendKeys('25');
    element(by.id('Secteur')).sendKeys('finance');
    element(by.css('form button')).click();
    browser.waitForAngular();

    element(by.css('a[routerlink="/students"]')).click();
    //browser.driver.get(browser.baseUrl + '/students');
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
      '',
      '4',
      'Yves',
      'Damien',
      '',
    ]);

  });
});
