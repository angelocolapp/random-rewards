Yeah, so basically, this is a application in development, the use for this is to sell random numbers for prize draws;

The goal is to make a system that allows to create a kind of "raffle", with one or more prizes to be drawn

The number system should work in two ways:
    1. The prize drawn has a limited amount of numbers, where the bought number should be generated randomly choosing a number available inside a list of numbers
    2. The prize drawn don't have a specified limit of numbers, the numbers must be bought and distributed sequencially.

System flow should be:

    Ticket buyer:
        opens the webApp, receive a list of availables raffles, choose one, see the infos about the raffle
        he/she receive 3 packages of tickets to buy
            1 single ticket, with the full price
            10 tickets, 10% cheaper
            20 tickets, 20% cheaper
        
        One of the packs is choosen;
        A check-out screen is shown, so the user can register in the system, that should be integrated with Colapp Registration and Payment Method
        The user fill their info, and a Colapp Registration is made, at the end of the registration, the user receives a qrcode to be paid with their bank application/Colapp.
        
        When the payment is made, the user should receive their tickets.

    Raffle owner:
        Open the webApp, and log-in their account
            their pannel should have the options to create a new raffle and check the ones that he have created already

