Feature: Chatbot
  
  @askwinterheaven @sanity @regression
  Scenario Outline: Verify that AskWinterHaven chatbot is able to process valid response
    Given launch html - AskWinterHeaven
    And click chatbox
    When Validate chatbox message for <Utterances>
    And close browser

Examples:
    | Utterances |
    | "Broken tree" |
    | "Talk to representative" |
            
    
    