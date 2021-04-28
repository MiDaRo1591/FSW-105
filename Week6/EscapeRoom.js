
const readline = require("readline-sync");
const sName = readline.question("What is your name? ");

var introMessage = `\n Welcome ${sName} to the Magical Escape Room Game Simualator`;

console.log(introMessage);

var vAlive = true;
var vKey = false;

while(vAlive == true) // All of this done while alive. Death will be game over or ending.
{
    var iMenu =  readline.keyIn("\n Input commands. \n 1) Search Hole in the wall. \n 2) Search the Cell \n 3) Open Door", {limit: '$<1-3>'});
    
    if(iMenu == 1) // Only single way to die, let's do a neat monster text picture later.
    {
        console.log(`\n ${sName} is sucked into the hole, and devoured by a monster.`);
        // text monster here later. Make sure to include in credits
        console.log("  _______");
        console.log(" /        \ ");
        console.log("| o     O  \ ");
        console.log("| .vvvvv.  | ");
        console.log("| |     |  | ");
        console.log("| `^^^^^'  | =");
        console.log(" \________/ ");

        // Made one myself with my phone while shopping.
        console.log("GAME OVER");
        vAlive = false;
    }
    else if(iMenu == 2 && vKey == false) // indicate Key found (maybe do a magic game later...)
    {
        console.log(`\n ${sName} found the ward stone under the bed.`);
        console.log("        _"        );
        console.log("       | ╲ "      );
        console.log("       |  |"      );
        console.log("       |  |___ "   );
        console.log("______╱ - |__| "  );
        console.log("       -- |__| "   );
        console.log("_______ - |__| "   );
        console.log("       ╲__|__| "   );
        // More phone shopping boardness
        vKey = true;
    }
    else if(iMenu == 2 && vKey == true)
    {
        console.log(`You already found the ward stone.`);
    }
    else if(iMenu == 3 && vKey == false) // lol need the key!
    {
        console.log(`\n ${sName} pushes on the door.`);
        console.log("Nothing happened.");
    }
    else if(iMenu == 3 && vKey == true) // If they have the key victory
    {
        console.log(`\n ${sName} pushes on the door.`);
        console.log("The ward stone opens the door.");
        
        
console.log("░░█▀░░░░░░░░░░░▀▀███████░░░░░ ");
console.log("░█▌░░░░░░░░░░░░░░░░███████▌░░ ");
console.log("░█░░░░░░░░░░░░░░░░░████████░░ ");
console.log("▐▌░░░░░░░░░░░░░░░░░▀██████▌░░ ");
console.log("░▌▄███▌░░░░▀████▄░░░░▀████▌░░ ");
console.log("▐▀▀▄█▄░▌░░░▄██▄▄▄▀░░░░████▄▄░ ");
console.log("▐░░░░░▐░░░░░░░░░░░░░░░▐▀░▄▀▌▌ ");
console.log("▐░░░░░▌░░░░░░░░░░░░░░░▀░▀░░▌▌ ");
console.log("▐░░░▄▀░░░▀░▌░░░░░░░░░░░░▌█░▌▌ ");
console.log("░▌░░▀▀▄▄▀▀▄▌▌░░░░░░░░░░▐░▀▐▐░ ");
console.log("░▌░░▌░▄▄▄▄░░░▌░░░░░░░░▐░░▀▐░░ ");
console.log("░█░▐▄██████▄░▐░░░░░░░░█▀▄▄▀░░ ");
console.log("░▐░▌▌░░░░░░▀▀▄▐░░░░░░█▌░░░░░░ ");
console.log("░░█░░▄▀▀▀▀▄░▄═╝▄░░░▄▀░▌░░░░░░ ");
console.log("░░░▌▐░░░░░░▌░▀▀░░▄▀░░▐░░░░░░░ ");
console.log("░░░▀▄░░░░░░░░░▄▀▀░░░░█░░░░░░░ ");
console.log("░░░▄█▄▄▄▄▄▄▄▀▀░░░░░░░▌▌░░░░░░ ");
console.log("░░▄▀▌▀▌░░░░░░░░░░░░░▄▀▀▄░░░░░ ");
console.log("▄▀░░▌░▀▄░░░░░░░░░░▄▀░░▌░▀▄░░░ ");
console.log("░░░░▌█▄▄▀▄░░░░░░▄▀░░░░▌░░░▌▄▄ ");
console.log("░░░▄▐██████▄▄░▄▀░░▄▄▄▄▌░░░░▄░ ");
console.log("~ Image by  TextArt.Me");

        vAlive = false;
    }
}