import { test, expect } from '@playwright/test';

test('Should have text when hover a picture', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/hovers');
    const figure = page.locator('.figure:nth-of-type(2)');
    const box = await figure.boundingBox();
    if(box){
        await page.mouse.move(box.x+box.width/2, box.y+box.height/2);
        await page.waitForTimeout(1000);

        const link = page.locator('a:has-text("View profile")').nth(1);
        await expect(link).toBeVisible();

        const text = page.locator('h5:has-text("name: user2")');
        await expect(text).toBeVisible();
    }
})