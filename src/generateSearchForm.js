const generateSearchForm = () => {
  const contentDiv = document.querySelector('#content');

  const searchBox = document.createElement('div');
  searchBox.classList.add('search-box');

  searchBox.innerHTML = `<form id='search-form'>
                <label for='city'>Search for a City:
                  <input type="text" id="city" name="city" value="London, uk">
                </label>
                <input type="submit" value="Submit" class="submit">
              </form>`;

  contentDiv.appendChild(searchBox);
}

export default generateSearchForm;