// Storage utilities for localStorage operations

const Storage = {
    // Keys for different data types
    KEYS: {
        MEALS: 'calorieTracker_meals',
        WORKOUTS: 'calorieTracker_workouts',
        SETTINGS: 'calorieTracker_settings',
        CUSTOM_FOODS: 'calorieTracker_customFoods'
    },

    // Save data to localStorage
    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },

    // Load data from localStorage
    load(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('Error loading from localStorage:', e);
            return defaultValue;
        }
    },

    // Delete data from localStorage
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    },

    // Get today's date as YYYY-MM-DD string
    getToday() {
        return new Date().toISOString().split('T')[0];
    },

    // Get meals for a specific date
    getMealsForDate(date) {
        const allMeals = this.load(this.KEYS.MEALS, {});
        return allMeals[date] || [];
    },

    // Save a meal
    saveMeal(meal) {
        const date = meal.date || this.getToday();
        const allMeals = this.load(this.KEYS.MEALS, {});

        if (!allMeals[date]) {
            allMeals[date] = [];
        }

        meal.id = Date.now();
        meal.date = date;
        allMeals[date].push(meal);

        return this.save(this.KEYS.MEALS, allMeals);
    },

    // Delete a meal
    deleteMeal(date, mealId) {
        const allMeals = this.load(this.KEYS.MEALS, {});
        if (allMeals[date]) {
            allMeals[date] = allMeals[date].filter(m => m.id !== mealId);
            return this.save(this.KEYS.MEALS, allMeals);
        }
        return false;
    },

    // Get workouts for a specific date
    getWorkoutsForDate(date) {
        const allWorkouts = this.load(this.KEYS.WORKOUTS, {});
        return allWorkouts[date] || [];
    },

    // Save a workout
    saveWorkout(workout) {
        const date = workout.date || this.getToday();
        const allWorkouts = this.load(this.KEYS.WORKOUTS, {});

        if (!allWorkouts[date]) {
            allWorkouts[date] = [];
        }

        workout.id = Date.now();
        workout.date = date;
        allWorkouts[date].push(workout);

        return this.save(this.KEYS.WORKOUTS, allWorkouts);
    },

    // Delete a workout
    deleteWorkout(date, workoutId) {
        const allWorkouts = this.load(this.KEYS.WORKOUTS, {});
        if (allWorkouts[date]) {
            allWorkouts[date] = allWorkouts[date].filter(w => w.id !== workoutId);
            return this.save(this.KEYS.WORKOUTS, allWorkouts);
        }
        return false;
    },

    // Get settings
    getSettings() {
        return this.load(this.KEYS.SETTINGS, {
            calorieGoal: 2000,
            proteinGoal: 120,
            carbsGoal: 250,
            fatGoal: 65,
            bodyWeight: null
        });
    },

    // Save settings
    saveSettings(settings) {
        return this.save(this.KEYS.SETTINGS, settings);
    },

    // Get all data for a date range (for charts)
    getDataForRange(startDate, endDate) {
        const meals = this.load(this.KEYS.MEALS, {});
        const workouts = this.load(this.KEYS.WORKOUTS, {});
        const result = { meals: {}, workouts: {} };

        const start = new Date(startDate);
        const end = new Date(endDate);

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            if (meals[dateStr]) result.meals[dateStr] = meals[dateStr];
            if (workouts[dateStr]) result.workouts[dateStr] = workouts[dateStr];
        }

        return result;
    },

    // Calculate daily totals for a date
    getDailyTotals(date) {
        const meals = this.getMealsForDate(date);
        return meals.reduce((totals, meal) => {
            totals.calories += meal.calories || 0;
            totals.protein += meal.protein || 0;
            totals.carbs += meal.carbs || 0;
            totals.fat += meal.fat || 0;
            return totals;
        }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
    },

    // Export all data as JSON
    exportData() {
        return {
            meals: this.load(this.KEYS.MEALS, {}),
            workouts: this.load(this.KEYS.WORKOUTS, {}),
            settings: this.getSettings(),
            customFoods: this.load(this.KEYS.CUSTOM_FOODS, []),
            exportDate: new Date().toISOString()
        };
    },

    // Import data from JSON
    importData(data) {
        try {
            if (data.meals) this.save(this.KEYS.MEALS, data.meals);
            if (data.workouts) this.save(this.KEYS.WORKOUTS, data.workouts);
            if (data.settings) this.save(this.KEYS.SETTINGS, data.settings);
            if (data.customFoods) this.save(this.KEYS.CUSTOM_FOODS, data.customFoods);
            return true;
        } catch (e) {
            console.error('Error importing data:', e);
            return false;
        }
    },

    // Get personal records for exercises
    getPersonalRecords() {
        const allWorkouts = this.load(this.KEYS.WORKOUTS, {});
        const prs = {};

        Object.values(allWorkouts).flat().forEach(workout => {
            if (workout.exercises) {
                workout.exercises.forEach(ex => {
                    const key = ex.name;
                    const maxWeight = Math.max(...ex.sets.map(s => s.weight || 0));
                    if (!prs[key] || maxWeight > prs[key].weight) {
                        prs[key] = { weight: maxWeight, date: workout.date };
                    }
                });
            }
        });

        return prs;
    }
};
