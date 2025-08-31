import { test, expect } from '@playwright/test';

test("Should perform script to check the title", async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/broken_images');
    const title = await page.evaluate(()=> document.title);
    expect(title).toBe("The Internet");
})