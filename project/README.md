# Role-Based Access Control (RBAC) Project

**A Role-Based Access Control (RBAC) system built with React and TypeScript.**  
This project allows users with different roles (Admin, Editor, Viewer) to have different levels of access to a system.

## Table of Contents
1. [Description](#description)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)


## Description

This project implements **Role-Based Access Control (RBAC)** where the access to different pages and features of the application is restricted based on the user's role.

### Roles:
- **Admin**: Full access to the system. Admin can manage users and roles, including adding, editing, and deleting them.
- **Editor**: Can only view the dashboard and the total users in the system.
- **Viewer**: Limited to viewing their own profile and cannot access other users' data.

The system includes a **signup** and **signin** process based on user roles, ensuring that each user gets the appropriate access based on their role.

This project is built using **React** and **TypeScript** to ensure type safety and a dynamic user interface.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: A statically typed superset of JavaScript.
- **React Router**: For routing and navigation.
- **React Context / Zustand**: For managing global state (authentication and user roles).
- **CSS / Tailwind CSS**: For styling the application.

## Installation

To run this project locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org) (Version X.X.X or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (depending on your preference)

### Steps

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/role-based-access-control.git
2. Navigate to the project folder:
   ```bash
   cd role-based-access-control
3. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev