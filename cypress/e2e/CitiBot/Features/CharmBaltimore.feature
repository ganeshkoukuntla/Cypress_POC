Feature: Chatbot
  
  @CharmBaltimore @sanity @regression
  Scenario Outline: Verify that Charm Baltimore chatbot is able to process valid response
    Given launch html - CharmBaltimore
    And click chatbox
    When Validate chatbox message for <Utterances>
    And close browser
Examples:
    | Utterances |
    | "No water service" |
    #| "Water Leak" |

      
      
