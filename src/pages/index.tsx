import {
	Button,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Paper,
	TextField,
	Typography
} from "@material-ui/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";

interface Chore {
	value: string;
	completed: boolean;
}

function toTitleCase(str) {
	// From https://stackoverflow.com/a/196991/12402400
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}
const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column"
	},
	wrapper: {
		padding: theme.spacing(4),
		width: "400px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column"
	},
	newChoreWrapper: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexWrap: "wrap"
	},
	newChoreInputField: {},
	choresList: { width: "100%", height: 360, overflowY: "scroll" },
	choresListItem: {
		width: "100%"
	},
	completeButton: {
		"&>*:hover, &>*:focus": { color: theme.palette.success.main },
		"&>*:active": { color: theme.palette.success.dark }
	},
	completedIcon: { color: theme.palette.success.main },
	deleteButton: {
		"&>*:hover, &>*:focus": { color: theme.palette.error.main },
		"&>*:active": { color: theme.palette.error.dark }
	}
}));

export default function Home() {
	const classes = useStyles();

	const [chores, defualtSetChores]: [
		Chore[],
		Dispatch<SetStateAction<Chore[]>>
	] = useState([]);

	useEffect(() => {
		const storageChores = localStorage.getItem("chores");
		if (storageChores) {
			defualtSetChores(JSON.parse(storageChores));
		}
	});

	function setChores(newChores) {
		localStorage.setItem("chores", JSON.stringify(newChores));
		defualtSetChores(newChores);
	}

	function handleSubmit(e) {
		e.preventDefault();
		const newChore: Chore = {
			value: e.target["chore"].value.trim().toLowerCase(),
			completed: false
		};
		const newChores = [...chores];
		newChores.unshift(newChore);
		setChores(newChores);
		e.target["chore"].value = "";
	}

	return (
		<>
			<Head>
				<title>Chores</title>
			</Head>
			<div className={classes.root}>
				<Paper elevation={3} className={classes.wrapper}>
					<Typography variant="h4">Chores</Typography>
					<form
						className={classes.newChoreWrapper}
						onSubmit={(e) => {
							handleSubmit(e);
						}}
					>
						<TextField
							className={classes.newChoreInputField}
							id="chore-input"
							name="chore"
							placeholder="Do the dishes"
							label="Create new chore"
							variant="standard"
							autoComplete="off"
							required
						/>
						<Button
							endIcon={<AddCircleOutlineIcon />}
							variant="outlined"
							type="submit"
						>
							create
						</Button>
					</form>
					<ChoresList chores={chores} setChores={setChores} />
				</Paper>
			</div>
		</>
	);
}

function ChoresList({
	chores,
	setChores
}: {
	chores: Chore[];
	setChores: Function;
}) {
	function setChoreAtIndex(index: number, newChore: Chore) {
		let newChores = [...chores];
		newChores[index] = newChore;
		setChores(newChores);
	}

	const classes = useStyles();
	return (
		<List className={classes.choresList}>
			{chores.map((chore: Chore, i) => {
				const labelId = `checkbox-list-label-${chore.value}`;

				return (
					<ListItem
						className={classes.choresListItem}
						key={chore.value}
						role={undefined}
						dense
						button
						onClick={() => {
							setChoreAtIndex(i, {
								value: chore.value,
								completed: !chore.completed
							});
						}}
					>
						<ListItemIcon>
							<IconButton className={classes.completeButton}>
								{chore.completed ? (
									<CheckCircleIcon
										className={classes.completedIcon}
									/>
								) : (
									<CheckCircleOutlineIcon />
								)}
							</IconButton>
						</ListItemIcon>
						<ListItemText id={labelId} primary={chore.value} />
						<ListItemSecondaryAction>
							<IconButton
								edge="end"
								aria-label="remove"
								className={classes.deleteButton}
								onClick={() => {
									let newChores = [...chores];
									newChores.splice(i, 1);
									setChores(newChores);
								}}
							>
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				);
			})}
		</List>
	);
}
