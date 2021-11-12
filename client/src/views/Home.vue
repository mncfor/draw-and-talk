<template>

    <div class="home">
        <div class="home__half">

            <div class="home__logo">
                <img :src="require('@/assets/img/Logo.jpg')" alt="">
            </div>

            <div class="home__text">
                <h2>Рисуйте.</h2>
                <h2>Общайтесь.</h2>
                <h2>Онлайн.</h2>
                <p class="">Просто поделитесь ссылкой</p>
            </div>

            <button class="home__go button button-main" @click="$router.push('/draw')">Начать</button>
        </div>
        <div class="home__half">
            <img class="half-img" :src="require('@/assets/img/Home.jpg')" alt="">
        </div>
    </div>

</template>
