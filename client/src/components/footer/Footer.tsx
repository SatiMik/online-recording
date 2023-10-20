import React from 'react';
import { Box, CardContent, Grid, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';
import './FooterStyle.css';
import fot from '../../../public/footer/fot.jpg';
// import fot1 from '../../../public/footer/fit1.jpg';

export default function FooterNew(): JSX.Element {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        width: '100%',
        borderTop: 'none',
        position: 'relative',
        bottom: 0,
        background: 'linear-gradient(to top, #D1C1B4, transparent)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          mx: 'auto',
          background: 'linear-gradient(to top, #D1C1B4, transparent)',
          borderTop: 'none',
        }}
      >
        <CardContent>
          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <ul
                className="footer__redes-wrapper"
                style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
              >
                {/* <li> */}
                <Link
                  href="#"
                  className="footer__link"
                  underline="none"
                  sx={{ marginRight: '30px' }}
                >
                  <Facebook /> facebook
                </Link>
                {/* </li>
                                  <li> */}
                <Link
                  href="#"
                  className="footer__link"
                  underline="none"
                  sx={{ marginRight: '30px' }}
                >
                  <Twitter /> twitter
                </Link>
                {/* </li>
                                  <li> */}
                <Link
                  href="#"
                  className="footer__link"
                  underline="none"
                  sx={{ marginRight: '30px' }}
                >
                  <Instagram /> instagram
                </Link>
                {/* </li>
                                  <li> */}
                <Link
                  href="#"
                  className="footer__link"
                  underline="none"
                  sx={{ marginRight: '30px' }}
                >
                  <YouTube /> youtube
                </Link>
                {/* </li> */}
              </ul>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
      {/* <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  © 2022, All rights reserved
              </Typography> */}
    </Box>
  );
}
