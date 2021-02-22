# Visma.Test.Front

Frontend for employee management application.

## Usage

Change the property **apiUrl** in the **front\src\environments\environment.ts** file. This property points to the backend project. In most cases you only need to change the port number.

```js
export const environment = {
  production: false,
  apiUrl: 'https://localhost:44341/api/'
};
```

Build and serve the app locally with the next command. Try to user the port 4200 to avoid changes in the backend settings.

```bash
  ng serve --port 4200
```
