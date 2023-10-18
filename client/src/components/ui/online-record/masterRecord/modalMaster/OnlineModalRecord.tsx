import { Autocomplete, Box, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { getMasterServicesThunk } from '../../../../../redux/slices/masterService/MasterServiceThunk';

type ModalRecordProps = {
    open: boolean,
    setOpen: (open: boolean) => void,
    master: any,
}
export default function OnlineModalRecord({ open, setOpen, master, }: ModalRecordProps): JSX.Element {
    // console.log(master, '-------------------- master');

    const services = useAppSelector((store) => store.masterService);

    const handleClose = (): void => {
        setOpen(false)
    }

    const masterId = useParams()
    // console.log(masterId, '-------------------- masterId');

    const dispatch = useAppDispatch();
    useEffect(() => {
        void dispatch(getMasterServicesThunk())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const servId = useAppSelector((store) => store.masterService);

    const filteredServices = servId.filter((service) => service.masterId === masterId);

    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
    ]

    const style = {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Typography id="keep-mounted-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                    Заполните форму для записи
                </Typography>
                <Typography id="keep-mounted-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                    Вы хотите записаться к {master.name}
                </Typography>


                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={filteredServices}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Выберите услугу" />}
                />

            </Box>
        </Modal>

    )
}
