import { test, expect } from '@playwright/test';
import dotenv from 'dotenv'
import { snapshot } from 'node:test';
dotenv.config()

test.describe('Checkout: Your Information page', async()=> {
    test.beforeEach(async ({page})=>{
        await page.goto('');
        await page.fill('#user-name', process.env.USER_NAME || '');   
        await page.fill('#password', process.env.PASSWORD || '');
        await page.click('#login-button');
        await page.click('.inventory_list>:first-child button');  
        await page.click('.shopping_cart_link');      
        await page.click('.checkout_button');   
    });
    test.only('Should have validations for invalid data', async ({ page }) => {
        await page.context().tracing.start({screenshots: true, snapshots: true});
        await page.click('[value="CONTINUE"]');  

        await expect(page).toHaveTitle('Swag Labs');
        await expect(page).toHaveURL(/checkout-step-one\.html/);
        const xIcon = page.locator('[data-icon="times-circle"]');
        await expect(xIcon).toBeVisible();     
        const errorMessage = page.locator('[data-test="error"]');   
        await expect(errorMessage).toHaveText('Error: First Name is required');
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');
        
        await page.fill('#first-name', process.env.FIRST_NAME || '');           
        await page.click('[value="CONTINUE"]');  

        await expect(page).toHaveTitle('Swag Labs');
        await expect(page).toHaveURL(/checkout-step-one\.html/);
        await expect(xIcon).toBeVisible();        
        await expect(errorMessage).toHaveText('Error: Last Name is required');
        await expect(cartBadge).toHaveText('1');
        const firstName = page.locator('#first-name');
        await expect(firstName).toBeEditable();   
        
        await page.fill('#last-name', process.env.LAST_NAME || '');           
        await page.click('[value="CONTINUE"]');
        
        await expect(page).toHaveTitle('Swag Labs');
        await expect(page).toHaveURL(/checkout-step-one\.html/);
        await expect(xIcon).toBeVisible();        
        await expect(errorMessage).toHaveText('Error: Postal Code is required');
        await expect(cartBadge).toHaveText('1');
        await expect(firstName).toBeEditable();
        const lastName = page.locator('#last-name');
        await expect(lastName).toBeEditable(); 

        await page.fill('#postal-code', process.env.POSTAL_CODE || '');           
        await page.click('[value="CONTINUE"]');

        await expect(page).toHaveTitle('Swag Labs');
        await expect(page).toHaveURL(/checkout-step-two\.html/);
        await expect(cartBadge).toHaveText('1');
        const numberOfItems = await page.locator('.cart_item').count();
        expect(numberOfItems).toBe(1);
        await page.context().tracing.stop({path: 'trace.zip'});
    });
    test.only('Should cancel checkout and go back to cart', async ({ page }) => {
        await page.click('.cart_cancel_link');
        
        await expect(page).toHaveTitle('Swag Labs');
        await expect(page).toHaveURL(/cart\.html/);
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');
        const numberOfItems = await page.locator('.cart_item').count();
        expect(numberOfItems).toBe(1);
    });
})

test.describe('Product-item page', async()=> {
    test.beforeEach(async ({page})=>{
        await page.goto('');
        await page.fill('#user-name', process.env.USER_NAME || '');   
        await page.fill('#password', process.env.PASSWORD || '');
        await page.click('#login-button');
    });
    test.only('Should remove product from cart', async ({ page }) => {
        await page.click('.inventory_list>:first-child button');  
        await page.click('#item_4_title_link');

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
        const inventoryItem = page.locator('.inventory_item_name');        

        await expect(page).toHaveTitle('Swag Labs');
        await expect(page).toHaveURL(/cart\.htm/);
        await expect(inventoryItem).toBeHidden();
        await expect(shoppingCartBadge).toBeHidden();
    });
})

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