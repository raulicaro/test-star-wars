import React, { useState, useEffect } from 'react';
import axios from "axios";
import CharacterTable from '../../components/CharacterTable';
import FilmTable from '../../components/FilmTable';
import { findPlanetUrl } from '../../functions/utils';
import { Box, BottomNavigation, Button, Card, CardActionArea, CardContent, CardMedia, Container, Divider , Grid, LinearProgress, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './Home.css'
import StarWarsLogo from '../../images/Vector.svg';
import ClimateIcon from '../../images/thermometer 1.svg';
import TerrainIcon from '../../images/Group 3563.svg';
import PopulationIcon from '../../images/audience 1.svg'
import FooterIcon from '../../images/Group 1.svg';

const Home = () => {
  const [planet, setPlanet] = useState(null);
  const [searchPlanet, setSearchPlanet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchSearch = async (searchPlanet) => {
    setIsLoading(true);
    if(searchPlanet !== '') {
      const searchResults = await axios
       .get(`https://swapi.dev/api/planets/?search=${searchPlanet}`)
       .then(response => response.data.results);
      setPlanet(searchResults[0]);
    }
    setIsLoading(false);
  } 
  
  const handleSearch = (event) => {
    event.preventDefault(); 
    fetchSearch(searchPlanet);
  };
      
  return (
    <Box id='hero'>
      <Container maxWidth='false' className='container-background'>          
          <Grid container   direction="column" justifyContent='space-between' alignItems="center">
            <Grid item>  
              <Typography  style={{ textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Montserrat', fontWeight: '400', textTransform: 'uppercase', letterSpacing: 2.48, wordWrap: 'break-word' }} align='center' variant='h3'>
                PLANET SEARCH
              </Typography>
              <img src={StarWarsLogo} alt='Starwarslogo' onClick={() => window.location.reload()} className='logo-image'/>
            </Grid>
          </Grid>
          {isLoading ? <LinearProgress color='secondary'/> : planet !== null ?  (
            <Grid item align='center'>
                <div className='card-container'>
                  <Card style={{width: 592, height: 381, background: 'white', borderRadius: 10}}>
                    <CardActionArea>
                      <CardMedia/>
                      <CardContent>
                        <Grid container direction='column'>
                          <Grid container direction='row' justifyContent="space-around"> 
                            <img className='planet-img' src={findPlanetUrl(planet.name)} alt='planet-img'/>
                            <Grid item>
                              <Grid container direction='column'>
                               
                                <Typography>
                                  Planet:
                                </Typography>
                                <Typography variant='h4'>
                                  {planet.name}
                                </Typography>
                              </Grid>                            
                              </Grid>
                              <Grid item>
                                <Grid container direction='row'>
                                  <img src={ClimateIcon} alt='Climatelogo'/>
                                  <Typography>
                                    Climate:
                                  </Typography>
                                  <Typography >
                                    {planet.climate}
                                  </Typography>                            
                              </Grid>
                              <Grid item>
                                <Grid container direction='row'>
                                  <img src={TerrainIcon} alt='Terrainlogo'/>
                                  <Typography>
                                    Terrain:
                                  </Typography>
                                  <Typography >
                                    {planet.terrain}
                                  </Typography>
                                </Grid>                            
                              </Grid>
                              <Grid item>
                                <Grid container direction='row'>
                                  <img src={PopulationIcon} alt='Populationlogo'/>
                                  <Typography>
                                    Population:
                                  </Typography>
                                  <Typography >
                                    {planet.population}
                                  </Typography>
                                </Grid>                            
                              </Grid>
                            </Grid>
                            <Grid container justifyContent="flex-start" >
                              <div style={{width: 538, height: 114, background: '#F1F1F1', borderRadius: 8}}>
                                <div style={{width: 98, height: 24, color: 'black', fontSize: 14, fontFamily: 'Montserrat', fontWeight: '700', wordWrap: 'break-word', justifyContent:'flex-start'}}>Residents:</div>
                                <Divider/>
                                <CharacterTable characterUrls={planet?.residents}/>
                              </div>
                            </Grid>
                            <Grid container justifyContent="flex-start" >
                              <div style={{width: 538, height: 114, background: '#F1F1F1', borderRadius: 8}}>
                                <div style={{width: 98, height: 24, color: 'black', fontSize: 14, fontFamily: 'Montserrat', fontWeight: '700', wordWrap: 'break-word', justifyContent:'flex-start'}}>Films:</div>
                                <Divider/>
                                <FilmTable filmUrls={planet?.films}/>
                              </div>
                            </Grid> 
                        </Grid>
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                  </Card>                  
                </div>  
            </Grid>
          ):(
            <Grid container spacing={0} alignContent='center' direction="row" justifyContent="center" className='container-center'>
              <Grid item>
                <Grid className='container-mars'>
                  <div className='mars-image'/>                
                </Grid>
              </Grid>
              <Grid item className='container-form'>
                <Grid container direction="column" justifyContent='center' alignItems="center" >
                  <Typography align='justify' style={{ width: 292, height: 97, textAlign: 'center', color: 'white', fontSize: 20, fontFamily: 'Montserrat', fontWeight: '400', wordWrap: 'break-word' }} variant='h3'>
                    Discover all the information about Planets of the Star Wars Saga
                  </Typography>
                  <form onSubmit={handleSearch}className='form-filter'>
                    <TextField
                      id="outlined-full-width"
                      style={{
                        margin: 8,
                        borderRadius: '5px',
                        background: '#FFF',
                        fontSize:'4rem'
                      }}
                      placeholder="Enter the name in the planet"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      value={searchPlanet}
                      onChange={(e) => setSearchPlanet(e.target.value)}
                    />
                    <Button type='submit' startIcon={<SearchIcon/>} fullWidth size='large' variant="contained" color="secondary">
                      Search
                    </Button>
                  </form>
                </Grid>
              </Grid>
            </Grid>
            )
          }  
      </Container>
      <BottomNavigation >
        <Grid container justifyContent='space-evenly' alignItems='center'>
          {isLargeScreen && <Typography>
            STARUARS LTDA | CNPJ: 77.777.777/0007-07 | 2023 | Todos os direitos reservados
          </Typography>}
          {isLargeScreen && <Divider orientation='vertical'/>}
          <img src={FooterIcon} alt='Footer-icon'/>
        </Grid>
      </BottomNavigation>
    </Box>
  );
};

export default Home;
