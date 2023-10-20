import React from 'react';
import { Box, CardMedia, Typography } from '@mui/material';
import { useAppSelector } from '../../redux/hooks';
import RevueForm from '../ui/revue/RevueForm';
import RevueNotAcceptedList from '../ui/revue/RevueNotAcceptedList';
import RevueAcceptedList from '../ui/revue/RevueAcceptedList';

export default function RevuePage(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  console.log(user);
  
  return (
    <>
      <Box>

        <CardMedia
          component="img"
          sx={{ width: '100%', height: '500px', opacity: 0.4 }}
          image="https://mykaleidoscope.ru/uploads/posts/2022-08/1660606535_17-mykaleidoscope-ru-p-mokhito-salon-krasoti-dizain-krasivo-foto-18.jpg"
          alt="Live from space album cover"
        />
        <Box sx={{ marginTop: '-20%', marginBottom: '20%' }}>

          <Typography
            variant="h2"
            style={{
              color: '#566F5F',
              position: 'relative',
              marginLeft: '25%',

              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontWeight: 'bold',
            }}
          >
            ОТЗЫВЫ
          </Typography>
          <Typography
            variant="h5"
            style={{
              color: 'black',
              position: 'relative',
              top: '55%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            Предлагаем вам ознакомиться с реальными отзывами наших клиентов
          </Typography>
        </Box>
      </Box>
      {user.status === 'logged' && user.isAdmin && <RevueNotAcceptedList />}

      <RevueAcceptedList />
      {user.status === 'logged' && (
        <>
          <Typography
            variant="h5"
            style={{
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '60px',
              marginTop: '60px',
            }}
          >
            Оставьте свой отзыв
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: '#566F5F' }}>
            <CardMedia
              component="img"
              sx={{ width: '700px', height: '500px' }}
              image="http://klublady.ru/uploads/posts/2022-02/1644286782_5-klublady-ru-p-frantsuzhenki-s-korotkimi-strizhkami-foto-5.jpg"
              alt="Live from space album cover"
            />
            {(user.status === 'logged' && !user.isAdmin) || user.status === 'guest' ? (
              <RevueForm />
            ) : null}
          </Box>
        </>
      )}
    </>
  );
}
