import type { Friend } from '@/types'

export const SIL_ID = 'sil'

export const galleryFriends = (all: Friend[]) => all.filter((f) => f.id !== SIL_ID)

/**
 * Datos de las amigas.
 * Orden en la foto grupal: izquierda → derecha.
 * Si algún nombre no coincide, reordenar NAMES en scripts/crop-faces.py y volver a ejecutar.
 */
export const friends: Friend[] = [
  {
    id: 'pame',
    name: 'PAME',
    photoUrl: '/photos/pame.jpg',
    message:
      'Allá desde las alturas… para mí como dos metros y medio… con su templanza siempre a cuestas, su mirada distante y sus ojos celestes comiéndose el mundo. Allá arriba mantiene toda su manada atenta, a veces hasta raspa los límites de lo lógico… pero si estás de su lado… estás a salvo y cuando viene y te da un abrazo y un beso se le va toda la templanza a la mierda, porque aparece toda esa ternura que viene negándole al mundo allá en lo alto para ir juntándola y regalartela en un gesto que te abraza también el alma… y sobre todo te hace sentir segura, que si estás entre las personas que ella eligió va a dejar todo lo que tiene para cuidarte y quererte. Estás a salvo… fuiste una de las elegidas.',
  },
  {
    id: 'ana',
    name: 'ANA',
    photoUrl: '/photos/ana.jpg',
    message:
      'Se hace la ignorante… la que no sabe… pero la tiene taaaan clara, ella aprendió a los golpes pero se levantó con los guantes de boxeo para enfrentarse a todo con un saco de humildad pero con la piel de la sabiduría de alguien que sabe algo que el resto no… y su picardía… mejor no tener la boca con agua (o cualquier líquido) cuando ella habla porque es probable que termine saliendo cual catarata de tu boca.. porque una palabra de la boca de Ana es una explosión en tu cerebro de no poder creer escuchar lo que estás escuchando.. pero Anita si… te lo tira así sin filtros para que todas estallemos en risas que nos elevan a un nivel que no nos importa realmente quien está al lado… simplemente porque nos olvidamos del resto.',
  },
  {
    id: 'lu',
    name: 'LU',
    photoUrl: '/photos/lu.jpg',
    message:
      'intensamente… así vive… sin más… ella tiene claro que esto se termina y que hay que exprimirlo al máximo. Sabe muy bien cómo administrar la energía (como un auto híbrido, ella no gasta nafta solamente… ella va regenerando energía constantemente y tiene mucho más que el resto). Tiene un talento superior para saber en que momento pisar a fondo y gastarse al máximo… y también sabe cuando no vale la pena y sabe exactamente dónde no perder ni un gramo de la misma… donde no lo vale. Sabe que lo que tiene es muy valioso y no lo va a derrochar porque si. Nos enseña todo el tiempo, la admiramos porque sabemos que ninguna otra podría estar en esos zapatos que tan bien lleva y tan orgullosa nos hace quedar.. yo también soy AMIGA de Luciana',
  },
  {
    id: 'vero',
    name: 'VERO',
    photoUrl: '/photos/vero.jpg',
    message:
      '= SI PUEDO, nos encanta porque nos deja bien en claro el rol que tenemos en su vida, nos hizo entrar de lleno en todo, abrió su corazón sin el más mínimo miedo de salir herida y no porque antes no le alla pasado, sino porque tiene un corazón enorme y está tan contenta con todo lo que logró que se brinda entera con nosotras. Gracias Verito!! Gracias por dejarnos conocer todas las facetas de tu historia y por ser tan generosa. Nos encanta tu frescura y buen gusto… un toque que no le viene mal al grupo. Gracias Marley!!',
  },
  {
    id: 'gabi',
    name: 'GABI',
    photoUrl: '/photos/gabi.jpg',
    message:
      'La sordera selectiva hace que hable más de lo que le escucha y es por eso que todo el tiempo la acompañamos en sus pensamientos porque con nosotras (al menos) piensa en voz alta, nos sumergimos en un ida y vuelta de opciones e ideas, pensamos todas con ella. La mujer de los contactos, la que siempre conoce a alguien que te conoce pero con un manejo estratégico de los cuidados de todos. La que te deja en claro que si te puede ayudar lo va a hacer.',
  },
  {
    id: 'yani',
    name: 'YANI',
    photoUrl: '/photos/yani.jpg',
    message:
      'Empatía 100%, Si mataste a alguien y necesitas esconder el cadáver, contale a Yani… ella nunca te va a juzgar, de hecho se va a poner en tus zapatos y justificar tus acciones, sentirse mal al lado de ella es casi imposible, porque con sus bailecitos y pelos locos siempre te brinda una sonrisa para hacer de tu día, algo mejor. La descubrimos estructurada en el viaje con la necesidad de saber de antemano horarios y visitas, el problema es que ella no sabe que está tan pendiente de los otros; que en su organización se le escapa el tiempo que le regala a cada ser vivo en la tierra para poder arreglar un poco al menos lo que la rodea, por eso está todo el tiempo corriendo atrás del tiempo; lo que ella no sabe es que hasta a él lo justifica.',
  },
  {
    id: 'eve',
    name: 'EVE',
    photoUrl: '/photos/eve.jpg',
    message:
      'Desde el minuto cero sabía que encajaba en el grupo (aunque no la invite a mi cumpleaños ya se Ana) Eve es como un bastón para apoyarse… porque sabés que siempre está y no te va a dejar caer. Es la segunda de Vero, "si… puedo… estoy", la típica pelota de trapo que no te rebota una, si es una joda perfecto… si es un partido de padel ahí esta, si son unos mates para pasar el rato (si tienen jengibre mejor) ahí está, si es con alcohol.. ahí está… si es con harinas ahí está… si es con aire… ahí está… está porque está donde la necesiten. Pero ojo, no está si no la llaman, súper respetuosa de los tiempos y momentos de los otros y eso es algo que la hace única.',
  },
  {
    id: 'sil',
    name: 'SIL',
    photoUrl: '/photos/sil.jpg',
    message: '',
  },
]

const silFinalMessage =
  'Darles gracias por hacer de mis días algo hermoso, cuando siga avanzando este camino que se llama "vida" y pasen los años (si Dios tiene pensado eso para mi) y mire para atrás… en esta parte del camino van a estar ustedes, dando color y lindos recuerdos a esta parte, que lindo grupo, tan heterogéneo como necesario. Me pasa que cuando hablo con otras personas que no les gusta hacer gimnasia y les quiero aconsejar que vayan a algún lado, que se muevan, que les hace bien… digo "Claro… no es lindo hacer gimnasia lo lindo es ir a encontrarse con ustedes". Que sigan los éxitos!!!'

export const finalCard = {
  author: 'SIL',
  photoUrl: '/photos/sil.jpg',
  message: silFinalMessage,
}

export const groupPhoto = {
  imageUrl: '/photos/group.jpg',
  alt: 'Todas juntas',
}

export const endingMessage = {
  body: 'Gracias por ser parte de esta historia.\nPor cada risa, cada abrazo, cada recuerdo compartido.\nFeliz Día del Amigo.',
}
