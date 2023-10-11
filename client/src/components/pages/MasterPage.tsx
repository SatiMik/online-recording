import { Box, Button, TextField } from '@mui/material'
import React from 'react'

export default function MasterPage(): JSX.Element {
   
   
   
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
        <TextField
          name="title"
          variant="outlined"
          placeholder="Title"
          value={inputs.title}
          onChange={changeHandler}
        />
        <TextField
          name="description"
          variant="outlined"
          placeholder="Description"
          value={inputs.description}
          onChange={changeHandler}
        />
        <TextField
          name="image"
          variant="outlined"
          placeholder="Image"
          value={inputs.image}
          onChange={changeHandler}
        />
  
        <Button
          type="submit"
          variant="outlined"
          size="large"
          onClick={() => void dispatch(addBookThunk(inputs))}
        >
          Send
        </Button>
      </Box>
    )
}
