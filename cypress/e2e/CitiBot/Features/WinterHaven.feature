Feature: Chatbot
  
  @askwinterheaven @sanity @regression
  Scenario Outline: CT-686,CT-679,CT-685,CT-684,CT-683,CT-682,CT-680,CT-681,CT-1062,CT-825,CT-826,CT-827,CT-829,CT-828 Verify that AskWinterHaven chatbot is able to process valid response
    Given launch html - "AskWinterHeaven"
    And click chatbox
    When Validate chatbox message for <Utterances>
    And close browser

Examples:
    | Utterances |
    | "Broken tree" |
            
    
    