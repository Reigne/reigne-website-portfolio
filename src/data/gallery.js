// ─────────────────────────────────────────────────────────
//  Gallery order — move lines up/down to rearrange the grid
// ─────────────────────────────────────────────────────────

const T = (n) => `/projects/graphicdesigns/thumbnails/thumbnail (${n}).webp`
const A = (name) => `/projects/graphicdesigns/ads/${name.replace(/\.png$/i, '.webp')}`

export const GALLERY_ITEMS = [
  // ── Thumbnails — update tag + title to match each image ──
  { src: T(1), tag: 'Design',  title: 'Thumbnail 1'  },
  { src: T(2), tag: 'Design',  title: 'Thumbnail 2'  },
  { src: T(3), tag: 'Design',  title: 'Thumbnail 3'  },
  { src: T(4), tag: 'Design',  title: 'Thumbnail 4'  },
  { src: T(5), tag: 'Design',  title: 'Thumbnail 5'  },
  { src: T(6), tag: 'Design',  title: 'Thumbnail 6'  },
  { src: T(7), tag: 'Design',  title: 'Thumbnail 7'  },
  { src: T(8), tag: 'Design',  title: 'Thumbnail 8'  },
  { src: T(9), tag: 'Design',  title: 'Thumbnail 9'  },

  // ── Kind Ocean Ads ─────────────────────────────────────
  { src: A('kindocean-ads1.png'),                           tag: 'Digital Ads',  title: 'Kind Ocean Ad 1'              },
  { src: A('kindocean-ads2.png'),                           tag: 'Digital Ads',  title: 'Kind Ocean Ad 2'              },
  { src: A('kindocean-ads3.png'),                           tag: 'Digital Ads',  title: 'Kind Ocean Ad 3'              },
  { src: A('kindocean-ads4.png'),                           tag: 'Digital Ads',  title: 'Kind Ocean Ad 4'              },
  { src: A('kindocean-ads5.png'),                           tag: 'Digital Ads',  title: 'Kind Ocean Ad 5'              },
  { src: A('kindocean-ads6.png'),                           tag: 'Digital Ads',  title: 'Kind Ocean Ad 6'              },
  { src: A('kindocean-web-banner.png'),                     tag: 'Banner',       title: 'Kind Ocean Web Banner'        },
  { src: A('kindocean-mobile-banner.png'),                  tag: 'Banner',       title: 'Kind Ocean Mobile Banner'     },
  { src: A('kind Ocean Ads Generic (portrait) 1.png'),      tag: 'Social Media', title: 'Kind Ocean Generic Portrait 1'},
  { src: A('kind Ocean Ads Generic (portrait) 2.png'),      tag: 'Social Media', title: 'Kind Ocean Generic Portrait 2'},
  { src: A('kind Ocean Ads Generic (portrait) 3.png'),      tag: 'Social Media', title: 'Kind Ocean Generic Portrait 3'},
  { src: A('kind Ocean Ads Generic (portrait) 4.png'),      tag: 'Social Media', title: 'Kind Ocean Generic Portrait 4'},
  { src: A('kind Ocean Ads Generic (square) 1.png'),        tag: 'Social Media', title: 'Kind Ocean Generic Square 1'  },
  { src: A('kind Ocean Ads Generic (square) 2.png'),        tag: 'Social Media', title: 'Kind Ocean Generic Square 2'  },
  { src: A('kind Ocean Ads Generic (square) 3.png'),        tag: 'Social Media', title: 'Kind Ocean Generic Square 3'  },
  { src: A('kind Ocean Ads Generic (square) 4.png'),        tag: 'Social Media', title: 'Kind Ocean Generic Square 4'  },

  // ── Black Friday ────────────────────────────────────────
  { src: A('blackfriday (portrait 1).png'),                 tag: 'Digital Ads',  title: 'Black Friday Portrait 1'      },
  { src: A('blackfriday (portrait 2).png'),                 tag: 'Digital Ads',  title: 'Black Friday Portrait 2'      },
  { src: A('blackfriday (portrait 3).png'),                 tag: 'Digital Ads',  title: 'Black Friday Portrait 3'      },
  { src: A('blackfriday (portrait 4).png'),                 tag: 'Digital Ads',  title: 'Black Friday Portrait 4'      },
  { src: A('blackfriday (square 1).png'),                   tag: 'Digital Ads',  title: 'Black Friday Square 1'        },
  { src: A('blackfriday (square 2).png'),                   tag: 'Digital Ads',  title: 'Black Friday Square 2'        },
  { src: A('blackfriday (square 3).png'),                   tag: 'Digital Ads',  title: 'Black Friday Square 3'        },

  // ── Chandra ─────────────────────────────────────────────
  { src: A('chandra-announcement.png'),                     tag: 'Sports',       title: 'Chandra Announcement'         },
  { src: A('chandra-ador-victory.png'),                     tag: 'Sports',       title: 'Chandra Ador Victory'         },
  { src: A('chandra-3rd-placer.png'),                       tag: 'Sports',       title: 'Chandra 3rd Placer'           },
  { src: A('chandra-mads-mvp.png'),                         tag: 'Sports',       title: 'Chandra Mads MVP'             },
  { src: A('chandra-prince-mvp.png'),                       tag: 'Sports',       title: 'Chandra Prince MVP'           },
]

export const DEFAULT_COUNT = 9
