## Build a basic version of PayTM

This is built from Harikirat's Cohort.

- Other ways to set token instead of **js-cookie** is using localstorage.
    - To set -> localStorage.setItem("token-name", token);
    - To remove -> localStorage.removeItem("token-name");
    - To get -> localStorage.getItem("token-name");
- No real money is mentioned are used. 
- The main purpose to build this is logic behind the **transaction**.
- To implement transaction we use ```session()``` provided by mongoose.

# To make it run on your machine using docker
- Navigate to root directory.
- Build docker - ```docker build ./ -t paytm-clone-replset```
- Run docker image - ```docker run --name paytm-test-1 -p 27017:27017 -d paytm-clone-replset```

- Now to run **Frontend** navigate your path to frontend then.
    - ```npm install```
    - ```npm run dev```
- **Backend**
    - ```npm install```
    - ```nodemon index.js```


To run docker properly follow this Notion page : ([Docker-Notion-Page](https://warp-comb-722.notion.site/Paytm-clone-successfully-running-steps-f505921264cd413397b34f9f43ec51d2?pvs=4))