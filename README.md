![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![Angular Universal](https://img.shields.io/badge/Angular%20Universal-0054A6?style=for-the-badge&logo=angular&logoColor=white)

# 📌 CALLM - IOT (ANGULAR-FRONTEND-APP)

CALLM-IOT es una aplicación web desarrollada en **Angular 19** que permite la gestión y supervisión de un sistema de timbre digital inteligente en tiempo real. Diseñada para interactuar con el hardware basado en **ESP32-CAM** y sensores PIR, la aplicación proporciona una interfaz intuitiva para visualizar notificaciones, gestionar accesos y recibir alertas de actividad. 

Utiliza **SSR con Angular Universal** para mejorar el rendimiento y optimización SEO, conectándose a una **API en Node.js con Express** y almacenando datos en **MongoDB**.

## 📋 Características

- 🔹 **Autenticación de usuarios con JWT**  
- 🔹 **CRUD de usuarios**  
- 🔹 **Renderizado en servidor (SSR) con Angular Universal**  
- 🔹 **Consumo de API REST con `HttpClient`**  
- 🔹 **Diseño modular con `@angular/router`**  
- 🔹 **Soporte para PWA (opcional)**  

## 🚀 Tecnologías Usadas

- **Angular 19** ⚡  
- **Angular Universal (SSR)**
- **TypeScript**
- **RxJS**
- **Node.js + Express**
- **MongoDB** (para configuración del back-end)

## 📦 Instalación y Configuración

```bash
# Clonar el repositorio
git clone https://github.com/Callm-IOT/angular-frontend-app.git

# Entrar al directorio del proyecto
cd angular-frontend-app

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start

# Compilar la aplicación para producción
npm run build

# Ejecutar en modo SSR (Server-Side Rendering)
npm run serve:ssr:temporal
```
<br><br><br>

## 🚀 **¿Qué es SSR (Server-Side Rendering)?**  

SSR (**Server-Side Rendering**) es una técnica que permite renderizar el HTML de una aplicación en el servidor antes de enviarlo al navegador del usuario.  
Esto mejora el rendimiento inicial, facilita la indexación por motores de búsqueda (SEO) y optimiza la experiencia en dispositivos de bajos recursos.  

En esta aplicación, se implementa SSR con **Angular Universal** y **Express**, permitiendo que el servidor procese las vistas antes de enviarlas al cliente.

---

## 🚀 **Ejecución con SSR (Server-Side Rendering)**  

Esta aplicación utiliza **Angular Universal** para mejorar el rendimiento, la carga inicial y la optimización para SEO.  

### **📌 Cómo ejecutar en modo SSR**  

```bash
# Compilar la aplicación con SSR
npm run build:ssr

# Iniciar el servidor con SSR (temporalmente)
npm run serve:ssr:temporal
```

## 📌 Configuración del servidor Express  

El servidor Express (`server.ts`) maneja el SSR con las siguientes características:  

- 📂 **Sirve archivos estáticos** desde `dist/browser` con caché de **1 año**.  
- 🔄 **Renderiza las solicitudes con Angular Universal** (`AngularNodeAppEngine`).  
- 🚀 **Corre en el puerto `4000` por defecto** (configurable con `PORT`).  

## 📌 Enrutamiento y prerenderizado  

- 📌 **Todas las rutas se prerenderizan** con `RenderMode.Prerender`.  
- 📌 **Las solicitudes se manejan en el backend** con `angularApp.handle(req)`.  

