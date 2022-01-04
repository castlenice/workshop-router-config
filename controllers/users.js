import pool from "../db/pg.js";

export const getAllUsers = (req, res) => {
  //datenbank abfragen select * from authors
  pool
    .query("SELECT * FROM hogwarts")
    .then((data) => res.json({ hogwarts: data.rows }))
    .catch((err) => console.log(err));
};

export const getSingleUser = (req, res) => {
  //datenbank abfragen select * from authors where id=xy
  const id = req.params.id;
  pool.query("SELECT * from hogwarts WHERE id=$1", [id]).then((data) => {
    //$1 entspricht "id", $2 wuerde zb "name" entsprechen usw.
    // console.log(data);
    if (data.rowCount === 0) {
      res.status(404).send("User mit dieser ID existiert nicht");
    } else {
      res.status(200).json(data.rows[0]);
    }
  });
};

export const createUser = (req, res) => {
  const { firstname, lastname, house } = req.body;
  pool
    .query(
      "INSERT INTO hogwarts (firstname, lastname, house) VALUES ($1, $2, $3) RETURNING *",
      [firstname, lastname, house]
    )
    .then((data) => {
      res.status(201).json(data.rows[0]);
    })
    .catch((err) => console.log(err));
  //INSERT INTO hogwarts
};

export const deleteUser = (req, res) => {
  const id = req.params.id;
  pool
    .query("DELETE FROM hogwarts WHERE id=$1", [id])
    .then((data) => {
      //$1 entspricht "id", $2 wuerde zb "name" entsprechen usw.
      // console.log(data);
      if (data.rowCount === 0) {
        res.status(404).send("User mit dieser ID existiert nicht");
      } else {
        res.status(200).send("User erfolgreich geloescht");
      }
    })
    .catch((err) => res.status(500).json(err));
};

export const updateUser = (req, res) => {
  const id = req.params.id;
  const { firstname, lastname, house } = req.body;
  pool
    .query(
      "UPDATE hogwarts SET firstname=$1, lastname=$2, house=$3 WHERE id=$4 RETURNING *",
      [firstname, lastname, house, id]
    )
    .then((data) => {
      if (data.rowCount === 0) {
        res.status(404).send("User mit dieser ID existiert nicht");
      } else {
        res.status(200).json(data.rows[0]);
      }
    })
    .catch((err) => res.status(500).json(err));
};
