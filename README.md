Yeah, so basically, this is a application in development, the use for this is to sell random numbers for prize draws;

The goal is to make a system that allows to create a kind of "raffle", with one or more prizes to be drawn

The number system should work in two ways:
    1. The prize drawn has a limited amount of numbers, where the bought number should be generated randomly choosing a number available inside a list of numbers
    2. The prize drawn don't have a specified limit of numbers, the numbers must be bought and distributed sequencially.

System flow should be:
    For raffle creators:
        1.The user registers on the site and creates an account.
        2.The user selects the option to create a new raffle.
        3.The user fills in the raffle information, such as value per number, percentage reverted to the system owner, maximum number of numbers (if any), draw date or option to automatically draw when all numbers are sold.
        4.The raffle is created and becomes available for other users to buy numbers.
    For raffle number buyers:
        1.The user registers on the site and creates an account.
        2.The user browses the available raffles and chooses one to participate in.
        3.The user fills in their personal information, such as name, phone number, date of birth, CPF, email, hometown and UF.
        4.The user selects the number of numbers they want to buy (a single number or packages of 5/10/20 numbers) and makes the payment.
        5.The user receives confirmation of the purchase and waits for the draw.
