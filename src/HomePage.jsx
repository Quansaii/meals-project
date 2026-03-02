import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export function HomePage({ onUpdate }) {
  const navigate = useNavigate();

  const [randomRecipes, setRandomRecipes] = useState([]);
  const [query, setQuery] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getRandomRecipes = async () => {
      try {
        setIsError(false);
        const url = "https://www.themealdb.com/api/json/v1/1/random.php";

        const responses = await Promise.all([
          fetch(url),
          fetch(url),
          fetch(url),
        ]);

        responses.forEach((res) => {
          if (!res.ok) throw new Error();
        });

        const data = await Promise.all(responses.map((res) => res.json()));
        const meals = data.map((item) => item.meals[0]);
        console.log(meals);
        setRandomRecipes(meals);
      } catch (error) {
        setIsError(true);
      }
    };

    getRandomRecipes();
  }, []);

  const searchMeal = () => {
    if (inputValue.trim()) setQuery(inputValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error();

        const data = await response.json();

        const foundMeal = data.meals[0];

        onUpdate(foundMeal);

        navigate("/recipe", { state: { recipe: foundMeal } });
      } catch (error) {
        setIsError(true);
      }
    };

    fetchData();
  }, [query]);

  return (
    <>
      <title>Home Page</title>
      <header>
        <div className="header-content">
          <h1>YummyRecipe</h1>
          <form
            className="search-box"
            onSubmit={(e) => {
              e.preventDefault();
              searchMeal();
            }}
          >
            <input
              type="text"
              placeholder="Enter a meal name"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="btn-primary">
              Find
            </button>
          </form>
        </div>
      </header>

      <main className="container">
        <section className="recipe-grid">
          {randomRecipes.map((recipe, index) => (
            <Link
              key={recipe?.idMeal || index}
              to="/recipe"
              state={{ recipe }}
              className="recipe-card"
            >
              <div className="card-image">
                <img src={recipe?.strMealThumb} alt={recipe?.strMeal} />
              </div>
              <div className="card-info">
                <span className="category">{recipe?.strCategory}</span>
                <h3>{recipe?.strMeal}</h3>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
