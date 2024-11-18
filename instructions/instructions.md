# Instructions for Vatly docs

## Project overview

Your goal is to build a next.js app that allows users to get started with (Vatly)[https://vatly.com] a platform that enables EEA based SAAS to sell worldwide. This app serves all documentation for Vatly, including the API specifications, guides and instructions for using the app. Also references to SDKs and plugins will be included. On production it will be reachable on docs.vatly.com.

You will be using Next.js to build the app, with Tailwind CSS for styling and MDX for writing the documentation.

We take the Vatly template from TailwindUI as a starting point and build on it.


## Core functionalities

### Use Vatly branding
    - The full brand guide is located at `./instructions/Vatly_brandguide6.pdf`
    - Uses Vatly blue logo in light mode, light logo in dark mode. SVG.
    - Uses Vatly colors, can also be configured on tailwind.config.js:
        - Primary:
            - White #ffffff
            - Blue #326bff
            - Black #161616
        - Secondary:
            - Light blue: #ECEFFF
            - Sky Blue: #8DB3FE
            - Light Gray: #f7F7F7
            - Gray: #ECEFFF
    - Uses Vatly font: Poppins
    - Replace all references to "Vatly" with "Vatly"

    
- SEO optimized
- Use environment file to capture absolute urls like support.vatly.com and my.vatly.com.
- Update existing pages and navigation:
    - Guides:
        - Introduction:
            - Guides
            - Resources
        - Quickstart:
            - Choose your client
            - Make your first request
            - What's next?
        - SDKs
        - Authentication
        - Pagination
        - Errors
        - Webhooks
        - Changelog
    - Resources:
        - Contacts
        - Conversations
        - Messages
        - Groups
        - Attachments
 - Update social media links:
     - X: @vatlyOfficial https://x.com/VatlyOfficial
     - GitHub: https://github.com/GetVatly
-    - Discord: https://discord.gg/Vw3FtsaetW, comment this out for now.
- Feedback buttons "Was this page helpful?  Yes/no": comment this out for now.
- Support navigation item points to "https://support.vatly.com" in new window.
- "Sign in" navigation item points to "https://my.vatly.com" in new window.
 
 
 ## Important implentation notes
 
 - Any endpoint should be covered in tests.
 - Use environment file to capture absolute urls like support.vatly.com and my.vatly.com.