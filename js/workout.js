// Workout tracking module

const Workout = {
    exercises: {
        chest: ['Bench Press', 'Incline Bench Press', 'Decline Bench Press', 'Dumbbell Flyes', 'Cable Crossover', 'Push-ups', 'Chest Dips'],
        back: ['Deadlift', 'Barbell Rows', 'Dumbbell Rows', 'Lat Pulldown', 'Pull-ups', 'Seated Cable Row', 'T-Bar Row', 'Face Pulls'],
        shoulders: ['Overhead Press', 'Dumbbell Shoulder Press', 'Lateral Raises', 'Front Raises', 'Rear Delt Flyes', 'Arnold Press', 'Shrugs'],
        arms: ['Bicep Curls', 'Hammer Curls', 'Preacher Curls', 'Tricep Pushdown', 'Tricep Dips', 'Skull Crushers', 'Close Grip Bench', 'Concentration Curls'],
        legs: ['Squats', 'Front Squats', 'Leg Press', 'Lunges', 'Romanian Deadlift', 'Leg Curls', 'Leg Extensions', 'Calf Raises', 'Hip Thrust'],
        core: ['Plank', 'Crunches', 'Leg Raises', 'Russian Twists', 'Cable Crunches', 'Ab Wheel', 'Dead Bug', 'Mountain Climbers']
    },

    currentSets: [],
    setCount: 0,

    init() {
        this.setupEventListeners();
        this.addSet(); // Start with one set
    },

    setupEventListeners() {
        document.getElementById('muscleGroup').addEventListener('change', (e) => {
            this.loadExercises(e.target.value);
        });
    },

    loadExercises(muscleGroup) {
        const select = document.getElementById('exerciseSelect');
        select.innerHTML = '<option value="">Select Exercise</option>';

        if (!muscleGroup) {
            select.disabled = true;
            return;
        }

        select.disabled = false;
        const exercises = this.exercises[muscleGroup] || [];

        exercises.forEach(ex => {
            const option = document.createElement('option');
            option.value = ex;
            option.textContent = ex;
            select.appendChild(option);
        });
    },

    addSet() {
        this.setCount++;
        const container = document.getElementById('setsContainer');

        const setRow = document.createElement('div');
        setRow.className = 'set-row';
        setRow.dataset.set = this.setCount;
        setRow.innerHTML = `
            <span>Set ${this.setCount}</span>
            <input type="number" placeholder="Reps" class="set-reps" min="1">
            <input type="number" placeholder="Weight (kg)" class="set-weight" min="0" step="0.5">
            <button onclick="Workout.removeSet(${this.setCount})">×</button>
        `;

        container.appendChild(setRow);
    },

    removeSet(setNum) {
        const setRow = document.querySelector(`.set-row[data-set="${setNum}"]`);
        if (setRow && this.setCount > 1) {
            setRow.remove();
        }
    },

    saveExercise() {
        const muscleGroup = document.getElementById('muscleGroup').value;
        const exerciseName = document.getElementById('exerciseSelect').value;

        if (!exerciseName) {
            Nutrition.showToast('Please select an exercise');
            return;
        }

        // Gather all sets
        const setRows = document.querySelectorAll('.set-row');
        const sets = [];

        setRows.forEach(row => {
            const reps = parseInt(row.querySelector('.set-reps').value);
            const weight = parseFloat(row.querySelector('.set-weight').value);

            if (reps && reps > 0) {
                sets.push({
                    reps: reps,
                    weight: weight || 0
                });
            }
        });

        if (sets.length === 0) {
            Nutrition.showToast('Please add at least one set with reps');
            return;
        }

        // Save the workout
        const workout = {
            muscleGroup: muscleGroup,
            name: exerciseName,
            exercises: [{
                name: exerciseName,
                sets: sets
            }]
        };

        Storage.saveWorkout(workout);

        // Clear form
        this.clearForm();

        // Update views
        this.loadTodayExercises();
        this.loadPRs();
        App.updateDashboard();

        Nutrition.showToast(`${exerciseName} saved!`);
    },

    clearForm() {
        document.getElementById('muscleGroup').value = '';
        document.getElementById('exerciseSelect').value = '';
        document.getElementById('exerciseSelect').disabled = true;
        document.getElementById('setsContainer').innerHTML = '';
        this.setCount = 0;
        this.addSet();
    },

    loadTodayExercises() {
        const container = document.getElementById('exercisesList');
        const today = Storage.getToday();
        const workouts = Storage.getWorkoutsForDate(today);

        if (workouts.length === 0) {
            container.innerHTML = '<p class="empty-state">No exercises logged yet</p>';
            return;
        }

        let html = '';
        workouts.forEach(workout => {
            if (workout.exercises) {
                workout.exercises.forEach(ex => {
                    const totalVolume = ex.sets.reduce((sum, set) => sum + (set.reps * set.weight), 0);
                    const setsInfo = ex.sets.map(s => `${s.reps}×${s.weight}kg`).join(', ');

                    html += `
                        <div class="exercise-entry">
                            <div class="entry-info">
                                <h4>${ex.name}</h4>
                                <p>${setsInfo}</p>
                            </div>
                            <span class="entry-calories">${totalVolume.toFixed(0)} vol</span>
                            <button class="delete-btn" onclick="Workout.deleteWorkout('${today}', ${workout.id})">×</button>
                        </div>
                    `;
                });
            }
        });

        container.innerHTML = html;
    },

    deleteWorkout(date, workoutId) {
        if (confirm('Delete this exercise?')) {
            Storage.deleteWorkout(date, workoutId);
            this.loadTodayExercises();
            this.loadPRs();
            App.updateDashboard();
        }
    },

    loadPRs() {
        const container = document.getElementById('prList');
        const prs = Storage.getPersonalRecords();

        if (Object.keys(prs).length === 0) {
            container.innerHTML = '<p class="empty-state">Complete workouts to see PRs</p>';
            return;
        }

        let html = '';
        Object.entries(prs).forEach(([exercise, pr]) => {
            html += `
                <div class="pr-item">
                    <span class="exercise-name">${exercise}</span>
                    <span class="pr-value">${pr.weight} kg</span>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    // Get all unique exercises for progress tracking
    getAllLoggedExercises() {
        const allWorkouts = Storage.load(Storage.KEYS.WORKOUTS, {});
        const exercises = new Set();

        Object.values(allWorkouts).flat().forEach(workout => {
            if (workout.exercises) {
                workout.exercises.forEach(ex => {
                    exercises.add(ex.name);
                });
            }
        });

        return Array.from(exercises);
    }
};
