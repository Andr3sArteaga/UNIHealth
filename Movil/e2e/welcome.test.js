const { reloadApp } = require('detox-expo-helpers');

describe('Welcome Screen', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it('should show welcome screen for unauthenticated users', async () => {
    await expect(element(by.text('Bienvenido a UNIHealth'))).toBeVisible();
    await expect(element(by.text('Iniciar Sesión'))).toBeVisible();
    await expect(element(by.text('Registrarse'))).toBeVisible();
  });

  it('should navigate to login screen', async () => {
    await element(by.text('Iniciar Sesión')).tap();
    await expect(element(by.text('Iniciar Sesión'))).toBeVisible();
    await expect(element(by.id('email-input'))).toBeVisible();
    await expect(element(by.id('password-input'))).toBeVisible();
  });

  it('should navigate to register screen', async () => {
    await element(by.text('Registrarse')).tap();
    await expect(element(by.text('Registro Médico'))).toBeVisible();
    await expect(element(by.text('Información Básica'))).toBeVisible();
  });
});