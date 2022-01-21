# Vrede Compagnion App
Pronounciation: /vreːdə/

## What is it
Vrede is a hybrid game, combining the best elements of the popular strategy games of Risk and Catan. It takes element of strategic warfare from Risk, and combines it with the resource gathering and city building from Catan. 

The full proposed rules can be viewed here:
[Vrede Game - Rules](https://docs.google.com/document/d/1x7HAVB5mqjzxy27YdWaZ6VnHtTOtj3hEtrUC2CYui1c/edit?usp=sharing)



## What is this app about
The Vrede compagnion app is intended to help with two key aspects of the game: Fighting and Event Cards.

The app can be access from here:
[Vrede Compagnion App](https://vrede.herokuapp.com/)

**NOTE** this app does not store ANY cookies. Meaning that if you change settings, and refresh the page, they will reset to default (see below) 

## How does the fighting work
Fighting aims to simulate the randomized dice fighting from the Risk games. In principle, the amount of armies you attack with corresponds to the dice that are simulated. Same for defense. 

### Fight Settings
Under the settings button, you can choose how the fight should be simulated. There are 2 key settings. These Fight modes change how the battle is simulated. 

#### Skirmish
Skirmish is an all out battle. You get the number of dice according to your attack strength. So if you have 100 armies attacking, the app will simulate 100 roll of the dice. Same for defense. 

#### Risk (3 Dice)
Risk-Battle Mode aims to replicate the typical Risk battle, where you can only attack with 3 armies *at a time* and defend with 2. Of course, as in the Game, you can run multiple waves of 3-army attacks. But attacking with 100 armies would mean 33 possible 3 army attacks. This is where the *Repeat Attack* option comes in handy

#### Repeat Attack
This checkbox changes how often you attack. If unchecked, the attacker attacks once, and either wins the territory, or has to retreat if the defense wins. The attacker (per game rules) can then decide to attack again or cut their losses. 
When the option is checked (by default), the app will simulate repeated waves until either the defender is defeated, or the attack is out of armies. Therefore it can happen that a 100 strong attacking army is decimated to 0 by a defending force of half the size. Use with caution!

#### Default Settings
By default, the mode is set to *Skirmish* and *Repeated Attacks*. This can be changed when clicking on the gear icon. **NOTE** that this app does not use cookies at all. So if you refresh the side after changing the settings, it will return to default. For your convenience, the top part always lists the current settings.