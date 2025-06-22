import { test, expect } from '@playwright/test';
import dotenv from 'dotenv'
dotenv.config()

test.describe('Product-item page', async()=> {
    test.beforeEach(async ({page})=>{
        await page.goto('');
        await page.fill('#user-name', process.env.USER_NAME || '');   
        await page.fill('#password', process.env.PASSWORD || '');
        await page.click('#login-button');
        await page.click('.inventory_item:nth-child(3) .inventory_item_name');
    });
    test('Should add product to cart', async ({ page }) => {
        await page.click('.btn_primary');
        const item_name = await page.innerText('.inventory_details_name');

        const shopping_cart_badge = page.locator('.shopping_cart_badge'); 
        await expect(shopping_cart_badge).toBeVisible();
        await expect(shopping_cart_badge).toContainText('1');

        await page.click('.shopping_cart_link');

        const inventory_item = page.locator('.inventory_item_name');     
        await expect(inventory_item).toBeVisible();
        await expect(inventory_item).toContainText(item_name);
        
        await expect(page).toHaveURL(/cart\.htm/);
        await expect(shopping_cart_badge).toBeVisible();
        await expect(shopping_cart_badge).toContainText('1');
    });
})