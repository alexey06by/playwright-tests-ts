import { test, expect } from '@playwright/test';

test('Should work with modal window', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('I am a JS Confirm');
        await dialog.accept();
    })
    await page.click('button:has-text("Click for JS Confirm")');

    await expect(page.locator('#result')).toHaveText('You clicked: Ok');

    page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('I am a JS Confirm');
        await dialog.dismiss();
    })
    await page.click('button:has-text("Click for JS Confirm")');

    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
})