import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { DialogContent } from '@mui/material';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Slider from '../components/Slider/Slider';
import Form from '../components/Form/Form';
import AllpassPlotting from '../components/AllpassPlotting/AllpassPlotting';
import './Allpass.css'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    setOpen(true);
    e.preventDefault()
  };

  const handleClose = (e) => {
    setOpen(false);
    e.preventDefault()
  };

  return (
    <div>
      <button variant="outlined" onClick={handleClickOpen} style={{backgroundColor: "#3b5998",color: "white", borderRadius: "10px",border: "none",width: "500px !important",fontSize: "50px",fontFamily: "'Poppins', sans-serif", marginTop: "20px", marginBottom:"10px"}}>Correct phase</button>

   
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar  style={{backgroundColor: "#3b5998"}}   sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Row>
            <Col style={{ display: "flex", flexDirection: "column", alignItems: "center" }} lg={4} md={6} sm={6} xs={12}>
              <Slider />
            </Col>
            <Col style={{ display: "flex", flexDirection: "column", alignItems: "center" }} lg={4} md={6} sm={6} xs={12}>
              <div className='border'>
              <Form />
              </div>
            </Col>
            <Col style={{ display: "flex", flexDirection: "column", alignItems: "center" }} lg={4} md={6} sm={6} xs={12}>
              <AllpassPlotting />
            </Col>
          </Row>
        </DialogContent>
      </Dialog>
    </div>
  );
}