import { test, expect } from '@playwright/test';
import dotenv from 'dotenv'
import { snapshot } from 'node:test';
dotenv.config()

test.describe('Product-item page', async()=> {
    test.beforeEach(async ({page})=>{
        await page.goto('');
        await page.fill('#user-name', process.env.USER_NAME || '');   
        await page.fill('#password', process.env.PASSWORD || '');
        await page.click('#login-button');
    });
    test.only('Should remove product from cart', async ({ page }) => {
        await page.click('.inventory_list>:first-child button');  
        await page.click('.inventory_item:nth-child(1) .inventory_item_name');

        await expect(page).toHaveTitle('Swag Labs');
        await expect(page).toHaveURL(/inventory-item\.htm/);
        
        const addButton = page.locator('.btn_primary');
        await expect(addButton).toBeHidden();

        await page.click('.btn_secondary');    

        const shoppingCartBadge = page.locator('.shopping_cart_badge'); 
        await expect(shoppingCartBadge).toBeHidden();

        await expect(addButton).toBeVisible();
        
        const removeButton = page.locator('.btn_secondary');
        await expect(removeButton).toBeHidden();
 
        await page.click('.shopping_cart_link');

        await expect(page).toHaveTitle('Swag Labs');
        await expect(page).toHaveURL(/cart\.htm/);
        
        const inventoryItem = page.locator('.inventory_item_name');           
        await expect(inventoryItem).toBeHidden();
        
        await expect(shoppingCartBadge).toBeHidden();
    });
})