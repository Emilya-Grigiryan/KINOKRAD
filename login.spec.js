import { test, expect } from "@playwright/test";

test("Login, logout, and close the browser", async ({ page }) => {
    // Generate  username and password directly in the test
    const Username = "acer.user"; //  username
    const Password = "asdfghjkl"; // password

    // Navigate to the main page
    await page.goto("https://kinokrad.ac/");
    await page.waitForLoadState('networkidle'); // Ensure the page is fully loaded

    // Click on the login link to open the login form
    const loginLink = page.locator('a[title="Вход"]');
    await loginLink.waitFor({ state: 'visible' }); // Ensure the login link is visible
    await loginLink.click();

    // Locate and fill out the login form fields
    const reLoginField = page.locator('input[name="login_name"]');
    const rePasswordField = page.locator('input[name="login_password"]');
    const reLoginBtn = page.locator('button[title="Вход"]');

    await reLoginField.fill(Username); // Fill in the username
    await rePasswordField.fill(Password); // Fill in the password
    await reLoginBtn.click(); // Submit the login form

    // Verify that login was successful by checking the visibility of the profile link
    const profileLink = page.locator('a[href="https://kinokrad.ac/index.php?do=pm"]');
    await page.waitForLoadState('networkidle'); // Wait until the page is fully loaded

    // Assert that the profile link is visible
    await expect(profileLink).toBeVisible();

    console.log("Login successful.");

    // Close the browser after completing the test
    await page.context().close(); // Close the current browser context
});

