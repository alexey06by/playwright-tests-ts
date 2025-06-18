import { test, expect } from '@playwright/test';

test("Should drag and drop", async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    await page.dragAndDrop('#column-a','#column-b');

    const text = page.locator('#column-a header');
    await expect(text).toHaveText('B');
})