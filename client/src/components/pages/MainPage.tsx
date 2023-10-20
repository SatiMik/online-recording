import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getMastersThunk } from '../../redux/slices/master/MasterThunks';
import MasterCard from '../ui/masters/MasterCard';
import ImageCarousel from './ImageCarousel';

export default function MainPage(): JSX.Element {
  const masters = useAppSelector((store) => store.masters);

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getMastersThunk());
  }, []);

  const user = useAppSelector((store) => store.user);
  return (
    <>
      <div className="offer">
        <div className="filter">&nbsp;</div>
        <Container>
          <div className="inner">
            <h1>Преобразуй свою красоту с нами</h1>
            <h4>
              Мы создаем искусство из вашей природной красоты. Наши опытные стилисты подчеркнут вашу
              уникальность и дадут вам уверенность. Доверьте нам заботу о вашей красоте
            </h4>
            <a className="record" href="/online-record">
              Записаться онлайн
            </a>
          </div>
        </Container>
      </div>
      <div className="about">
        <Container>
          <div className="boxtext">
            <h2> О нас </h2>
            <p>
              Мы хотели сделать невозможное — предоставить качественный сервис каждому, чтобы любой
              человек, вне зависимости от своего достатка, возраста, вкусовых предпочтений, смог
              получить качественную услугу и стать еще счастливее. Сегодня мы — это салон красоты с
              модным интерьером и своей неповторимой атмосферой.Это не только салонные
              парикмахерские услуги. В нашем арсенале имеются косметологические процедуры,
              аппаратные технологии, массажи различных видов, SPA, а также команда профессиональных
              стилистов.
            </p>
          </div>
        </Container>
      </div>
      <Container>
        <div className="checkrow">
          <div className="item">
            <img
              src="https://gorod-krasoti.com/wp-content/uploads/2021/08/specialists.svg"
              alt=""
            />
            <h5>лучшие специальсты</h5>
          </div>
          <div className="item">
            <img src="https://gorod-krasoti.com/wp-content/uploads/2021/08/krasota.svg" alt="" />
            <h5>красота и комфорт</h5>
          </div>
          <div className="item">
            <img src="https://gorod-krasoti.com/wp-content/uploads/2021/08/acii.svg" alt="" />
            <h5>скидки и акции</h5>
          </div>
          <div className="item">
            <img src="https://gorod-krasoti.com/wp-content/uploads/2021/08/location.svg" alt="" />
            <h5>удобное расположение</h5>
          </div>
          <div className="item">
            <img src="https://gorod-krasoti.com/wp-content/uploads/2021/08/card.svg" alt="" />
            <h5>доступные цены</h5>
          </div>
        </div>
      </Container>
      <Container className="slider">
        <ImageCarousel />
        <Box mt={5}>
          <h2>Наши мастера</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {masters?.map((master) => (
              <div className="cardMaster" key={master.id} style={{ padding: '10px' }}>
                <MasterCard master={master} user={user} />
              </div>
            ))}
          </div>
        </Box>
      </Container>
    </>
  );
}
