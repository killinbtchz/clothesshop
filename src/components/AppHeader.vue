<script>
export default {
  data() {
    return {
      type: '',  
      brand: '', 
      model: '', 
    };
  },
  methods: {
    goCatalog(type) {
      this.$router.push({
        name: "catalog",
        query: { type: type }  
      });
    },
    goMain() {
      this.$router.push({
        name: "main"
      });
    },
    goAccount() {
      this.$router.push({
        name: "account"
      });
    },
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
    searchClothes() {
      this.$router.push({
        name: "catalog",
        query: { search: this.searchQuery }  
      });
    }
  }
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <a class="navbar-brand" @click="goMain">BEST SELL</a>

    <form class="form-inline my-2 my-lg-0" @submit.prevent="searchClothes"> 
      <div class="search-container">
        <input class="form-control mr-sm-2 search-input" type="search" placeholder="Search" v-model="searchQuery">
        <button class="btn btn-light search-button" type="submit">Search</button>
      </div>
    </form>

    <div class="auth">
      <button type="button" class="btn btn-light btn-login" @click="goAccount">My account</button>
    </div>
  </nav>
  <hr>
  <div class="nav-container">
    <ul class="nav-links">
      <li><a class="catalog" @click="goCatalog('')">VIEW ALL</a></li>
      <li><a class="catalog" @click="goCatalog('T-SHIRTS')">T-SHIRTS</a></li>
      <li><a class="catalog" @click="goCatalog('HOODIES')">HOODIES</a></li>
      <li><a class="catalog" @click="goCatalog('JACKETS')">JACKETS</a></li>
      <li><a class="catalog" @click="goCatalog('PANTS')">PANTS</a></li>
      <li><a class="catalog" @click="goCatalog('SNEAKERS')">SNEAKERS</a></li>
    </ul>
  </div>
</template>

<style>
.catalog{
  cursor: pointer;
}

@font-face {
    font-family: 'InknutAntiqua';
    src: url('../fonts/InknutAntiqua-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'InriaSans';
    src: url('../fonts/InriaSans-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

.navbar-light{
    display: flex;
    margin-top: 20px;
    justify-content: center;
    flex-wrap: nowrap;
}
.form-inline{
    display: flex;
    margin: 10px;
    gap: 10px;
}
.navbar-brand{
    display: flex;
    margin-left: -20px;
    margin-right: 50px;
    font-size: 30px;
    cursor: pointer;
    font-family: 'InknutAntiqua';
}
.form-control {
    width: 400px; 
  }
  .search-container {
    position: relative;
    display: inline-block;
  }

  .search-input {
    width: 800px;
    height: 50px;
    border-radius: 1px;
    font-family: 'InriaSans'; 
  }

  .search-button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    padding: 1px 20px;
    border: none;
    background-color: white;
    cursor: pointer;
    border: 2px solid black;
    font-family: 'InriaSans';
  }
.btn {
    border-radius: 1px;
    font-family: 'InriaSans';
}

.btn-login{
    border: 2px solid #777777;
    background-color: white;
}
.auth{
    display: flex;
    gap: 20px;
    margin-left: 70px;
}
.nav-links {
    display: flex;
    justify-content: center; 
    gap: 50px; 
    list-style-type: none;
    padding: 0;
    font-family: 'InriaSans';
  }

  .nav-links a {
    text-decoration: none;
    color: #000; 
    font-size: 25px; 
    padding: 10px;
    transition: color 0.3s ease;
  }

  .nav-links a:hover {
    color: #340acc; 
  }
  
  @media (max-width: 1400px) {
    .search-input {
      max-width: 600px;
    }

    .navbar-brand {
      font-size: 26px;
      margin-left: 50px;
    }
    .auth{
        margin-left: 10px;
    }
  }
  
  @media (max-width: 1068px) {
    .search-input {
      max-width: 500px;
    }

  }

  @media (max-width: 992px) {
    .search-input {
      max-width: 400px;
    }

    .navbar-light {
      flex-wrap: nowrap; 
    }

    .auth {
      gap: 5px;
    }
  }

  @media (max-width: 943px) {
    .nav-links {
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    .navbar-brand {
      margin-right: 10px;
      margin-left: 10px;
    }

  }

  @media (max-width: 768px) {
    .search-input {
      max-width: 300px;
      height: 45px;
      margin-left: 10px;
    }

    .auth {
      gap: 5px;
    }

    .btn {
      padding: 5px 10px;
    }
  }

  @media (max-width: 768px) {
    .nav-links {
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    .search-input{
      max-width: 250px;
      height: 40px;
      margin-left: 10px;
    }
  }

  @media (max-width: 576px) {
    .search-input {
      max-width: 200px;
      height: 40px;
      margin-left: 0px;
    }

    .navbar-light {
      flex-direction: row;
      justify-content: space-between;
    }

    .auth {
      gap: 5px;
      margin-right: 10px;
    }

    .navbar-brand {
      font-size: 20px;
      margin-right: 0px;
      margin-left: 10px;
    }
    .auth{
        margin-left: 0px;
    }
  }

  @media (max-width: 400px) {
    .search-input {
      max-width: 200px;
      height: 35px;
      margin-left: 10px;
    }

    .navbar-brand {
      font-size: 20px;
      margin-right: 10px;
    }

    .nav-links {
      gap: 5px;
    }
  }
</style>