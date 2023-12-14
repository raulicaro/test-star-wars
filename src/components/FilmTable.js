import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { CircularProgress, Typography } from '@material-ui/core';

const FilmTable = ({ filmUrls }) => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      if (!filmUrls || !filmUrls.length) {
        setIsLoading(false);
        return; 
      }

      try {
        const filmsToFetch = filmUrls;

        const filmsData = await Promise.all(
          filmsToFetch.map(async (url) => {
            const match = url.match(/\/(\d+)\/$/);
            const filmId = match ? match[1] : null;

            const localStorageData = localStorage.getItem(`film_${filmId}`);
            
            if (localStorageData) {
              return JSON.parse(localStorageData);
            } else {
              const response = await axios.get(url);
              const filmData = response.data;
              
              localStorage.setItem(`film_${filmId}`, JSON.stringify(filmData));

              return filmData;
            }
          })
        );

        setFilms(filmsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados dos filmes:', error);
        setIsLoading(false);
      }
    };

    fetchFilms();
  }, [filmUrls]);

  const filmNamesString = films.map((film) => film.title).join(', ');

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        films.length > 0 && (
          <Typography>{filmNamesString}</Typography>
        )
      )}
    </div>
  );
};

export default FilmTable;
