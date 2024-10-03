<script>
import axios from 'axios';

export default {
    data() {
        return {
            clothes: [],
            type: '',
            brand: '',
            model: '',
            price: '',
            size: '',
            sex: '',
            img: '',
            country: '',
            sort: null,
            showAddForm: false,
            editingCloth: null, 
        };
    },
    methods: {
        async loadClothes() {
            try {
                let response = await axios.get('/clothes', {
                    params: {
                        sort: this.sort || null,
                    },
                });
                this.clothes = response.data;
            } catch (error) {
                console.error('Error loading clothes:', error);
            }
        },
        async removeClothes(id) {
            await axios.delete('/clothes', {
                params: { id }
            });
            this.loadClothes(); 
        },
        async createClothes() {
            await axios.post('/clothes', {
                type: this.type,
                brand: this.brand,
                model: this.model,
                price: this.price,
                size: this.size,
                country: this.country,
                sex: this.sex,
                img: this.img
            });
            this.showAddForm = false;  
            this.clearForm();           
            this.loadClothes();        
        },
        editClothes(cloth) {
            this.editingCloth = { ...cloth };  
        },
        async saveEditClothes() {
            await axios.put('/clothes', {
                id: this.editingCloth._id,
                type: this.editingCloth.type,
                brand: this.editingCloth.brand,
                model: this.editingCloth.model,
                price: this.editingCloth.price,
                size: this.editingCloth.size,
                country: this.editingCloth.country,
                sex: this.editingCloth.sex,
                img: this.editingCloth.img
            });
            this.cancelEdit(); 
            this.loadClothes(); 
        },
        cancelEdit() {
            this.editingCloth = null; 
        },
        clearForm() {
            this.type = '';
            this.brand = '';
            this.model = '';
            this.price = '';
            this.size = '';
            this.sex = '';
            this.img = '';
            this.country = '';
        },
    },
    mounted() {
        this.loadClothes();
    }
};
</script>

<template>
    <hr>
    <div class="container">
        <button class="btn btn-success mb-3" @click="showAddForm = true">Добавить новую одежду</button>
        
        <div v-if="showAddForm" class="mb-4">
            <h3>Добавить одежду</h3>
            <form @submit.prevent="createClothes">
                <input v-model="type" placeholder="Тип" class="form-control mb-2" required />
                <input v-model="brand" placeholder="Бренд" class="form-control mb-2" required />
                <input v-model="model" placeholder="Модель" class="form-control mb-2" required />
                <input v-model="price" placeholder="Цена" type="number" class="form-control mb-2" required />
                <input v-model="size" placeholder="Размер" class="form-control mb-2" required />
                <input v-model="sex" placeholder="Пол" class="form-control mb-2" required />
                <input v-model="img" placeholder="Ссылка на изображение" class="form-control mb-2" required />
                <input v-model="country" placeholder="Страна" class="form-control mb-2" required />
                <button type="submit" class="btn btn-primary">Добавить</button>
                <button type="button" class="btn btn-secondary" @click="showAddForm = false">Отмена</button>
            </form>
        </div>

        <div v-if="editingCloth" class="mb-4">
            <h3>Редактировать одежду</h3>
            <form @submit.prevent="saveEditClothes">
                <input v-model="editingCloth.type" placeholder="Тип" class="form-control mb-2" required />
                <input v-model="editingCloth.brand" placeholder="Бренд" class="form-control mb-2" required />
                <input v-model="editingCloth.model" placeholder="Модель" class="form-control mb-2" required />
                <input v-model="editingCloth.price" placeholder="Цена" type="number" class="form-control mb-2" required />
                <input v-model="editingCloth.size" placeholder="Размер" class="form-control mb-2" required />
                <input v-model="editingCloth.sex" placeholder="Пол" class="form-control mb-2" required />
                <input v-model="editingCloth.img" placeholder="Ссылка на изображение" class="form-control mb-2" required />
                <input v-model="editingCloth.country" placeholder="Страна" class="form-control mb-2" required />
                <button type="submit" class="btn btn-primary">Сохранить</button>
                <button type="button" class="btn btn-secondary" @click="cancelEdit">Отмена</button>
            </form>
        </div>

        <div class="row">
            <div v-for="(cloth, index) in clothes" :key="cloth._id" class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card h-100">
                    <img :src="cloth.img" class="card-img-top img-fixed" alt="Image of cloth">
                    <div class="card-body">
                        <h5 class="card-title">{{ cloth.brand }} - {{ cloth.model }}</h5>
                        <p class="card-text">Цена: {{ cloth.price }} $</p>
                        <p class="card-text">Размер: {{ cloth.size }}</p>
                        <p class="card-text">Пол: {{ cloth.sex }}</p>
                        <p class="card-text">Страна: {{ cloth.country }}</p>
                        <div class="d-flex justify-content-between">
                            <a href="#" class="btn btn-primary" @click.prevent="editClothes(cloth)">Редактировать</a>
                            <a href="#" class="btn btn-danger" @click.prevent="removeClothes(cloth._id)">Удалить</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

.form-select {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    margin-right: 15px;
    width: 250px;
    border-radius: 1px;
}

.row {
    display: flex;
    flex-wrap: wrap;
}

.card-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card-text {
    flex-grow: 1; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
    margin-bottom: 10px; 
}

.btn-reg {
    margin-top: 10px;
}

</style>