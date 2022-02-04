const getRandomIntegerInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (min >= max || min < 0 || max < 0) ? null : Math.floor(Math.random() * (max - min +1) + min)
};

const getRandomArrayElement = (elements) => {
  const randomArrayIndex = getRandomIntegerInclusive(0, elements.length - 1);
  return elements[randomArrayIndex];
};

const DESCRIPTIONS = [
  'моя лучшая фотка',
  'гулять, так гулять!',
  'работаю в поте лица',
  'хоп хэй лалалэй',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Vanja',
  'Tanja',
  'Sanja',
];

const SIMILAR_THUMBNAILS_COUNT = 25;

const createThumbnail = () => {
  return {
    id: getRandomIntegerInclusive(1, 25),
    url: `photos/${getRandomIntegerInclusive(1, 25)}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomIntegerInclusive(15, 200),
    comments: {
      id: getRandomIntegerInclusive(1, 350),
      avatar: `img/avatar-${getRandomIntegerInclusive(1, 6)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES),
    },
  };
};

const createThumbnails = () => new Array(SIMILAR_THUMBNAILS_COUNT).fill(null).map(() => createThumbnail());

export {createThumbnails}
