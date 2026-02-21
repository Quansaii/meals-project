import { useLocation, Link } from "react-router";

export function CreateRecipePage() {
  const location = useLocation();
  const recipe = location.state?.recipe;

  if (!recipe) {
    return (
      <div className="container">
        <h2>No Recipe</h2>
        <Link to="/">Back to Home Page</Link>
      </div>
    );
  }

  const videoId = recipe.strYoutube ? recipe.strYoutube.split("v=")[1] : null;

  return (
    <>
      <title>Recipe</title>
      <nav className="simple-nav">
        <Link to="/" className="back-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path
              fill="#57606f"
              d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
            />
          </svg>
        </Link>
      </nav>

      <main className="container detail-container">
        <div className="recipe-header">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="main-img"
          />
          <div className="recipe-title-block">
            <span className="category">{recipe.strCategory}</span>
            <h1>{recipe.strMeal}</h1>
            <p className="description">
              Recipe from Category: {recipe.strArea}
            </p>
          </div>
        </div>

        <div className="recipe-content">
          <div className="ingredients">
            <h2>Ингредиенты</h2>
            <ul>
              {Array.from({ length: 20 }).map((_, i) => {
                const name = recipe[`strIngredient${i + 1}`];
                const measure = recipe[`strMeasure${i + 1}`];
                return name ? (
                  <li key={i}>
                    <span>{name}</span> <strong>{measure}</strong>
                  </li>
                ) : null;
              })}
            </ul>
          </div>

          <div className="instructions">
            <h2>Instruction</h2>
            <p style={{ whiteSpace: "pre-line" }}>{recipe.strInstructions}</p>

            {videoId && (
              <div className="video-wrapper">
                <h3>Video-instruction</h3>
                <div className="video-placeholder">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
