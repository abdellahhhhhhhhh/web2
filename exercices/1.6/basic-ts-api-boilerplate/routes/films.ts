import { Router } from "express";

import { Film, newFilm } from "../types";

import { containsOnlyExpectedKeys} from "../utils/validate";

const router = Router();

const expectedKeys = [
  "title",
  "director",
  "duration",
  "budget",
  "description",
  "imageUrl", 
];

const defaultfilms: Film[] = [
  {
    id: 1,
    title: "Arrow",
    director: "Abdellah",
    duration: 60,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/74/Shang-Chi_and_the_Legend_of_the_Ten_Rings_poster.jpeg",
    description:
      "Shang-Chi, the master of unarmed weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.",
    budget: 150,
  },

  {
    id: 2,
    title: "Vinland",
    director: "canette",
    duration: 180,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    budget: 63,
  },

  {
    id: 3,
    title: "One Piece",
    director: "smex",
    duration: 360,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/7d/Summer_Wars_poster.jpg",
    description:
      "A young math genius solves a complex equation and inadvertently puts a virtual world's artificial intelligence in a position to destroy Earth.",
    budget: 18.7,
  },

  {
    id: 4,
    title: "The Meyerowitz Stories",
    director: "Noah Baumbach",
    duration: 112,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/a/af/The_Meyerowitz_Stories.png",
    description:
      "An estranged family gathers together in New York City for an event celebrating the artistic work of their father.",
  },

  {
    id: 5,
    title: "her",
    director: "Spike Jonze",
    duration: 126,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg",
    description:
      "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
    budget: 23,
  },
];

router.get("/", (req, res) => {
  if (req.query["minimum-duration"] === undefined) {
    return res.send(defaultfilms);
  }
  const minduration = Number(req.query["minimum-duration"]);

  if (isNaN(minduration) || minduration <= 0) {
    res.sendStatus(400);
  }
  const filteredFilms = defaultfilms.filter(
    (film) => film.duration >= minduration
  );

  return res.send(filteredFilms);
});

// Read a film by id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const film = defaultfilms.find((film) => film.id === id);

  if (film === undefined) {
    return res.sendStatus(404);
  }

  return res.send(film);
});

// Create a new film
router.post("/", (req, res) => {
  const body: unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0 ||
    ("budget" in body &&
      (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
  ) {
    return res.sendStatus(400);
  }

  // Challenge : To be complete, we should check that the keys of the body object are only the ones we expect
  const expectedKeys = [
    "title",
    "director",
    "duration",
    "budget",
    "description",
    "imageUrl",
  ];
  const bodyKeys = Object.keys(body);
  const extraKeys = bodyKeys.filter((key) => !expectedKeys.includes(key));
  if (extraKeys.length > 0) {
    return res.sendStatus(400);
  }
  // End of challenge

  const newFilm = body as newFilm;

  const existingFilm = defaultfilms.find(
    (film)=>
      film.title.toLowerCase() === newFilm.title.toLowerCase() && 
      film.director.toLowerCase() === newFilm.director.toLowerCase()
  );

  if(existingFilm){
    return res.sendStatus(409);
  }

  const nextId =
    defaultfilms.reduce((acc, film) => (film.id > acc ? film.id : acc), 0) + 1;

  const addedFilm: Film = { id: nextId, ...newFilm };

  defaultfilms.push(addedFilm);

  return res.json(addedFilm);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = defaultfilms.findIndex((film) => film.id === id);
  if (index === -1) {
    return res.sendStatus(404);
  }
  const deletedElements = defaultfilms.splice(index, 1); // splice() returns an array of the deleted elements
  return res.json(deletedElements[0]);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = defaultfilms.find((film) => film.id === id);
  if (!film) {
    return res.sendStatus(404);
  }

  const body: unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    ("title" in body &&
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("image" in body &&
      (typeof body.image !== "string" || !body.image.trim())) ||
    ("volume" in body &&
      (typeof body.volume !== "number" || body.volume <= 0)) ||
    ("price" in body && (typeof body.price !== "number" || body.price <= 0))
  ) {
    return res.sendStatus(400);
  }

  const { title,director, duration, budget, description, imageUrl}: Partial<newFilm> = body;

  if (title) {
    film.title = title;
  }
  if (director) {
    film.director = director;
  }
  if (duration) {
    film.duration = duration;
  }
  if (budget) {
    film.budget = budget;
  }
  if(description){
    film.description = description;
  }
  if(imageUrl){
    film.imageUrl = imageUrl;
  }

  return res.json(film);
});

// Update a film only if all properties are given or create it if it does not exist and the id is not existant
router.put("/:id", (req, res) => {
  const body: unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0 ||
    ("budget" in body &&
      (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
  ) {
    return res.sendStatus(400);
  }

    // Challenge of ex1.6 : To be complete, we should check that the keys of the body object are only the ones we expect
    if (!containsOnlyExpectedKeys(body, expectedKeys)) {
      return res.sendStatus(400);
    }
  

  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const indexOfFilmToUpdate = defaultfilms.findIndex((film) => film.id === id);
  // Deal with the film creation if it does not exist
  if (indexOfFilmToUpdate < 0) {
    const newFilm = body as newFilm;

    // Challenge of ex1.6 : To be complete, check that the film does not already exist
    const existingFilm = defaultfilms.find(
      (film) =>
        film.title.toLowerCase() === newFilm.title.toLowerCase() &&
        film.director.toLowerCase() === newFilm.director.toLowerCase()
    );

    if (existingFilm) {
      return res.sendStatus(409);
    }
    // End of challenge

    const nextId =
      defaultfilms.reduce((acc, film) => (film.id > acc ? film.id : acc), 0) + 1;

    const addedFilm = { id: nextId, ...newFilm };

    defaultfilms.push(addedFilm);

    return res.json(addedFilm);
  }

  // Update the film
  const updatedFilm = { ...defaultfilms[indexOfFilmToUpdate], ...body } as Film;

  defaultfilms[indexOfFilmToUpdate] = updatedFilm;

  return res.send(updatedFilm);
});


export default router;
