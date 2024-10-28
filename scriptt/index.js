const baseUrl = `http://localhost:3000`;
const endpoints = {
  foods: `/foods`,
};

function displayFoods() {
  const requestUrl = `${baseUrl}${endpoints.foods}`;

  fetch(requestUrl, {
    method: `GET`,
  })
    .then((res) => res.json())
    .then((foods) => {
      const tbody = document.getElementById('food-body');
      foods.forEach(food => {
        tbody.innerHTML += `
          <tr>
            <td>${food.name}</td>
            <td>${food.category}</td>
            <td>${food.price}</td>
            <td>${food.calories}</td>
            <td>
              <button class="btn-edit" data-id="${food.id}">Chỉnh sửa</button>
              <button class="btn-delete" data-id="${food.id}">Xóa</button>
            </td>
          </tr>
        `;
      });

      document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', () => editFood(button.dataset.id));
      });
    });
}

function editFood(id) {
  const requestUrl = `${baseUrl}${endpoints.foods}/${id}`;
  
  fetch(requestUrl)
    .then(res => res.json())
    .then(food => {

      document.getElementById('food-name').value = food.name;
      document.getElementById('food-category').value = food.category;
      document.getElementById('food-price').value = food.price;
      document.getElementById('food-calories').value = food.calories;
      document.getElementById('food-id').value = food.id;

      document.getElementById('edit-form').style.display = 'block';
    });
}
function updateFood() {
  const id = document.getElementById('food-id').value;
  const updatedFood = {
    name: document.getElementById('food-name').value,
    category: document.getElementById('food-category').value,
    price: document.getElementById('food-price').value,
    calories: document.getElementById('food-calories').value,
  };

  fetch(`${baseUrl}${endpoints.foods}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFood),
  })
    .then(res => {
      if (res.ok) {
        displayFoods(); 
        document.getElementById('edit-form').style.display = 'none';
      } else {
        alert('Cập nhật không thành công!');
      }
    });
}

document.getElementById('update-button').addEventListener('click', updateFood);
document.getElementById('cancel-button').addEventListener('click', () => {
  document.getElementById('edit-form').style.display = 'none'; 
});

displayFoods();