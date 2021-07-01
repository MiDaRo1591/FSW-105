/*
The year is 1985. Your job is to build a text-based (console) RPG game.

Project Requirements:
Console must greet player with a fun message
Console must ask for the player's name and store it
Walking:
The console will ask the user to enter a "w" to walk
Every time the player walks, a random algorithm will be run that determines if a wild enemy has appeared (A 1/3 or 1/4 chance of being attacked)
If a wild enemy appears:

The enemy is random (can be chosen out of a minimum of 3 different enemy names)
The user can decide to attack or run
If attacking, you will choose a random attack power between a min and max
If running, you will choose a random number between 1 and 2 - meaning a 50% chance of escaping
After the player attacks or runs the enemy attacks back for a random damage amount
If the player kills the enemy you can give the Player some HP and a special item that is stored in the inventory
If the enemy kills the player the console prints a cool death message and the game ends
Inventory

When the player kills enemies, they are awarded with items
If the user enters 'Print' in the console, the console will print the players name, HP, and each item in their inventory
*/
const readline = require("readline-sync");

///////////////////////////////////////////////////////////////////////
// Defign the variables to be used ////////////////////////////////////
///////////////////////////////////////////////////////////////////////

console.log(``); // space the top of the game
console.log(`Welcome to pesants destiny!`); // first part of Intro before name is given
const sName = readline.question("What is your name? "); // Input the Hero's name

var iMiles= 10; // The miles between the village and the local lord
var iHitMax = 5; // This is the maximum health of our hero
var iHitPoints = 5; // This is the current health of our hero

var iRandom; // Placeholder for a random number

var sMob; // String for mob name
var iEnemyHp = 0; // int for mob current health
var iEnemyMax = 0; // int for mob max heath

var sMenuTravel = // While traveling this is the menu to display
`_________________________________________________________
|  Character: ${sName}
|  Health: `+iHitPoints+`/`+iHitMax+`
|  Weapon: Pitchfork
|  Distance: `+iMiles+`
|_________________________________________________________
(W)alk forward                                 (Q)uit Game
`;

var sMenuCombat = // While in combat this is the menu to display
`_________________________________________________________
|  Character: `+sName+`            Monster : `+sMob+`
|  Health: `+iHitPoints+`/`+iHitMax+`                 Health : `+iEnemyHp+`/`+iEnemyMax+`
|  Weapon: Pitchfork           Weapon : Branch
|  Distance: `+iMiles+`                Distance : 0
|_________________________________________________________
(A)ttack              (R)un Away               (Q)uit Game
`;

var aMob = // This is the array for monster types
[
    {HP: 4, Name: "Kobold"}, // 0
    {HP: 6, Name: "Goblin"}, // 1
    {HP: 8, Name: "Gnoll"},  // 2
    {HP: 10, Name: "Orc"}    // 3
];

var aDead = // When you die, you will get one of these messages
[
    {string: ` explodes into red paste, chunks of bloody flesh cover the trees and rocks, leaving nothing behind but worn out pants.`},
    {string: ` lays convulsing on the floor coughing and bleeding, grabbing at the air in a very overly dramatic fassion.`},
    {string: ` has died. Avenged by your pinky however, when it get's stuck, and the ${sMob} chokes to death on it.`},
    {string: ` is torn limb from limb and devoured. After the snack, the ${sMob} skips rope with your intestines for fun.`},
    {string: ` screams like a twelve year old girl and soils themselves. The ${sMob} is disturbed by your dieing like a wuss.`},
    {string: ` dies.`}
];

///////////////////////////////////////////////////////////////////////
// Defign the Functions to use ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


// Since there will be so, so many times that we need a random number of various amounts
// I threw a random number genergarter together.
function Random(iMin = 0, iMax = 1)
{
    iMin = Math.ceil(iMin); // The value is no lower than iMin
    iMax = Math.floor(iMax); // The value is no higher than iMax
    return Math.floor(Math.random() * (iMax - iMin + 1)) + iMin; // return the random number
}

function iTravel() // Set for a quick button prompt when traveling
{
    iMiles = iMiles - 1; // Remove part fo the distance to travel
    iRandom = Random(1, 3)
    if(iRandom == 1) // You have a 1 in 3 chance to encounter a mob
    {
        iRandom = Random(0, 3); // Monster is deturmined at random
        sMob = aMob[iRandom].Name; // Fill string for monster name
        iEnemyHp = aMob[iRandom].HP; // Fill int for mob current health
        iEnemyMax = aMob[iRandom].HP; // Fill int for mob maximum health
        console.log("Wild "+aMob[iRandom].Name+" appears!");
        DisplayMenu(1); // Prints out the combat window
    }
    else // If you manage to evade combat, then reprint the travel window
    {DisplayMenu(0);}
}



function iCombat() // Setup for a quick button prompt when fighting
{
    iRandom = Random(1, 6); // First phase of combat, player making an attack on the mob, damage is 1d6
    iEnemyHp = iEnemyHp - iRandom; // apply damage
    console.log(`${sName} inflicts `+iRandom+` damage to ${sMob}`);// log what is happening

    if(iEnemyHp > 0) // If the mob is still alive, then it will attack back
    {
        iRandom =  Random(0, 5);// Second phase of combat, mob attacks back, damage is 1d6-1 (Yes, they can inflict 0 damage.)
        console.log(`${sMob} inflicts `+iRandom+` damage to ${sName}`); // log what is happening
        iHitPoints = iHitPoints - iRandom; // apply damage

            if(iHitPoints < 0) // While in phase two if the player dies give them a death string
            {
                iRandom = Random(0, 6); // This will pick one of the death strings
                console.log(sName+aDead[iRandom].string); // log what is happening
            }

            else // While in phase two if the player lives, reload combat screen
            {DisplayMenu(1);}
    }
    else // If the mob has died, then you are free to press on.
    {
        console.log(`You have slain the ${sMob}!`);

        iRandom =  Random(1, 4); // Slaying a mob let's you earn back 1d4 hit points
        iHitPoints = iHitPoints + iRandom; // Appy said randome hit points
            if(iHitPoints > iHitMax){iHitPoints = iHitMax;} // But you can't go over your max.
        console.log(`After bandaging your wounds, you press on.`); // Just so the player knows they healed a small amount.
        console.log(`${sName} heals for `+iRandom+` damage.`);
        DisplayMenu(0);
    }
}



function iRun()
{
    iRandom = Random(1, 4); // Roll 1d4, the outcome desides how the run option go's.

    if(iRandom == 1 || iRandom == 2) // Rolling a 1 or 2 and you escape from combat unharmed.
    {
        console.log(`You have escaped the ${sMob} unharmed.`);
        iEnemyHp = 0; // Set the mob HP to 0 to exit combat and allow walk options.
        // At this point you would heal a small amount, but since you ran you do not heal.
        DisplayMenu(0);
    }

    if(iRandom == 3) // If you roll a 3 you manage to escape, but your hurt in the process.
    // So not only do you not heal after combat, you make off worse then before.
    // Fortune favors the bold!
    {
        iRandom =  Random(0, 5);// mob attacks, damage is 1d6-1 (Yes, they can inflict 0 damage here as well.)
        console.log(`${sMob} inflicts `+iRandom+` damage to ${sName}`); // log what is happening
        iHitPoints = iHitPoints - iRandom; // apply damage

        console.log(`You have escaped the ${sMob} but are hurt in the process.`);
        iEnemyHp = 0; // Set the mob HP to 0 to exit combat and allow walk options.

            if(iHitPoints < 0) // Like phase 2 of combat, there is a chance the player can die here.
            {
                iRandom = Random(0, 6);
                console.log(sName+aDead[iRandom].string);
            }

            else // At this point the player has taken damage but is still alive and able to travel.
            {DisplayMenu(0);}
    }
    if(iRandom == 4) // If you roll a 4 you do not manage to escape, and are hurt in the process, double wammy.
    {
        iRandom =  Random(0, 5);
        console.log(`${sMob} inflicts `+iRandom+` damage to ${sName}`);
        iHitPoints = iHitPoints - iRandom;
        console.log(`You try to escaped the ${sMob} but are unable to avoid combat.`);

            if(iHitPoints < 0)
            {
                iRandom = Random(0, 6);
                console.log(sName+aDead[iRandom].string);
            }
            else
            {DisplayMenu(1);}
    }
}

function DisplayMenu(iDisplay)
{
    if(iDisplay = 0)
    {
sMenuTravel = // While traveling this is the menu to display post it here to get updates to appear.
`_________________________________________________________
|  Character: ${sName}
|  Health: `+iHitPoints+`/`+iHitMax+`
|  Weapon: Pitchfork
|  Distance: `+iMiles+`
|_________________________________________________________
(W)alk forward                                 (Q)uit Game
`;
    console.log(sMenuTravel);
    }

    if(iDisplay = 1)
    {
sMenuCombat = // While in combat this is the menu to display, post it here to get updates to appear.
`_________________________________________________________
|  Character: `+sName+`            Monster : `+sMob+`
|  Health: `+iHitPoints+`/`+iHitMax+`                 Health : `+iEnemyHp+`/`+iEnemyMax+`
|  Weapon: Pitchfork           Weapon : Branch
|  Distance: `+iMiles+`                Distance : 0
|_________________________________________________________
(A)ttack              (R)un Away               (Q)uit Game
`;
    console.log(sMenuCombat);
    }  
    
    else
    {
    console.log("Display Error");
    }
}

///////////////////////////////////////////////////////////////////////
// Start the actual Game here /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

console.log(`${sName}, your village is under attack by a horde of monsters, you must reach the castle ${iMiles} miles away.`);
console.log(`However, the roads are not safe, you must fight or run from any lingering enemies.`);
console.log("");
console.log(sMenuTravel);


while(iHitPoints >= 1)
{
  
    // Since all instances of the code feedback the player with the menu, run prompt.
    var iMenu =  readline.keyIn();

    // If the player has not reached the castle then they may take actions.
    if(iMiles > 1)
    {
        // Check enemy health. If the mob is alive then this option is not avalible.
        // Walk Forward with eather W key, dosn't matter if it's caps or not.
        if(iMenu == "w" && iHitPoints > 0 && iEnemyHp < 1)
        {iTravel();}
        if(iMenu == "W" &&  iHitPoints > 0 && iEnemyHp < 1)
        {iTravel();}

        // Check enemy health. If the mob is alive then this option is avalible.
        // Attack Mobs with eather A key, dosn't matter if it's caps or not.
        if(iMenu == "a" && iHitPoints > 0 && iEnemyHp > 0)
        {iCombat();}
        if(iMenu == "A" && iHitPoints > 0 && iEnemyHp > 0)
        {iCombat();}

        // Check enemy health. If the mob is alive then this option is avalible.
        // Attempt to run from Mobs with eather R key, dosn't matter if it's caps or not.
        if(iMenu == "r" && iHitPoints > 0 && iEnemyHp > 0)
        {iRun();}
        if(iMenu == "R" && iHitPoints > 0 && iEnemyHp > 0)
        {iRun();}

    }
    else 
    {
        console.log(`        ${sName} has arrived at the castle, armed knights will accompany you on the way back.
        Once back at the village the knights will slay all of the monsters that are harrassing your village
        You are celebrated as a hero and the village is renamed as ${sName}ingham in your honor!
        `);
        iHitPoints = 0;
    }

    // (Q)uit option was used, end the game, this happens in and out of combat, so just check key strokes.
    if(iMenu == "q"){iHitPoints = 0;}
    if(iMenu == "Q"){iHitPoints = 0;}

    if(iHitPoints < 1)
    {
        iHitPoints = 0;
        console.log("GAME ENDED");
    }
}