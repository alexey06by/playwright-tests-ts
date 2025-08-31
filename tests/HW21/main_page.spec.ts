import {test,expect} from '@playwright/test'

test.describe("Main page", async()=>{
    test.skip("Should be skipped", async({page})=>{
        await page.goto('https://www.saucedemo.com/inventory.html');
        await page.click('#add-to-cart-sauce-labs-backpack');
        
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');

    });
    test('Should have empty cart after login @problem', async({page})=>{
        await page.goto('https://www.saucedemo.com/inventory.html');
       
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toBeHidden();

        await expect(page).toHaveTitle('Swag Labs');
        await expect(page).toHaveURL(/inventory\.html/);        
    });
});