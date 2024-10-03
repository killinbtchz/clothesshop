<script>
import axios from 'axios';
import dayjs from 'dayjs';

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
        };
    },
    methods: {
        formatDate(date) {
        return dayjs(date).format('DD.MM.YYYY'); 
        },
        async loadClothes() {
        let response = await axios.get('/clothes', {
        params: {
            size: this.size,
            search: this.$route.query.search || '',
            sort: this.sort || null,
            type: this.$route.query.type || null,
            brand: this.$route.query.brand || null,
            model: this.$route.query.model || null,
            sex: this.$route.query.sex || null,
            country: this.$route.query.country || null
        }
    });

        this.clothes = response.data; 
        }
    },

    watch: {
        '$route.query.type': 'loadClothes',
        '$route.query.sex': 'loadClothes',
        '$route.query.country': 'loadClothes',
        '$route.query.search': 'loadClothes'
    },
    mounted() {
        this.loadClothes();
    }
};
</script>

<template>
    <hr>
    <div class="container">
        <select class="form-select" v-model="sort" @change="loadClothes"> 
            <option value="-1">От большего к меньшему</option>
            <option value="1">От меньшего к большему</option>
        </select>
      <!-- Карточки товаров -->
      <div class="row">
            <div v-for="(cloth, index) in clothes" :key="index" class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card h-100">
                <img :src="cloth.img" class="card-img-top img-fixed" alt="Image of cloth">
                    <div class="card-body">
                        <h5 class="card-title">{{ cloth.brand }} - {{ cloth.model }}</h5>
                        <p class="card-text">Цена: {{ cloth.price }} $</p>
                        <p class="card-text">Размер: {{ cloth.size }}</p>
                        <p class="card-text">Пол: {{ cloth.sex }}</p>
                        <p class="card-text">Страна: {{ cloth.country }}</p>
                        <p class="card-text">Добавлено: {{ formatDate(cloth.createdAt) }}</p>
                        <a href="#" class="btn btn-primary">Купить</a>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </template>
    
    <style>
    .container {
        margin: 20px auto;
        max-width: 1000px;
        display: flex;
        flex-direction: column; 
        align-items: flex-end; 
    }
    
    .btn{
        margin-top: auto;
    }

    .card {
        height: 100%; 
        display: flex;
        flex-direction: column; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
    }
    .img-fixed {
        width: 100%;         
        height: 200px;      
        object-fit: cover;
        object-position: center;
        }

    .card-img-top {
        border-radius: 8px; 
    }
            
    .card:hover {
        transform: scale(1.05);
    }
    
    .card-img-top {
        height: 200px;
        object-fit: cover;
    }
    
    .card-body {
        font-family: 'InriaSans';
        text-align: center;
        flex-grow: 1;
    }
    
    .form-select {
        display: flex;
        justify-content: end;
        margin-bottom: 10px;
        margin-right: 15px
        ;
        width: 250px;
        border-radius: 1px;
    }
    
    .btn-secondary {
        background-color: white;
        color: black;
        font-family: 'InriaSans';
    }
    </style>