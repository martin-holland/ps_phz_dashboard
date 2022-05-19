# Dashboard

[Live Link](https://embedtest-mh.netlify.app/) - Survey Form
[Link to backend repo](https://github.com/martin-holland/phz_ps_backend) - Firebase Functions
[Link to Dashboard repo](https://github.com/martin-holland/ps_phz_dashboard) - Dashboard
[Testing Repo](https://github.com/a-matta/e2ephz) - End to End Testing Repo, designed to work with Survey Form, backend and Dashboard.

## 1. Project Description

[Net Promoter Score](https://en.wikipedia.org/wiki/Net_promoter_score) that is widely used metric mesurement system that takes a form of single survey question asking customers to rate the likelihood that they would reccommend a company, product or service to a friend or colleague. It measures the loyalty of customers to a company. Scores are measured with a single question survey with number 1-10, a higher score is desirable.

Promoter's Call System allows buisnesses to collect customer feedback and arrive at NPS scores.

### 1.1. Business Vision

Promoter's Call System use their promoter score to measure 'customer satisfaction' & 'loyalty to a brand'. Its useful for organisations to see how customer service is percieved and where improvements might be made.

### 1.2. Task Management

We are using JIRA to manage & track our tasks, issues.

### 1.3. Personas

User research is a first step to creating a persona. By observing users, the team can understand their behavior and motivations, then create a design accordingly.

### 1.4. Use Cases

Customer 1 is asked a simple question how likely are you to reccommend this company to friend or relative?
Not at all likely 0 to extremely likely 10 based on their responses or ratings customes are placed into three categories.
Customer's feedback is expressed their views in their own words.
If 100 people answered the question so 40% - Promoters, 50% Passive and 10% Detractors
NPS = 40%-10%= 30%/100= 30

### 1.5. Non-Functional Requirements

https://wiki.phz.fi/NonFunctionalRequirements

The NPS Calculation Formula

To calculate your Net Promoter Score, subtract the percentage of Detractors from the percentage of Promoters. NPS = % promoters - % detractors. It is that simple. So, if 50% of respondents were Promoters and 10% were Detractors, your Net Promoter is a score of 40.

## 2. Architecture

### 2.1. Technologies

Dev

- React
- CSS
- Firebase
- React ChartJs

CI

- Designed to use Netlify CI

## 3. Development Environment

### 3.1. Prerequisites

- NodeJS 16+
- Visual Studio Code
- Firebase

### 3.2. Start the Application

npm install
npm start

### 3.3. Access the Application

### 3.4. Run Tests

robot -testcasename.robot OR
robot example.robot

### 3.5. IDE Setup and Debugging

Visual Studio Code

### 3.6. Version Control

Survey Form https://github.com/a-matta/phz_ps
Backend https://github.com/martin-holland/phz_ps_backend
Dashboard https://github.com/martin-holland/ps_phz_dashboard
e2e-tests https://github.com/a-matta/e2ephz

### 3.7. Databases and Migrations

Firebase

### 3.8. Continuous Integration

- Currently set up for Netlify with a Netlify TOML file for redirection. This can be found inside the application source folder.

## 4. Staging/Production Environment

### 4.1. Prerequisites

1. Python3 & pip
2. pip install robotframework(5.0)
3. check robot version - robot --version
4. Install relevant browser drive and add to PATH. For example webdrivermanager firefox chrome --linkpath /usr/local/bin

### 4.2. Customizing Tests

The UI tests run with Chrome by default. To run in a different browser ensure the driver is in path and run the tests with variable override. For example to run with firefox use --variable BROWSER:firefox

### 4.3. Smoke Tests

1. Login to dashboard.
2. Check if filtering of dates works.
3. Check if reset of dates works.
4. Check if data is seen in descending order.

#### 4.3.1. Automated Test Cases

1. User can login and view dashboard.
2. Filter and view dates.

#### 4.3.2. Manual Test Cases

Browser : Edge, Chrome, Safari & Firefox.

1. Launch Dashboard at https://promoterscore-tg.netlify.app
2. Add valid username/password, Login works sucessfully
3. Add invalid username/password, Login should not work, user cannot view dashboard
4. Check if messages appear is descending order, messages are seen in descending order
5. Check if logout button is working, logout button works
6. Check if theme works, theme works
7. Check if filter works with future dates & past dates
   There are known issues for responsiveness.

### 4.4. Rollback

User can reset database from firebase => Go to Firebase Promoter project and Firestore database and in survey_results => delete collection.
WARNING! if survey results are deleted, all test data will be deleted permenently.

### 4.5. Logs

![Screenshot of the application](./Screenshot.png)
![Screenshot of the application](./Screenshot1.png)

## 5. Operating Manual

## 6. Problems

### 6.1. Environments

### 6.2. Coding

### 6.3. Dependencies

Add here TODO and blockers that you have found related to upgrading to newer versions.
List the library/framework/service, version, and then the error message.
