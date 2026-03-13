export type OfficialStandMove = {
  title: string;
  description: string;
};

export type OfficialStandDetail = {
  officialSourceUrl: string;
  moves: OfficialStandMove[];
};

export const officialStandMoveSource = {
  boardUrl: 'https://trello.com/b/Zi6UTMnO/official-bizzare-lineage',
  verifiedAt: '2026-03-13',
  label: 'Official Bizarre Lineage Trello',
} as const;

export const officialStandDetails: Record<string, OfficialStandDetail> = {
  'made-in-heaven': {
    officialSourceUrl: 'https://trello.com/c/6rRmjebY',
    moves: [
      {
        title: 'Infinite Pursuit [R]',
        description:
          'A speed-blitz opener that punches, repositions, and chains into multiple teleport hits before sending the target away again.',
      },
      {
        title: "Heaven's Wrath [Z]",
        description:
          'A high-speed dash-through strike built to capitalize on movement gaps and punish poor spacing.',
      },
      {
        title: 'Knife Massacre [X + X]',
        description:
          'Starts with airborne knife pressure, then converts into a follow-up impale and spin combo if you press the input again.',
      },
      {
        title: 'Light Speed [C]',
        description:
          'A direct burst dash that helps Made in Heaven close distance or continue a chase instantly.',
      },
      {
        title: 'Acceleration [V]',
        description:
          'Its signature self-buff, steadily ramping movement speed and making the stand harder to pin down the longer it runs.',
      },
    ],
  },
  whitesnake: {
    officialSourceUrl: 'https://trello.com/c/RX5RLePe',
    moves: [
      {
        title: 'Barrage [E]',
        description:
          'Standard close-range barrage pressure for confirming damage once Whitesnake gets in.',
      },
      {
        title: 'Sweep Kick [R]',
        description:
          'A quick, forceful low kick that knocks enemies back and resets spacing.',
      },
      {
        title: 'Revolver [Z]',
        description:
          'A fast pistol shot that gives Whitesnake a simple ranged poke to keep pressure active.',
      },
      {
        title: 'Disc Throw [X]',
        description:
          'Throws burning discs that ignite on impact, adding ranged pressure and flame damage to the kit.',
      },
      {
        title: 'Acid Rupture [C]',
        description:
          'Spills acid across the ground to damage, disrupt, and leave enemies vulnerable if they stay inside.',
      },
      {
        title: 'Disc Extraction [V]',
        description:
          'Whitesnake lands its signature disc ability, briefly removing the opponent’s stand so they cannot fight normally.',
      },
    ],
  },
  'c-moon': {
    officialSourceUrl: 'https://trello.com/c/1hP1aTRw',
    moves: [
      {
        title: 'Barrage [E]',
        description:
          'Standard barrage pressure for maintaining close-range damage once gravity tools connect.',
      },
      {
        title: 'Graviton Reversal [R]',
        description:
          'Launches the target away, then drags them back with gravity for a second slam and combo continuation.',
      },
      {
        title: 'Rock Barrage [Z]',
        description:
          'Lifts debris from the ground and fires it forward to stun and interrupt from mid-range.',
      },
      {
        title: 'Gravity Crusher [X]',
        description:
          'Pins the opponent under heavy gravity, creating a reliable stun window for follow-up damage.',
      },
      {
        title: 'Gravity Barrier [C]',
        description:
          'Sends a wave of gravity across the floor that lifts, damages, and spikes enemies back down.',
      },
      {
        title: 'Piercing Blows [V]',
        description:
          'A compact gravity-boosted two-hit string that pushes opponents back and reinforces C-Moon’s brawling pressure.',
      },
    ],
  },
  'the-world': {
    officialSourceUrl: 'https://trello.com/c/aLERlC1V',
    moves: [
      {
        title: 'Barrage [E]',
        description:
          'Standard barrage pressure once The World is already in melee range.',
      },
      {
        title: 'Hard Fight [R]',
        description:
          'A heavy punch that leans into The World’s raw destructive power for burst damage.',
      },
      {
        title: 'Encirclement [Z]',
        description:
          'Teleports in, surrounds the target with knives, and sets up a combo-friendly punish sequence.',
      },
      {
        title: 'Knives [X]',
        description:
          'Quick ranged knife throw pressure that lets The World threaten from outside pure melee range.',
      },
      {
        title: 'Timestop [C]',
        description:
          'Stops time for roughly six seconds, giving The World its signature burst window and guaranteed punish setups.',
      },
      {
        title: 'Kick Volley [V]',
        description:
          'Uppercuts into a rushing kick sequence, then boots the enemy away to finish the string.',
      },
    ],
  },
  'star-platinum': {
    officialSourceUrl: 'https://trello.com/c/Y165n3Pf',
    moves: [
      {
        title: 'Barrage [E]',
        description:
          'Standard barrage pressure that keeps Star Platinum threatening once it sticks to a target.',
      },
      {
        title: 'Star Finger [R]',
        description:
          'Extends both fingers into a circular hitbox that briefly stuns, making it one of Star Platinum’s cleanest starters.',
      },
      {
        title: 'Inhale [Z]',
        description:
          'Pulls the opponent inward with raw force, then slams them to secure a close-range conversion.',
      },
      {
        title: 'Skull Crusher [X]',
        description:
          'A grab sequence that spins, launches, and uppercuts the enemy, leaving room to continue the combo.',
      },
      {
        title: 'Harpoon [V]',
        description:
          'Throws a harpoon for ranged pressure and applies bleed for about three seconds on hit.',
      },
      {
        title: 'Time Stop [C]',
        description:
          'Halts time for roughly five seconds, opening the door for a full punish route or guaranteed close-range damage.',
      },
      {
        title: 'Awakening Move [H + H]',
        description:
          'The official Trello references a separate awakening showcase video for this follow-up finisher.',
      },
    ],
  },
  'king-crimson': {
    officialSourceUrl: 'https://trello.com/c/AgJjkUEh',
    moves: [
      {
        title: 'Barrage [E]',
        description:
          'Standard barrage pressure once King Crimson gets its opening.',
      },
      {
        title: 'Chop [R]',
        description:
          'A forceful downward hand strike that functions as a direct burst tool.',
      },
      {
        title: 'Impale [Z + Z]',
        description:
          'A longer sequence that stuns, repositions through time erasure, and ends in a brutal impale-and-slam combo.',
      },
      {
        title: 'Time Erase [X]',
        description:
          'Makes King Crimson intangible while time is skipped, letting it reposition and punish from an unexpected angle.',
      },
      {
        title: 'Epitaph [C]',
        description:
          'A future-sight counter that flips pressure back onto the attacker and creates a free punish moment.',
      },
      {
        title: 'Eye Gouge [V]',
        description:
          'A close-range strike that blinds the opponent for around four seconds and disrupts their response window.',
      },
    ],
  },
  'weather-report': {
    officialSourceUrl: 'https://trello.com/c/twwwjxwD',
    moves: [
      {
        title: 'Barrage [E]',
        description:
          'Standard barrage pressure for finishing off enemies once they get caught.',
      },
      {
        title: 'Howling Blitz [R]',
        description:
          'Fires lightning outward to damage and push back opponents from safer range.',
      },
      {
        title: 'Charged Vault [Z]',
        description:
          'Calls lightning from the sky, grabs the target, and slams them after a charged burst.',
      },
      {
        title: 'Frog Downpour [X]',
        description:
          'Changes the weather to rain poisonous frogs, turning the space around the user into a PvE-friendly damage zone.',
      },
      {
        title: 'Heavy Weather [C]',
        description:
          'Creates the stand’s signature rainbow effect, stunning nearby opponents for about three seconds.',
      },
      {
        title: 'Ice Nova [V]',
        description:
          'Sends ice out across the floor in multiple directions, catching groups and extending area control.',
      },
    ],
  },
  'the-world-high-voltage': {
    officialSourceUrl: 'https://trello.com/c/ziEpixgd',
    moves: [
      {
        title: 'Barrage [E]',
        description: 'Standard barrage pressure once High Voltage gets in.',
      },
      {
        title: 'Spin Kick [R]',
        description:
          'A spinning kick that checks close-range pressure and keeps the target pinned in front of you.',
      },
      {
        title: 'Revolver Barrage [Z]',
        description:
          'Fires four revolver shots in quick succession, adding ranged stun pressure to the kit.',
      },
      {
        title: 'Knives [X]',
        description:
          'Throws knives empowered by the stand for extra ranged utility and stagger.',
      },
      {
        title: 'Time Stop [C]',
        description:
          'Stops time for roughly five seconds, preserving the classic World-style burst window.',
      },
      {
        title: 'Gunpowder Smoke Bomb [V]',
        description:
          'Drops a smoke bomb that hides both user and stand, giving High Voltage a cleaner reset tool than the base form.',
      },
    ],
  },
  'killer-queen': {
    officialSourceUrl: 'https://trello.com/c/Fk75BSAj',
    moves: [
      {
        title: 'Barrage [E]',
        description:
          'Standard barrage pressure for finishing close-range confirms.',
      },
      {
        title: 'Primary Bomb [R + R]',
        description:
          'Plants a bomb directly onto the opponent, then detonates it for a classic single-target punish.',
      },
      {
        title: 'Sheer Heart Attack [Z]',
        description:
          'Deploys an autonomous explosive drone that chases and detonates on contact.',
      },
      {
        title: 'Stray Cat [X]',
        description:
          'Launches an invisible bubble bomb that tracks and explodes on impact.',
      },
      {
        title: 'Bomb Bounce [C]',
        description:
          'Turns the opponent into a repeated explosion target, chaining damage and stun over multiple hits.',
      },
      {
        title: 'Learn To Be Tough [V]',
        description:
          'A punishing grab sequence that slams the target into the ground before tossing them away.',
      },
    ],
  },
  anubis: {
    officialSourceUrl: 'https://trello.com/c/ROfYsPvE',
    moves: [
      {
        title: 'Barrage [E]',
        description: 'Standard barrage pressure for point-blank sword offense.',
      },
      {
        title: 'Rend [R]',
        description:
          'A spinning slash that hits everyone nearby, giving Anubis a simple area check.',
      },
      {
        title: 'Dice Out [Z]',
        description:
          'A rushing slash sequence that ends with a heavier finisher and leaves the opponent stunned.',
      },
      {
        title: 'Cursed Severance [X]',
        description:
          'A powered-up slash that deals burst damage and stuns on contact.',
      },
      {
        title: 'Flash Strike [C]',
        description:
          'Boosts speed for a rapid slash string that lands several near-invisible hits in succession.',
      },
    ],
  },
  'golden-experience': {
    officialSourceUrl: 'https://trello.com/c/F0qns8wY',
    moves: [
      {
        title: 'Barrage [E]',
        description:
          'Standard barrage pressure once Golden Experience gets in range.',
      },
      {
        title: 'Soul Strike [R]',
        description:
          'A charged punch that knocks the opponent’s soul out briefly, creating a short punish window.',
      },
      {
        title: 'Restoration [Z]',
        description:
          'Breaks up the floor and turns the material into a self-healing resource for sustain.',
      },
      {
        title: 'Root Strike [X]',
        description:
          'Uppercuts the target away, then sends roots up from the ground to chase and stab them.',
      },
      {
        title: 'Overgrowth [C]',
        description:
          'Summons a healing tree from the ground, reinforcing Golden Experience’s sustain-first identity.',
      },
      {
        title: 'Frog [V]',
        description:
          'Places a frog on the user that reflects damage back at opponents for several seconds.',
      },
    ],
  },
  'stone-free': {
    officialSourceUrl: 'https://trello.com/c/8g997swa',
    moves: [
      {
        title: 'Barrage [E]',
        description:
          'Standard barrage pressure once Stone Free converts at close range.',
      },
      {
        title: 'Sting Punch [R]',
        description:
          'Wraps string around the hand to deliver a reinforced straight punch.',
      },
      {
        title: 'Dropkick [Z]',
        description:
          'Uses strings to trap the opponent in place before driving them back with a dropkick.',
      },
      {
        title: 'String Trap [X]',
        description:
          'Places a hidden string line underground that can trap nearby enemies for around two seconds.',
      },
      {
        title: 'Spiralling Thread [C]',
        description:
          'Grabs with strings, swings the target through the air, and slams them back to the ground.',
      },
      {
        title: 'String Bandage [V]',
        description:
          'Sews the user back together to restore health and extend survivability.',
      },
    ],
  },
  'magicians-red': {
    officialSourceUrl: 'https://trello.com/c/3VitTVk6',
    moves: [
      {
        title: 'Barrage [E]',
        description:
          'Standard barrage pressure when enemies stay close enough to brawl.',
      },
      {
        title: 'Flamethrower [Z]',
        description:
          'Breathes a stream of fire that burns targets for around two seconds.',
      },
      {
        title: 'Life Sensor [X]',
        description:
          'Creates a living-target detector while firing flame shots that burn and damage the enemy.',
      },
      {
        title: 'Crossfire Hurricane [C]',
        description:
          'Launches a cross-shaped flame attack that leaves an area-of-effect fire zone on impact.',
      },
      {
        title: 'Ignition Burst [V]',
        description:
          'Slams the floor to raise multiple pillars of fire and drag the opponent through each one.',
      },
    ],
  },
  'crazy-diamond': {
    officialSourceUrl: 'https://trello.com/c/pRdBh7xE',
    moves: [
      {
        title: 'Barrage [E]',
        description: 'Standard barrage pressure for basic close-range offense.',
      },
      {
        title: 'Heavy Punch [R]',
        description:
          'A straightforward heavy hit that leans on Crazy Diamond’s raw strength.',
      },
      {
        title: 'Bearing Shot [Z]',
        description:
          'Fires two metal bearings as projectiles, giving the stand a simple ranged option.',
      },
      {
        title: 'Heal Mode [X]',
        description:
          'Switches Crazy Diamond into restoration mode so its hits can heal targets instead of only damaging them.',
      },
      {
        title: 'Wall Smash [C]',
        description:
          'Lifts rock from the ground to launch and pin the opponent, with a restoration variant that builds a wall instead.',
      },
      {
        title: 'Pulverizer [V]',
        description:
          'Smashes the ground and then restores the broken rock into the opponent’s body to lock them down.',
      },
    ],
  },
  'purple-haze': {
    officialSourceUrl: 'https://trello.com/c/ZaQWAG7F',
    moves: [
      {
        title: 'Barrage [E]',
        description: 'Standard barrage pressure once Purple Haze gets close.',
      },
      {
        title: 'Bulb Punch [R]',
        description:
          'Breaks a poison bulb on contact, releasing infectious gas and auto-tracking at very close range.',
      },
      {
        title: 'Fury Strike [Z]',
        description:
          'A gut punch into a poison-infused follow-up that applies damage over time.',
      },
      {
        title: 'Infection Frenzy [X]',
        description:
          'A grab-and-pummel string that ends by kicking the opponent away after several contaminated hits.',
      },
      {
        title: 'Infectious Bulb [C]',
        description:
          'Fires three poison bulbs toward the enemy and spreads contamination across the target area.',
      },
      {
        title: 'Bulb Smash [V]',
        description:
          'Smashes both hands into the ground to flood the nearby area with poison.',
      },
      {
        title: 'Idle Rage',
        description:
          'A passive rage state that can trigger after taking too much damage, sending Purple Haze after anything nearby, including its own user.',
      },
    ],
  },
  'the-hand': {
    officialSourceUrl: 'https://trello.com/c/Y9EjrcQ4',
    moves: [
      {
        title: 'Barrage [E]',
        description: 'Standard barrage pressure when The Hand gets into range.',
      },
      {
        title: 'Hard Left [R]',
        description:
          'A heavy left-hand punch that knocks the opponent away from the user.',
      },
      {
        title: 'Erasure Swipe [Z]',
        description:
          'Charges an erasure swipe that stuns and damages, with a full charge threatening extreme punishment.',
      },
      {
        title: 'Erasure Pull [X]',
        description:
          'Erases the space between user and target, forcing the opponent directly into The Hand’s effective range.',
      },
      {
        title: 'Erasure Launch [C]',
        description:
          'Erases space in the air to launch the user upward, giving The Hand a rare movement option.',
      },
    ],
  },
  'red-hot-chili-pepper': {
    officialSourceUrl: 'https://trello.com/c/2sUugOsm',
    moves: [
      {
        title: 'Barrage [E]',
        description: 'Standard barrage pressure for close-range confirms.',
      },
      {
        title: 'Thunder God [R]',
        description:
          'Slams thunder into the floor to create an electrical area-of-effect strike.',
      },
      {
        title: 'Flash [Z]',
        description:
          'Teleports forward with a lightning trail that damages anyone caught behind the dash.',
      },
      {
        title: 'Pinky Slash [X]',
        description:
          'Charges both hands with electricity and slices twice to briefly stun the target.',
      },
      {
        title: 'Electrical Surge [C]',
        description:
          'Channels stored electricity into a concentrated burst attack with strong stun pressure.',
      },
    ],
  },
};

export function getOfficialStandDetail(standKey: string) {
  return officialStandDetails[standKey];
}
