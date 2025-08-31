import { test, expect } from '@playwright/test';

test('Should contain text', async({page})=>{
    await page.goto('https://books-pwakit.appspot.com/');

    const text = page.locator('.books-desc');
    await expect(text).toHaveText('Search the world\'s most comprehensive index of full-text books.');
    await expect(text).toBeVisible();
})