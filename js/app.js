// Main application module

const App = {
    currentDate: null,
    currentProfile: 'user1',

    // Workout schedule (same for both)
    workoutSchedule: {
        0: { name: 'Sun', workout: 'Rest', muscles: [] },
        1: { name: 'Mon', workout: 'Back + Biceps', muscles: ['back', 'arms'] },
        2: { name: 'Tue', workout: 'Chest + Triceps', muscles: ['chest', 'arms'] },
        3: { name: 'Wed', workout: 'Shoulders + Legs', muscles: ['shoulders', 'legs'] },
        4: { name: 'Thu', workout: 'Back + Biceps', muscles: ['back', 'arms'] },
        5: { name: 'Fri', workout: 'Chest + Triceps', muscles: ['chest', 'arms'] },
        6: { name: 'Sat', workout: 'Shoulders + Legs', muscles: ['shoulders', 'legs'] }
    },

    init() {
        this.currentDate = Storage.getToday();

        // Set up default settings for each profile
        this.initializeProfiles();

        this.setupNavigation();
        this.setupProfileSelector();
        this.setupDateNavigation();

        // Initialize modules
        Nutrition.init();
        Workout.init();
        Progress.init();

        // Load initial data
        this.updateDashboard();
        Settings.loadSettings();

        // Check for backup reminder
        this.checkBackupReminder();
    },

    initializeProfiles() {
        // One-time setup flag
        const setupDone = localStorage.getItem('profilesInitialized_v3');

        if (!setupDone) {
            // Adarsh's profile (user1)
            localStorage.setItem('user1_settings', JSON.stringify({
                profileName: 'Adarsh',
                calorieGoal: 2050,
                proteinGoal: 110,
                carbsGoal: 260,
                fatGoal: 68,
                bodyWeight: 54,
                height: 169,
                age: 21
            }));

            // Aryan's profile (user2)
            localStorage.setItem('user2_settings', JSON.stringify({
                profileName: 'Aryan',
                calorieGoal: 2100,
                proteinGoal: 130,
                carbsGoal: 260,
                fatGoal: 70,
                bodyWeight: 63,
                height: 170,
                age: 21
            }));

            localStorage.setItem('profilesInitialized_v3', 'true');
        }
    },

    checkBackupReminder() {
        const lastBackup = localStorage.getItem('lastBackupDate');
        const today = Storage.getToday();

        if (!lastBackup) {
            // First time user - don't show reminder immediately
            localStorage.setItem('lastBackupDate', today);
            return;
        }

        const lastBackupDate = new Date(lastBackup);
        const todayDate = new Date(today);
        const daysSinceBackup = Math.floor((todayDate - lastBackupDate) / (1000 * 60 * 60 * 24));

        if (daysSinceBackup >= 7) {
            this.showBackupReminder(daysSinceBackup);
        }
    },

    showBackupReminder(days) {
        const modal = document.getElementById('backupReminderModal');
        document.getElementById('daysSinceBackup').textContent = days;
        modal.classList.add('active');
    },

    hideBackupReminder() {
        document.getElementById('backupReminderModal').classList.remove('active');
    },

    backupNow() {
        Settings.exportData();
        localStorage.setItem('lastBackupDate', Storage.getToday());
        this.hideBackupReminder();
    },

    skipBackup() {
        // Remind again in 3 days
        const skipDate = new Date();
        skipDate.setDate(skipDate.getDate() - 4); // Will trigger reminder in 3 days
        localStorage.setItem('lastBackupDate', skipDate.toISOString().split('T')[0]);
        this.hideBackupReminder();
    },

    setupNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.showView(view);
            });
        });
    },

    setupProfileSelector() {
        const select = document.getElementById('profileSelect');

        // Load saved profile names
        const user1Settings = this.getProfileSettings('user1');
        const user2Settings = this.getProfileSettings('user2');

        select.options[0].text = user1Settings.profileName || 'Adarsh';
        select.options[1].text = user2Settings.profileName || 'Aryan';

        // Load current profile
        const savedProfile = localStorage.getItem('currentProfile') || 'user1';
        select.value = savedProfile;
        this.switchProfile(savedProfile);

        select.addEventListener('change', (e) => {
            this.switchProfile(e.target.value);
        });
    },

    getProfileSettings(profile) {
        const key = `${profile}_settings`;
        try {
            return JSON.parse(localStorage.getItem(key)) || {};
        } catch {
            return {};
        }
    },

    switchProfile(profile) {
        this.currentProfile = profile;
        localStorage.setItem('currentProfile', profile);

        // Update storage keys to be profile-specific
        Storage.KEYS = {
            MEALS: `${profile}_meals`,
            WORKOUTS: `${profile}_workouts`,
            SETTINGS: `${profile}_settings`,
            CUSTOM_FOODS: `${profile}_customFoods`
        };

        // Refresh all views
        this.updateDashboard();
        Workout.loadTodayExercises();
        Workout.loadPRs();
        Settings.loadSettings();

        // Update profile name in dropdown
        const settings = Storage.getSettings();
        const select = document.getElementById('profileSelect');
        const optionIndex = profile === 'user1' ? 0 : 1;
        if (settings.profileName) {
            select.options[optionIndex].text = settings.profileName;
        }
    },

    setupDateNavigation() {
        document.getElementById('prevDay').addEventListener('click', () => {
            this.changeDate(-1);
        });

        document.getElementById('nextDay').addEventListener('click', () => {
            this.changeDate(1);
        });
    },

    changeDate(days) {
        const date = new Date(this.currentDate);
        date.setDate(date.getDate() + days);

        // Don't go into the future
        if (date > new Date()) return;

        this.currentDate = date.toISOString().split('T')[0];
        this.updateDashboard();
    },

    showView(viewId) {
        // Update nav
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.view === viewId);
        });

        // Update views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.toggle('active', view.id === viewId);
        });

        // Refresh view-specific content
        if (viewId === 'dashboard') {
            this.updateDashboard();
        } else if (viewId === 'workout') {
            Workout.loadTodayExercises();
            Workout.loadPRs();
        } else if (viewId === 'progress') {
            Progress.updateAllCharts();
        } else if (viewId === 'nutrition') {
            Nutrition.loadFoodList();
        }
    },

    updateDashboard() {
        this.updateDateHeader();
        this.updateCalorieSummary();
        this.updateMacroSummary();
        this.updateTodayMeals();
        this.updateWorkoutSchedule();
        this.updateTodayWorkout();
    },

    updateWorkoutSchedule() {
        const scheduleContainer = document.getElementById('weekSchedule');
        const todaysPlanContainer = document.getElementById('todaysPlan');
        const today = new Date();
        const currentDay = today.getDay();

        // Build week schedule
        let scheduleHtml = '';
        for (let i = 0; i < 7; i++) {
            const schedule = this.workoutSchedule[i];
            const isToday = i === currentDay;
            const isRest = schedule.workout === 'Rest';

            scheduleHtml += `
                <div class="schedule-day ${isToday ? 'today' : ''} ${isRest ? 'rest' : ''}">
                    <div class="day-name">${schedule.name}</div>
                    <div class="day-workout">${schedule.workout.replace(' + ', '<br>')}</div>
                </div>
            `;
        }
        scheduleContainer.innerHTML = scheduleHtml;

        // Show today's plan
        const todaySchedule = this.workoutSchedule[currentDay];
        if (todaySchedule.workout === 'Rest') {
            todaysPlanContainer.className = 'todays-plan rest-day';
            todaysPlanContainer.innerHTML = `
                <div class="plan-label">Today's Plan</div>
                <div class="plan-muscles">Rest Day</div>
            `;
        } else {
            todaysPlanContainer.className = 'todays-plan';
            todaysPlanContainer.innerHTML = `
                <div class="plan-label">Today's Plan</div>
                <div class="plan-muscles">${todaySchedule.workout}</div>
            `;
        }
    },

    updateDateHeader() {
        const header = document.getElementById('currentDate');
        const today = Storage.getToday();

        if (this.currentDate === today) {
            header.textContent = 'Today';
        } else {
            const date = new Date(this.currentDate);
            header.textContent = date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
        }
    },

    updateCalorieSummary() {
        const settings = Storage.getSettings();
        const totals = Storage.getDailyTotals(this.currentDate);

        document.getElementById('caloriesConsumed').textContent = totals.calories;
        document.getElementById('calorieGoal').textContent = settings.calorieGoal;

        // Update progress ring
        const percentage = Math.min((totals.calories / settings.calorieGoal) * 100, 100);
        const circumference = 2 * Math.PI * 45; // radius = 45
        const offset = circumference - (percentage / 100) * circumference;

        const ring = document.getElementById('calorieRing');
        ring.style.strokeDasharray = circumference;
        ring.style.strokeDashoffset = offset;

        // Change color if over goal
        if (totals.calories > settings.calorieGoal) {
            ring.style.stroke = '#f44336';
        } else {
            ring.style.stroke = '#4CAF50';
        }
    },

    updateMacroSummary() {
        const settings = Storage.getSettings();
        const totals = Storage.getDailyTotals(this.currentDate);

        // Update values
        document.getElementById('proteinValue').textContent = totals.protein;
        document.getElementById('carbsValue').textContent = totals.carbs;
        document.getElementById('fatValue').textContent = totals.fat;

        // Update bars
        const proteinPct = Math.min((totals.protein / settings.proteinGoal) * 100, 100);
        const carbsPct = Math.min((totals.carbs / settings.carbsGoal) * 100, 100);
        const fatPct = Math.min((totals.fat / settings.fatGoal) * 100, 100);

        document.getElementById('proteinBar').style.width = `${proteinPct}%`;
        document.getElementById('carbsBar').style.width = `${carbsPct}%`;
        document.getElementById('fatBar').style.width = `${fatPct}%`;
    },

    updateTodayMeals() {
        const container = document.getElementById('todayMealsList');
        const meals = Storage.getMealsForDate(this.currentDate);

        if (meals.length === 0) {
            container.innerHTML = '<p class="empty-state">No meals logged yet</p>';
            return;
        }

        // Group by meal type
        const grouped = { breakfast: [], lunch: [], dinner: [], snacks: [] };
        meals.forEach(meal => {
            if (grouped[meal.mealType]) {
                grouped[meal.mealType].push(meal);
            }
        });

        let html = '';
        Object.entries(grouped).forEach(([type, items]) => {
            if (items.length > 0) {
                html += `<div class="meal-type-header" style="font-weight:600;margin:12px 0 8px;text-transform:capitalize;">${type}</div>`;
                items.forEach(meal => {
                    html += `
                        <div class="meal-entry">
                            <div class="entry-info">
                                <h4>${meal.name}</h4>
                                <p>${meal.quantity}x ${meal.serving} | P:${meal.protein}g C:${meal.carbs}g F:${meal.fat}g</p>
                            </div>
                            <span class="entry-calories">${meal.calories}</span>
                            <button class="delete-btn" onclick="Nutrition.deleteMeal('${this.currentDate}', ${meal.id})">×</button>
                        </div>
                    `;
                });
            }
        });

        container.innerHTML = html;
    },

    updateTodayWorkout() {
        const container = document.getElementById('todayWorkoutList');
        const workouts = Storage.getWorkoutsForDate(this.currentDate);

        if (workouts.length === 0) {
            container.innerHTML = '<p class="empty-state">No workout logged yet</p>';
            return;
        }

        let html = '';
        workouts.forEach(workout => {
            if (workout.exercises) {
                workout.exercises.forEach(ex => {
                    const setsInfo = ex.sets.map(s => `${s.reps}×${s.weight}kg`).join(', ');
                    html += `
                        <div class="workout-entry">
                            <div class="entry-info">
                                <h4>${ex.name}</h4>
                                <p>${setsInfo}</p>
                            </div>
                        </div>
                    `;
                });
            }
        });

        container.innerHTML = html;
    }
};

// Settings module
const Settings = {
    loadSettings() {
        const settings = Storage.getSettings();

        document.getElementById('profileName').value = settings.profileName || '';
        document.getElementById('bodyWeight').value = settings.bodyWeight || '';
        document.getElementById('settingCalorieGoal').value = settings.calorieGoal || 2000;
        document.getElementById('settingProteinGoal').value = settings.proteinGoal || 120;
        document.getElementById('settingCarbsGoal').value = settings.carbsGoal || 250;
        document.getElementById('settingFatGoal').value = settings.fatGoal || 65;
    },

    saveSettings() {
        const settings = {
            profileName: document.getElementById('profileName').value,
            bodyWeight: parseFloat(document.getElementById('bodyWeight').value) || null,
            calorieGoal: parseInt(document.getElementById('settingCalorieGoal').value) || 2000,
            proteinGoal: parseInt(document.getElementById('settingProteinGoal').value) || 120,
            carbsGoal: parseInt(document.getElementById('settingCarbsGoal').value) || 250,
            fatGoal: parseInt(document.getElementById('settingFatGoal').value) || 65
        };

        Storage.saveSettings(settings);

        // Update profile name in dropdown
        const select = document.getElementById('profileSelect');
        const optionIndex = App.currentProfile === 'user1' ? 0 : 1;
        if (settings.profileName) {
            select.options[optionIndex].text = settings.profileName;
        }

        App.updateDashboard();
        Nutrition.showToast('Settings saved!');
    },

    exportData() {
        const data = Storage.exportData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `fitness-tracker-${App.currentProfile}-${Storage.getToday()}.json`;
        a.click();

        URL.revokeObjectURL(url);

        // Update last backup date
        localStorage.setItem('lastBackupDate', Storage.getToday());

        Nutrition.showToast('Data exported!');
    },

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                Storage.importData(data);
                App.updateDashboard();
                Workout.loadTodayExercises();
                Workout.loadPRs();
                this.loadSettings();
                Nutrition.showToast('Data imported!');
            } catch (error) {
                Nutrition.showToast('Error importing data');
                console.error(error);
            }
        };
        reader.readAsText(file);

        // Reset input
        event.target.value = '';
    },

    clearData() {
        if (confirm('Are you sure you want to delete all data for this profile? This cannot be undone.')) {
            localStorage.removeItem(Storage.KEYS.MEALS);
            localStorage.removeItem(Storage.KEYS.WORKOUTS);
            localStorage.removeItem(Storage.KEYS.SETTINGS);
            localStorage.removeItem(Storage.KEYS.CUSTOM_FOODS);

            App.updateDashboard();
            Workout.loadTodayExercises();
            Workout.loadPRs();
            this.loadSettings();
            Nutrition.showToast('All data cleared!');
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
