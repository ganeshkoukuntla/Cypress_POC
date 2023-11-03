Feature: Chatbot
  
  @askwinterheaven @sanity @regression
  Scenario Outline: Verify that AskWinterHaven chatbot is able to process valid response
    Given launch html - AskWinterHeaven
    And click chatbox
    When Validate chatbox message for <Utterances>
    And close browser

Examples:
    | Utterances |
    | "Illegal Dumping" |
    | "Broken tree" |
    | "Talk to representative" |
    | "Call police" |
    | "Flood in basement area" |
    | "Curbside Code Violation" |
    | "Missed Houshold Yard Waste" |
    | "Missed Household Trash Pickup" |    
    | "Repair trash can" |       
    | "Graffiti on public mall wall" |    
    | "Pothole on main road" |      
    | "Roll Out Cart Request" | 
            
    
    