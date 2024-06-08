## Build a basic version of PayTM

This is built from Harikirat's Cohort.

- Other ways to set token instead of **js-cookie** is using localstorage.
    - To set -> localStorage.setItem("token-name", token);
    - To remove -> localStorage.removeItem("token-name");
    - To get -> localStorage.getItem("token-name");
- No real money is mentioned are used. 
- The main purpose to build this is logic behind the **transaction**.
- To implement transaction we use ```session()``` provided by mongoose.