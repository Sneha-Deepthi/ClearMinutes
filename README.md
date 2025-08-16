# ClearMinutes 📝✨

AI-powered meeting transcript summarizer with email integration.

## 🚀 Features

-   Paste meeting transcript and generate concise summaries.
-   Add custom summarization instructions (e.g., bullet points, action
    items).
-   Send generated summaries directly via email.
-   Beautiful Tailwind CSS UI with responsive grid layout.
-   Deployed on **Vercel** for instant access.

## 🛠️ Tech Stack

-   **Next.js 14 (App Router)**
-   **Tailwind CSS** for styling
-   **Groq API** (LLM summarization)
-   **Resend** for email sending
-   **Vercel** for deployment

## 📦 Installation

1.  Clone the repository:

    ``` bash
    git clone https://github.com/your-username/clearminutes.git
    cd clearminutes
    ```

2.  Install dependencies:

    ``` bash
    npm install
    ```

3.  Create a `.env.local` file in the root directory:

    ``` env
    GROQ_API_KEY=your_groq_api_key
    RESEND_API_KEY=your_resend_api_key
    ```

4.  Run the development server:

    ``` bash
    npm run dev
    ```

5.  Open <http://localhost:3000> in your browser.

## 🚢 Deployment

Deploy easily on **Vercel**:

``` bash
vercel
```

Or connect your GitHub repo and deploy directly from Vercel Dashboard.

## 🔑 Environment Variables

  Variable           Description
  ------------------ ------------------------------------
  `GROQ_API_KEY`     API key for Groq LLM
  `RESEND_API_KEY`   API key for Resend email service

## 📧 Email Sending

-   By default, **Resend** is recommended (production ready).
  
## 💡 Example Prompt

Transcript:

    We discussed project deadlines. John will finish the frontend by Friday. Sarah will handle backend testing.

Instruction:

    Summarize as action items.

Output:

    - John: Complete frontend by Friday  
    - Sarah: Handle backend testing  

### 👩‍💻 Author

Developed by **Sneha**❤️
