import { Box, Dialog, DialogTitle } from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import { useAppSelector } from '../../redux/hooks'


type ModalButtonProps = {
    open: boolean
    setOpen: (open: boolean) => void
}
export default function ModalButton({ open, setOpen }: ModalButtonProps): JSX.Element {
    const handleClose = (): void => {
        setOpen(false)
    }
    const user = useAppSelector((store) => store.user);

    return (
        <Box>
            {
                user.status === 'logged' && (
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title-logout"
                    >
                        <DialogTitle id="alert-dialog-title-logout">Мы с вами свяжемся</DialogTitle>
                    </Dialog>
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
                                    />
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Закрыть</Button>
                                <Button >Отправить</Button>
                            </DialogActions>
                        </Dialog>
                    </Dialog>
                )

            }
        </Box>
    )
}
