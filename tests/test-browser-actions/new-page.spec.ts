import { test, expect } from '@playwright/test';

test('Should open new page', async({page, context})=>{
    await page.goto('https://the-internet.herokuapp.com/windows');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.click('#content a[target="_blank"]')
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveTitle('New Window');
    await expect(newPage.locator('h3')).toHaveText('New Window');
})