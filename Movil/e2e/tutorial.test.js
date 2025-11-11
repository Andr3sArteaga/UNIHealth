const { reloadApp } = require('detox-expo-helpers');

describe('Tutorial Flow', () => {
  beforeEach(async () => {
    await reloadApp();
    // Assume user is authenticated but hasn't completed tutorial
    // In a real scenario, you'd mock the auth state
  });

  it('should navigate through tutorial steps', async () => {
    // This test assumes we can reach the tutorial screen
    // You might need to complete login/registration first
    
    // Step 1: Medical History
    await expect(element(by.text('Tu Historial Médico'))).toBeVisible();
    await expect(element(by.text('📋'))).toBeVisible();
    await expect(element(by.text('Siguiente'))).toBeVisible();
    await element(by.text('Siguiente')).tap();
    
    // Step 2: Schedule Appointments
    await expect(element(by.text('Agenda Citas'))).toBeVisible();
    await expect(element(by.text('📅'))).toBeVisible();
    await element(by.text('Siguiente')).tap();
    
    // Step 3: Emergency Alerts
    await expect(element(by.text('Alertas de Emergencia'))).toBeVisible();
    await expect(element(by.text('🚨'))).toBeVisible();
    await expect(element(by.text('Comenzar a Usar UNIHealth'))).toBeVisible();
    await element(by.text('Comenzar a Usar UNIHealth')).tap();
    
    // Should navigate to main app
    await waitFor(element(by.text('Inicio')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should allow skipping tutorial', async () => {
    await expect(element(by.text('Saltar tutorial'))).toBeVisible();
    await element(by.text('Saltar tutorial')).tap();
    
    // Should navigate to main app
    await waitFor(element(by.text('Inicio')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should show progress dots', async () => {
    // Check that progress indicators are visible
    await expect(element(by.id('progress-dots'))).toBeVisible();
  });
});