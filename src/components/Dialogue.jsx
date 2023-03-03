import React from "react";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddProduct from './Category'

export default function Dialogue() {
const [open, setOpen] = React.useState(false);

const handleClickToOpen = () => {
	setOpen(true);
};

const handleToClose = () => {
	setOpen(false);
};


return (
	<div stlye={{}}>
	<Button variant="outlined" color="primary"
			onClick={handleClickToOpen}>
		Add Category
	</Button>
	<Dialog open={open} onClose={handleToClose}>
		<DialogTitle>Please enter your category here</DialogTitle>
		<DialogContent>
		<DialogContentText>
			<AddProduct/>
		</DialogContentText>
		</DialogContent>
		<DialogActions>
		{/* <Button onClick={handleToClose}
				color="primary" autoFocus>
			Close
		</Button> */}
		</DialogActions>
	</Dialog>
	</div>
);
}
