import { test, expect } from '@playwright/test';
import dotenv from 'dotenv'
dotenv.config()

test.describe('Cart page', async ()=>{
    test('Snould proceed to the first step of checkout', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/v1/');
        await page.locator('[data-test="username"]').fill(process.env.USER_NAME || '');
        await page.locator('[data-test="password"]').fill(process.env.PASSWORD || '');
        await page.getByRole('button', { name: 'LOGIN' }).click();
        await page.locator('div').filter({ hasText: /^\$49\.99ADD TO CART$/ }).getByRole('button').click();
        await page.getByRole('link', { name: '1' }).click();
        await page.getByRole('link', { name: 'CHECKOUT' }).click();
        
        await expect(page.locator('#shopping_cart_container')).toContainText('1');
        await expect(page.locator('#contents_wrapper')).toContainText('Checkout: Your Information');
    });        
})