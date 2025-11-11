const { reloadApp } = require('detox-expo-helpers');

describe('Main Navigation', () => {
  beforeEach(async () => {
    await reloadApp();
    // This test assumes the user is authenticated and has completed tutorial
    // You might need to mock auth state or complete login flow first
  });

  it('should navigate between main tabs', async () => {
    // Home tab
    await expect(element(by.text('Inicio'))).toBeVisible();
    await element(by.text('Inicio')).tap();
    await expect(element(by.text('🏠'))).toBeVisible();
    
    // Appointments tab
    await element(by.text('Citas')).tap();
    await expect(element(by.text('📅'))).toBeVisible();
    
    // Diary tab
    await element(by.text('Diario')).tap();
    await expect(element(by.text('📝'))).toBeVisible();
    
    // Profile tab
    await element(by.text('Perfil')).tap();
    await expect(element(by.text('👤'))).toBeVisible();
  });

  it('should show emergency alert button on home screen', async () => {
    await element(by.text('Inicio')).tap();
    await expect(element(by.id('emergency-alert-button'))).toBeVisible();
  });

  it('should navigate to alerts screen', async () => {
    await element(by.text('Inicio')).tap();
    await element(by.id('emergency-alert-button')).tap();
    await expect(element(by.text('Alerta de Emergencia'))).toBeVisible();
  });
});