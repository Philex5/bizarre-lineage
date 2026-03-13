export type WorldEventEntry = {
  key:
    | 'meteor-shower'
    | 'world-boss-dio'
    | 'stand-rush'
    | 'raid-portal-opening'
    | 'graveyard-uprising';
  name: string;
  mode: string;
  summary: string;
  details: string;
  location: string;
  recommendedLevel: string;
  cadence?: string;
  rewards: string[];
  imageSrc: string;
  imageAlt: string;
};

export type WorldEventsContent = {
  intro: {
    title: string;
    description: string;
    heroImageSrc: string;
    heroImageAlt: string;
    updatedAt: string;
  };
  events: WorldEventEntry[];
  notes: string[];
  relatedLinks: Array<{
    href: string;
    title: string;
    description: string;
  }>;
};

const enWorldEventsContent: WorldEventsContent = {
  intro: {
    title: 'Bizarre Lineage World Events',
    description:
      'Bizarre Lineage events are server-wide activities that can appear during normal play and hand out free EXP, loot, and rare progression items.',
    heroImageSrc: 'assets/pages/events/world-events-hero.png',
    heroImageAlt: 'Bizarre Lineage world events overview artwork',
    updatedAt: '2026-03-13',
  },
  events: [
    {
      key: 'meteor-shower',
      name: 'Meteor Shower',
      mode: 'Loot event',
      summary:
        'Meteors crash around Morio Train Station and can be mined for stand arrows, lucky arrows, and crafting materials.',
      details:
        'Watch the sky and rotate fast around the station area so you can claim meteor drops before other players do.',
      location: 'Morio Train Station',
      recommendedLevel: 'Level 50+ recommended',
      rewards: ['Stand Arrows', 'Lucky Stand Arrows', 'Materials'],
      imageSrc: 'assets/pages/events/world-events-hero.png',
      imageAlt: 'Bizarre Lineage Meteor Shower event artwork',
    },
    {
      key: 'world-boss-dio',
      name: 'World Boss: Dio',
      mode: 'Boss event',
      summary:
        'DIO spawns in Cairo Streets as a world boss and is one of the highest-pressure public events on the map.',
      details:
        'This fight is best treated like a late-game damage check because new characters usually struggle to survive the burst and crowd pressure.',
      location: 'Cairo Streets',
      recommendedLevel: 'Level 50+ strongly recommended',
      cadence: 'Spawns roughly every 4 to 6 hours',
      rewards: ['The World', "DIO's Bone", 'Legendary Cosmetics'],
      imageSrc: 'assets/pages/events/world-events-hero.png',
      imageAlt: 'Bizarre Lineage World Boss Dio event artwork',
    },
    {
      key: 'stand-rush',
      name: 'Stand Rush',
      mode: 'Free-for-all PvP',
      summary:
        'Stand Rush turns the Colosseum Arena into an open PvP brawl with no level cap restrictions.',
      details:
        'Anyone can queue in, but it plays much better as an endgame event because stronger builds can snowball fast in the arena.',
      location: 'Colosseum Arena',
      recommendedLevel: 'Near endgame recommended',
      rewards: ['PvP Tokens', 'Exclusive PvP Titles', 'Cosmetic Items'],
      imageSrc: 'assets/pages/events/world-events-hero.png',
      imageAlt: 'Bizarre Lineage Stand Rush event artwork',
    },
    {
      key: 'raid-portal-opening',
      name: 'Raid Portal Opening',
      mode: 'Portal event',
      summary:
        'A random portal opens somewhere on the map and teleports anyone who enters into one of several raid battles.',
      details:
        'The fastest way to capitalize on this event is to stay mobile, check common spawn routes, and be ready to jump in before the portal disappears.',
      location: 'Random spawn points across the map',
      recommendedLevel: 'Level 50+ recommended',
      rewards: ['Raid Keys', 'Legendary Stands', 'Crafting Materials'],
      imageSrc: 'assets/pages/events/world-events-hero.png',
      imageAlt: 'Bizarre Lineage Raid Portal Opening event artwork',
    },
    {
      key: 'graveyard-uprising',
      name: 'Graveyard Uprising',
      mode: 'Survival event',
      summary:
        'Players fight waves of NPCs in the Graveyard and need to stay alive until the timer runs out.',
      details:
        'Bring a build with good sustain and crowd control because surviving the whole timer matters more than burning through the first waves quickly.',
      location: 'Graveyard',
      recommendedLevel: 'Level 50+ recommended',
      rewards: ['Chests', 'Stand Arrows'],
      imageSrc: 'assets/pages/events/graveyard-uprising.png',
      imageAlt: 'Bizarre Lineage Graveyard Uprising screenshot',
    },
  ],
  notes: [
    'Events can appear during normal play and affect the whole server.',
    'Most events hand out around 20K to 30K EXP plus extra loot tied to the event type.',
    'Level 50 is the safest baseline before joining most event content.',
    'Boss and PvP events scale harder than loot or survival events, so build quality matters.',
  ],
  relatedLinks: [
    {
      href: '/terms/raid',
      title: 'Raid guide',
      description:
        'Move here when you want the separate 8-player raid loop, token shops, and reward routes.',
    },
    {
      href: '/terms/fighting-styles',
      title: 'Fighting styles',
      description:
        'Check the style layer that can change how effective you are in survival and PvP events.',
    },
    {
      href: '/terms/sub-abilities',
      title: 'Sub-abilities',
      description:
        'Review the extra build layer that can improve event pressure, utility, or survivability.',
    },
  ],
};

const esWorldEventsContent: WorldEventsContent = {
  intro: {
    title: 'Eventos del mundo en Bizarre Lineage',
    description:
      'Los eventos de Bizarre Lineage son actividades para todo el servidor que pueden aparecer durante la partida y repartir EXP gratis, botin y materiales raros.',
    heroImageSrc: 'assets/pages/events/world-events-hero.png',
    heroImageAlt: 'Arte de resumen de eventos del mundo de Bizarre Lineage',
    updatedAt: '2026-03-13',
  },
  events: [
    {
      key: 'meteor-shower',
      name: 'Meteor Shower',
      mode: 'Evento de botin',
      summary:
        'Caen meteoritos alrededor de Morio Train Station y pueden dar stand arrows, lucky arrows y materiales.',
      details:
        'Conviene girar rapido por la zona de la estacion para recoger los meteoritos antes que el resto del servidor.',
      location: 'Morio Train Station',
      recommendedLevel: 'Nivel 50+ recomendado',
      rewards: ['Stand Arrows', 'Lucky Stand Arrows', 'Materiales'],
      imageSrc: 'assets/pages/events/world-events-hero.png',
      imageAlt: 'Arte del evento Meteor Shower en Bizarre Lineage',
    },
    {
      key: 'world-boss-dio',
      name: 'World Boss: Dio',
      mode: 'Evento de jefe',
      summary:
        'DIO aparece en Cairo Streets como jefe mundial y es uno de los eventos publicos mas exigentes del mapa.',
      details:
        'Lo mejor es tratarlo como contenido de late game porque los personajes nuevos suelen sufrir mucho para aguantar el dano y la presion.',
      location: 'Cairo Streets',
      recommendedLevel: 'Nivel 50+ muy recomendado',
      cadence: 'Aparece aproximadamente cada 4 a 6 horas',
      rewards: ['The World', "DIO's Bone", 'Cosmeticos legendarios'],
      imageSrc: 'assets/pages/events/world-events-hero.png',
      imageAlt: 'Arte del evento World Boss Dio en Bizarre Lineage',
    },
    {
      key: 'stand-rush',
      name: 'Stand Rush',
      mode: 'PvP todos contra todos',
      summary:
        'Stand Rush convierte el Colosseum Arena en una pelea abierta PvP sin limite de nivel.',
      details:
        'Cualquiera puede entrar, pero rinde mucho mejor como evento de endgame porque las builds fuertes pueden dominar muy rapido.',
      location: 'Colosseum Arena',
      recommendedLevel: 'Cerca del endgame recomendado',
      rewards: ['PvP Tokens', 'Titulos PvP exclusivos', 'Objetos cosmeticos'],
      imageSrc: 'assets/pages/events/world-events-hero.png',
      imageAlt: 'Arte del evento Stand Rush en Bizarre Lineage',
    },
    {
      key: 'raid-portal-opening',
      name: 'Raid Portal Opening',
      mode: 'Evento de portal',
      summary:
        'Aparece un portal aleatorio en el mapa y teletransporta a los jugadores a una de varias raids posibles.',
      details:
        'La mejor forma de aprovecharlo es moverse mucho, revisar rutas comunes de aparicion y entrar antes de que el portal desaparezca.',
      location: 'Puntos aleatorios por todo el mapa',
      recommendedLevel: 'Nivel 50+ recomendado',
      rewards: ['Raid Keys', 'Legendary Stands', 'Materiales de crafteo'],
      imageSrc: 'assets/pages/events/world-events-hero.png',
      imageAlt: 'Arte del evento Raid Portal Opening en Bizarre Lineage',
    },
    {
      key: 'graveyard-uprising',
      name: 'Graveyard Uprising',
      mode: 'Evento de supervivencia',
      summary:
        'Los jugadores luchan contra oleadas de NPC en el cementerio y deben sobrevivir hasta que termine el tiempo.',
      details:
        'Llevar sustain y control de masas ayuda mucho porque aqui importa mas sobrevivir todo el temporizador que limpiar rapido las primeras oleadas.',
      location: 'Graveyard',
      recommendedLevel: 'Nivel 50+ recomendado',
      rewards: ['Chests', 'Stand Arrows'],
      imageSrc: 'assets/pages/events/graveyard-uprising.png',
      imageAlt: 'Captura de Graveyard Uprising en Bizarre Lineage',
    },
  ],
  notes: [
    'Los eventos pueden aparecer durante la partida normal y afectan a todo el servidor.',
    'Muchos eventos dan entre 20K y 30K de EXP ademas de botin ligado al propio evento.',
    'El nivel 50 es la base mas segura antes de entrar en la mayoria de eventos.',
    'Los eventos de jefe y PvP exigen mucho mas que los de botin o supervivencia.',
  ],
  relatedLinks: [
    {
      href: '/terms/raid',
      title: 'Guía de raids',
      description:
        'Pasa aquí si buscas el bucle aparte de raids para 8 jugadores, las tiendas de tokens y las rutas de recompensa.',
    },
    {
      href: '/terms/fighting-styles',
      title: 'Fighting styles',
      description:
        'Consulta la capa de estilos que puede cambiar mucho tu rendimiento en eventos de supervivencia y PvP.',
    },
    {
      href: '/terms/sub-abilities',
      title: 'Sub-abilities',
      description:
        'Repasa la capa extra de build que puede mejorar tu presión, utilidad o aguante dentro de los eventos.',
    },
  ],
};

export function getWorldEventsContent(
  locale?: string | null
): WorldEventsContent {
  return locale === 'es' ? esWorldEventsContent : enWorldEventsContent;
}
