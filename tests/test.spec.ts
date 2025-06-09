import { test, expect } from '@playwright/test';
import dotenv from 'dotenv'
dotenv.config()

test.describe('Login page', async()=> {
    test('Should login with valid credentials', async ({ page }) => {
        await page.goto('');
        await page.fill('#user-name', process.env.USER_NAME || '');   
        await page.fill('#password', process.env.PASSWORD || '');
        await page.click('#login-button');

        await expect(page).toHaveURL(/inventory\.html/);
    });
    test('Should show error when login with invalid credentials', async ({ page }) => {
        await page.goto('');
        await page.fill('#user-name', 'invalid_login');   
        await page.fill('#password', 'invalid_password');
        await page.click('#login-button');
        const errorMessage = page.locator('[data-test="error"]');

        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Username and password do not match any user in this service');        
    });
})

test.describe('Products page', async()=> {
    test.beforeEach(async ({page})=>{
        await page.goto('');
        await page.fill('#user-name', process.env.USER_NAME || '');   
        await page.fill('#password', process.env.PASSWORD || '');
        await page.click('#login-button');
    });
    test('Should add product to cart', async ({ page }) => {
        await page.click('.inventory_list>:first-child button');
        const shopping_cart_badge = page.locator('.shopping_cart_badge');
        const item_name = await page.innerText('.inventory_list>:first-child .inventory_item_name');
 
        await expect(shopping_cart_badge).toBeVisible();
        await expect(shopping_cart_badge).toContainText('1');

        await page.click('.shopping_cart_link');
        const inventory_item = page.locator('.inventory_item_name');        

        await expect(page).toHaveURL(/cart\.htm/);
        await expect(inventory_item).toBeVisible();
        await expect(inventory_item).toContainText(item_name);
    });
    test('Should remove product from cart', async ({ page }) => {
        const addButton = '(//button[@class="btn_primary btn_inventory"])[1]';        
        await page.click(addButton);
        await page.click(addButton);
        await page.click(addButton); 
        const removeButton = '(//button[@class="btn_secondary btn_inventory"])[1]';   
        await page.click(removeButton);
        await page.click(removeButton);
        await page.click(removeButton);                                
        const shopping_cart_badge = page.locator('.shopping_cart_badge');
 
        await expect(shopping_cart_badge).toBeHidden();

        await page.click('.shopping_cart_link');
        const inventory_item = page.locator('.inventory_item_name');        

        await expect(page).toHaveURL(/cart\.htm/);
        await expect(inventory_item).toBeHidden();
        await expect(shopping_cart_badge).toBeHidden();
    });
})

test.describe('Product-item page', async()=> {
    test.beforeEach(async ({page})=>{
        await page.goto('');
        await page.fill('#user-name', process.env.USER_NAME || '');   
        await page.fill('#password', process.env.PASSWORD || '');
        await page.click('#login-button');
        await page.click('#item_1_title_link');
    });
    test('Should add product to cart', async ({ page }) => {
        await page.click('.btn_primary');        
        const shopping_cart_badge = page.locator('.shopping_cart_badge');
        const item_name = await page.innerText('.inventory_details_name');
 
        await expect(shopping_cart_badge).toBeVisible();
        await expect(shopping_cart_badge).toContainText('1');

        await page.click('.shopping_cart_link');
        const inventory_item = page.locator('.inventory_item_name');        

        await expect(page).toHaveURL(/cart\.htm/);
        await expect(inventory_item).toBeVisible();
        await expect(inventory_item).toContainText(item_name);
        await expect(shopping_cart_badge).toBeVisible();
        await expect(shopping_cart_badge).toContainText('1');
    });
})