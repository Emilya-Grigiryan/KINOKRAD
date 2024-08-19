import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    console.log("Starting navigation");
    await page.goto("https://kinokrad.ac/");
});

test("Complete registration with additional fields", async ({ page }) => {
    // Generate random values for the form fields
    const randomUsername = `user${Math.floor(Math.random() * 1000000)}`; // Random username
    const randomPassword = `Pass${Math.floor(Math.random() * 1000000)}!`; // Random password
    const randomEmail = `${Math.floor(Math.random() * 1000000)}@rezka.com`; // Random email
    const randomFullName = `John${Math.floor(Math.random() * 1000)} Doe`; // Random full name
    const randomCity = `New York ${Math.floor(Math.random() * 1000)}`; // Random city
    const randomICQ = Math.floor(100000000 + Math.random() * 900000000).toString(); // Random ICQ number

    // Click on the registration link
    await page.locator('a[href="https://kinokrad.ac/index.php?do=register"]').click();

    // Fill out the first part of the registration form
    const loginFieldById = page.locator("#name");
    const passwordFieldByName = page.locator('[name="password1"]');
    const repeatPasswordFieldByName = page.locator('[name="password2"]');
    const emailFieldByName = page.locator('[name="email"]');

    // Fill the form fields with the generated values
    await loginFieldById.fill(randomUsername);
    await passwordFieldByName.fill(randomPassword);
    await repeatPasswordFieldByName.fill(randomPassword);
    await emailFieldByName.fill(randomEmail);

    // Submit the first part of the registration form
    const submitBtn = page.locator('button[name="submit"].fbutton');
    await submitBtn.click();

    // Wait for the next section of the form to appear
    const nameField = page.locator('input[name="fullname"]');
    const residenceField = page.locator('input[name="land"]');
    const icqField = page.locator('input[name="icq"]');

    await nameField.waitFor({ state: 'visible' });

    // Fill out the additional fields in the registration form
    await nameField.fill(randomFullName);
    await residenceField.fill(randomCity);
    await icqField.fill(randomICQ);

    // Submit the final part of the registration form
    const finalSubmitBtn = page.locator('button[name="submit"].fbutton');
    await finalSubmitBtn.click();

    // Verify registration success (Optional step, depends on website behavior)
    await page.waitForLoadState('networkidle');
    console.log("Registration completed successfully!");
});
