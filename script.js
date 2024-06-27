document.addEventListener('DOMContentLoaded', () => {
    fetchMenu();
});

async function fetchMenu() {
    try {
        const response = await fetch('http://localhost:8080/menu');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const menus = await response.json();
        displayMenus(menus);
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
}

function displayMenus(menus) {
    const menuList = document.getElementById('menuList');
    menuList.innerHTML = '';
    menus.forEach(menu => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <span>${menu.name} - $${menu.price}</span>
            <div>
                <button onclick="editMenu('${menu.menuId}')">Edit</button>
                <button onclick="deleteMenu('${menu.menuId}')">Delete</button>
            </div>
        `;
        menuList.appendChild(menuItem);
    });
}

async function addMenu() {
    const name = document.getElementById('menuName').value;
    const price = document.getElementById('menuPrice').value;

    if (!name || !price) {
        alert('Please enter both name and price');
        return;
    }

    const newMenu = { name, price: parseInt(price) };

    try {
        const response = await fetch('http://localhost:8080/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMenu)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        fetchMenu();  // Refresh the menu list
    } catch (error) {
        console.error('Error adding menu:', error);
    }
}

async function editMenu(id) {
    const name = prompt('Enter new name:');
    const price = prompt('Enter new price:');

    if (!name || !price) {
        alert('Please enter both name and price');
        return;
    }

    const updatedMenu = { name, price: parseInt(price) };

    try {
        const response = await fetch(`http://localhost:8080/menu/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedMenu)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        fetchMenu();  // Refresh the menu list
    } catch (error) {
        console.error('Error editing menu:', error);
    }
}

async function deleteMenu(id) {
    try {
        const response = await fetch(`http://localhost:8080/menu/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        fetchMenu();  // Refresh the menu list
    } catch (error) {
        console.error('Error deleting menu:', error);
    }
}
