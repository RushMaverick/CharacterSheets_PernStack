import express, { Request, Response } from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();

//Middleware
app.use(express.json());
app.use(cors());


interface Sheet {
	sheet_id: number;
	character_name: string;
	character_class: string;
	level: number;
	race: string;
	background: string;
	bio: string;
}

//Routes

//create sheet
app.post("/sheets", async (req: Request, res: Response) => {
	try {
		const {
			character_name,
			race,
			character_class,
			level,
			background,
			bio
		} = req.body;
		const newSheet = await pool.query(
			"INSERT INTO sheet (character_name, race, character_class, level, background, bio) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
			[character_name, race, character_class, level, background, bio]
		);
		res.json(newSheet.rows[0]);
	} catch (err) {
		console.error((err as Error).message);
	}
});

//get all sheets
app.get("/sheets", async (req: Request, res: Response) => {
	try {
		const allSheets = await pool.query("SELECT * FROM sheet");
		res.json(allSheets.rows);
	} catch (err) {
		console.error((err as Error).message);
	}
});

//get a sheet
app.get("/sheets/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const sheet = await pool.query(
			"SELECT * FROM sheet WHERE sheet_id = $1",
			[id]
		);
		res.json(sheet.rows[0]);
	} catch (err) {
		console.error((err as Error).message);
	}
});

//Dynamically update the sheet if there are multiple changes.
app.put("/sheets/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { character_name, character_class, level, race, background, bio } = req.body;

		const updates: string[] = [];
		const values: any[] = [];
		let paramCount : number = 1;

		if (character_name !== undefined) {
			updates.push(`character_name = $${paramCount}`);
			values.push(character_name);
			paramCount++;
		}
		if (character_class !== undefined) {
			updates.push(`character_class = $${paramCount}`);
			values.push(character_class);
			paramCount++;
		}
		if (level !== undefined) {
			updates.push(`level = $${paramCount}`);
			values.push(level);
			paramCount++;
		}
		if (race !== undefined) {
			updates.push(`race = $${paramCount}`);
			values.push(race);
			paramCount++;
		}
		if (background !== undefined) {
			updates.push(`background = $${paramCount}`);
			values.push(background);
			paramCount++;
		}
		if (bio !== undefined) {
			updates.push(`bio = $${paramCount}`);
			values.push(bio);
			paramCount++;
		}

		// Add the id to the values array
		values.push(id);

		const updateSheet = await pool.query(
			`UPDATE sheet SET ${updates.join(", ")} WHERE sheet_id = $${paramCount} RETURNING *`,
			values
		);
		res.json("Sheet was updated!");
	} catch (err) {
		console.error((err as Error).message);
	}
});

//delete a sheet
app.delete("/sheets/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const deleteSheet = await pool.query(
			"DELETE FROM sheet WHERE sheet_id = $1",
			[id]
		);
		res.json("Sheet was deleted!");
	} catch (err) {
		console.error((err as Error).message);
	}
});

app.listen(5001, () => {
	console.log("server has started on port 5001");
});
