# 1.2

### Features

- **BETA - Realtime Collaboration**: It is now possible to share projects in real time with users who have an account on the platform and are logged in. 
- It is now possible delete and logout from user account
- It is now possible login with Google Account Provider
- LocalStorage have an new error message in projects that are more than 10MB in size

### Refactor

- Login/Register it was rewritten with better UI/UX

### Style

- Material Switcher with new hover effect
- Some colors in custom theme were modified

### Fix's

- Fixed wrong paths in sitemap.xml generation
- Fixed paragraph insert in end enter, ignoring whitespace
- Fixed createdAT and updatedAt in entities factory
- Fixed timer in editor bottom bar

### Performance

- Temporary disabled TextGeometry in landing
- Google fonts request only in necessary cases

### Chore

- Update deps
- Privacy Route
- Auth, WebGL and Multiplayer monorepo