// @ts-check
const { test, expect } = require('@playwright/test');
const { equal } = require('assert');
test.beforeEach ('Navigating to Revenue page', async ({ page }) => {
  await page.goto('https://www.fitpeo.com/');
  await page.getByRole('link', { name: 'Revenue Calculator' }).click();
});
test.afterEach ('Closing Browser', async ({ page }) => {
  await page.close();
});
test('Adjust the Slider', async ({ page }) => {
//scroll to view the slider
  await page.locator("//div[@class='MuiBox-root css-19zjbfs']").first().scrollIntoViewIfNeeded();
  await page.waitForSelector("//span[@class='MuiSlider-rail css-3ndvyc']");
  //Adjust slider
  const slider = await page.$("//span[@class='MuiSlider-rail css-3ndvyc']");
  let ele = page.getByRole('spinbutton');
  const targetAmount = '810';
  let isCompleted = false;
    let i=1;
   if(slider){
    while (!isCompleted){
      let srcBound = await slider.boundingBox();
      if(srcBound){
        await page.mouse.move(srcBound.x+ i, srcBound.y + srcBound.height /2);
        await page.mouse.down();
        await page.mouse.up();
        i++;
        let text = await page.getByRole('spinbutton').inputValue();  
        if ( text==targetAmount)
          {
          isCompleted = true;
        }
      }
    }
 
  }
  await expect(page.getByRole('spinbutton')).toHaveValue('810');
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('560');
  const NoOfPatients = page.getByRole('spinbutton');
  await expect(NoOfPatients).toHaveValue('560');
});
test('Validate Total Recurring Reimbursement', async ({ page }) => {
  await page.locator("//div[@class='MuiBox-root css-19zjbfs']").first().scrollIntoViewIfNeeded();
  await page.waitForSelector("//span[@class='MuiSlider-rail css-3ndvyc']");
 await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('820');
  await page.locator("//p[text()='CPT-99091']//parent::div//input[@type='checkbox']").check();
  await page.locator("//p[text()='CPT-99453']//parent::div//input[@type='checkbox']").check();
  await page.locator("//p[text()='CPT-99454']//parent::div//input[@type='checkbox']").check();
  await page.locator("//p[text()='CPT-99474']//parent::div//input[@type='checkbox']").check();
  await expect(page.locator("//p[@class='MuiTypography-root MuiTypography-body1 inter css-12bch19']").last()).toHaveText('$110700');
 
});




