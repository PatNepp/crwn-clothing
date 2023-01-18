import Category from "./components/category/category.component";
import { categories } from "./data/categories";
import './categories.styles.scss'

const App = () => {

  return (
    <div className="categories-container">
      {categories.map((cat) => {
        return <Category key={cat.id} category={cat} />
      })}
    </div>
  );
}

export default App;
