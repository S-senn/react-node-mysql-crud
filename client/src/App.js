import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({ name: "", cost: "", category: "" });

  // Charger les jeux depuis le backend
  const fetchGames = async () => {
    try {
      const response = await axios.get("http://backend:3001/games");
      setGames(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des jeux :", error);
    }
  };

  // Ajouter un jeu
  const addGame = async () => {
    if (!form.name || !form.cost || !form.category) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    try {
      await axios.post("http://backend:3001/register", form);
      fetchGames(); // Rafraîchir la liste

      // Réinitialiser les champs après ajout
      setForm({ name: "", cost: "", category: "" });
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un jeu :", error);
    }
  };

  // Supprimer un jeu
  const deleteGame = async (id) => {
    try {
      await axios.delete(`http://backend:3001/delete/${id}`);
      fetchGames(); // Rafraîchir la liste
    } catch (error) {
      console.error("Erreur lors de la suppression d'un jeu :", error);
    }
  };

  // Gestion du formulaire
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Charger les jeux au démarrage
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div>
      <h1>Game Shop</h1>

      {/* Formulaire d'ajout */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="cost"
          placeholder="Prix"
          value={form.cost}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Catégorie"
          value={form.category}
          onChange={handleChange}
        />
        <button onClick={addGame}>Ajouter</button>
      </div>

      {/* Liste des jeux */}
      <ul>
        {games.map((game) => (
          <li key={game.idgames}>
            {game.name} - {game.cost}€ - {game.category}{" "}
            <button onClick={() => deleteGame(game.idgames)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
