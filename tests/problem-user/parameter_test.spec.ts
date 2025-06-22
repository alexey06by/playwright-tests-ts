import { test,expect } from '@playwright/test';
import { webSiteData } from "../test-data/TestData.ts";

for (const {testName, pageURL} of webSiteData){
    test(`Should load ${testName} page and display website logo`, async({page})=>{
        await page.goto(`https://www.saucedemo.com${pageURL}`);        

        await expect(page).toHaveTitle('Swag Labs');

        const logo = page.locator('.app_logo');
        await expect(logo).toHaveText('Swag Labs');
    });
}


