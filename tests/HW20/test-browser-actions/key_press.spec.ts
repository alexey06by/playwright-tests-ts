import { test, expect } from '@playwright/test';

test("Should press keys", async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/key_presses");
    await page.keyboard.press("Control");

    const result = page.locator('#result');
    await expect(result).toHaveText('You entered: CONTROL');

    const targetField = page.locator('#target');
    await targetField.pressSequentially("Alexey", {delay:100});

    await expect(result).toHaveText('You entered: Y');
})