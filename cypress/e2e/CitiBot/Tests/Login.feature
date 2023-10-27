Feature: Login to the Citibot Application
I want to login to the citibot Application

Scenario: Verifying the citibot Login

Given Open the citibot url
When I enter username and password
And click on login button
Then verify the Citibot homepage
And Logout from citibot