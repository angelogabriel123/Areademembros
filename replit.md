# Educational Platform Web Application

## Overview

This is a modern, responsive educational platform built as a single-page web application using vanilla HTML, CSS, and JavaScript. The application features a mobile-app-like interface with a pink-themed design, providing users access to educational content through video modules. The platform includes user authentication, content organization through modules, and a mobile-first navigation experience with bottom tabs.

## User Preferences

Preferred communication style: Simple, everyday language in Portuguese (pt-BR).

## System Architecture

### Frontend Architecture
- **Single-page application (SPA)** built with vanilla JavaScript for simplicity and direct hosting
- **Component-based structure** using JavaScript modules and DOM manipulation
- **Mobile-first responsive design** with CSS Grid and Flexbox for layout management
- **State management** handled through global JavaScript objects and local variables
- **Navigation system** using bottom tabs that show/hide content sections dynamically

### Design System
- **Color palette**: Primary pink (#F78FB3), dark backgrounds (#1E1B2E, #2E263F), white typography
- **Modern UI elements**: Rounded corners, smooth transitions, clean typography using system fonts
- **Responsive breakpoints**: Mobile (1 column), tablet (2 columns), desktop (3+ columns)
- **Icon integration**: Feather Icons CDN for consistent iconography

### Content Management
- **Module-based organization**: Educational content grouped into 3 main modules (Fundamentals, Intermediate, Advanced)
- **Video delivery**: YouTube embed integration for educational videos
- **Carousel interface**: Horizontal scrolling module selector with 280-300px cards
- **Grid-based video display**: Responsive grid that adapts to screen size

### Authentication & Session Management
- **Client-side authentication**: Simple form-based login system
- **Session state**: User state maintained in JavaScript variables
- **Error handling**: Basic form validation and error messaging
- **Logout functionality**: Session clearing and redirect to login

### Data Structure
- **Static data storage**: Video IDs and module information stored in JavaScript objects
- **Module mapping**: Each module contains 5 YouTube video IDs
- **Title mapping**: Module titles stored separately for easy maintenance

## External Dependencies

### Content Delivery Networks (CDNs)
- **Feather Icons**: Icon library hosted at cdnjs.cloudflare.com for UI elements
- **YouTube Embed API**: Direct iframe embedding for video content delivery

### Third-party Services
- **YouTube**: Video hosting and streaming service integrated via embed URLs
- **Browser APIs**: LocalStorage (potential), DOM APIs, Event handling APIs

### Hosting Requirements
- **Static file hosting**: Designed for deployment in `/public` directory
- **No backend dependencies**: Pure client-side application
- **CDN compatibility**: External resources loaded via HTTPS CDNs