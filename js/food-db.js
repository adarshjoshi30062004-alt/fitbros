// Indian Food Database with nutritional information
// Values are per standard serving size

const FoodDatabase = {
    foods: [
        // === BREAKFAST ===
        { id: 1, name: "Idli (2 pieces)", category: "breakfast", calories: 150, protein: 4, carbs: 30, fat: 1, serving: "2 pieces" },
        { id: 2, name: "Masala Dosa", category: "breakfast", calories: 250, protein: 6, carbs: 40, fat: 8, serving: "1 dosa" },
        { id: 3, name: "Plain Dosa", category: "breakfast", calories: 170, protein: 4, carbs: 30, fat: 4, serving: "1 dosa" },
        { id: 4, name: "Poha", category: "breakfast", calories: 270, protein: 5, carbs: 45, fat: 8, serving: "1 plate" },
        { id: 5, name: "Upma", category: "breakfast", calories: 280, protein: 6, carbs: 42, fat: 9, serving: "1 bowl" },
        { id: 6, name: "Aloo Paratha", category: "breakfast", calories: 300, protein: 7, carbs: 40, fat: 12, serving: "1 paratha" },
        { id: 7, name: "Gobi Paratha", category: "breakfast", calories: 280, protein: 7, carbs: 38, fat: 11, serving: "1 paratha" },
        { id: 8, name: "Paneer Paratha", category: "breakfast", calories: 350, protein: 12, carbs: 35, fat: 18, serving: "1 paratha" },
        { id: 9, name: "Plain Paratha", category: "breakfast", calories: 220, protein: 5, carbs: 32, fat: 8, serving: "1 paratha" },
        { id: 10, name: "Puri (2 pieces)", category: "breakfast", calories: 200, protein: 4, carbs: 28, fat: 8, serving: "2 pieces" },
        { id: 11, name: "Chole Bhature (1 bhatura)", category: "breakfast", calories: 450, protein: 12, carbs: 55, fat: 20, serving: "1 serving" },
        { id: 12, name: "Medu Vada (2 pieces)", category: "breakfast", calories: 280, protein: 8, carbs: 32, fat: 14, serving: "2 pieces" },
        { id: 13, name: "Uttapam", category: "breakfast", calories: 200, protein: 5, carbs: 35, fat: 5, serving: "1 piece" },
        { id: 14, name: "Pongal", category: "breakfast", calories: 290, protein: 8, carbs: 45, fat: 9, serving: "1 bowl" },
        { id: 15, name: "Pesarattu", category: "breakfast", calories: 180, protein: 8, carbs: 28, fat: 4, serving: "1 piece" },
        { id: 16, name: "Appam", category: "breakfast", calories: 120, protein: 2, carbs: 25, fat: 1, serving: "1 piece" },
        { id: 17, name: "Puttu", category: "breakfast", calories: 250, protein: 4, carbs: 50, fat: 4, serving: "1 serving" },
        { id: 18, name: "Sabudana Khichdi", category: "breakfast", calories: 300, protein: 4, carbs: 55, fat: 8, serving: "1 bowl" },
        { id: 19, name: "Besan Chilla", category: "breakfast", calories: 180, protein: 8, carbs: 22, fat: 7, serving: "1 chilla" },
        { id: 20, name: "Moong Dal Chilla", category: "breakfast", calories: 150, protein: 9, carbs: 20, fat: 4, serving: "1 chilla" },

        // === ROTI / BREAD ===
        { id: 21, name: "Roti/Chapati", category: "bread", calories: 100, protein: 3, carbs: 20, fat: 1, serving: "1 piece" },
        { id: 22, name: "Tandoori Roti", category: "bread", calories: 120, protein: 4, carbs: 22, fat: 2, serving: "1 piece" },
        { id: 23, name: "Naan", category: "bread", calories: 260, protein: 7, carbs: 45, fat: 5, serving: "1 piece" },
        { id: 24, name: "Butter Naan", category: "bread", calories: 320, protein: 7, carbs: 45, fat: 12, serving: "1 piece" },
        { id: 25, name: "Garlic Naan", category: "bread", calories: 300, protein: 7, carbs: 46, fat: 9, serving: "1 piece" },
        { id: 26, name: "Kulcha", category: "bread", calories: 280, protein: 6, carbs: 42, fat: 9, serving: "1 piece" },
        { id: 27, name: "Bhatura", category: "bread", calories: 300, protein: 6, carbs: 40, fat: 14, serving: "1 piece" },
        { id: 28, name: "Lachha Paratha", category: "bread", calories: 280, protein: 5, carbs: 35, fat: 13, serving: "1 piece" },
        { id: 29, name: "Rumali Roti", category: "bread", calories: 150, protein: 4, carbs: 28, fat: 2, serving: "1 piece" },
        { id: 30, name: "Missi Roti", category: "bread", calories: 140, protein: 5, carbs: 24, fat: 3, serving: "1 piece" },

        // === RICE DISHES ===
        { id: 31, name: "Steamed Rice", category: "rice", calories: 200, protein: 4, carbs: 45, fat: 0, serving: "1 cup" },
        { id: 32, name: "Jeera Rice", category: "rice", calories: 250, protein: 4, carbs: 45, fat: 6, serving: "1 cup" },
        { id: 33, name: "Veg Biryani", category: "rice", calories: 350, protein: 8, carbs: 55, fat: 12, serving: "1 plate" },
        { id: 34, name: "Chicken Biryani", category: "rice", calories: 450, protein: 25, carbs: 50, fat: 18, serving: "1 plate" },
        { id: 35, name: "Mutton Biryani", category: "rice", calories: 500, protein: 28, carbs: 50, fat: 22, serving: "1 plate" },
        { id: 36, name: "Egg Biryani", category: "rice", calories: 400, protein: 18, carbs: 52, fat: 14, serving: "1 plate" },
        { id: 37, name: "Pulao", category: "rice", calories: 280, protein: 5, carbs: 48, fat: 8, serving: "1 plate" },
        { id: 38, name: "Lemon Rice", category: "rice", calories: 260, protein: 4, carbs: 48, fat: 6, serving: "1 plate" },
        { id: 39, name: "Curd Rice", category: "rice", calories: 280, protein: 8, carbs: 45, fat: 8, serving: "1 plate" },
        { id: 40, name: "Tamarind Rice", category: "rice", calories: 270, protein: 4, carbs: 50, fat: 6, serving: "1 plate" },
        { id: 41, name: "Khichdi", category: "rice", calories: 250, protein: 9, carbs: 40, fat: 5, serving: "1 bowl" },
        { id: 42, name: "Fried Rice", category: "rice", calories: 320, protein: 8, carbs: 48, fat: 12, serving: "1 plate" },

        // === DAL / LENTILS ===
        { id: 43, name: "Dal Tadka", category: "dal", calories: 180, protein: 10, carbs: 25, fat: 5, serving: "1 bowl" },
        { id: 44, name: "Dal Fry", category: "dal", calories: 200, protein: 11, carbs: 26, fat: 6, serving: "1 bowl" },
        { id: 45, name: "Dal Makhani", category: "dal", calories: 280, protein: 12, carbs: 30, fat: 12, serving: "1 bowl" },
        { id: 46, name: "Chana Dal", category: "dal", calories: 190, protein: 11, carbs: 28, fat: 4, serving: "1 bowl" },
        { id: 47, name: "Moong Dal", category: "dal", calories: 160, protein: 10, carbs: 24, fat: 3, serving: "1 bowl" },
        { id: 48, name: "Toor Dal", category: "dal", calories: 170, protein: 10, carbs: 26, fat: 3, serving: "1 bowl" },
        { id: 49, name: "Masoor Dal", category: "dal", calories: 165, protein: 10, carbs: 25, fat: 3, serving: "1 bowl" },
        { id: 50, name: "Sambar", category: "dal", calories: 150, protein: 7, carbs: 22, fat: 4, serving: "1 bowl" },
        { id: 51, name: "Rasam", category: "dal", calories: 60, protein: 2, carbs: 10, fat: 2, serving: "1 bowl" },
        { id: 52, name: "Rajma", category: "dal", calories: 220, protein: 12, carbs: 35, fat: 5, serving: "1 bowl" },
        { id: 53, name: "Chole/Chana Masala", category: "dal", calories: 240, protein: 11, carbs: 35, fat: 7, serving: "1 bowl" },
        { id: 54, name: "Kadhi", category: "dal", calories: 180, protein: 6, carbs: 18, fat: 10, serving: "1 bowl" },
        { id: 55, name: "Kadhi Pakora", category: "dal", calories: 250, protein: 8, carbs: 22, fat: 15, serving: "1 bowl" },

        // === VEGETABLE DISHES ===
        { id: 56, name: "Aloo Gobi", category: "sabzi", calories: 180, protein: 4, carbs: 25, fat: 8, serving: "1 bowl" },
        { id: 57, name: "Bhindi Masala", category: "sabzi", calories: 150, protein: 3, carbs: 15, fat: 9, serving: "1 bowl" },
        { id: 58, name: "Baingan Bharta", category: "sabzi", calories: 160, protein: 3, carbs: 18, fat: 9, serving: "1 bowl" },
        { id: 59, name: "Palak Paneer", category: "sabzi", calories: 280, protein: 14, carbs: 12, fat: 20, serving: "1 bowl" },
        { id: 60, name: "Shahi Paneer", category: "sabzi", calories: 350, protein: 14, carbs: 15, fat: 28, serving: "1 bowl" },
        { id: 61, name: "Paneer Butter Masala", category: "sabzi", calories: 380, protein: 15, carbs: 18, fat: 30, serving: "1 bowl" },
        { id: 62, name: "Matar Paneer", category: "sabzi", calories: 300, protein: 14, carbs: 20, fat: 20, serving: "1 bowl" },
        { id: 63, name: "Kadai Paneer", category: "sabzi", calories: 320, protein: 14, carbs: 16, fat: 24, serving: "1 bowl" },
        { id: 64, name: "Paneer Tikka Masala", category: "sabzi", calories: 340, protein: 16, carbs: 18, fat: 25, serving: "1 bowl" },
        { id: 65, name: "Aloo Matar", category: "sabzi", calories: 200, protein: 5, carbs: 30, fat: 7, serving: "1 bowl" },
        { id: 66, name: "Jeera Aloo", category: "sabzi", calories: 180, protein: 3, carbs: 28, fat: 7, serving: "1 bowl" },
        { id: 67, name: "Dum Aloo", category: "sabzi", calories: 250, protein: 4, carbs: 32, fat: 12, serving: "1 bowl" },
        { id: 68, name: "Mixed Veg Curry", category: "sabzi", calories: 180, protein: 5, carbs: 22, fat: 8, serving: "1 bowl" },
        { id: 69, name: "Lauki Sabzi", category: "sabzi", calories: 100, protein: 2, carbs: 12, fat: 5, serving: "1 bowl" },
        { id: 70, name: "Tinda Masala", category: "sabzi", calories: 110, protein: 2, carbs: 14, fat: 5, serving: "1 bowl" },
        { id: 71, name: "Karela Sabzi", category: "sabzi", calories: 90, protein: 2, carbs: 10, fat: 5, serving: "1 bowl" },
        { id: 72, name: "Methi Aloo", category: "sabzi", calories: 170, protein: 4, carbs: 24, fat: 7, serving: "1 bowl" },
        { id: 73, name: "Sarson Ka Saag", category: "sabzi", calories: 200, protein: 5, carbs: 15, fat: 14, serving: "1 bowl" },
        { id: 74, name: "Malai Kofta", category: "sabzi", calories: 400, protein: 10, carbs: 25, fat: 30, serving: "1 bowl" },
        { id: 75, name: "Navratan Korma", category: "sabzi", calories: 350, protein: 8, carbs: 28, fat: 24, serving: "1 bowl" },

        // === NON-VEG DISHES ===
        { id: 76, name: "Butter Chicken", category: "nonveg", calories: 400, protein: 28, carbs: 15, fat: 28, serving: "1 bowl" },
        { id: 77, name: "Chicken Tikka", category: "nonveg", calories: 250, protein: 30, carbs: 8, fat: 12, serving: "6 pieces" },
        { id: 78, name: "Tandoori Chicken", category: "nonveg", calories: 280, protein: 32, carbs: 6, fat: 14, serving: "2 pieces" },
        { id: 79, name: "Chicken Curry", category: "nonveg", calories: 320, protein: 26, carbs: 12, fat: 20, serving: "1 bowl" },
        { id: 80, name: "Kadai Chicken", category: "nonveg", calories: 350, protein: 28, carbs: 14, fat: 22, serving: "1 bowl" },
        { id: 81, name: "Chicken Korma", category: "nonveg", calories: 380, protein: 26, carbs: 18, fat: 26, serving: "1 bowl" },
        { id: 82, name: "Mutton Curry", category: "nonveg", calories: 400, protein: 28, carbs: 12, fat: 28, serving: "1 bowl" },
        { id: 83, name: "Mutton Rogan Josh", category: "nonveg", calories: 420, protein: 30, carbs: 10, fat: 30, serving: "1 bowl" },
        { id: 84, name: "Keema", category: "nonveg", calories: 350, protein: 25, carbs: 10, fat: 25, serving: "1 bowl" },
        { id: 85, name: "Fish Curry", category: "nonveg", calories: 280, protein: 28, carbs: 10, fat: 15, serving: "1 bowl" },
        { id: 86, name: "Fish Fry", category: "nonveg", calories: 250, protein: 24, carbs: 12, fat: 14, serving: "2 pieces" },
        { id: 87, name: "Egg Curry", category: "nonveg", calories: 250, protein: 16, carbs: 12, fat: 16, serving: "1 bowl (2 eggs)" },
        { id: 88, name: "Egg Bhurji", category: "nonveg", calories: 220, protein: 14, carbs: 6, fat: 16, serving: "2 eggs" },
        { id: 89, name: "Boiled Egg", category: "nonveg", calories: 78, protein: 6, carbs: 1, fat: 5, serving: "1 egg" },
        { id: 90, name: "Omelette", category: "nonveg", calories: 180, protein: 12, carbs: 2, fat: 14, serving: "2 eggs" },

        // === SNACKS ===
        { id: 91, name: "Samosa", category: "snacks", calories: 250, protein: 4, carbs: 30, fat: 14, serving: "1 piece" },
        { id: 92, name: "Kachori", category: "snacks", calories: 280, protein: 5, carbs: 32, fat: 15, serving: "1 piece" },
        { id: 93, name: "Pakora/Bhajji", category: "snacks", calories: 200, protein: 4, carbs: 22, fat: 12, serving: "6 pieces" },
        { id: 94, name: "Aloo Tikki", category: "snacks", calories: 180, protein: 3, carbs: 25, fat: 8, serving: "2 pieces" },
        { id: 95, name: "Pav Bhaji", category: "snacks", calories: 400, protein: 10, carbs: 50, fat: 18, serving: "1 plate" },
        { id: 96, name: "Vada Pav", category: "snacks", calories: 290, protein: 6, carbs: 40, fat: 12, serving: "1 piece" },
        { id: 97, name: "Bhel Puri", category: "snacks", calories: 200, protein: 4, carbs: 35, fat: 6, serving: "1 plate" },
        { id: 98, name: "Sev Puri", category: "snacks", calories: 250, protein: 4, carbs: 38, fat: 9, serving: "6 pieces" },
        { id: 99, name: "Pani Puri", category: "snacks", calories: 180, protein: 3, carbs: 32, fat: 5, serving: "6 pieces" },
        { id: 100, name: "Dahi Puri", category: "snacks", calories: 220, protein: 5, carbs: 35, fat: 7, serving: "6 pieces" },
        { id: 101, name: "Ragda Pattice", category: "snacks", calories: 280, protein: 8, carbs: 42, fat: 10, serving: "1 plate" },
        { id: 102, name: "Dabeli", category: "snacks", calories: 250, protein: 5, carbs: 38, fat: 9, serving: "1 piece" },
        { id: 103, name: "Dhokla", category: "snacks", calories: 160, protein: 5, carbs: 28, fat: 3, serving: "4 pieces" },
        { id: 104, name: "Khandvi", category: "snacks", calories: 140, protein: 5, carbs: 22, fat: 4, serving: "6 pieces" },
        { id: 105, name: "Thepla", category: "snacks", calories: 120, protein: 3, carbs: 18, fat: 4, serving: "1 piece" },
        { id: 106, name: "Fafda", category: "snacks", calories: 200, protein: 4, carbs: 28, fat: 9, serving: "4 pieces" },
        { id: 107, name: "Mathri", category: "snacks", calories: 150, protein: 3, carbs: 18, fat: 8, serving: "4 pieces" },
        { id: 108, name: "Namak Pare", category: "snacks", calories: 180, protein: 3, carbs: 22, fat: 9, serving: "1 cup" },
        { id: 109, name: "Murukku", category: "snacks", calories: 170, protein: 3, carbs: 24, fat: 7, serving: "4 pieces" },
        { id: 110, name: "Mixture", category: "snacks", calories: 200, protein: 5, carbs: 25, fat: 10, serving: "1 cup" },

        // === SWEETS / DESSERTS ===
        { id: 111, name: "Gulab Jamun", category: "sweets", calories: 150, protein: 2, carbs: 25, fat: 6, serving: "1 piece" },
        { id: 112, name: "Rasgulla", category: "sweets", calories: 120, protein: 3, carbs: 22, fat: 3, serving: "1 piece" },
        { id: 113, name: "Rasmalai", category: "sweets", calories: 180, protein: 4, carbs: 25, fat: 8, serving: "1 piece" },
        { id: 114, name: "Jalebi", category: "sweets", calories: 150, protein: 2, carbs: 30, fat: 4, serving: "2 pieces" },
        { id: 115, name: "Ladoo (Besan)", category: "sweets", calories: 180, protein: 4, carbs: 22, fat: 10, serving: "1 piece" },
        { id: 116, name: "Ladoo (Motichoor)", category: "sweets", calories: 160, protein: 2, carbs: 25, fat: 6, serving: "1 piece" },
        { id: 117, name: "Barfi (Kaju)", category: "sweets", calories: 180, protein: 4, carbs: 22, fat: 10, serving: "1 piece" },
        { id: 118, name: "Barfi (Plain)", category: "sweets", calories: 140, protein: 3, carbs: 20, fat: 6, serving: "1 piece" },
        { id: 119, name: "Peda", category: "sweets", calories: 130, protein: 3, carbs: 18, fat: 6, serving: "1 piece" },
        { id: 120, name: "Kheer", category: "sweets", calories: 250, protein: 6, carbs: 40, fat: 8, serving: "1 bowl" },
        { id: 121, name: "Gajar Halwa", category: "sweets", calories: 300, protein: 5, carbs: 45, fat: 12, serving: "1 bowl" },
        { id: 122, name: "Moong Dal Halwa", category: "sweets", calories: 350, protein: 8, carbs: 42, fat: 18, serving: "1 bowl" },
        { id: 123, name: "Suji Halwa", category: "sweets", calories: 280, protein: 4, carbs: 40, fat: 12, serving: "1 bowl" },
        { id: 124, name: "Kulfi", category: "sweets", calories: 200, protein: 4, carbs: 28, fat: 9, serving: "1 piece" },
        { id: 125, name: "Sandesh", category: "sweets", calories: 130, protein: 4, carbs: 18, fat: 5, serving: "1 piece" },
        { id: 126, name: "Mysore Pak", category: "sweets", calories: 200, protein: 3, carbs: 22, fat: 12, serving: "1 piece" },
        { id: 127, name: "Payasam", category: "sweets", calories: 280, protein: 6, carbs: 45, fat: 9, serving: "1 bowl" },
        { id: 128, name: "Shrikhand", category: "sweets", calories: 220, protein: 6, carbs: 32, fat: 8, serving: "1 bowl" },

        // === BEVERAGES ===
        { id: 129, name: "Chai (with milk & sugar)", category: "beverages", calories: 80, protein: 2, carbs: 12, fat: 3, serving: "1 cup" },
        { id: 130, name: "Chai (without sugar)", category: "beverages", calories: 40, protein: 2, carbs: 4, fat: 2, serving: "1 cup" },
        { id: 131, name: "Black Coffee", category: "beverages", calories: 5, protein: 0, carbs: 1, fat: 0, serving: "1 cup" },
        { id: 132, name: "Coffee with milk & sugar", category: "beverages", calories: 90, protein: 2, carbs: 14, fat: 3, serving: "1 cup" },
        { id: 133, name: "Lassi (Sweet)", category: "beverages", calories: 180, protein: 5, carbs: 28, fat: 5, serving: "1 glass" },
        { id: 134, name: "Lassi (Salted)", category: "beverages", calories: 100, protein: 5, carbs: 10, fat: 5, serving: "1 glass" },
        { id: 135, name: "Mango Lassi", category: "beverages", calories: 220, protein: 5, carbs: 38, fat: 6, serving: "1 glass" },
        { id: 136, name: "Buttermilk/Chaas", category: "beverages", calories: 40, protein: 2, carbs: 5, fat: 1, serving: "1 glass" },
        { id: 137, name: "Nimbu Pani", category: "beverages", calories: 60, protein: 0, carbs: 15, fat: 0, serving: "1 glass" },
        { id: 138, name: "Jaljeera", category: "beverages", calories: 50, protein: 0, carbs: 12, fat: 0, serving: "1 glass" },
        { id: 139, name: "Aam Panna", category: "beverages", calories: 80, protein: 0, carbs: 20, fat: 0, serving: "1 glass" },
        { id: 140, name: "Thandai", category: "beverages", calories: 200, protein: 5, carbs: 30, fat: 7, serving: "1 glass" },
        { id: 141, name: "Badam Milk", category: "beverages", calories: 180, protein: 6, carbs: 25, fat: 6, serving: "1 glass" },
        { id: 142, name: "Fresh Juice (Orange)", category: "beverages", calories: 110, protein: 1, carbs: 26, fat: 0, serving: "1 glass" },
        { id: 143, name: "Fresh Juice (Apple)", category: "beverages", calories: 120, protein: 0, carbs: 30, fat: 0, serving: "1 glass" },
        { id: 144, name: "Coconut Water", category: "beverages", calories: 45, protein: 1, carbs: 10, fat: 0, serving: "1 glass" },
        { id: 145, name: "Sugarcane Juice", category: "beverages", calories: 180, protein: 0, carbs: 45, fat: 0, serving: "1 glass" },

        // === DAIRY ===
        { id: 146, name: "Milk (Full Fat)", category: "dairy", calories: 150, protein: 8, carbs: 12, fat: 8, serving: "1 glass" },
        { id: 147, name: "Milk (Toned)", category: "dairy", calories: 100, protein: 7, carbs: 10, fat: 4, serving: "1 glass" },
        { id: 148, name: "Milk (Skimmed)", category: "dairy", calories: 70, protein: 7, carbs: 10, fat: 0, serving: "1 glass" },
        { id: 149, name: "Curd/Dahi", category: "dairy", calories: 100, protein: 5, carbs: 8, fat: 6, serving: "1 bowl" },
        { id: 150, name: "Paneer", category: "dairy", calories: 260, protein: 18, carbs: 4, fat: 20, serving: "100g" },
        { id: 151, name: "Ghee", category: "dairy", calories: 120, protein: 0, carbs: 0, fat: 14, serving: "1 tbsp" },
        { id: 152, name: "Butter", category: "dairy", calories: 100, protein: 0, carbs: 0, fat: 11, serving: "1 tbsp" },

        // === FRUITS ===
        { id: 153, name: "Apple", category: "fruits", calories: 95, protein: 0, carbs: 25, fat: 0, serving: "1 medium" },
        { id: 154, name: "Banana", category: "fruits", calories: 105, protein: 1, carbs: 27, fat: 0, serving: "1 medium" },
        { id: 155, name: "Mango", category: "fruits", calories: 150, protein: 1, carbs: 38, fat: 1, serving: "1 medium" },
        { id: 156, name: "Orange", category: "fruits", calories: 62, protein: 1, carbs: 15, fat: 0, serving: "1 medium" },
        { id: 157, name: "Papaya", category: "fruits", calories: 120, protein: 2, carbs: 30, fat: 0, serving: "1 bowl" },
        { id: 158, name: "Watermelon", category: "fruits", calories: 85, protein: 2, carbs: 22, fat: 0, serving: "2 cups" },
        { id: 159, name: "Grapes", category: "fruits", calories: 100, protein: 1, carbs: 27, fat: 0, serving: "1 cup" },
        { id: 160, name: "Pomegranate", category: "fruits", calories: 145, protein: 3, carbs: 33, fat: 2, serving: "1 medium" },
        { id: 161, name: "Guava", category: "fruits", calories: 68, protein: 3, carbs: 14, fat: 1, serving: "1 medium" },
        { id: 162, name: "Chikoo/Sapota", category: "fruits", calories: 140, protein: 1, carbs: 34, fat: 2, serving: "2 medium" },

        // === PROTEIN SUPPLEMENTS ===
        { id: 163, name: "Whey Protein Scoop", category: "supplements", calories: 120, protein: 24, carbs: 3, fat: 1, serving: "1 scoop (30g)" },
        { id: 164, name: "Mass Gainer Scoop", category: "supplements", calories: 350, protein: 20, carbs: 60, fat: 5, serving: "1 scoop" },
        { id: 165, name: "BCAA", category: "supplements", calories: 15, protein: 3, carbs: 0, fat: 0, serving: "1 serving" },
        { id: 166, name: "Creatine", category: "supplements", calories: 0, protein: 0, carbs: 0, fat: 0, serving: "5g" },
        { id: 167, name: "Peanut Butter", category: "supplements", calories: 190, protein: 8, carbs: 6, fat: 16, serving: "2 tbsp" },
        { id: 168, name: "Almonds", category: "supplements", calories: 160, protein: 6, carbs: 6, fat: 14, serving: "1 oz (23 nuts)" },
        { id: 169, name: "Walnuts", category: "supplements", calories: 185, protein: 4, carbs: 4, fat: 18, serving: "1 oz" },
        { id: 170, name: "Cashews", category: "supplements", calories: 155, protein: 5, carbs: 9, fat: 12, serving: "1 oz" },
        { id: 171, name: "Dates", category: "supplements", calories: 140, protein: 1, carbs: 36, fat: 0, serving: "4 pieces" },
        { id: 172, name: "Raisins", category: "supplements", calories: 130, protein: 1, carbs: 34, fat: 0, serving: "1/4 cup" }
    ],

    // Get all categories
    getCategories() {
        const categories = [...new Set(this.foods.map(f => f.category))];
        return categories.map(cat => ({
            id: cat,
            name: cat.charAt(0).toUpperCase() + cat.slice(1)
        }));
    },

    // Search foods by name
    search(query) {
        const q = query.toLowerCase();
        return this.foods.filter(f =>
            f.name.toLowerCase().includes(q)
        );
    },

    // Get foods by category
    getByCategory(category) {
        return this.foods.filter(f => f.category === category);
    },

    // Get food by ID
    getById(id) {
        return this.foods.find(f => f.id === id);
    },

    // Add custom food
    addCustomFood(food) {
        const customFoods = Storage.load(Storage.KEYS.CUSTOM_FOODS, []);
        food.id = 'custom_' + Date.now();
        food.category = 'custom';
        customFoods.push(food);
        Storage.save(Storage.KEYS.CUSTOM_FOODS, customFoods);
        return food;
    },

    // Get all foods including custom
    getAllFoods() {
        const customFoods = Storage.load(Storage.KEYS.CUSTOM_FOODS, []);
        return [...this.foods, ...customFoods];
    }
};
