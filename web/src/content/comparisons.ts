type ComparisonImage = {
  file: string;
  alt: string;
  caption: string;
  source: string;
};

type Comparison = {
  topic: string;
  then: ComparisonImage;
  now: ComparisonImage;
};

export const comparisons: Comparison[] = [
  {
    topic: "Orientace",
    then: {
      file: "/media/placeholders/ph-map-pins.jpg",
      alt: "Špendlíky zapíchnuté do papírové mapy Evropy.",
      caption: "Trasa na papírové mapě",
      source:
        "https://www.pexels.com/photo/blue-pushpins-on-administrative-map-of-europe-8828587/",
    },
    now: {
      file: "/media/comparison/navigation.jpg",
      alt: "Ruka drží telefon s\u00a0otevřenou navigací.",
      caption: "Mapa v\u00a0telefonu",
      source:
        "https://www.pexels.com/photo/smartphone-on-person-s-hand-6534907/",
    },
  },
  {
    topic: "Kontakt s\u00a0domovem",
    then: {
      file: "/media/comparison/letter.jpg",
      alt: "Ruce vytahují dopis z\u00a0obálky.",
      caption: "Dopis ve schránce",
      source:
        "https://www.pexels.com/photo/close-up-of-woman-taking-out-a-blank-piece-of-paper-form-an-envelope-7318933/",
    },
    now: {
      file: "/media/comparison/video-call.jpg",
      alt: "Rozhovor přes videohovor na notebooku.",
      caption: "Hovor z\u00a0pokoje na koleji",
      source: "https://www.pexels.com/photo/woman-having-a-video-call-4031707/",
    },
  },
  {
    topic: "Vzpomínky",
    then: {
      file: "/media/placeholders/ph-diary.jpg",
      alt: "Fotoaparát, vytištěné fotografie a\u00a0deník na dřevěném stole.",
      caption: "Fotografie v\u00a0cestovním deníku",
      source:
        "https://www.pexels.com/photo/photos-and-journal-with-map-and-camera-on-wooden-table-4338093/",
    },
    now: {
      file: "/media/comparison/camera.jpg",
      alt: "Cestující si telefonem fotí město za řekou.",
      caption: "Fotografie rovnou do telefonu",
      source:
        "https://www.pexels.com/photo/anonymous-person-photographing-city-with-smartphone-5225072/",
    },
  },
];
