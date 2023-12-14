import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Typography } from '@material-ui/core';

const CharacterTable = ({ characterUrls }) => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      if (!characterUrls || !characterUrls.length) {
        setIsLoading(false);
        return; 
      }

      try {
        const charactersToFetch = characterUrls;

        const charactersData = await Promise.all(
          charactersToFetch.map(async (url) => {
            const match = url.match(/\/(\d+)\/$/);
            const characterId = match ? match[1] : null;

            const localStorageData = localStorage.getItem(`character_${characterId}`);
            
            if (localStorageData) {
              return JSON.parse(localStorageData);
            } else {
              const response = await axios.get(url);
              const characterData = response.data;
              
              localStorage.setItem(`character_${characterId}`, JSON.stringify(characterData));

              return characterData;
            }
          })
        );

        setCharacters(charactersData);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados dos personagens:', error);
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [characterUrls]);

  const characterNamesString = characters.map((character) => character.name).join(', ');

  return (
    <div>
      {isLoading ? (
        <CircularProgress/>
      ) : (
        characters.length > 0 && (
          <Typography>{characterNamesString}...</Typography>
        )
      )}
    </div>
  );
};

export default CharacterTable;
