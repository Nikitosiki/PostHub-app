<div align="center">
  <img width="250" height="250" src="client/public/logo.png">
  <h1>PostHub</h1>
</div>

<p align='center'>
  <img alt="GitHub License" src="https://img.shields.io/github/license/Nikitosiki/PostHub-app?labelColor=black&color=38c653&cacheSeconds=50000">
  <img alt="Static Badge" src="https://img.shields.io/badge/-Typescript?style=flat&logo=typescript&label=Typescript&labelColor=black&color=black">
  <img alt="React" src="https://img.shields.io/badge/-React?style=flat&logo=react&label=React&labelColor=black&color=black">
  <img alt="Supabase" src="https://img.shields.io/badge/-Supabase?style=flat&logo=supabase&label=Supabase&labelColor=black&color=black">
  <img alt="TailwindCSS" src="https://img.shields.io/badge/-TailwindCSS?style=flat&logo=tailwindcss&label=TailwindCSS&labelColor=black&color=black">
  <img alt="NextUI" src="https://img.shields.io/badge/-NextUI?style=flat&logo=nextui&label=NextUI&labelColor=black&color=black">
  <img alt="Framer-motion" src="https://img.shields.io/badge/-framermotion?logo=framer&label=framer-motion&labelColor=black&color=black">
</p>

# 🚀 Welcome to our platform

This is a new platform for publishing your amazing posts. Here, you'll find a variety of different topics and interests. You can create whatever you like, generate new posts, engage in discussions in the comments, or simply read the latest updates and react to them. A convenient filtering and posting system will help you browse only the content that interests you, while interactions with other participants will keep things exciting.

## 🖼️ Screenshots

<div>
  <img height="720" src="https://github.com/Nikitosiki/PostHub-app/assets/61596575/0d8490f2-201d-4e78-8418-5722065107fd">
  <img height="720" src="https://github.com/Nikitosiki/PostHub-app/assets/61596575/93f550c0-8d54-4d5c-8033-5a7b60cebf18">
  <img height="720" src="https://github.com/Nikitosiki/PostHub-app/assets/61596575/227a0daa-bec5-4796-b398-94c242b8b9d5">
  <img height="720" src="https://github.com/Nikitosiki/PostHub-app/assets/61596575/770a172f-0c53-42e9-b8a2-db6623670099">
  <img height="720" src="https://github.com/Nikitosiki/PostHub-app/assets/61596575/d77f385b-228e-4d36-b206-baed66564a57">
</div>

## 🛠 Development

Environment setup

You need to get the Supabase and TinyMCE keys and create an env file by defining the following variables:

```bash
VITE_SUPABASE_URL=https://[YOUR_PROJECT_ID].supabase.co
VITE_SUPABASE_ANON_KEY=******
VITE_TINYMCE_KEY=******
```

When developing use:
```bash
yarn dev
```

A development server will automatically open the project in your browser. Normally here: `http://localhost:8080`.


To build the project use:
```bash
yarn build
```

A web ready folder will be created in `/dist/`.