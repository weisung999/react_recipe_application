import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import "./App.css";


const App = () => {

    const APP_ID = 'c653a5a9';
    const APP_KEY = 'b5e6979e4c91a534befb1ac70c6c7d03'

    const [recipes, setRecipes] = useState([]); //因回傳的data.hits是array
    const [search, setSearch] = useState('');  //這裡是空字串，下方input標籤就可放入value
    const [query, setQuery] = useState('chicken'); //為了不一直更新頁面;丟入Effect這樣只有提交時chicken才更新


    useEffect(() => {
      getRecipes();
    }, [query]);   //加上[]只會run一次,[counter]的話counter change的話就會run

    const getRecipes = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
    };

    // 修改空字串問題(onChange)
    const updateSearch = e => {
      setSearch(e.target.value);
      console.log(search);
    };

    //為了搜尋時 停止頁面刷新 放入form標籤onsubmit
    const getSearch = e => {
      e.preventDefault();
      setQuery(search);
      setSearch('');
    };

    return (
      <div className="App">
        <form onSubmit={getSearch} className="search-form">
          {/* onchange 解決search useState空字串永遠是空字串問題 */}
          <input className="search-bar" type="text" value={search} onChange={updateSearch} />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        {/* 已經做好所有請求，東西都是儲存在state的recipes;因為要傳回HTML/JSX故用() */}
        <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}  //key就不用整頁渲染，這裡設定與標題一樣
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
        </div>
      </div>
    )
}



export default App;
