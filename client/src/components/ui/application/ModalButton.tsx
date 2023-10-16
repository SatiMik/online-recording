import { Box, Dialog, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { addApplicationThunk } from '../../../redux/slices/application/ApplicationThunks';


type ModalButtonProps = {
    open: boolean
    setOpen: (open: boolean) => void
}
export default function ModalButton({ open, setOpen }: ModalButtonProps): JSX.Element {
    const dispatch = useAppDispatch();
    const [inputs, setInputs] = useState({ clientName: '', phone: '' });

    const user = useAppSelector((store) => store.user);
    const [userInputs, setUserInputs] = useState({ clientName: user.name, phone: user.phone });

    const [applicationCounter, setApplicationCounter] = useState(0);
    const counter = (): void => {
        setApplicationCounter(prev => prev + 1);
    }
    const handleClose = (): void => {
        setOpen(false)
    }
    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    return (
        <Box>
            {
                user.status === 'logged' && (
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title-logout"
                    >
                        <DialogContent>
                            <DialogContentText sx={{ textAlign: 'center' }}>
                                Подтвердите данные
                            </DialogContentText>
                            <Box sx={{ width: '300px' }}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="clientName"
                                    name="clientName"
                                    label="Ваше Имя"
                                    type="name"
                                    fullWidth
                                    variant="standard"
                                    onChange={changeHandler}
                                    value={userInputs.clientName}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="phone"
                                    name="phone"
                                    label="Номер телефона"
                                    type="name"
                                    fullWidth
                                    variant="standard"
                                    onChange={changeHandler}
                                    value={userInputs.phone}
                                />

                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Закрыть</Button>
                            <Button onClick={() => void dispatch(addApplicationThunk({ phone: userInputs.phone, clientName: userInputs.clientName }))}>Да</Button>
                        </DialogActions>
                    </Dialog >
                )
            }
            {
                user.status === 'guest' && (
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title-logout"
                    >
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle sx={{ textAlign: 'center' }}>Заявка на звонок от администратора</DialogTitle>
                            <DialogContent>
                                <DialogContentText sx={{ textAlign: 'center' }}>
                                    Заполните данные для обратной связи
                                </DialogContentText>
                                <Box sx={{ width: '300px' }}>


                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="clientName"
                                        name="clientName"
                                        label="Ваше Имя"
                                        type="name"
                                        fullWidth
                                        variant="standard"
                                        onChange={changeHandler}
                                        value={inputs.clientName}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="phone"
                                        name="phone"
                                        label="Номер телефона"
                                        type="name"
                                        fullWidth
                                        variant="standard"
                                        onChange={changeHandler}
                                        value={inputs.phone}
                                    />
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Закрыть</Button>
                                <Button onClick={() => void dispatch(addApplicationThunk({ phone: inputs.phone, clientName: inputs.clientName }))}>Отправить</Button>
                            </DialogActions>
                        </Dialog>
                    </Dialog>
                )
            }
        </Box >
    );
}