import { test, expect } from '@playwright/test';
import dotenv from 'dotenv'
dotenv.config()

test.describe('Checkout:Overview page', async ()=>{
    test('Shoud finish checkout', async ({ page }) => {
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
        await page.getByRole('link', { name: 'FINISH' }).click();
        
        await expect(page.locator('#contents_wrapper')).toContainText('Finish');
        await expect(page.getByRole('heading')).toContainText('THANK YOU FOR YOUR ORDER');
        await expect(page.locator('#checkout_complete_container')).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        await expect(page.locator('#checkout_complete_container').getByRole('img')).toBeVisible();
    });
})