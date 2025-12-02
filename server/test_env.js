require('dotenv').config();

console.log("Checking environment variables...");
console.log("SES_SMTP_USER is set:", !!process.env.SES_SMTP_USER);
console.log("SES_SMTP_PASS is set:", !!process.env.SES_SMTP_PASS);
console.log("PORT is set:", !!process.env.PORT);

if (!process.env.SES_SMTP_USER || !process.env.SES_SMTP_PASS) {
    console.error("ERROR: Missing SMTP credentials in .env file");
} else {
    console.log("SUCCESS: Environment variables appear to be set.");
}
