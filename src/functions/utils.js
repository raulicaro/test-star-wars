export const extractNumberFromUrl = (url) => {
    const match = url.match(/\/(\d+)\/$/);
    return match ? match[1] : null;
};

export const formatDate = (data) => {
  const partes = data.split('-');
  const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
  return dataFormatada;
};

export const findPlanetUrl = (planetName) => {
  const planetUrls = [
    'https://cryptospro.com.br/planetas/planeta_0000_tatooine.png',
    'https://cryptospro.com.br/planetas/planeta_0001_naboo.png',
    'https://cryptospro.com.br/planetas/planeta_0002_mustafar.png',
    'https://cryptospro.com.br/planetas/planeta_0003_kashyyyk.png',
    'https://cryptospro.com.br/planetas/planeta_0004_hoth.png',
    'https://cryptospro.com.br/planetas/planeta_0005_endor.png',
    'https://cryptospro.com.br/planetas/planeta_0006_dagobah.png',
    'https://cryptospro.com.br/planetas/planeta_0007_coruscant.png',
    'https://cryptospro.com.br/planetas/planeta_0008_bespin.png',
    'https://cryptospro.com.br/planetas/planeta_0009_alderaan.png',
  ];

  const matchingUrl = planetUrls.find(url => url.includes(planetName.toLowerCase()));

  return matchingUrl || null;
};