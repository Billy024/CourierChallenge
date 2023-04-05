# Courier Challenge
This is a simple console log application that prompts user to input on delivery, packages & vehicles and returns cost, discount & delivery time estimation

## Installation
You need to have NPM (built on version 6.14.18) & Node (built on version v14.21.3) installed on your machine

### To install the required dependencies, run: 
npm i

### Then, run the following command to start the application: 
npm start

### To run the test scripts, run the following command:
npm test

## Usage
### The following type of prompts will appear on your screen in sequence
##### ?Delivery Cost & Quantity     
##### ?Package Details & Offercode
##### ?Vehicle Details            

### Provide input in the following format for the prompt respectively 

#### base_delivery_cost no_of_packges   
#### pkg_id pkg_weight_in_kg distance_in_km offer_code
#### no_of_vehicles max_speed max_carriable_weight

#### * make sure to provide space in between the above input parameters

### The output will be in the following format
#### pkg_id discount_amount total_cost estimated_delivery_time


## Code Structure
### The code is structured into mainly two files:
#### app.js        : This file calls the startApplicationController which starts the console application for you
#### offerCodes.js : This file contains the available offer codes and is extensible to add new offer codes

## License
This project is licensed under the MIT License. See the LICENSE file for more information.

### This project was done in line to solve the Courier Challenge of Everest Engineering
![image](https://user-images.githubusercontent.com/70306828/230071795-f684d24a-0d30-417a-a134-7fc9a9d01eb1.png)
