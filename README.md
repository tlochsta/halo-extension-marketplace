# HALO Extension Marketplace

## Extension Terms & Guidelines

Before submitting an extension, please make sure it follows all of the guidelines below. These rules exist to keep the marketplace safe, trustworthy, and useful for everyone.

### 1. Extensions Must Be Meaningful

Extensions should provide a **useful and intentional feature** for users.

Extensions should not be submitted solely to:

* Test the marketplace
* Reserve an extension name or ID
* Add unnecessary functionality
* Spam the marketplace with minor or meaningless variations
* Provide functionality that has no reasonable benefit to users

An extension does not need to be large or complex. **Small extensions are completely fine as long as they have a meaningful purpose.**

### 2. No Malicious Behavior

Extensions must **not contain malicious, deceptive, abusive, or intentionally harmful functionality**.

This includes, but is not limited to:

* Stealing or collecting user information
* Attempting to obtain passwords, tokens, authentication information, or other credentials
* Tracking users without their knowledge
* Sending user data to external services without their knowledge and consent
* Executing unexpected actions on behalf of the user
* Modifying the client in a way that is intentionally harmful, deceptive, or unrelated to the extension's advertised purpose
* Attempting to bypass security or access controls
* Installing or downloading unrelated software or files
* Hiding functionality from the user or marketplace reviewers
* Disguising malicious behavior as legitimate functionality

**Do not assume that something is allowed simply because the extension technically can do it.** Extensions are expected to behave in a way that users would reasonably expect from their description.

### 3. Respect User Privacy

Extensions should collect **as little user information as possible**.

If an extension does not need user data to function, it should not collect it.

Extensions must not:

* Collect personal information unnecessarily
* Collect credentials or authentication tokens
* Monitor user activity without their knowledge
* Send information to third parties without clearly informing the user
* Store user information without a legitimate reason
* Attempt to identify or track users across services

If your extension genuinely needs access to user information, clearly explain **what information is being accessed, why it is needed, and where it goes.**

### 4. External Services and Sources

Extensions should preferably operate without relying on external services whenever reasonably possible.

An extension **must not communicate with an external server, API, website, analytics service, webhook, or other external source without informing the user.**

This includes:

* API requests
* Web requests
* Remote scripts
* Analytics
* Telemetry
* Webhooks
* External databases
* Third-party services

If external communication is necessary, the extension should clearly disclose:

1. **What service is being contacted**
2. **Why it is being contacted**
3. **What information is being sent**
4. **What information is received, when relevant**

Unexpected external communication may result in an extension being rejected.

### 5. No Hidden Functionality

An extension must do what its description says it does.

Do not intentionally hide functionality from users or reviewers.

For example, an extension described as a utility should not secretly:

* Collect unrelated information
* Make unrelated network requests
* Modify unrelated client functionality
* Perform actions unrelated to its advertised purpose

If an extension has advanced or unusual functionality, **document it clearly** rather than hiding it.

### 6. Client Modification and API Scope

Extensions should **stay within the scope of the provided API whenever reasonably possible**.

The API is still relatively new, and we understand that some functionality may not yet be exposed through the API. Because of this, **using functionality outside of the API is not automatically prohibited**.

This rule is intentionally somewhat subjective. The important distinction is **intent, transparency, and scope**.

An extension may need to directly interact with or modify parts of the client for legitimate reasons. For example, a custom theme extension may need to modify client code or styles that are not currently exposed through the API. This can be acceptable when the modification is directly related to the extension's intended purpose.

If your extension needs to operate outside of the API:

* Prefer the official API whenever the functionality you need is available.
* Keep modifications as limited and targeted as reasonably possible.
* Clearly document what parts of the client your extension modifies or interacts with.
* Explain why those modifications are necessary when it is not immediately obvious.
* Make this information clear in the **code and/or extension description**.
* Do not use access outside of the API as an excuse to perform unrelated or hidden functionality.

For example, a theme extension that directly changes client styling may reasonably need to operate outside of the API. That's fine — **users should be able to look at the extension and understand that it modifies the client's appearance and how it does so.**

The goal is not to prevent developers from creating advanced extensions. The goal is to ensure that users **know what an extension is doing to their client and why.**

### 7. No Impersonation or Deception

Extensions must not intentionally impersonate:

* Other extensions
* Developers or users
* Official services
* Marketplace staff
* Other software or organizations

Extension names, descriptions, icons, and functionality should not be designed to mislead users about who created the extension or what it does.

### 8. No Code Obfuscation

**Extensions must not intentionally obfuscate their code.**

Any extension containing intentionally obfuscated code will be **immediately rejected**.

Users should be able to inspect an extension's source code and reasonably understand what they are running on their client. This is especially important for extensions that have access to client functionality, user information, or external services.

Do not use techniques intended to hide what your extension does, such as:

* Intentionally unreadable or heavily transformed code
* Encoding or encrypting source code to conceal its behavior
* Dynamically constructing hidden functionality
* Hiding network requests or data collection
* Concealing client modifications
* Other techniques primarily intended to prevent users or reviewers from understanding the extension's behavior

Minification for legitimate distribution or performance reasons is **not automatically considered obfuscation**, but developers should still avoid making their source unnecessarily difficult to understand.

If your extension contains unusual, complex, or low-level code for a legitimate technical reason, **document what it does rather than hiding it**.

> **Users should be able to know what they are running on their client.**

### 9. Keep Dependencies Reasonable

Extensions should avoid unnecessary dependencies and external code.

If an extension relies on third-party libraries or code, contributors should ensure that:

* The dependency is actually necessary
* It is obtained from a trustworthy source
* It is not being used to introduce unrelated functionality
* Its license permits the intended use

Do not include external code simply because it is convenient if the same functionality can reasonably be implemented within the extension itself.

### 10. No Malicious Updates

These rules apply to **every version** of an extension.

An extension that was previously approved may be removed from the marketplace if a later update introduces malicious, deceptive, or otherwise prohibited behavior.

Changing an extension's version number does not bypass these guidelines.

### 11. Extensions Must Match Their Description

Extensions must accurately represent what they do.

The extension's name, description, tags, and other metadata should not intentionally mislead users.

If your extension has functionality that users may reasonably want to know about before installing it, **disclose it in the description**.

This is particularly important for:

* Client modifications
* External network requests
* Data collection
* Third-party services
* Permissions or capabilities outside the normal API
* Significant changes to the client's behavior

### 12. Extensions May Be Reviewed or Removed

Submitting an extension does not guarantee approval.

The marketplace maintainers may review, reject, request changes to, or remove extensions that:

* Violate these guidelines
* Contain suspicious or unsafe functionality
* Mislead users
* Create unreasonable security or privacy risks
* Are excessively low-quality or meaningless
* Do not behave as described
* Abuse the marketplace or its infrastructure

These guidelines are not necessarily exhaustive. **If something is clearly intended to abuse, deceive, harm, or take advantage of users, it may be rejected even if it is not explicitly listed above.**

Marketplace maintainers may also request clarification about an extension's behavior before approving it.

### 13. Report Suspicious Extensions

If you discover an extension that appears malicious, misleading, or otherwise violates these guidelines, please report it to the marketplace maintainers.

If possible, include:

* The extension name
* The extension ID
* The author's username
* What appears to be wrong
* Any relevant evidence or reproduction steps

Please **do not intentionally run suspicious code just to investigate it further.**

---

By submitting an extension to this marketplace, you agree to follow these guidelines and understand that extensions may be reviewed or removed if they violate them.

---

# Adding Content

Want to publish an extension to the marketplace? Follow the steps below to add a new extension or release a new version of an existing one.

### 1. Create or Navigate to Your Profile

Inside the `extensions` directory:

* If you are a new contributor, create a folder using your `@USERNAME`.
* **Make sure your username has not already been taken.**
* If you have already published an extension, navigate to your existing profile folder.

Your folder structure should look like this:

```text
extensions/
└── @USERNAME/
```

### 2. Create or Navigate to Your Extension

Inside your profile folder, create a new folder for your extension, or navigate to an extension you have already created.

For example:

```text
extensions/
└── @USERNAME/
    └── extension-id/
```

The extension folder can be named whatever you want, but we recommend keeping it short and using the extension's ID.

### 3. Add Your Extension File

Place your `.js` extension file inside the extension folder.

For example:

```text
extensions/
└── @USERNAME/
    └── extension-id/
        └── latest.js
```

You can name the file whatever you want. `latest.js` is recommended for the newest version, but names such as `1.2.0.js` are also fine.

If you are uploading a new version of an existing extension, you can rename older files as needed. For example, you could change:

```text
latest.js
```

to:

```text
1.1.0.js
```

Then add your new version as:

```text
latest.js
```

**If you rename a file, make sure you update its `downloadUrl` in `marketplace.json`.**

### 4. Add Your Extension to `marketplace.json`

> **If you are updating an existing extension, skip to the next section.**

Open `marketplace.json` and add your extension to the list.

Before adding it, make sure:

* Your **extension ID is not already taken**.
* You don't have multiple extensions under the same profile with the same name.
* Your `author` exactly matches the username of your profile folder.

The extension ID is primarily used as an internal reference. **It does not need to match the extension's display name and generally won't be shown directly to users.**

Use the provided template:

```json
{
  "id": "extension-id",
  "name": "ExtensionName",
  "versions": [
    {
      "version": "1.2.0",
      "downloadUrl": "https://raw.githubusercontent.com/tlochsta/halo-extension-marketplace/refs/heads/main/extensions/%40USERPROFILE/EXTENSIONID/FILENAME.js"
    }
  ],
  "description": "Extension Metadata",
  "author": "@AUTHOR",
  "tags": ["tag1", "tag2"]
}
```

Then replace the placeholder values with your extension's information.

#### What each field means

| Field         | Purpose                                                                  |
| ------------- | ------------------------------------------------------------------------ |
| `id`          | Unique identifier for your extension. Make sure nobody else is using it. |
| `name`        | The display name of your extension.                                      |
| `versions`    | A list of all versions you want available in the marketplace.            |
| `version`     | The version number for that specific release.                            |
| `downloadUrl` | The direct **raw GitHub URL** to the `.js` file for that version.        |
| `description` | A short description of what your extension does.                         |
| `author`      | Your `@USERNAME`. This should match your profile folder.                 |
| `tags`        | Short tags describing your extension and its functionality.              |

Please keep your extension metadata clean and concise. **Do not use emojis or excessively long descriptions.** Extensions with excessive or inappropriate metadata may be rejected.

### 5. Add Your Extension Versions

The `versions` array contains every version of your extension that should be available in the marketplace.

For example:

```json
"versions": [
  {
    "version": "1.0.0",
    "downloadUrl": "https://raw.githubusercontent.com/tlochsta/halo-extension-marketplace/refs/heads/main/extensions/%40USERPROFILE/EXTENSIONID/1.0.0.js"
  },
  {
    "version": "1.1.0",
    "downloadUrl": "https://raw.githubusercontent.com/tlochsta/halo-extension-marketplace/refs/heads/main/extensions/%40USERPROFILE/EXTENSIONID/1.1.0.js"
  },
  {
    "version": "1.2.0",
    "downloadUrl": "https://raw.githubusercontent.com/tlochsta/halo-extension-marketplace/refs/heads/main/extensions/%40USERPROFILE/EXTENSIONID/latest.js"
  }
]
```

Add an entry for **every version you want users to be able to download**.

We recommend using standard version numbers such as:

```text
1.0.0
1.1.0
1.2.0
2.0.0
```

Keep version names short and consistent.

The version that points to your current `latest.js` should be your newest release.

### 6. Get the Raw GitHub URL

The `downloadUrl` **must point directly to the raw `.js` file**.

Do not use the normal GitHub file URL.

For example:

```text
https://raw.githubusercontent.com/tlochsta/halo-extension-marketplace/refs/heads/main/extensions/%40USERPROFILE/EXTENSIONID/latest.js
```

To create yours, take the URL from the template and replace:

* `%40USERPROFILE` → your profile folder
* `EXTENSIONID` → your extension folder
* `FILENAME.js` → the exact filename of the version

Make sure the filename and path exactly match the file in your repository.

### 7. Check Your Final Structure

Before creating your pull request, your files should look something like this:

```text
extensions/
└── @USERNAME/
    └── extension-id/
        ├── 1.0.0.js
        ├── 1.1.0.js
        └── latest.js
```

And your corresponding `marketplace.json` entry should reference each version:

```json
{
  "id": "extension-id",
  "name": "My Extension",
  "versions": [
    {
      "version": "1.0.0",
      "downloadUrl": "https://raw.githubusercontent.com/tlochsta/halo-extension-marketplace/refs/heads/main/extensions/%40USERNAME/extension-id/1.0.0.js"
    },
    {
      "version": "1.1.0",
      "downloadUrl": "https://raw.githubusercontent.com/tlochsta/halo-extension-marketplace/refs/heads/main/extensions/%40USERNAME/extension-id/1.1.0.js"
    },
    {
      "version": "1.2.0",
      "downloadUrl": "https://raw.githubusercontent.com/tlochsta/halo-extension-marketplace/refs/heads/main/extensions/%40USERNAME/extension-id/latest.js"
    }
  ],
  "description": "A short description of my extension.",
  "author": "@USERNAME",
  "tags": ["example", "utility"]
}
```

### 8. Create Your Pull Request

Once everything is ready:

1. Make sure your extension files are in the correct directory.
2. Make sure `marketplace.json` is updated if necessary.
3. Check that all `downloadUrl` values point to valid raw GitHub files.
4. Make sure your extension ID and name don't conflict with existing extensions.
5. Commit your changes.
6. Open a **pull request** against this repository.

Please double-check your changes before submitting your PR. Incorrect file paths, invalid metadata, or broken download URLs may cause your extension to be rejected.

### Need Help?

If you have any other questions or run into issues, DM **@tlochsta** on Discord for help.
