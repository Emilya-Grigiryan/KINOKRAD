import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    console.log("Starting navigation");
    await page.goto("https://kinokrad.ac/");
});

test("Complete registration, login, logout, and re-login with additional fields", async ({ page }) => {
    await page.locator('a[href="https://kinokrad.ac/index.php?do=register"]').click();

    // Fill out the first part of the registration form
    const loginField = page.locator('//td[contains(., "Логин:")]/following-sibling::td/input[@name="name"]');
    const passwordField = page.locator('//td[contains(., "Пароль:")]/following-sibling::td/input[@type="password"]');
    const repeatPasswordField = page.locator('//td[contains(., "Повторите пароль:")]/following-sibling::td/input[@name="password2"]');
    const emailField = page.locator('//td[contains(., "Ваш E-Mail:")]/following-sibling::td/input[@name="email"]');

    await loginField.fill("randomUser2024");
    await passwordField.fill("NewPassw0rd!");
    await repeatPasswordField.fill("NewPassw0rd!");
    await emailField.fill("randomuser2024@example.com");

    const submitBtn = page.locator('button[name="submit"].fbutton');
    await submitBtn.click();

    // Wait for the next section to appear
    const nameField = page.locator('//td[contains(., "Ваше Имя")]/following-sibling::td/input[@name="fullname"]');
    const residenceField = page.locator('//td[contains(., "Место жительства")]/following-sibling::td/input[@name="land"]');
    const icqField = page.locator('//td[contains(., "Номер ICQ")]/following-sibling::td/input[@name="icq"]');

    await nameField.waitFor({ state: 'visible' });

    // Fill out the new section of the form
    await nameField.fill("John Doe");
    await residenceField.fill("New York");
    await icqField.fill("987654321");

    const finalSubmitBtn = page.locator('button[name="submit"].fbutton');
    await finalSubmitBtn.click();

    // Check if login was successful
    await page.waitForLoadState('networkidle'); // Wait until the page is fully loaded
    const profileLink = page.locator('a[href="https://kinokrad.ac/index.php?do=pm"]');

    // Use if-else to verify if the profile link is visible
    const isProfileLinkVisible = await profileLink.isVisible();
    if (isProfileLinkVisible) {
        console.log("Profile link is visible. Proceeding with logout.");
    } else {
        console.log("Profile link is not visible. Check if login was successful.");
        await expect(profileLink).toBeVisible(); // Handle the error if the element is not visible
        return; // Exit the test if the element is not visible
    }

    // Logout from the account
    const logoutBtn = page.locator('a[href="https://kinokrad.ac/index.php?action=logout"]');
    await logoutBtn.click();

    // Wait for the "Login" link to appear after logout
    const loginLink = page.locator('a[title="Вход"]');
    await loginLink.waitFor({ state: 'visible' });

    // Click on the "Login" link
    await loginLink.click();

    // Re-login
    const reLoginField = page.locator('input[name="login_name"]');
    const rePasswordField = page.locator('input[name="login_password"]');
    const reLoginBtn = page.locator('button[title="Вход"]');

    await reLoginField.fill("randomUser2024");
    await rePasswordField.fill("NewPassw0rd!");
    await reLoginBtn.click();

    // Wait for the new section to appear after re-login
    await page.waitForLoadState('networkidle'); // Wait until the page is fully loaded
    await expect(profileLink).toBeVisible();

    console.log("Test completed successfully.");
});
