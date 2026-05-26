Feature: Ecommerce Validations

    Scenario Outline: Validate placing a order
    Given Login with valid credentials of "prince.gupta@gmail.com" and "Prince@123"
    When User add a product in cart "<Product>"
    Then The product should be present in the Cart
    When User checkout and place the order
    Then The product should appear in the Order List

    Examples:
        | Product           |
        | ADIDAS ORIGINAL   |
        | iphone 13 pro     |