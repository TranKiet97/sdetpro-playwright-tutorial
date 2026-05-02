# WebDriver Protocol

## Overview

WebDriver is a W3C standard for automating web browsers, providing a common API for controlling browsers across different platforms without modification.

## Key Concepts

### Architecture

- **Client-Server Model**: Commands flow from client to server, which interacts with the browser
- **JSON Wire Protocol**: Defines endpoints and commands for browser communication

### Browser Integration

- **Driver Implementations**: Each browser has dedicated drivers (ChromeDriver, GeckoDriver, etc.)
- **Native Bridge**: Drivers connect WebDriver API to browser automation capabilities

### Core Features

- **Element Interaction**: Click, type text, retrieve page data
- **Navigation & Cookies**: Full page and session management
- **Locators**: ID, name, class, CSS selectors, XPath
- **Smart Waits**: Handle synchronization and timing issues
- **Cross-Browser Testing**: Single test suite runs on Chrome, Firefox, Safari, etc.

### Integration & Reporting

- Compatible with JUnit, TestNG, NUnit for structured test organization
- Enables maintainable test suites with built-in reporting

## Trade-offs

⚠️ **Limitations**: Performance constraints, limited support for advanced browser features, and complex user interaction scenarios may require additional tooling.

# DevTools Protocol - Cypress, Playwright, Puppeteer

## Overview

The DevTools Protocol is a low-level API for controlling Chrome and Chromium-based browsers, providing access to browser internals for debugging, performance monitoring, and automation.

## Key Concepts

#### Architecture

- **Direct Browser Control**: Communicates directly with the browser, bypassing WebDriver
- **WebSocket Communication**: Uses WebSockets for real-time interaction with the browser

#### Core Features

- **Advanced Debugging**: Access to JavaScript execution, network monitoring, and performance metrics
- **Headless Automation**: Run browsers without a GUI for faster execution
- **Custom Automation**: Allows for more complex interactions and control over browser behavior

### Use Cases

Performance testing, network analysis, and scenarios requiring deep browser integration

## Trade-offs

⚠️ **Complexity**: Requires in-depth knowledge of browser internals; may not suit all automation needs, especially cross-browser testing.

# Timeouts

- **Implicit Waits**: Set a default wait time for element searches (WebDriver)
    ```typescript
    // Playwright sets implicit waits via navigationTimeout or actionTimeout in playwright.config.ts
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.locator('selector').click({ timeout: 10000 });
    ```
- **Explicit Waits**: Wait for specific conditions before proceeding (WebDriver)
    ```typescript
    // Playwright uses expect with timeout for explicit waits
    await expect(page.locator('selector')).toBeVisible({ timeout: 10000 });
    ```
- **Fluent Waits**: Customizable wait with polling intervals (WebDriver)
    ```typescript
    // Playwright does not have a direct equivalent, but you can implement custom polling
    const timeout = 10000;
    const pollingInterval = 500;
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      try {
        await expect(page.locator('selector')).toBeVisible();
        break; // Element is visible, exit loop
      } catch (error) {
        await page.waitForTimeout(pollingInterval); // Wait before retrying
      }
    }
    ```
- **Action Timeouts**: Set time limits for specific actions (DevTools Protocol) -> it is configured in the `playwright.config.ts` file with `actionTimeout` property.
- **Global Timeouts**: Set a maximum time for test execution (DevTools Protocol) -> it is configured in the `playwright.config.ts` file with `timeout` property.

# Locators
- built-in locators: Playwright provides a variety of built-in locators such as `page.locator()`, `page.getByRole()`, `page.getByText()`, etc., which allow you to easily find elements on the page using different strategies.
- custom locators: You can also create custom locators using CSS selectors, XPath, or other strategies to target specific elements on the page based on web attributes or custom web attributes (`data-*` attributes).

# Methods note
1. txtContent vs innerText:
- `textContent`: Returns the text content of an element, including hidden text and text from child elements.
- `innerText`: Returns the visible text content of an element, excluding hidden text and text from child elements. It also normalizes whitespace and line breaks.
- example:
    ```html
    <div id="example">
      <p>This is <span style="display:none">hidden</span> text.</p>
    </div>
    ```
    ```typescript
    const element = page.locator('#example');
    const textContent = await element.textContent();
    const innerText = await element.innerText();
    ```
2. expect vs assert:
- `expect`: Used for making assertions in a more readable and expressive way. It provides a fluent API for chaining assertions and is commonly used in testing frameworks like Jest and Playwright.
- `assert`: A more traditional assertion style that is often used in testing frameworks like Chai and Node.js's built-in `assert` module. It typically throws an error when an assertion fails.
- example:
    ```typescript
    // Using expect
    expect(value).toBe(expectedValue);
    
    // Using assert
    assert.strictEqual(value, expectedValue);
    ```
3. looping through elements:
- Playwright provides methods like `locator.all()` to retrieve multiple elements and loop through them using JavaScript's array methods.
- Using `for...of` loop:
    ```typescript
    const elements = await page.locator('.items').all();
    for (const element of elements) {
      const text = await element.textContent();
      console.log(text);
    }
    ```

# Page Object Model
1. POM is a mechanism that convert a page or a part of page into a class in programming to manage selectors and to reuse interaction methods, if it is any changes in source code, we just optimize scripts in one place