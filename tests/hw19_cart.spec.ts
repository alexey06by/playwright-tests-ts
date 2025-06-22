import { test, expect } from '@playwright/test';
import dotenv from 'dotenv'
import { snapshot } from 'node:test';
dotenv.config()

test.describe('Cart page', async()=> {
    test.beforeEach(async ({page})=>{
        await page.goto('');
        await page.fill('#user-name', process.env.USER_NAME || '');   
        await page.fill('#password', process.env.PASSWORD || '');
        await page.click('#login-button');
    });
    test.only('Should add 6 products to cart', async ({ page }) => {
        const addButton = '(//button[@class="btn_primary btn_inventory"])[1]';        
        await page.click(addButton);
        await page.click(addButton);
        await page.click(addButton);
        await page.click(addButton);
        await page.click(addButton);
        await page.click(addButton);
        await page.click('.shopping_cart_link'); 

        await expect(page).toHaveScreenshot();  
        await expect(page).toHaveURL(/cart\.htm/);

        const numberOfItems = await page.locator('.cart_item').count();
        expect(numberOfItems).toBe(6);
    });
    test.only('Should go back to Products page', async ({ page }) => {
        const addButton = '(//button[@class="btn_primary btn_inventory"])[1]';        
        await page.click(addButton);
        await page.click('.shopping_cart_link'); 
        await page.click('a.btn_secondary'); 
 
        await expect(page).toHaveURL(/inventory\.htm/);
        
        const numberOfAddedItems = await page.locator('.btn_secondary').count();
        expect(numberOfAddedItems).toBe(1);
        
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');
    });
})        