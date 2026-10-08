export type Celebration = {
  name: string
  date: string
  time: string
  venue: string
  description: string
  accent: string
}

export const weddingData = {
  couple: {
    groom: 'Shubham',
    bride: 'Nikunja',
    fullNames: 'Shubham & Nikunja',
    weddingDate: '2027-01-20T18:30:00+05:30',
    dateLabel: '20 January 2027',
  },
  invitation: {
    eyebrow: 'ॐ श्री गणेशाय नमः ॐ',
    groomFamily: 'Agrawal Family',
    brideFamily: 'Mangal Family',
    inviteLine: 'request the honour of your presence as we celebrate the union of',
  },
  event: {
    venue: 'Kailsha club and resort',
    address: 'Ujjain , Madhya Pradesh',
    mapUrl: 'https://www.google.com/maps/place/Kailash+Club+and+Resort+Ujjain',
    contactName: 'Dinesh Agrawal',
    contactPhone: '9425082582',
    youtubeId: '', // Paste the YouTube video ID here to show the pre-wedding film.
  },
  celebrations: [
    {
      name: 'Haldi',
      date: '19 January 2027',
      time: '1:00 PM onwards',
      venue: 'Poolside , Kailsha club and resort Ujjain',
      description: 'A lively afternoon filled with flowers , cheerful songs, and joyous rituals.',
      accent: 'A vibrant celebration of tradition and new beginnings',
    },
    {
      name: 'Sangeet Night',
      date: '19 January 2027',
      time: '7:30 PM onwards',
      venue: 'Kailsha club and resort Ujjain',
      description: 'A moonlit evening of music, stories and joyful dancing.',
      accent: 'Dress in jewel tones',
    },
    {
      name: 'Wedding: Barat and Pheras',
      date: '20 January 2027',
      time: '9:30 PM onwards',
      venue: 'Kailsha club and resort Ujjain',
      description: 'A graceful evening of tradition and love, where vows are exchanged and new beginnings are celebrated.',
      accent: 'Witness the sacred union of two souls',
    },
     {
      name: 'Reception',
      date: '21 January 2027',
      time: '7:30 PM onwards',
      venue: 'Kailsha club and resort Ujjain',
      description: 'A graceful evening of celebration and joy, where we share our happiness with our loved ones.',
      accent: 'Joyful celebrations and happy beginnings',
    },
  ] satisfies Celebration[],
  story: {
    heading: 'A little bit of forever',
    copy: 'Two paths, a fortunate meeting, and a story that feels most at home in the company of the people they love.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85',
        alt: 'A couple holding hands on their wedding day',
        caption: 'The beginning of our favourite chapter',
      },
      {
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
        alt: 'A wedding couple walking together',
        caption: 'With love all around us',
      },
      {
        src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
        alt: 'Wedding flowers and bridal details',
        caption: 'Made for the moments in between',
      },
    ],
  },
  instagram: {
    hashtag: '#ShubhamWedsNikunja',
    message: 'Bring your candid moments, your happiest smiles and a little piece of the day to our shared album.',
  },
  footer: 'With love, blessings and immense joy',
} as const
