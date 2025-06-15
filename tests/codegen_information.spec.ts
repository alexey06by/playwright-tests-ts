import { test, expect } from '@playwright/test';
import dotenv from 'dotenv'
dotenv.config()

test.describe('Checkout:Your Information page', async ()=>{
    test('Snould proceed to the second step of checkout', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/v1/');
        await page.locator('[data-test="username"]').fill(process.env.USER_NAME || '');
        await page.locator('[data-test="password"]').fill(process.env.PASSWORD || '');
        await page.getByRole('button', { name: 'LOGIN' }).click();
        await page.locator('div').filter({ hasText: /^\$9\.99ADD TO CART$/ }).getByRole('button').click();
        await page.getByRole('link', { name: '1' }).click();
        await page.getByRole('link', { name: 'CHECKOUT' }).click();
        await page.locator('[data-test="firstName"]').fill(process.env.FIRST_NAME || '');
        await page.locator('[data-test="lastName"]').fill(process.env.LAST_NAME || '');
        await page.locator('[data-test="postalCode"]').fill(process.env.POSTAL_CODE || '');
        await page.getByRole('button', { name: 'CONTINUE' }).click();

        await expect(page.locator('#contents_wrapper')).toContainText('Checkout: Overview');
        await expect(page.locator('#shopping_cart_container')).toContainText('1');
        await expect(page.locator('#checkout_summary_container')).toContainText('Item total: $9.99');
        await expect(page.locator('#checkout_summary_container')).toContainText('Tax: $0.80');
        await expect(page.locator('#checkout_summary_container')).toContainText('Total: $10.79');
        await expect(page.locator('#checkout_summary_container')).toContainText('FREE PONY EXPRESS DELIVERY!');
        });    
})