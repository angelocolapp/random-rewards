-- Schema.sql

-- Table "Users" stores user information
CREATE TABLE Users (
  id SERIAL PRIMARY KEY, -- Unique identifier for the user
  name VARCHAR(255) NOT NULL, -- User's name
  email VARCHAR(255) NOT NULL, -- User's email address
  password VARCHAR(255) NOT NULL, -- User's password
  dateOfBirth DATE NOT NULL, -- User's date of birth
  cpf VARCHAR(14) NOT NULL, -- User's CPF (Brazilian ID)
  phoneNumber VARCHAR(20) NOT NULL, -- User's phone number
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of when the user was created
);

-- Table "Purchases" stores information about user purchases
CREATE TABLE Purchases (
  id SERIAL PRIMARY KEY, -- Unique identifier for the purchase
  userId INTEGER REFERENCES Users(id), -- Reference to the user who made the purchase
  purchaseDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of when the purchase was made
  numberOfNumbers INTEGER NOT NULL, -- Number of numbers purchased
  totalValue DECIMAL(10, 2) NOT NULL, -- Total value of the purchase
  paymentStatus VARCHAR(50), -- Payment status of the purchase
  paymentMethod VARCHAR(50), -- Payment method used for the purchase
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of when the purchase was created
);

-- Table "Draws" stores information about the draws
CREATE TABLE Draws (
  id SERIAL PRIMARY KEY, -- Unique identifier for the draw
  drawDate TIMESTAMP, -- Date and time of the draw
  status VARCHAR(50), -- Status of the draw
  results TEXT, -- Results of the draw
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of when the draw was created
);
-- Table "Numbers" stores the purchased numbers and their relation to a draw
CREATE TABLE Numbers (
  id SERIAL PRIMARY KEY, -- Unique identifier for the number
  purchaseId INTEGER REFERENCES Purchases(id), -- Reference to the purchase that includes the number
  drawId INTEGER REFERENCES Draws(id), -- Reference to the draw that the number is associated with
  value INTEGER NOT NULL, -- The value of the number
  drawStatus VARCHAR(50), -- Status of the number in the draw
  drawResult VARCHAR(50), -- Result of the number in the draw
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of when the number was created
);

