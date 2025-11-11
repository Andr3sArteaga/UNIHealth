const { reloadApp } = require('detox-expo-helpers');

describe('Authentication Flow', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it('should complete login flow', async () => {
    // Navigate to login
    await element(by.text('Iniciar Sesión')).tap();
    
    // Fill login form
    await element(by.id('email-input')).typeText('test@university.edu');
    await element(by.id('password-input')).typeText('testpassword');
    
    // Submit login
    await element(by.text('Entrar')).tap();
    
    // Should navigate to main app or tutorial
    await waitFor(element(by.text('UNIHealth')).or(element(by.text('Tu Historial Médico'))))
      .toBeVisible()
      .withTimeout(10000);
  });

  it('should show validation errors for empty login form', async () => {
    await element(by.text('Iniciar Sesión')).tap();
    await element(by.text('Entrar')).tap();
    
    // Should show error or stay on login screen
    await expect(element(by.text('Iniciar Sesión'))).toBeVisible();
  });

  it('should navigate through registration phases', async () => {
    await element(by.text('Registrarse')).tap();
    
    // Phase 1: Basic Info
    await expect(element(by.text('Información Básica'))).toBeVisible();
    await element(by.id('email-input')).typeText('newuser@university.edu');
    await element(by.id('password-input')).typeText('newpassword');
    await element(by.id('confirm-password-input')).typeText('newpassword');
    await element(by.id('name-input')).typeText('Test User');
    await element(by.id('cedula-input')).typeText('12345678');
    await element(by.text('Siguiente')).tap();
    
    // Phase 2: Personal Data
    await expect(element(by.text('Datos Personales'))).toBeVisible();
    await element(by.id('birth-date-input')).typeText('1990-01-15');
    await element(by.id('phone-input')).typeText('4121234567');
    await element(by.text('Siguiente')).tap();
    
    // Phase 3: Medical History
    await expect(element(by.text('Historial Médico'))).toBeVisible();
    await element(by.id('blood-type-input')).typeText('O+');
    await element(by.text('Siguiente')).tap();
    
    // Phase 4: Insurance & Lifestyle
    await expect(element(by.text('Seguro y Estilo de Vida'))).toBeVisible();
    await element(by.text('Completar Registro')).tap();
    
    // Should complete registration and show tutorial or main app
    await waitFor(element(by.text('Tu Historial Médico')).or(element(by.text('UNIHealth'))))
      .toBeVisible()
      .withTimeout(10000);
  });
});