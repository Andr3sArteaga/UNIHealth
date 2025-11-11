const { reloadApp } = require('detox-expo-helpers');

beforeAll(async () => {
  await reloadApp();
});

beforeEach(async () => {
  await reloadApp();
});