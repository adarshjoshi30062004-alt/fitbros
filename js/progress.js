// Progress and charts module

const Progress = {
    charts: {},
    currentDays: 7,

    init() {
        this.setupEventListeners();
        this.loadExerciseSelect();
    },

    setupEventListeners() {
        // Time filter buttons
        document.querySelectorAll('.time-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentDays = parseInt(e.target.dataset.days);
                this.updateAllCharts();
            });
        });

        // Exercise progress select
        document.getElementById('exerciseProgressSelect').addEventListener('change', (e) => {
            this.updateStrengthChart(e.target.value);
        });
    },

    loadExerciseSelect() {
        const select = document.getElementById('exerciseProgressSelect');
        const exercises = Workout.getAllLoggedExercises();

        select.innerHTML = '<option value="">Select Exercise</option>';
        exercises.forEach(ex => {
            const option = document.createElement('option');
            option.value = ex;
            option.textContent = ex;
            select.appendChild(option);
        });
    },

    getDateRange(days) {
        const dates = [];
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - days + 1);

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            dates.push(d.toISOString().split('T')[0]);
        }

        return dates;
    },

    updateAllCharts() {
        this.updateCalorieChart();
        this.updateMacroChart();
        this.updateWorkoutChart();
        this.loadExerciseSelect();

        const selectedExercise = document.getElementById('exerciseProgressSelect').value;
        if (selectedExercise) {
            this.updateStrengthChart(selectedExercise);
        }
    },

    updateCalorieChart() {
        const ctx = document.getElementById('calorieChart').getContext('2d');
        const dates = this.getDateRange(this.currentDays);
        const settings = Storage.getSettings();

        const data = dates.map(date => {
            const totals = Storage.getDailyTotals(date);
            return totals.calories;
        });

        const labels = dates.map(d => {
            const date = new Date(d);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });

        if (this.charts.calorie) {
            this.charts.calorie.destroy();
        }

        this.charts.calorie = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Calories',
                    data: data,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    fill: true,
                    tension: 0.3
                }, {
                    label: 'Goal',
                    data: dates.map(() => settings.calorieGoal),
                    borderColor: '#FF9800',
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    },

    updateMacroChart() {
        const ctx = document.getElementById('macroChart').getContext('2d');
        const dates = this.getDateRange(this.currentDays);

        let totalProtein = 0, totalCarbs = 0, totalFat = 0;

        dates.forEach(date => {
            const totals = Storage.getDailyTotals(date);
            totalProtein += totals.protein;
            totalCarbs += totals.carbs;
            totalFat += totals.fat;
        });

        if (this.charts.macro) {
            this.charts.macro.destroy();
        }

        this.charts.macro = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Protein', 'Carbs', 'Fat'],
                datasets: [{
                    data: [totalProtein, totalCarbs, totalFat],
                    backgroundColor: ['#E91E63', '#FF9800', '#9C27B0']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    },

    updateWorkoutChart() {
        const ctx = document.getElementById('workoutChart').getContext('2d');
        const dates = this.getDateRange(this.currentDays);

        const data = dates.map(date => {
            const workouts = Storage.getWorkoutsForDate(date);
            return workouts.length;
        });

        const labels = dates.map(d => {
            const date = new Date(d);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });

        if (this.charts.workout) {
            this.charts.workout.destroy();
        }

        this.charts.workout = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Exercises',
                    data: data,
                    backgroundColor: '#2196F3'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    },

    updateStrengthChart(exerciseName) {
        if (!exerciseName) return;

        const ctx = document.getElementById('strengthChart').getContext('2d');
        const allWorkouts = Storage.load(Storage.KEYS.WORKOUTS, {});

        // Get max weight for this exercise for each date
        const dataPoints = [];

        Object.entries(allWorkouts).forEach(([date, workouts]) => {
            workouts.forEach(workout => {
                if (workout.exercises) {
                    workout.exercises.forEach(ex => {
                        if (ex.name === exerciseName) {
                            const maxWeight = Math.max(...ex.sets.map(s => s.weight || 0));
                            if (maxWeight > 0) {
                                dataPoints.push({ date, weight: maxWeight });
                            }
                        }
                    });
                }
            });
        });

        // Sort by date
        dataPoints.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Take last N entries based on current filter
        const recentPoints = dataPoints.slice(-this.currentDays);

        if (this.charts.strength) {
            this.charts.strength.destroy();
        }

        if (recentPoints.length === 0) {
            this.charts.strength = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['No data'],
                    datasets: [{
                        label: exerciseName,
                        data: [0],
                        borderColor: '#4CAF50'
                    }]
                }
            });
            return;
        }

        const labels = recentPoints.map(p => {
            const date = new Date(p.date);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });

        this.charts.strength = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `${exerciseName} (kg)`,
                    data: recentPoints.map(p => p.weight),
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }
};
