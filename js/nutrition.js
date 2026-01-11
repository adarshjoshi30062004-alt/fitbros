// Nutrition tracking module

const Nutrition = {
    currentMealType: 'breakfast',
    selectedFood: null,

    init() {
        this.setupEventListeners();
        this.loadCategories();
        this.loadFoodList();
    },

    setupEventListeners() {
        // Meal type tabs
        document.querySelectorAll('.meal-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.meal-tab').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                this.currentMealType = e.target.dataset.meal;
            });
        });

        // Food search
        document.getElementById('foodSearch').addEventListener('input', (e) => {
            this.loadFoodList(e.target.value);
        });

        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.loadFoodList(document.getElementById('foodSearch').value, e.target.value);
        });

        // Custom food form
        document.getElementById('customFoodForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addCustomFood();
        });

        // Quantity input
        document.getElementById('servingQuantity').addEventListener('input', () => {
            this.updateQuantityPreview();
        });
    },

    loadCategories() {
        const select = document.getElementById('categoryFilter');
        const categories = FoodDatabase.getCategories();

        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            select.appendChild(option);
        });
    },

    loadFoodList(search = '', category = '') {
        const container = document.getElementById('foodList');
        let foods = FoodDatabase.getAllFoods();

        // Filter by search
        if (search) {
            const query = search.toLowerCase();
            foods = foods.filter(f => f.name.toLowerCase().includes(query));
        }

        // Filter by category
        if (category) {
            foods = foods.filter(f => f.category === category);
        }

        // Render food list
        if (foods.length === 0) {
            container.innerHTML = '<p class="empty-state">No foods found. Try adding a custom food.</p>';
            return;
        }

        container.innerHTML = foods.map(food => `
            <div class="food-item" onclick="Nutrition.showQuantityModal(${typeof food.id === 'string' ? `'${food.id}'` : food.id})">
                <div class="food-info">
                    <h4>${food.name}</h4>
                    <p>${food.serving} | P: ${food.protein}g C: ${food.carbs}g F: ${food.fat}g</p>
                </div>
                <span class="food-calories">${food.calories} kcal</span>
            </div>
        `).join('');
    },

    showQuantityModal(foodId) {
        const foods = FoodDatabase.getAllFoods();
        this.selectedFood = foods.find(f => f.id === foodId);

        if (!this.selectedFood) return;

        document.getElementById('quantityFoodName').textContent = this.selectedFood.name;
        document.getElementById('quantityFoodInfo').textContent = `${this.selectedFood.serving}`;
        document.getElementById('servingQuantity').value = 1;

        this.updateQuantityPreview();
        document.getElementById('quantityModal').classList.add('active');
    },

    hideQuantityModal() {
        document.getElementById('quantityModal').classList.remove('active');
        this.selectedFood = null;
    },

    updateQuantityPreview() {
        if (!this.selectedFood) return;

        const quantity = parseFloat(document.getElementById('servingQuantity').value) || 1;

        document.getElementById('previewCalories').textContent = Math.round(this.selectedFood.calories * quantity);
        document.getElementById('previewProtein').textContent = Math.round(this.selectedFood.protein * quantity);
        document.getElementById('previewCarbs').textContent = Math.round(this.selectedFood.carbs * quantity);
        document.getElementById('previewFat').textContent = Math.round(this.selectedFood.fat * quantity);
    },

    confirmAddFood() {
        if (!this.selectedFood) return;

        const quantity = parseFloat(document.getElementById('servingQuantity').value) || 1;

        const meal = {
            foodId: this.selectedFood.id,
            name: this.selectedFood.name,
            mealType: this.currentMealType,
            quantity: quantity,
            serving: this.selectedFood.serving,
            calories: Math.round(this.selectedFood.calories * quantity),
            protein: Math.round(this.selectedFood.protein * quantity),
            carbs: Math.round(this.selectedFood.carbs * quantity),
            fat: Math.round(this.selectedFood.fat * quantity)
        };

        Storage.saveMeal(meal);
        this.hideQuantityModal();

        // Update dashboard
        App.updateDashboard();

        // Show feedback
        this.showToast(`Added ${meal.name} to ${this.currentMealType}`);
    },

    showCustomFoodForm() {
        document.getElementById('customFoodModal').classList.add('active');
    },

    hideCustomFoodForm() {
        document.getElementById('customFoodModal').classList.remove('active');
        document.getElementById('customFoodForm').reset();
    },

    addCustomFood() {
        const food = {
            name: document.getElementById('customName').value,
            calories: parseInt(document.getElementById('customCalories').value),
            protein: parseInt(document.getElementById('customProtein').value),
            carbs: parseInt(document.getElementById('customCarbs').value),
            fat: parseInt(document.getElementById('customFat').value),
            serving: document.getElementById('customServing').value
        };

        FoodDatabase.addCustomFood(food);
        this.hideCustomFoodForm();
        this.loadFoodList();
        this.showToast('Custom food added!');
    },

    deleteMeal(date, mealId) {
        if (confirm('Delete this meal?')) {
            Storage.deleteMeal(date, mealId);
            App.updateDashboard();
        }
    },

    showToast(message) {
        // Simple toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: #333;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 2000;
            font-size: 0.9rem;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.remove(), 2000);
    }
};
