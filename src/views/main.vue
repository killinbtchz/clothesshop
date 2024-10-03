<script>

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
  
  methods:{
    goCatalog(sex, country) {
      let query = {};
      
      if (sex) {
        query.sex = sex; 
      } else if (country) {
        query.country = country; 
      }

      this.$router.push({
        name: "catalog",
        query: query 
      });
    }
      }
}
</script>


<template>
    <div class="image-container">
      <img class="wear" src="/src/assets/image.png" alt="wear">
      <div class="centered-text">
        <h1>THE PLATFORM FOR</h1>
        <p>Buy, sell, discover authenticated pieces from the world's top brands.</p>
        <div>
          <a @click="goCatalog('Men')" class="btn btn-custom">Menswear</a>
          <a @click="goCatalog('Women')" class="btn btn-custom">Womenswear</a>
        </div>
      </div>
    </div>

    <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-5 card-container">
        <div class="card">
          <img class="card-img-top" src="/src/assets/japanese.png">
          <div class="card-body">
            <div class="card-text-container">
              <h5 class="card-title">JAPANESE WEAR</h5>
              <a @click="goCatalog(null, 'Japan')" class="btn btn-card">VIEW MORE</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5 card-container">
        <div class="card">
          <img class="card-img-top" src="/src/assets/usa.png">
          <div class="card-body">
            <div class="card-text-container">
              <h5 class="card-title">USA WEAR</h5>
              <a @click="goCatalog(null, 'USA')" class="btn btn-card">VIEW MORE</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5 card-container">
        <div class="card">
          <img class="card-img-top" src="/src/assets/russia.png">
          <div class="card-body">
            <div class="card-text-container">
              <h5 class="card-title">RUSSIAN WEAR</h5>
              <a @click="goCatalog(null, 'Russia')" class="btn btn-card">VIEW MORE</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5 card-container">
        <div class="card">
          <img class="card-img-top" src="/src/assets/england.png">
          <div class="card-body">
            <div class="card-text-container">
              <h5 class="card-title">ENGLAND WEAR</h5>
              <a @click="goCatalog(null, 'England')" class="btn btn-card">VIEW MORE</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    
  </template>
  
  <style>
  .image-container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'InriaSans';
    margin-bottom: 50px;
  }
  
  .wear {
    width: 100%;
    height: 50%;
    object-fit: cover; 
  }
  
  .centered-text {
    position: absolute;
    text-align: center;
    color: white;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  }
  
  .centered-text h1 {
    font-size: 5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  .centered-text p {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .btn-custom {
    border: 2px solid black;
    background-color: transparent;
    color: rgb(255, 255, 255);
    padding: 10px 40px;
    margin: 5px;
    margin-left: 50px;
    margin-right: 50px;
    font-size: 1.2rem;
    text-transform: uppercase;
    transition: all 0.3s ease;
  }
  
  .btn-custom:hover {
    background-color: black;
    color: white;
  }
  
  @media (max-width: 768px) {
    .centered-text h1 {
      font-size: 2rem;
    }
  
    .centered-text p {
      font-size: 1rem;
    }
  
    .btn-custom {
      font-size: 1rem;
      padding: 8px 16px;
    }
  }
  
  @media (max-width: 576px) {
    .centered-text h1 {
      font-size: 1.5rem;
    }
  
    .centered-text p {
      font-size: 0.9rem;
    }
  
    .btn-custom {
      font-size: 0.9rem;
      padding: 6px 12px;
    }
  }

.container-fluid {
  padding: 0; 
}

.row {
  margin: 0; 
}

.card-container {
  display: flex;
  justify-content: center; 
  margin: 20px;
  padding: 0;
}

.card {
  width: 100%; 
  border: 2px solid gray; 
  border-radius: 10px; 
}


.card-img-top {
  width: 100%; 
  height: auto; 
}

.card-body {
  display: flex;
  flex-direction: column; 
}

.card-text-container {
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
}

.card-title {
  margin: 0; 
}

.btn {
  margin-left: 10px; 
}

.btn-card{
    border: 2px solid #3E00ED;
    background-color: #ffffff;
    color: #3E00ED;
}

.btn-card:hover {
    background-color: #3E00ED;
    color: white;
  }
  </style>