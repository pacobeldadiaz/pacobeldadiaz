<!-- views/Home.vue -->
<template>
    <div class="home-content">
      <section class="intro">
        <h1>Bienvenidos a mi Sitio Web</h1>
        <h2>Soy Paco Belda</h2>
        <p class="lead">
          Apasionado por la tecnología y el desarrollo web, con un constante deseo de aprender y crecer profesionalmente.
        </p>
      </section>
  
      <section class="about">
        <h3>Sobre mí</h3>
        <p>
          Mi fascinación por la informática y la tecnología me impulsa a mantenerme siempre actualizado en las últimas tendencias 
          y avances del sector. Disfruto especialmente explorando nuevas tecnologías y enfrentándome a desafíos que me permitan 
          expandir mis conocimientos.
        </p>
        <p>
          Me caracterizo por mi espíritu de superación y mi dedicación al aprendizaje continuo. Cada proyecto es una oportunidad 
          para crecer y mejorar mis habilidades, siempre buscando la excelencia en cada línea de código que escribo.
        </p>
      </section>
    </div>
  </template>
  
  <style scoped>
  .home-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .intro {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  
  h2 {
    font-size: 2rem;
    color: #3498db;
    margin-bottom: 1.5rem;
  }
  
  .lead {
    font-size: 1.25rem;
    color: #666;
    line-height: 1.6;
  }
  
  .about {
    margin-top: 2rem;
  }
  
  h3 {
    color: #2c3e50;
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
  
  p {
    color: #444;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
  </style>