import { test as base} from '@playwright/test';

function testIdGenerator (min:number, max:number): number {
    let rand = min + Math.random() * (max + 1 - min);
    let randomId = Math.floor(rand);
    console.log(`Added item with test ID: ${randomId}`);
    return randomId;
}
export const test = base.extend<{randomItem: string}>({
    randomItem: async({}, use) => {
        const randomItem = `#item_${testIdGenerator(0,5)}_title_link`;
        await use(randomItem);
    }
})